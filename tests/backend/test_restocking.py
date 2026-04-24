"""
Tests for the /api/restocking endpoint (R2 — Restocking Recommendations).
"""
import pytest


class TestRestockingEndpoint:
    """Test suite for restocking recommendations endpoint."""

    def test_get_restocking_returns_list(self, client):
        """Endpoint returns a list."""
        response = client.get("/api/restocking")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    def test_restocking_items_have_required_fields(self, client):
        """Each recommendation includes all required fields."""
        response = client.get("/api/restocking")
        data = response.json()
        assert len(data) > 0

        required = [
            "sku", "name", "category", "warehouse",
            "quantity_on_hand", "reorder_point", "shortfall",
            "recommended_qty", "unit_cost", "estimated_cost",
            "demand_trend",
        ]
        for item in data:
            for field in required:
                assert field in item, f"Missing field: {field}"

    def test_all_items_are_below_reorder_point(self, client):
        """Only items where quantity_on_hand < reorder_point are returned."""
        response = client.get("/api/restocking")
        for item in response.json():
            assert item["quantity_on_hand"] < item["reorder_point"], (
                f"SKU {item['sku']}: on_hand={item['quantity_on_hand']} "
                f">= reorder_point={item['reorder_point']}"
            )

    def test_shortfall_calculation_is_correct(self, client):
        """shortfall == reorder_point - quantity_on_hand for every item."""
        response = client.get("/api/restocking")
        for item in response.json():
            expected = item["reorder_point"] - item["quantity_on_hand"]
            assert item["shortfall"] == expected, (
                f"SKU {item['sku']}: expected shortfall {expected}, got {item['shortfall']}"
            )

    def test_recommended_qty_equals_shortfall(self, client):
        """recommended_qty brings stock exactly up to reorder_point."""
        response = client.get("/api/restocking")
        for item in response.json():
            assert item["recommended_qty"] == item["shortfall"]

    def test_estimated_cost_calculation(self, client):
        """estimated_cost == recommended_qty * unit_cost (within rounding)."""
        response = client.get("/api/restocking")
        for item in response.json():
            expected = round(item["recommended_qty"] * item["unit_cost"], 2)
            assert abs(item["estimated_cost"] - expected) < 0.01, (
                f"SKU {item['sku']}: expected cost {expected}, got {item['estimated_cost']}"
            )

    def test_demand_trend_values_are_valid(self, client):
        """demand_trend is one of the four recognised values."""
        valid_trends = {"increasing", "stable", "decreasing", "unknown"}
        response = client.get("/api/restocking")
        for item in response.json():
            assert item["demand_trend"] in valid_trends, (
                f"SKU {item['sku']}: unexpected trend '{item['demand_trend']}'"
            )

    def test_results_sorted_increasing_trend_first(self, client):
        """Items with increasing demand trend come before stable/decreasing."""
        trend_order = {"increasing": 0, "stable": 1, "decreasing": 2, "unknown": 3}
        response = client.get("/api/restocking")
        data = response.json()
        ranks = [trend_order[item["demand_trend"]] for item in data]
        assert ranks == sorted(ranks), "Results are not sorted by demand trend priority"

    def test_filter_by_warehouse(self, client):
        """warehouse filter restricts results to that warehouse only."""
        warehouses = ["London", "Tokyo", "San Francisco"]
        for wh in warehouses:
            response = client.get(f"/api/restocking?warehouse={wh}")
            assert response.status_code == 200
            for item in response.json():
                assert item["warehouse"] == wh

    def test_filter_by_category(self, client):
        """category filter restricts results to that category only."""
        response = client.get("/api/restocking?category=Sensors")
        assert response.status_code == 200
        for item in response.json():
            assert item["category"].lower() == "sensors"

    def test_budget_ceiling_limits_total_cost(self, client):
        """With a budget, total estimated_cost of results <= budget."""
        budget = 5000.0
        response = client.get(f"/api/restocking?budget={budget}")
        assert response.status_code == 200
        total = sum(item["estimated_cost"] for item in response.json())
        assert total <= budget, f"Total cost {total} exceeds budget {budget}"

    def test_budget_zero_returns_empty(self, client):
        """A budget of 0 returns no recommendations."""
        response = client.get("/api/restocking?budget=0")
        assert response.status_code == 200
        assert response.json() == []

    def test_no_budget_returns_all_shortfalls(self, client):
        """Without a budget, every shortfall item is returned."""
        no_budget = client.get("/api/restocking")
        with_large_budget = client.get("/api/restocking?budget=9999999")
        assert len(no_budget.json()) == len(with_large_budget.json())

    def test_combined_warehouse_and_budget_filter(self, client):
        """warehouse and budget filters compose correctly."""
        response = client.get("/api/restocking?warehouse=Tokyo&budget=10000")
        assert response.status_code == 200
        data = response.json()
        for item in data:
            assert item["warehouse"] == "Tokyo"
        total = sum(item["estimated_cost"] for item in data)
        assert total <= 10000

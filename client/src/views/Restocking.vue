<template>
  <div>
    <div class="page-header">
      <h2>{{ t('restocking.title') }}</h2>
      <p>{{ t('restocking.description') }}</p>
    </div>

    <!-- Budget Ceiling -->
    <div class="card budget-bar">
      <label class="budget-label">{{ t('restocking.budgetLabel') }}</label>
      <div class="budget-controls">
        <input
          v-model.number="budgetInput"
          type="number"
          class="budget-input"
          :placeholder="t('restocking.budgetPlaceholder')"
          min="0"
        />
        <button class="btn-primary" @click="applyBudget">{{ t('restocking.applyBudget') }}</button>
        <button v-if="activeBudget !== null" class="btn-secondary" @click="clearBudget">{{ t('restocking.clearBudget') }}</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card" :class="{ warning: itemCount > 0 }">
        <div class="stat-label">{{ t('restocking.summary.itemsToRestock') }}</div>
        <div class="stat-value">{{ itemCount }}</div>
      </div>
      <div class="stat-card" :class="{ danger: totalCost > 0 }">
        <div class="stat-label">{{ t('restocking.summary.totalEstimatedCost') }}</div>
        <div class="stat-value">{{ formatCurrency(totalCost) }}</div>
      </div>
      <div v-if="activeBudget !== null" class="stat-card" :class="{ success: withinBudgetCount > 0 }">
        <div class="stat-label">{{ t('restocking.summary.withinBudget') }}</div>
        <div class="stat-value">{{ withinBudgetCount }}</div>
      </div>
      <div v-if="activeBudget !== null" class="stat-card" :class="{ info: budgetRemaining > 0 }">
        <div class="stat-label">{{ t('restocking.summary.budgetRemaining') }}</div>
        <div class="stat-value">{{ formatCurrency(budgetRemaining) }}</div>
      </div>
    </div>

    <!-- Loading / Error / Table -->
    <div v-if="loading" class="loading">{{ t('common.loading') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="card">
      <div class="card-header">
        <span class="card-title">{{ t('restocking.title') }}</span>
      </div>

      <div v-if="recommendations.length === 0" class="empty-state">
        {{ t('restocking.noRecommendations') }}
      </div>
      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>{{ t('restocking.table.sku') }}</th>
              <th>{{ t('restocking.table.itemName') }}</th>
              <th>{{ t('restocking.table.warehouse') }}</th>
              <th>{{ t('restocking.table.onHand') }}</th>
              <th>{{ t('restocking.table.reorderPoint') }}</th>
              <th>{{ t('restocking.table.shortfall') }}</th>
              <th>{{ t('restocking.table.recommendedQty') }}</th>
              <th>{{ t('restocking.table.unitCost') }}</th>
              <th>{{ t('restocking.table.estimatedCost') }}</th>
              <th>{{ t('restocking.table.demandTrend') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recommendations" :key="item.sku + item.warehouse">
              <td><code>{{ item.sku }}</code></td>
              <td>{{ item.name }}</td>
              <td>{{ translateWarehouse(item.warehouse) }}</td>
              <td>{{ item.quantity_on_hand }}</td>
              <td>{{ item.reorder_point }}</td>
              <td class="shortfall-cell">{{ item.shortfall }}</td>
              <td><strong>{{ item.recommended_qty }}</strong></td>
              <td>{{ formatCurrency(item.unit_cost) }}</td>
              <td><strong>{{ formatCurrency(item.estimated_cost) }}</strong></td>
              <td>
                <span class="badge" :class="trendClass(item.demand_trend)">
                  {{ t('trends.' + item.demand_trend) !== 'trends.' + item.demand_trend ? t('trends.' + item.demand_trend) : item.demand_trend }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { api } from '../api'
import { useFilters } from '../composables/useFilters'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Restocking',
  setup() {
    const { t, currentCurrency, translateWarehouse } = useI18n()
    const { selectedLocation, selectedCategory, getCurrentFilters } = useFilters()

    const recommendations = ref([])
    const loading = ref(true)
    const error = ref(null)
    const budgetInput = ref(null)
    const activeBudget = ref(null)

    const loadData = async () => {
      try {
        loading.value = true
        error.value = null
        const filters = getCurrentFilters()
        if (activeBudget.value !== null) {
          filters.budget = activeBudget.value
        }
        recommendations.value = await api.getRestockingRecommendations(filters)
      } catch (err) {
        error.value = t('common.error')
        console.error('Failed to load restocking data:', err)
      } finally {
        loading.value = false
      }
    }

    const applyBudget = () => {
      activeBudget.value = budgetInput.value && budgetInput.value > 0 ? budgetInput.value : null
      loadData()
    }

    const clearBudget = () => {
      budgetInput.value = null
      activeBudget.value = null
      loadData()
    }

    // All recommendations before any budget cap (for stats when budget is active)
    const itemCount = computed(() => recommendations.value.length)

    const totalCost = computed(() =>
      recommendations.value.reduce((sum, item) => sum + item.estimated_cost, 0)
    )

    const withinBudgetCount = computed(() => {
      if (activeBudget.value === null) return itemCount.value
      return recommendations.value.length
    })

    const budgetRemaining = computed(() => {
      if (activeBudget.value === null) return 0
      return Math.max(0, activeBudget.value - totalCost.value)
    })

    const formatCurrency = (value) => {
      if (value == null || isNaN(value)) return '—'
      const currency = currentCurrency.value
      return value.toLocaleString('en-US', { style: 'currency', currency })
    }

    const trendClass = (trend) => {
      const map = { increasing: 'increasing', stable: 'stable', decreasing: 'decreasing', unknown: 'unknown' }
      return map[trend] || 'unknown'
    }

    watch([selectedLocation, selectedCategory], loadData)
    onMounted(loadData)

    return {
      t,
      translateWarehouse,
      recommendations,
      loading,
      error,
      budgetInput,
      activeBudget,
      itemCount,
      totalCost,
      withinBudgetCount,
      budgetRemaining,
      formatCurrency,
      trendClass,
      applyBudget,
      clearBudget
    }
  }
}
</script>

<style scoped>
.budget-bar {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.budget-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #475569;
  white-space: nowrap;
}

.budget-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.budget-input {
  padding: 0.5rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  color: #334155;
  width: 220px;
  transition: border-color 0.2s;
}

.budget-input:focus {
  outline: none;
  border-color: #2563eb;
}

.btn-primary {
  padding: 0.5rem 1.25rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  padding: 0.5rem 1.25rem;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.shortfall-cell {
  color: #dc2626;
  font-weight: 600;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #64748b;
  font-size: 0.938rem;
}

.badge.unknown {
  background: #f1f5f9;
  color: #64748b;
}

code {
  font-size: 0.8rem;
  background: #f1f5f9;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  color: #475569;
}
</style>

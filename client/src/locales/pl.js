export default {
  // Navigation
  nav: {
    overview: 'Przegląd',
    inventory: 'Magazyn',
    orders: 'Zamówienia',
    finance: 'Finanse',
    demandForecast: 'Prognoza Popytu',
    restocking: 'Uzupełnienie',
    companyName: 'Catalyst Components',
    subtitle: 'System Zarządzania Magazynem'
  },

  // Dashboard
  dashboard: {
    title: 'Przegląd',
    kpi: {
      title: 'Kluczowe Wskaźniki Wydajności',
      inventoryTurnover: 'Wskaźnik Rotacji Zapasów',
      ordersFulfilled: 'Zrealizowane Zamówienia',
      orderFillRate: 'Wskaźnik Realizacji Zamówień',
      revenue: 'Przychód (Zamówienia)',
      revenueYTD: 'Przychód (Zamówienia) OD początku roku',
      revenueMTD: 'Przychód (Zamówienia) OD początku miesiąca',
      avgProcessingTime: 'Śr. Czas Przetwarzania (Dni)',
      goal: 'Cel'
    },
    summary: {
      title: 'Podsumowanie'
    },
    orderHealth: {
      title: 'Kondycja Zamówień',
      totalOrders: 'Łączna Liczba Zamówień',
      revenue: 'Przychód',
      avgOrderValue: 'Średnia Wartość Zamówienia',
      onTimeRate: 'Terminowość Dostaw',
      avgFulfillmentDays: 'Śr. Czas Realizacji (Dni)',
      total: 'Łącznie'
    },
    ordersByMonth: {
      title: 'Zamówienia według Miesiąca'
    },
    inventoryValue: {
      title: 'Wartość Magazynu według Kategorii'
    },
    inventoryShortages: {
      title: 'Niedobory Magazynowe',
      noShortages: 'Brak niedoborów magazynowych — wszystkie zamówienia mogą zostać zrealizowane!',
      noData: 'Brak danych magazynowych dla wybranych filtrów',
      orderId: 'ID Zamówienia',
      sku: 'SKU',
      itemName: 'Nazwa Towaru',
      quantityNeeded: 'Wymagana Ilość',
      quantityAvailable: 'Dostępna Ilość',
      shortage: 'Niedobór',
      daysDelayed: 'Dni Opóźnienia',
      priority: 'Priorytet',
      unitsShort: 'szt. brakuje',
      days: 'dni'
    },
    topProducts: {
      title: 'Produkty o Najwyższym Przychodzie',
      sku: 'SKU',
      product: 'Produkt',
      category: 'Kategoria',
      warehouse: 'Magazyn',
      stockStatus: 'Stan Magazynowy',
      revenue: 'Przychód',
      unitsOrdered: 'Zamówione Sztuki',
      firstOrder: 'Pierwsze Zamówienie',
      inStock: 'W Magazynie',
      lowStock: 'Niski Stan'
    }
  },

  // Inventory
  inventory: {
    title: 'Magazyn',
    description: 'Śledź i zarządzaj wszystkimi pozycjami magazynowymi',
    stockLevels: 'Poziomy Zapasów',
    skus: 'SKU',
    searchPlaceholder: 'Szukaj po nazwie towaru...',
    clearSearch: 'Wyczyść wyszukiwanie',
    totalItems: 'Łączna Liczba Pozycji',
    totalValue: 'Łączna Wartość',
    lowStockItems: 'Pozycje z Niskim Stanem',
    warehouses: 'Magazyny',
    table: {
      sku: 'SKU',
      itemName: 'Nazwa Towaru',
      name: 'Nazwa',
      category: 'Kategoria',
      warehouse: 'Magazyn',
      quantity: 'Ilość',
      quantityOnHand: 'Stan Magazynowy',
      reorderPoint: 'Punkt Ponownego Zamówienia',
      unitCost: 'Koszt Jednostkowy',
      unitPrice: 'Cena Jednostkowa',
      totalValue: 'Łączna Wartość',
      location: 'Lokalizacja',
      status: 'Status'
    }
  },

  // Orders
  orders: {
    title: 'Zamówienia',
    description: 'Przeglądaj i zarządzaj zamówieniami klientów',
    allOrders: 'Wszystkie Zamówienia',
    totalOrders: 'Łączna Liczba Zamówień',
    totalRevenue: 'Łączny Przychód',
    avgOrderValue: 'Średnia Wartość Zamówienia',
    onTimeDelivery: 'Terminowość Dostaw',
    itemsCount: '{count} pozycji',
    quantity: 'Ilość',
    table: {
      orderNumber: 'Numer Zamówienia',
      orderId: 'ID Zamówienia',
      orderDate: 'Data Zamówienia',
      date: 'Data',
      customer: 'Klient',
      category: 'Kategoria',
      warehouse: 'Magazyn',
      items: 'Pozycje',
      value: 'Wartość',
      totalValue: 'Łączna Wartość',
      status: 'Status',
      expectedDelivery: 'Planowana Dostawa',
      actualDelivery: 'Rzeczywista Dostawa'
    }
  },

  // Finance/Spending
  finance: {
    title: 'Panel Finansowy',
    description: 'Śledź przychody, koszty i wyniki finansowe',
    totalRevenue: 'Łączny Przychód',
    totalCosts: 'Łączne Koszty',
    netProfit: 'Zysk Netto',
    avgOrderValue: 'Średnia Wartość Zamówienia',
    fromOrders: 'Z {count} zamówień',
    costBreakdown: 'Zakup + Operacyjne + Praca + Ogólne',
    margin: 'marża',
    perOrderRevenue: 'Przychód na zamówienie',
    revenueVsCosts: {
      title: 'Miesięczne Przychody vs Koszty',
      revenue: 'Przychód',
      costs: 'Łączne Koszty'
    },
    monthlyCostFlow: {
      title: 'Miesięczny Przepływ Kosztów',
      procurement: 'Zakupy',
      operational: 'Operacyjne',
      labor: 'Praca',
      overhead: 'Ogólne'
    },
    categorySpending: {
      title: 'Wydatki według Kategorii',
      ofTotal: 'z łącznej sumy'
    },
    transactions: {
      title: 'Ostatnie Transakcje',
      id: 'ID',
      description: 'Opis',
      vendor: 'Dostawca',
      date: 'Data',
      amount: 'Kwota'
    }
  },

  // Demand Forecast
  demand: {
    title: 'Prognoza Popytu',
    description: 'Analizuj trendy i prognozy popytu',
    increasingDemand: 'Rosnący Popyt',
    stableDemand: 'Stabilny Popyt',
    decreasingDemand: 'Malejący Popyt',
    itemsCount: '{count} pozycji',
    more: 'więcej...',
    demandForecasts: 'Prognozy Popytu',
    table: {
      sku: 'SKU',
      itemName: 'Nazwa Towaru',
      currentDemand: 'Bieżący Popyt',
      forecastedDemand: 'Prognozowany Popyt',
      change: 'Zmiana',
      trend: 'Trend',
      period: 'Okres'
    }
  },

  // Filters
  filters: {
    timePeriod: 'Okres Czasu',
    location: 'Lokalizacja',
    category: 'Kategoria',
    orderStatus: 'Status Zamówienia',
    all: 'Wszystkie',
    allMonths: 'Wszystkie Miesiące'
  },

  // Statuses
  status: {
    delivered: 'Dostarczono',
    shipped: 'Wysłano',
    processing: 'W Realizacji',
    backordered: 'Oczekuje',
    inStock: 'W Magazynie',
    lowStock: 'Niski Stan',
    adequate: 'Wystarczający'
  },

  // Trends
  trends: {
    increasing: 'rosnący',
    stable: 'stabilny',
    decreasing: 'malejący'
  },

  // Priority
  priority: {
    high: 'Wysoki',
    medium: 'Średni',
    low: 'Niski'
  },

  // Categories
  categories: {
    circuitBoards: 'Płyty Drukowane',
    sensors: 'Czujniki',
    actuators: 'Siłowniki',
    controllers: 'Sterowniki',
    powerSupplies: 'Zasilacze'
  },

  // Spending Categories
  spendingCategories: {
    rawMaterials: 'Surowce',
    components: 'Komponenty',
    equipment: 'Sprzęt',
    consumables: 'Materiały Eksploatacyjne'
  },

  // Warehouses
  warehouses: {
    sanFrancisco: 'San Francisco',
    london: 'Londyn',
    tokyo: 'Tokio'
  },

  // Months
  months: {
    jan: 'Sty',
    feb: 'Lut',
    mar: 'Mar',
    apr: 'Kwi',
    may: 'Maj',
    jun: 'Cze',
    jul: 'Lip',
    aug: 'Sie',
    sep: 'Wrz',
    oct: 'Paź',
    nov: 'Lis',
    dec: 'Gru',
    january: 'Styczeń',
    february: 'Luty',
    march: 'Marzec',
    april: 'Kwiecień',
    june: 'Czerwiec',
    july: 'Lipiec',
    august: 'Sierpień',
    september: 'Wrzesień',
    october: 'Październik',
    november: 'Listopad',
    december: 'Grudzień'
  },

  // Profile Menu
  profile: {
    profileDetails: 'Dane Profilu',
    myTasks: 'Moje Zadania',
    logout: 'Wyloguj'
  },

  // Profile Details Modal
  profileDetails: {
    title: 'Dane Profilu',
    email: 'E-mail',
    department: 'Dział',
    location: 'Lokalizacja',
    phone: 'Telefon',
    joinDate: 'Data Dołączenia',
    employeeId: 'ID Pracownika',
    close: 'Zamknij'
  },

  // Tasks Modal
  tasks: {
    title: 'Moje Zadania',
    taskTitle: 'Tytuł Zadania',
    taskTitlePlaceholder: 'Wpisz tytuł zadania...',
    priority: 'Priorytet',
    dueDate: 'Termin',
    addTask: 'Dodaj Zadanie',
    noTasks: 'Brak zadań. Dodaj pierwsze zadanie powyżej!'
  },

  // Language
  language: {
    english: 'Angielski',
    japanese: 'Japoński',
    polish: 'Polski',
    selectLanguage: 'Wybierz Język'
  },

  // Reports
  reports: {
    title: 'Raporty Wydajności',
    description: 'Przeglądaj kwartalne wskaźniki wydajności i miesięczne trendy',
    noData: 'Brak danych dla wybranych filtrów.',
    loadError: 'Nie udało się załadować raportów. Spróbuj ponownie.',
    quarterly: {
      title: 'Wydajność Kwartalna',
      quarter: 'Kwartał',
      totalOrders: 'Łączna Liczba Zamówień',
      totalRevenue: 'Łączny Przychód',
      avgOrderValue: 'Średnia Wartość Zamówienia',
      fulfillmentRate: 'Wskaźnik Realizacji'
    },
    monthly: {
      chartTitle: 'Miesięczny Trend Przychodów',
      analysisTitle: 'Analiza Miesiąc do Miesiąca',
      month: 'Miesiąc',
      orders: 'Zamówienia',
      revenue: 'Przychód',
      change: 'Zmiana',
      growthRate: 'Wskaźnik Wzrostu'
    },
    summary: {
      totalRevenue: 'Łączny Przychód (od początku roku)',
      avgMonthlyRevenue: 'Średni Miesięczny Przychód',
      totalOrders: 'Łączna Liczba Zamówień (od początku roku)',
      bestQuarter: 'Najlepszy Kwartał'
    }
  },

  // Restocking
  restocking: {
    title: 'Uzupełnienie',
    description: 'Rekomendacje zamówień na podstawie poziomów zapasów i popytu',
    budgetLabel: 'Limit Budżetu',
    budgetPlaceholder: 'Podaj budżet (opcjonalnie)',
    applyBudget: 'Zastosuj',
    clearBudget: 'Wyczyść',
    noRecommendations: 'Brak pozycji wymagających uzupełnienia dla wybranych filtrów.',
    summary: {
      itemsToRestock: 'Pozycje do Uzupełnienia',
      totalEstimatedCost: 'Szacowany Łączny Koszt',
      withinBudget: 'W Budżecie',
      budgetRemaining: 'Pozostały Budżet'
    },
    table: {
      sku: 'SKU',
      itemName: 'Nazwa Towaru',
      warehouse: 'Magazyn',
      onHand: 'Stan Magazynowy',
      reorderPoint: 'Punkt Ponownego Zamówienia',
      shortfall: 'Niedobór',
      recommendedQty: 'Zalecana Ilość',
      unitCost: 'Koszt Jednostkowy',
      estimatedCost: 'Szacowany Koszt',
      demandTrend: 'Trend Popytu'
    }
  },

  // Common
  common: {
    loading: 'Ładowanie...',
    error: 'Błąd',
    noData: 'Brak dostępnych danych',
    viewDetails: 'Zobacz Szczegóły',
    close: 'Zamknij',
    save: 'Zapisz',
    cancel: 'Anuluj',
    search: 'Szukaj',
    filter: 'Filtruj',
    export: 'Eksportuj',
    items: 'pozycji'
  },

  // Product Names (kept in original — brand names)
  productNames: {},

  // Customer Names (kept in original — proper nouns)
  customerNames: {}
}

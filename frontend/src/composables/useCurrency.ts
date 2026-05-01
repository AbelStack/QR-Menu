import { ref, computed } from 'vue';

const exchangeRates: Record<string, number> = {
  ETB: 1,
  USD: 0.00645,  // 1 USD = 155 ETB
  EUR: 0.00556,  // 1 EUR = 180 ETB
  GBP: 0.00488,  // 1 GBP = 205 ETB
};

const currencySymbols: Record<string, string> = {
  ETB: 'ETB',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const currentCurr = ref(localStorage.getItem('currency') || 'ETB');

export function useCurrency() {
  const convertPrice = (price: number | null): string => {
    if (!price) return '—';
    
    const rate = exchangeRates[currentCurr.value] || 1;
    const converted = price * rate;
    
    return converted.toFixed(2);
  };

  const setCurrency = (currency: string) => {
    currentCurr.value = currency;
    localStorage.setItem('currency', currency);
  };

  const currentCurrency = computed(() => currentCurr.value);
  
  const currencySymbol = computed(() => currencySymbols[currentCurr.value] || 'ETB');

  return {
    convertPrice,
    setCurrency,
    currentCurrency,
    currencySymbol,
  };
}

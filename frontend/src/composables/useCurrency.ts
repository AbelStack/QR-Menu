import { ref, computed } from 'vue';

const exchangeRates: Record<string, number> = {
  ETB: 1,
  USD: 0.018,
  EUR: 0.017,
  GBP: 0.014,
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

  return {
    convertPrice,
    setCurrency,
    currentCurrency,
  };
}

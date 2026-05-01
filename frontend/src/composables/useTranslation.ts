import { ref, computed } from 'vue';

const translations: Record<string, Record<string, string>> = {
  EN: {
    heroTitle1: 'Your Table,',
    heroTitle2: 'Your Taste',
    searchPlaceholder: 'Search Foods...',
    menu: 'Menu',
    all: 'All',
    food: 'Food',
    drinks: 'Drinks',
    dailySpecials: 'Daily Specials',
    special: 'Special',
    filters: 'Filters',
    reset: 'Reset',
    sortBy: 'SORT BY',
    recommended: 'Recommended',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    maxPrice: 'MAX PRICE',
    showResults: 'Show Results',
    ingredients: 'Ingredients',
    freshIngredients: 'Fresh ingredients',
    favorites: 'Favorite',
    noFavorites: 'No favorites yet',
    startAdding: 'Start adding items to your favorites!',
    shareFeedback: 'Share Your Feedback',
    helpImprove: 'Help us improve our services',
    category: 'CATEGORY',
    selectCategory: 'Select a category',
    foodQuality: 'Food Quality',
    service: 'Service',
    ambiance: 'Ambiance',
    cleanliness: 'Cleanliness',
    other: 'Other',
    overallRating: 'OVERALL RATING',
    yourFeedback: 'YOUR FEEDBACK',
    shareFeedbackPlaceholder: 'Share your experience with us...',
    submitFeedback: 'Submit Feedback',
    submitting: 'Submitting...',
    thankYou: 'Thank you for your feedback!',
    preferences: 'PREFERENCES',
    darkMode: 'Dark Mode',
    language: 'Language',
    currency: 'Currency',
    aboutUs: 'About Us',
    selectLanguage: 'Select Language',
    selectCurrency: 'Select Currency',
  },
  AM: {
    heroTitle1: 'የእርስዎ ጠረጴዛ,',
    heroTitle2: 'የእርስዎ ጣዕም',
    searchPlaceholder: 'ምግብ ይፈልጉ...',
    menu: 'ዝርዝር',
    all: 'ሁሉም',
    food: 'ምግብ',
    drinks: 'መጠጦች',
    dailySpecials: 'የዕለት ልዩ',
    special: 'ልዩ',
    filters: 'ማጣሪያዎች',
    reset: 'ዳግም አስጀምር',
    sortBy: 'ደርድር በ',
    recommended: 'የሚመከር',
    priceLowHigh: 'ዋጋ: ዝቅተኛ ወደ ከፍተኛ',
    priceHighLow: 'ዋጋ: ከፍተኛ ወደ ዝቅተኛ',
    maxPrice: 'ከፍተኛ ዋጋ',
    showResults: 'ውጤቶችን አሳይ',
    ingredients: 'ንጥረ ነገሮች',
    freshIngredients: 'ትኩስ ንጥረ ነገሮች',
    favorites: 'ተወዳጅ',
    noFavorites: 'ገና ምንም ተወዳጆች የሉም',
    startAdding: 'ወደ ተወዳጆችዎ ንጥሎች ማከል ይጀምሩ!',
    shareFeedback: 'አስተያየትዎን ያጋሩ',
    helpImprove: 'አገልግሎታችንን ለማሻሻል ይርዱን',
    category: 'ምድብ',
    selectCategory: 'ምድብ ይምረጡ',
    foodQuality: 'የምግብ ጥራት',
    service: 'አገልግሎት',
    ambiance: 'ሁኔታ',
    cleanliness: 'ንፅህና',
    other: 'ሌላ',
    overallRating: 'አጠቃላይ ደረጃ',
    yourFeedback: 'የእርስዎ አስተያየት',
    shareFeedbackPlaceholder: 'ልምድዎን ከእኛ ጋር ያጋሩ...',
    submitFeedback: 'አስተያየት ያስገቡ',
    submitting: 'በማስገባት ላይ...',
    thankYou: 'ለአስተያየትዎ እናመሰግናለን!',
    preferences: 'ምርጫዎች',
    darkMode: 'ቲም',
    language: 'ቋንቋ',
    currency: 'ምንዛሪ',
    aboutUs: 'ስለ እኛ',
    selectLanguage: 'ቋንቋ ይምረጡ',
    selectCurrency: 'ምንዛሪ ይምረጡ',
  },
};

const currentLang = ref(localStorage.getItem('language') || 'EN');

export function useTranslation() {
  const t = (key: string): string => {
    const currentTranslations = translations[currentLang.value];
    const fallbackTranslations = translations['EN'];
    return currentTranslations?.[key] || fallbackTranslations?.[key] || key;
  };

  const setLanguage = (lang: string) => {
    currentLang.value = lang;
    localStorage.setItem('language', lang);
  };

  const currentLanguage = computed(() => currentLang.value);

  return {
    t,
    setLanguage,
    currentLanguage,
  };
}

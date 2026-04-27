import { ref, watch, onMounted } from 'vue';

const isDarkMode = ref(true);

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('darkMode');
    isDarkMode.value = savedTheme !== 'false'; // Default to dark mode
    applyTheme();
  };

  const applyTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value.toString());
    applyTheme();
  };

  const setTheme = (dark: boolean) => {
    isDarkMode.value = dark;
    localStorage.setItem('darkMode', dark.toString());
    applyTheme();
  };

  return {
    isDarkMode,
    toggleTheme,
    setTheme,
    initTheme,
  };
}

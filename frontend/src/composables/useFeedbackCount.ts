import { ref, onMounted, onUnmounted } from 'vue';
import api from '@/services/api';

const unreadCount = ref(0);
let intervalId: number | null = null;

export function useFeedbackCount() {
  const loadFeedbackCount = async () => {
    try {
      const response = await api.get('/admin/feedback/statistics');
      unreadCount.value = response.data.data.unread;
    } catch (err) {
      console.error('Failed to load feedback count:', err);
    }
  };

  const startPolling = () => {
    loadFeedbackCount();
    // Refresh count every 30 seconds
    intervalId = window.setInterval(loadFeedbackCount, 30000);
  };

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  onMounted(() => {
    startPolling();
  });

  onUnmounted(() => {
    stopPolling();
  });

  return {
    unreadCount,
    loadFeedbackCount,
  };
}

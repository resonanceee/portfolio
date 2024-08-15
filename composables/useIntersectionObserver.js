import { onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(callback, options = {}) {
  let observer;

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry);
      });
    }, options);

    const elements = document.querySelectorAll('.projects > *');
    elements.forEach(element => observer.observe(element));
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
}
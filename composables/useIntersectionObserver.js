import { onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(callback, options = {}, selector = '.projects > *') {
  let observer;

  onMounted(() => {
    const elements = document.querySelectorAll(selector);

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('in-view'));
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry);
      });
    }, options);

    elements.forEach(element => observer.observe(element));
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
}
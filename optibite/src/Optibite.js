class Optibite {
  constructor(options = {}) {
    this.settings = {
      lazyLoadImages: true,
      imagePlaceholder: options.imagePlaceholder || '/loader.svg',
      enableCaching: true,
      cacheName: 'optibite-cache-v1',
      ...options,
    };

    if (!options.manualInit) {
      this.init();
    }
  }

  init() {
    if (this.settings.lazyLoadImages) {
      this.optimizeImages();
    }
    if (this.settings.enableCaching) {
      this.registerServiceWorker();
    }
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.dataset.src) {
        img.dataset.src = img.src;
        img.src = this.settings.imagePlaceholder;
        img.loading = 'lazy';
        img.classList.add('lazy-load');
      }
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.remove('lazy-load');
          obs.unobserve(img);
        }
      });
    });

    document.querySelectorAll('.lazy-load').forEach(img => observer.observe(img));
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/optibite-sw.js')
        .then(reg => console.log('[Optibite] SW registered:', reg.scope))
        .catch(err => console.error('[Optibite] SW registration failed:', err));
    }
  }
}

window.Optibite = new Optibite();

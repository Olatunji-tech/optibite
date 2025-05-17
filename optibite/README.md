# Optibite.js

A lightweight JavaScript library to optimize website performance by:

- Lazy-loading images with placeholders
- Caching CSS, JS, and fonts via Service Worker

## Features

- 🖼 Lazy-loaded images with placeholders
- ⚡ Simple asset caching via Service Worker
- 🚀 Plug-and-play with zero config

## Usage

Include in your HTML:

```html
<script src="/src/site-optimizer.js"></script>

OR

<script>
  new SiteOptimizer({
    imagePlaceholder: '/loader.svg',
    enableCaching: true,
    manualInit: true
  }).init();
</script>

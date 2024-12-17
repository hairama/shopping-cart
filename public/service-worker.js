// public/service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/', // Cache the home page
          '/index.html',
          '/index.css', // Include other assets like CSS, JS, images
          '/app.jsx',
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
  });
  
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    // Cache assets during installation
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/index.css',
                '/app.tsx'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Serve cached content when offline
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

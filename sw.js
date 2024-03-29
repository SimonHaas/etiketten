const staticCacheName = 'site-static-v2';
const assets = [
    '/',
    '/index.html',
    'https://code.jquery.com/jquery-3.5.0.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
]

self.addEventListener('install', event => {
    self.skipWaiting(); // bad practice, but works for me
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key)));
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResult => {
            return cacheResult || fetch(event.request);
        })
    );
});
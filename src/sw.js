const staticCacheName = 'site-static-v3';
const assets = [
    '/',
    '/index.html',
    '/thirdparty/jquery.min.js',
    '/thirdparty/jspdf.min.js',
    '/thirdparty/bootstrap.min.css'
]

//TODO caching so, dass trotzdem nach neuen Versionen geschaut wird

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
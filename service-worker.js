// service-worker.js
importScripts('./version.js');

const CACHE_NAME = `enterprise-cache-v${self.APP_VERSION || '0.0.0'}`; // Zawsze zmieniaj tę wersję po dużych aktualizacjach!
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './version.js',
  './manifest.json',
  './privacy.html',
  // Zasoby zewnętrzne, które mogą powodować problemy
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop',
  // Ikony PWA
  './logo/icon-192.png',
  './logo/icon-512.png'
];

// 1. Instalacja Service Workera i cache'owanie zasobów
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        const cachePromises = urlsToCache.map(urlToCache => {
          const request = new Request(urlToCache, { mode: 'no-cors' });
          return fetch(request)
            .then(response => cache.put(request, response))
            .catch(() => {});
        });

        return Promise.all(cachePromises);
      })
  );
});

// 2. Aktywacja Service Workera i czyszczenie starych cache'y
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      ).then(() => self.clients.claim());
    })
  );
});

// Pozwól aplikacji wymusić aktywację nowej wersji
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 3. Przechwytywanie żądań (HTML: network-first, zasoby: stale-while-revalidate)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const isNavigate = event.request.mode === 'navigate';
  const acceptHeader = event.request.headers.get('accept') || '';
  const isHtml = isNavigate || acceptHeader.includes('text/html');

  event.respondWith((async () => {
    if (isHtml) {
      try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (err) {
        return caches.match(event.request);
      }
    }

    const cachedResponse = await caches.match(event.request);
    const fetchPromise = fetch(event.request)
      .then(async networkResponse => {
        const url = new URL(event.request.url);
        if (url.origin === self.location.origin) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      })
      .catch(() => null);

    return cachedResponse || fetchPromise || Response.error();
  })());
});

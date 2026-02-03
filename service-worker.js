// service-worker.js

const CACHE_NAME = 'enterprise-cache-v1.7.0'; // Zawsze zmieniaj tę wersję po dużych aktualizacjach!
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './portfolio-logos.js',
  './manifest.json',
  './privacy.html',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop',
  'https://via.placeholder.com/64x64/10b981/ffffff.png?text=E'
];

// 1. Instalacja Service Workera i cache'owanie zasobów
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache opened and files cached.');
        return cache.addAll(urlsToCache);
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
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Przechwytywanie żądań (strategia "Cache, a potem sieć")
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
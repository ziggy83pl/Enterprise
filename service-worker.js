// service-worker.js

const CACHE_NAME = 'enterprise-cache-v1.7.4'; // Zawsze zmieniaj tę wersję po dużych aktualizacjach!
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './portfolio-logos.js',
  './manifest.json',
  './privacy.html',
  // Zasoby zewnętrzne, które mogą powodować problemy
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop',
  // Ikony PWA
  'https://via.placeholder.com/64x64/10b981/ffffff.png?text=E',
  'https://via.placeholder.com/192x192/10b981/ffffff.png?text=Enterprise',
  'https://via.placeholder.com/512x512/10b981/ffffff.png?text=Enterprise'
];

// 1. Instalacja Service Workera i cache'owanie zasobów
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Otwarto cache. Próba zapisania zasobów.');
        // Tworzymy tablicę obietnic (promises) dla każdego zasobu
        const cachePromises = urlsToCache.map(urlToCache => {
          // Dla zasobów z innych domen używamy trybu 'no-cors', aby uniknąć błędów
          const request = new Request(urlToCache, { mode: 'no-cors' });
          return fetch(request)
            .then(response => cache.put(request, response))
            .catch(err => {
              console.warn(`Service Worker: Nie udało się zapisać w cache pliku: ${urlToCache}`, err);
            });
        });

        // Czekamy, aż wszystkie (udane) operacje zapisu się zakończą
        return Promise.all(cachePromises)
          .then(() => {
            console.log('Service Worker: Zakończono próbę zapisu zasobów.');
          });
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
        // Jeśli zasób jest w cache, zwróć go. W przeciwnym razie, pobierz z sieci.
        return response || fetch(event.request);
      })
  );
});
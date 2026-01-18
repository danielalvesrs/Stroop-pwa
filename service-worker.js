const CACHE_NAME = 'stroop-pwa-v13'; // Incrementado para forçar atualização
const INITIAL_CACHE = [
  './',
  './index.html',
  './stroop.html',
  './config.html',
  './offline.html',
  './privacy.html',
  './css/intro.css',
  './css/stroop.css',
  './css/config.css',
  './js/common.js',
  './js/level1.js',
  './js/level2.js',
  './js/level3.js',
  './js/level4.js',
  './js/config.js',
  './error.mp3',
  './error_sound.mp3',
  './success_sound.mp3',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './icons/icon-512x512-maskable.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando arquivos iniciais');
      return cache.addAll(INITIAL_CACHE);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;

  // Estratégia Network First para navegação (HTML) para garantir frescor
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match('./offline.html');
          });
        })
    );
    return;
  }

  // Estratégia Cache First para outros assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // Fallback para imagens se necessário, ou apenas falha silenciosa
      return null;
    })
  );
});


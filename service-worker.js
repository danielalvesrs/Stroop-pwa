const CACHE_NAME = 'stroop-pwa-v4';
const INITIAL_CACHE = [
  './',
  './index.html',
  './stroop.html',
  './config.html',
  './offline.html',
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
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
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

// Interceptação de requisições (Cache First, fallback Network)
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam http/https
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Retorna do cache
      }
      return fetch(event.request).then((networkResponse) => {
        return networkResponse;
      }).catch((err) => {
        console.log('[Service Worker] Erro na requisição:', err);
        // Se a requisição falhar e for uma navegação HTML, retorna a página offline
        if (event.request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
        return null;
      });
    })
  );
});

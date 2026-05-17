// Service worker: cache-first for app shell, offline support.
const CACHE = 'joyvet-v2-1';
const SHELL = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/components.css',
  '/css/print.css',
  '/js/app.js',
  '/js/router.js',
  '/js/store.js',
  '/js/schema.js',
  '/js/state.js',
  '/js/engine/diagnose.js',
  '/js/engine/dosing.js',
  '/js/data/kb-conditions.js',
  '/js/data/kb-drugs.js',
  '/js/data/kb-vitals.js',
  '/js/data/kb-wellness.js',
  '/js/components/form-field.js',
  '/js/components/accordion.js',
  '/js/components/modal.js',
  '/js/views/dashboard.js',
  '/js/views/owners.js',
  '/js/views/patients.js',
  '/js/views/visit-diagnostic.js',
  '/js/views/visit-wellness.js',
  '/js/views/visit-view.js',
  '/js/views/search.js',
  '/js/views/settings.js',
  '/assets/logo.png',
  '/manifest.webmanifest',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only handle same-origin GET requests.
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      });
    })
  );
});

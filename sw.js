const cacheName = 'webgbcam-v3.3'

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(cacheName).then(function(cache) {
     return cache.addAll([
      '.',
      'index.html',
      'style.css',
      'app.js',
      'bg.png',
      'mac-frame.png',
      'ui-capture.png',
      'ui-settings.png',
      'ui-main.png',
      'ui-hidden.png',
      'ui-timer.png',
      'ui-record.png',
      'loading.gif',
      'gifjs/gif.js',
      'gifjs/gif.worker.js'
     ]);
   })
 );
});

// this is supposed to invalidate old caches, i think. i don't know. stackoverflow
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
	// Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(cacheName).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
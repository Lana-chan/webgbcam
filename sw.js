const cacheName = 'webgbcam-v4.2'

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  caches.open(cacheName).then(function(cache) {
		return cache.addAll([
			'/',
			'/index.html',
			'/style.css',
			'/app.js',
			'/ui/bg.png',
			'/ui/mac-frame.png',
			'/ui/ui-capture.png',
			'/ui/ui-settings.png',
			'/ui/ui-main.png',
			'/ui/ui-hidden.png',
			'/ui/ui-timer.png',
			'/ui/ui-record.png',
			'/ui/loading.gif',
			'/gifjs/gif.js',
			'/gifjs/gif.worker.js'
		]);
	});
});

// Cache lookup and fetch the request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        //Clone the response before putting into cache so that response to browser and response to cache happens in two difference streams
        var responseForCache = response.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseForCache);
        });
        return response;
      });
    })
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key != cacheName) {
					return caches.delete(key);
				}
			}));
		})
  ).then(self.clients.claim());
});
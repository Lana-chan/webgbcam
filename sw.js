const cacheName = 'webgbcam-v4.0'

self.addEventListener('install', function(e) {
e.waitUntil(
	caches.open(cacheName).then(function(cache) {
		return cache.addAll([
			'.',
			'index.html',
			'style.css',
			'app.js',
			'ui/bg.png',
			'ui/mac-frame.png',
			'ui/ui-capture.png',
			'ui/ui-settings.png',
			'ui/ui-main.png',
			'ui/ui-hidden.png',
			'ui/ui-timer.png',
			'ui/ui-record.png',
			'ui/loading.gif',
			'gifjs/gif.js',
			'gifjs/gif.worker.js'
		]);
	})
);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key != cacheName) {
          return caches.delete(key);
        }
      }));
		})
	).then(function () {
		return self.clients.claim();
	});
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
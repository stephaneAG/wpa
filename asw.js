// R: this file is needed to allow offline access to the WPA
// R: the current file reads the javascript events & executes a corresponding action

// -- Install Evt: allows to put in cache all the static pages & content --
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('apwa').then(cache => {
      return cache.addAll([
        '/',
        '/asw.js',
        '/index.html',
        //'/web-app.png', // just in case its presence in the manifest doesn't do the trick
        //'/planets',
        //'/bundle.js',
        //'/index.css',
        //'/cat.png',
        //'/duck.png',
        //'/donut.png',
        //'/racoon.png',
      ])
      .then(() => self.skipWaiting());
    })
  )
});

// -- Fetch Evt: allows to handle server calls ( here, we take each request & put it in cache ) --
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

# wpa
quick test for an Android-served wip wpa ( to test offline autolaunch &amp; bluetooth access later )

## Reminder
Since files have to be changed to accomodate for the hosting url ( as serving from github pages gives us a 'start url' of https://stephaneag.github.io/wpa/ for the current repo ), remember to verify the following mods in 'index.html', 'manifest.json' & 'asw.js'

Also, to be able to get the WPA appearing on Android devices as close as 'native' apps as can be, the content has to be served over https ( hence the github page hosting ), otherwise the WPA 'll be running ok offline ( even after reboots ) but won't be able to be auto run on device boot

### 'index.html'
```
<link rel="manifest" href="./manifest.json">
<!-- ... -->
// ==== enable Service Worker for Offline app ====

    if('serviceWorker' in navigator) {
      navigator.serviceWorker
      //.register('/asw.js') // served locally ( not https )
      .register('/wpa/asw.js') // served over github pages ( https )
      //.register('/wpa/asw.js', {scope: '/wpa/'}) // for non-root path ? ..
      //.register('/asw.js', {scope: '/wpa/'}) // for non-root path ? ..
      .then(function() { console.log("Service Worker Registered"); });
    }
```

### 'manifest.json'
```
{
  "name": "stag tefTestWPApp",
  "short_name": "tefTestWPApp",
  "description": "Poissons Enigma",
  "lang": "en-GB",
  "scope": "/wpa/",
  "start_url": "/wpa/",
  "display": "fullscreen",
  "orientation": "portrait",
  "background_color": "#BADA55",
  "theme_color": "#2F3BA2",
  "version": "0.1",
  "icons": [{
      "src": "/wpa/web-app.png",
      "sizes": "192x192",
      "type": "image/png"
  }]
}

```

### 'asw.js'
```
// R: this file is needed to allow offline access to the WPA
// R: the current file reads the javascript events & executes a corresponding action

// -- Install Evt: allows to put in cache all the static pages & content --
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('apwa').then(cache => {
      return cache.addAll([
        //'/',
        //'/asw.js',
        //'/index.html',

        '/wpa/',
        '/wpa/asw.js',
        '/wpa/index.html',

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

```

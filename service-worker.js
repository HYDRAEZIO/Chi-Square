
const RUNTIME = 'runtime';
const PRECACHE = 'precache-v2021-0426-111642'
      

const PRECACHE_URLS = [
  'data-3x3.csv',
  'data-3x3.sav',
  'data-activity.csv',
  'data-activity.sav',
  'data-activity2.csv',
  'data-anova.csv',
  'data-buy.csv',
  'data-entrance.csv',
  'data-entrance_1.csv',
  'data-entrance_2.csv',
  'data-example.sav',
  'data-friedman-error.csv',
  'data-friedman.csv',
  'data-friedman2.csv',
  'data-pressure.csv',
  'data-pressure.sav',
  'data-read.csv',
  'data-simpsons-paradox-result.docx',
  'data-simpsons-paradox.csv',
  'data-simpsons-paradox.sav',
  'data-tea.sav',
  'data-wiki.csv',
  'data-wiki2.csv',
  'data.csv',
  'icon.png',
  'index.html',
  'manifest.json',
  'Chi-square turn times allocation table - Google Trial balance.url',
  'assets/favicon/generator/android-icon-144x144.png',
  'assets/favicon/generator/android-icon-192x192.png',
  'assets/favicon/generator/android-icon-36x36.png',
  'assets/favicon/generator/android-icon-48x48.png',
  'assets/favicon/generator/android-icon-72x72.png',
  'assets/favicon/generator/android-icon-96x96.png',
  'assets/favicon/generator/apple-icon-114x114.png',
  'assets/favicon/generator/apple-icon-120x120.png',
  'assets/favicon/generator/apple-icon-144x144.png',
  'assets/favicon/generator/apple-icon-152x152.png',
  'assets/favicon/generator/apple-icon-180x180.png',
  'assets/favicon/generator/apple-icon-57x57.png',
  'assets/favicon/generator/apple-icon-60x60.png',
  'assets/favicon/generator/apple-icon-72x72.png',
  'assets/favicon/generator/apple-icon-76x76.png',
  'assets/favicon/generator/apple-icon-precomposed.png',
  'assets/favicon/generator/apple-icon.png',
  'assets/favicon/generator/favicon-16x16.png',
  'assets/favicon/generator/favicon-32x32.png',
  'assets/favicon/generator/favicon-96x96.png',
  'assets/favicon/generator/favicon.ico',
  'assets/favicon/generator/manifest.json',
  'assets/favicon/generator/ms-icon-144x144.png',
  'assets/favicon/generator/ms-icon-150x150.png',
  'assets/favicon/generator/ms-icon-310x310.png',
  'assets/favicon/generator/ms-icon-70x70.png',
  'scripts/contigency-table.js',
  'scripts/critz.js',
  'scripts/data-persist-helper.js',
  'scripts/drawPlainTable.js',
  'scripts/script.js',
  'scripts/service-worker-loader.js',
  'scripts/statistics-distributions.js',
  'styles/style.css',
  'vendors/copy-helper.js',
  'vendors/puli-util.clipboard.js',
  'vendors/jquery/jquery.min.js',
  'vendors/jquery-ui/jquery-ui.js',
  'vendors/semantic-ui/semantic.min.css',
  'vendors/semantic-ui/semantic.min.js',
  'vendors/semantic-ui/themes/default/assets/fonts/icons.svg',
  'vendors/semantic-ui/themes/default/assets/fonts/icons.ttf',
  'vendors/semantic-ui/themes/default/assets/fonts/icons.woff',
  'vendors/semantic-ui/themes/default/assets/fonts/icons.woff2'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});


self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
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
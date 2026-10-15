const CACHE_NAME = 'reader-cache-v1';
const urlsToCache = [
  './index.html',
  './jszip.min.js',
  './epub.min.js'
];

// 安裝時，把這三個檔案抓進手機快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 啟動時，如果有網路就試著抓新的，沒網路或飛航模式就直接用快取的！
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
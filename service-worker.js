const CACHE_NAME = "grocery-app-v1";
const urlsToCache = [
  "/grocery-app/",
  "/grocery-app/index.html",
  "/grocery-app/style.css",
  "/grocery-app/script.js",
  "/grocery-app/pivot_data.csv"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
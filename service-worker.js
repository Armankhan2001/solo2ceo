const cacheName = "solo2ceo-cache-v1";
const assetsToCache = [
  "/",
  "/index.html",
  "/templates/about.html",
  "/services.html",
  "/templates/domain.html",
  "/Advertisement/apply.html",
  "/image/Solo2ceologo.png",
  "/index.js",  // your JS file
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
];

// Install Event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

// Activate Event
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event - Serve cached content first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static")
            .then(cache => {
                return cache.addAll([
                    "./",
                    "./src/style.css",
                    "./assets/img/logo192.png",
                    "./assets/img/notification.png",
                    "./assets/img/background/background.webp",
                    "./assets/img/smiley/negative.png",
                    "./assets/img/smiley/neutral.png",
                    "./assets/img/smiley/positive.png"
                ])
            })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                return res || fetch(e.request);
            })
    );
});
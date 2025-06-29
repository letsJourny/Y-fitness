const CACHE_NAME = "yousef-recharge-v1";
const STATIC_CACHE_NAME = "yousef-recharge-static-v1";
const DYNAMIC_CACHE_NAME = "yousef-recharge-dynamic-v1";

// Files to cache for offline functionality
const STATIC_FILES = [
  "/",
  "/dashboard",
  "/registration",
  "/plans",
  "/progress",
  "/subscription",
  "/manifest.json",
  // Add your CSS and JS bundles here (they'll be generated during build)
];

// API endpoints to cache
const API_CACHE_URLS = ["/api/ping", "/api/demo"];

// Install event - cache static files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static files");
        return cache.addAll(STATIC_FILES);
      })
      .catch((error) => {
        console.error("Service Worker: Failed to cache static files", error);
      }),
  );

  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== STATIC_CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
            console.log("Service Worker: Deleting old cache", cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );

  // Claim control of all clients
  self.clients.claim();
});

// Fetch event - serve cached files when offline
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests (pages)
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Cache successful page responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // If offline and page not cached, return offline page
            return (
              caches.match("/") ||
              new Response(
                "<html><body><h1>Offline</h1><p>Please check your internet connection.</p></body></html>",
                { headers: { "Content-Type": "text/html" } },
              )
            );
          });
      }),
    );
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      // Try network first for API calls
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (
            response.status === 200 &&
            API_CACHE_URLS.includes(url.pathname)
          ) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache for API calls
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // Return offline response for API calls
            return new Response(
              JSON.stringify({
                error: "offline",
                message:
                  "You are currently offline. Please check your connection.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          });
        }),
    );
    return;
  }

  // Handle static assets (CSS, JS, images)
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Cache static assets
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Return placeholder for failed assets
            if (request.destination === "image") {
              return new Response(
                '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Image unavailable</text></svg>',
                { headers: { "Content-Type": "image/svg+xml" } },
              );
            }
            return new Response("", { status: 404 });
          });
      }),
    );
    return;
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(request);
      }),
  );
});

// Background sync for form submissions when back online
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Service Worker: Background sync triggered");
    event.waitUntil(
      // Process any queued form submissions
      processQueuedRequests(),
    );
  }
});

// Push notification handler
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body || "You have a new notification",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      image: data.image,
      data: data.data,
      actions: [
        {
          action: "open",
          title: "Open App",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
      requireInteraction: false,
      renotify: true,
      tag: "fitness-notification",
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || "Yousef Recharge",
        options,
      ),
    );
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Helper function to process queued requests
async function processQueuedRequests() {
  // Implementation for processing offline form submissions
  // This would integrate with IndexedDB to store and replay requests
  console.log("Processing queued requests...");
}

// Message handler for communication with main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

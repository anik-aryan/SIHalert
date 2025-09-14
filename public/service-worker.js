self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Push event listener
self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  const data = event.data ? event.data.json() : {};
  const title = data.title || "⚠️ Alert!";
  const message = data.message || "Something happened!";

  const options = {
    body: message,
    icon: "/logo192.png",
    vibrate: [500, 200, 500],
    data: { dateOfArrival: Date.now() },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        clientList[0].postMessage({ type: "ALERT" });
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});

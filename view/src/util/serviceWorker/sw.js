self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('message', event => {
    var promiss = self.clients.matchAll().then(function (clientList) {
        var sendId = event.source ? event.source.sendId : 'unknown'
        clientList.forEach(function (client) {
            if (client.id != sendId) {
                client.postMessage({
                    client: sendId,
                    message: event.data,
                });
            }
        })
    })

    e.waitUntil(promiss)
})
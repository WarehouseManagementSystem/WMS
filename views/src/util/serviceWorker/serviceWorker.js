if ('serviceWorker' in navigator && navigator.serviceWorker) {

    // 解决 navigator.serviceWorker.controller 为空的问题
    // https://github.com/w3c/ServiceWorker/issues/799
    // navigator.serviceWorker.register('sw.js');
    // 仅在生产环境中部署 serviceWorker
    if (process.env.NODE_ENV === 'production') {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js');
        });
    }

    navigator.serviceWorker.ready.then(() => {
        // I thought the page would be controlled at this point, thanks to clients.claim()
        // console.log('.ready resolved, and navigator.serviceWorker.controller is', navigator.serviceWorker.controller);
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // console.log('Okay, now things are under control. navigator.serviceWorker.controller is', navigator.serviceWorker.controller);
        });
    });

    navigator.serviceWorker.addEventListener('message', function (e) {
        // Service Worker 发送信息到主页面
        return e.data
    })
} else {
    // console.log('Service Worker is not supported');
}

// function postMessage(msg) {
//     // 主页面发送信息到 Service Worker
//     navigator.serviceWorker.controller.postMessage(msg);
// };

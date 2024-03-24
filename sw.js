const staticCacheKey = 'cache-v1'
const dynamicCacheKey = 'dCache-v1'

const cacheResources = [
    './index.html',
    './offline.html',
    './style.css',
    './index.js',
    './img/logo.svg',
]

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(staticCacheKey).then((cache) => cache.addAll(cacheResources))
    )
})

self.addEventListener('activate', async (event) => {
})

const cacheFirst = async (request) => {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}
const networkFirst = async (request) => {
    const cache = await caches.open(dynamicCacheKey)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await caches.match(request)
        return cached ?? await caches.match('./offline.html')
    }
}

self.addEventListener('fetch', (event) => {
    const {request} = event

    const url = new URL(request.url)

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})
const V='ajr-v3',IMG='ajr-img';
const CORE=['./','index.html','book.json','manifest.webmanifest','icon-192.png','fonts/Amiri-Regular.ttf','fonts/Amiri-Bold.ttf','fonts/AmiriQuran-Regular.ttf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==IMG).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin&&/\/p\/\d+\.png$/.test(u.pathname)){e.respondWith(caches.open(IMG).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));return}
 if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.host)){
  e.respondWith(fetch(r).then(n=>{if(n.ok){const cl=n.clone();caches.open(V).then(c=>c.put(r,cl))}return n}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))}});

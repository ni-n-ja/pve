navigator.serviceWorker.getRegistration('service-worker.js', {
    scope: './'
  }).then(function (registration) {
    return registration.update();
  })
  .then(function () {
    registration.addEventListener('updatefound', function () {
      console.assert(registration.installing);
    });
  })
  .catch(function (e) {});

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});



var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          console.log(xhr.responseText);
      } else if (xhr.readyState == 4) {
          console.log(xhr.status, xhr.statusText);
          xhr.abort();
      }
  };

  xhr.open('GET', 'service-worker.js', true);
  xhr.setRequestHeader('Content-Type', 'application/json', "charset", "utf-8");
  xhr.send();

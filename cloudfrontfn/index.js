function handler(event) {
  let request = event.request;
  const uri = request.uri;
  const headers = request.headers;

  const regex_pageb = /^https:\/\/.*\/pageb/;

  if (headers.referer && regex_pageb.test(headers.referer.value)) {
    if (!request.uri.startsWith("/pageb")) {
      request.uri = "/pageb" + request.uri;
    }
  }

  return request;
}

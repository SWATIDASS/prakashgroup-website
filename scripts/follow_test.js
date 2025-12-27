const { http } = require('follow-redirects');
http.get('http://example.com', (res) => {
  console.log('status', res.statusCode);
  res.resume();
});

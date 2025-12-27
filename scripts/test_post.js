import http from 'http';

const data = JSON.stringify({ name: 'DeprecationTest', phone: '000', message: 'please trigger' });

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
  });
});

req.on('error', (e) => console.error('REQUEST ERR', e));
req.write(data);
req.end();

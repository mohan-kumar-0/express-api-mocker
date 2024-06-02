const { ApiMocker, generateTLSCertificates } = require('./index');
const fs = require('fs');

const mocker = new ApiMocker();

mocker.addCustomHeaders({
  'X-Custom-Header': 'CustomValue',
  'X-Powered-By': 'Express-Api-Mocker'
});

mocker.enableCORS({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

mocker.mockGet('/api/user', { id: 1, name: 'John Doe' });
mocker.mockPost('/api/login', { success: true, token: 'abc123' });
mocker.mockPut('/api/user/1', { success: true });
mocker.mockDelete('/api/user/1', { success: true });

generateTLSCertificates('./cert.pem', './key.pem');

const tlsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

mocker.start(3000, {
  tlsEnabled: true,
  tlsOptions: tlsOptions
});

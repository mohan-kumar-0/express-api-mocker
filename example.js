const ApiMocker = require('./index');
const { generateTLSCertificates } = require('./tlsUtils');
const fs = require('fs');

const mocker = new ApiMocker();

mocker.mockGet('/api/user', { id: 1, name: 'John Doe' });
mocker.mockPost('/api/login', { success: true, token: 'abc123' });

try {
  generateTLSCertificates('./cert.pem', './key.pem');
  const tlsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  };

  mocker.start(3000, {
    tlsEnabled: true,
    tlsOptions: tlsOptions
  });
} catch (error) {
  console.error('Failed to start the server due to TLS certificate generation error.');
}

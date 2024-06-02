# Express API Mocker

Express API Mocker is a simple npm package that allows you to mock APIs using Express and TLS.

## Installation

You can install the package via npm:

## Bash
npm install express-api-mocker

## Features

- Mock GET, POST, PUT, and DELETE endpoints
- Add custom headers to responses
- Enable CORS with customizable options
- TLS/SSL support for secure connections
- Easy to set up and configure

## API

### `addCustomHeaders(headers)`

Adds custom headers to all responses.

- `headers` (Object): An object representing custom headers to be added.

### `enableCORS(options)`

Enables CORS with the specified options.

- `options` (Object): CORS configuration options.

### `mockGet(endpoint, response)`

Mocks a GET endpoint.

- `endpoint` (String): The endpoint to mock.
- `response` (Object): The response to return for the mocked endpoint.

### `mockPost(endpoint, response)`

Mocks a POST endpoint.

- `endpoint` (String): The endpoint to mock.
- `response` (Object): The response to return for the mocked endpoint.

### `mockPut(endpoint, response)`

Mocks a PUT endpoint.

- `endpoint` (String): The endpoint to mock.
- `response` (Object): The response to return for the mocked endpoint.

### `mockDelete(endpoint, response)`

Mocks a DELETE endpoint.

- `endpoint` (String): The endpoint to mock.
- `response` (Object): The response to return for the mocked endpoint.

### `start(port, options)`

Starts the mock server.

- `port` (Number): The port to run the server on.
- `options` (Object): Server options.
  - `tlsEnabled` (Boolean): Whether to enable TLS/SSL.
  - `tlsOptions` (Object): TLS/SSL options.

## Usage
```javascript
const { ApiMocker, generateTLSCertificates } = require('express-api-mocker');
const fs = require('fs');

const mocker = new ApiMocker();

// Add custom headers
mocker.addCustomHeaders({
  'X-Custom-Header': 'CustomValue',
  'X-Powered-By': 'Express-Api-Mocker'
});

// Enable CORS with options
mocker.enableCORS({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
});

// Mock some endpoints
mocker.mockGet('/api/user', { id: 1, name: 'John Doe' });
mocker.mockPost('/api/login', { success: true, token: 'abc123' });
mocker.mockPut('/api/user/1', { success: true });
mocker.mockDelete('/api/user/1', { success: true });

// Generate TLS certificates
generateTLSCertificates('./cert.pem', './key.pem');

const tlsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

// Start the mock server
mocker.start(3000, {
  tlsEnabled: true,
  tlsOptions: tlsOptions
});

```
## License

This project is licensed under the ISC License.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const https = require('https');
const { generateTLSCertificates } = require('./tlsUtils');

class ApiMocker {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.routes = [];
  }

  addCustomHeaders(headers) {
    this.app.use((req, res, next) => {
      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      next();
    });
  }

  enableCORS(options) {
    this.app.use(cors(options));
  }

  mockGet(endpoint, response) {
    this.routes.push({ method: 'get', endpoint, response });
    this.app.get(endpoint, (req, res) => {
      res.json(response);
    });
  }

  mockPost(endpoint, response) {
    this.routes.push({ method: 'post', endpoint, response });
    this.app.post(endpoint, (req, res) => {
      res.json(response);
    });
  }

  mockPut(endpoint, response) {
    this.routes.push({ method: 'put', endpoint, response });
    this.app.put(endpoint, (req, res) => {
      res.json(response);
    });
  }

  mockDelete(endpoint, response) {
    this.routes.push({ method: 'delete', endpoint, response });
    this.app.delete(endpoint, (req, res) => {
      res.json(response);
    });
  }

  start(port = 3000, options = {}) {
    const { tlsEnabled = false, tlsOptions = {} } = options;
    const server = tlsEnabled
      ? https.createServer(tlsOptions, this.app)
      : http.createServer(this.app);
    
    server.listen(port, () => {
      console.log(`API mocker running on ${tlsEnabled ? 'https' : 'http'}://localhost:${port}`);
    });
  }
}

module.exports = { ApiMocker, generateTLSCertificates };

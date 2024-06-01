const { execSync } = require('child_process');
const fs = require('fs');

function generateTLSCertificates(certPath = './cert.pem', keyPath = './key.pem') {
  try {
    if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
      console.log('Certificates already exist.');
      return;
    }

    console.log('Generating certificates...');

    execSync(`openssl genrsa -out ${keyPath} 2048`);
    console.log(`Private key generated at ${keyPath}`);

    execSync(`openssl req -new -key ${keyPath} -out csr.pem -subj "/CN=localhost"`);
    console.log('CSR generated.');

    execSync(`openssl x509 -req -in csr.pem -signkey ${keyPath} -out ${certPath}`);
    console.log(`Certificate generated at ${certPath}`);

    console.log('Certificates generated successfully.');
  } catch (error) {
    console.error(`Error generating certificates: ${error.message}`);
    throw error;
  }
}

module.exports = { generateTLSCertificates };

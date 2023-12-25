const http = require('http');
const os = require('os');


const checkAppOnline = () => {
  const url = 'http://localhost:3000/';

  return new Promise((resolve) => {
    http.get(url, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 400) {
        process.stdout.write(os.EOL);
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => {
      resolve(false);
    });
  });
};

const waitForAppOnline = async () => {
  // Wait for server to come online.
  process.stdout.write('Waiting for server to come online');

  let second = 0;
  let isReady = await checkAppOnline();

  while (!isReady && second < 25) {
    process.stdout.write('.');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isReady = await checkAppOnline();
    second++;
  }

  process.stdout.write('App is now online' + os.EOL);
};

waitForAppOnline().catch(console.error);

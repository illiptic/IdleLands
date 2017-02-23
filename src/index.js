require('dotenv').config({ silent: true });

console.log('Starting IdleLands!');

if(process.env.NODE_ENV !== 'production') {
  var fs = require('fs');
  try {
    // production passes in environment variables instead
    fs.accessSync('./.env', fs.F_OK);
  } catch (e) {
    console.log('Can\'t find the .env file. Please place one in the current dir');
    process.exit();
  }
}

process.on('uncaughtException', e => console.error(e));
process.on('unhandledRejection', reason => console.error(reason));

// should only be needed in dev
if(!process.env.NO_BABEL) {
  require('babel-register');
  require('babel-polyfill');
}

require('./primus/server');

require('./core/event-loop');
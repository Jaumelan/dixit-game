import { app } from './server';
import { config } from './config';
import https from 'https';
import fs from 'fs';
import { WebSocketInitializer } from './websocket';

const webSocketInitializer = new WebSocketInitializer();
webSocketInitializer.initialize();
webSocketInitializer.runNexPlayer();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

https.createServer(options, app).listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});

/* 
app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
}); */

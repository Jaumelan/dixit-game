import { app } from './server';
import { config } from './config';
import { WebSocketServices } from './services';

import websocket from 'ws';
//import { createServer } from 'http';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require('http').createServer(app);

const wss = new websocket.Server({
  port: Number(config.port) + 1,
  host: 'localhost',
});

wss.on('connection', (ws: websocket) => {
  console.log('Client connected');
  ws.on('message', (message: string) => {
    console.log('Message received: ' + message);
    const { action, payload } = JSON.parse(message);
    const answer = new WebSocketServices(action, payload);

    ws.send(JSON.stringify(answer));
    wss.clients.forEach((client: websocket) => {
      client.send(message);
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', () => {
    console.log('Client error');
  });
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});

import { app } from './server';
import { config } from './config';
import { WebSocketServices } from './services';
import websocket from 'ws';
import crypto from 'crypto';

const wss = new websocket.Server({
  port: Number(config.port) + 1,
  host: 'localhost',
});

const websocketClients: any = {};
const rooms: any = {};

wss.on('connection', (ws: websocket) => {
  console.log('Client connected');

  const userID = crypto.randomUUID();
  websocketClients[userID] = ws;

  console.log(
    'connected: ' +
      userID +
      ' in ' +
      Object.getOwnPropertyNames(websocketClients),
  );

  ws.on('message', (message: string) => {
    console.log('received from ' + userID + ': ' + message);
    const { action, payload } = JSON.parse(message);
    const { id } = payload;
    if (action === 'enter-room') {
      if (rooms[id]) {
        rooms[id].push(ws);
      } else {
        rooms[id] = [ws];
      }
      console.log('rooms', rooms);
    }
    const answer = new WebSocketServices(action, payload);

    rooms[id].forEach((client: websocket) => {
      client.send(JSON.stringify(answer));
    });

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(answer));
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

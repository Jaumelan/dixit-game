import express from 'express';
import routes from './routes';
import cors from 'cors';
import websocket from 'ws';
import { createServer } from 'http';

const apCors = cors({ origin: '*' });

const app = express();
const socketServer = createServer(app);

const wss = new websocket.Server({ server: socketServer });

wss.on('connection', (ws: websocket) => {
  console.log('Client connected');
  ws.on('message', (message: string) => {
    console.log('Message received: ' + message);
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

app.use(apCors);
app.use(routes);
export { app };

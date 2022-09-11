import websocket from 'ws';
import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

class WebSocketService {
  private wss: websocket.Server;
  private clients: websocket[] = [];

  constructor(id: string) {
    this.wss = new websocket.Server({ server, path: id });
    this.wss.on('connection', (ws: websocket) => {
      this.clients.push(ws);
      ws.on('message', (message: string) => {
        this.clients.forEach((client: websocket) => {
          if (client.readyState === websocket.OPEN) {
            client.send(message);
          }
        });
      });
    });
    this.wss.on('close', () => {
      this.clients = [];
    });
    this.wss.on('error', () => {
      this.clients = [];
    });
  }
}

export default WebSocketService;

/*
 constructor(id: string) {
    this.wss = new websocket.Server({ port: 8081, path: id });
    this.wss.on('connection', (ws: websocket) => {
      console.log('Client connected');
      this.clients.push(ws);
      ws.on('message', (message: string) => {
        this.clients.forEach((client: websocket) => {
          client.send(message);
        });
      });
    });
  }
  */

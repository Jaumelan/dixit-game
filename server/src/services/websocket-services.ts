import websocket from 'ws';

class WebSocketService {
  private wss: websocket.Server;
  private clients: websocket[] = [];

  constructor(id: string) {
    this.wss = new websocket.Server({ port: 8080, path: id });
    this.wss.on('connection', (ws: websocket) => {
      this.clients.push(ws);
      ws.on('message', (message: string) => {
        this.clients.forEach((client: websocket) => {
          client.send(message);
        });
      });
    });
  }
}

export default WebSocketService;

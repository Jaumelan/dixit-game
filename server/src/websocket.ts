import websocket from 'ws';
import { config } from './config';
import { WebSocketServices } from './services';
import crypto from 'crypto';

//const rooms: any = {};

class WebSocketInitializer {
  public wss: websocket.Server;

  public websocketClients: any = {};

  public rooms: any = {};
  private websocketservices = new WebSocketServices();

  constructor() {
    this.wss = new websocket.Server({
      port: Number(config.port) + 1 || 8081,
      host: 'localhost',
    });
  }

  public initialize() {
    this.wss.on('connection', (ws: websocket) => {
      console.log('Client connected');
      const userID = crypto.randomUUID();
      this.websocketClients[userID] = ws;

      console.log(
        'connected: ' +
          userID +
          ' in ' +
          Object.getOwnPropertyNames(this.websocketClients),
      );
      ws.on('message', async (message: string) => {
        console.log('received from ' + userID + ': ' + message);
        const { action, payload } = JSON.parse(message);
        const answer = await this.websocketservices.validate(action, payload);
        const { data } = answer;
        //console.log('answer data', data);
        if (answer.message === '') {
          if (action === 'creator') {
            //console.log('data id ', data);
            if (this.rooms[data.id]) {
              //console.log('sala já existe');
              this.rooms[data.id].push(ws);
            } else {
              //console.log('n tinha a sala');
              this.rooms[data.id] = [ws];
            }
          } else if (action === 'new-player') {
            //console.log('aqui');
            if (this.rooms[data.id]) {
              this.rooms[data.id].push(ws);
            }
          } else if (action === 'leave-room') {
            if (this.rooms[data.id]) {
              const index = this.rooms[data.id].indexOf(ws);
              this.rooms[data.id].splice(index, 1);
            }
          }
          //console.log('rooms', this.rooms);
          if (this.rooms[data.id]) {
            this.rooms[data.id].forEach((client: websocket) => {
              //console.log('sending', answer);
              client.send(JSON.stringify(answer));
            });
          }
          //console.log('data do answer', data);
        } else {
          console.log('message do answer', answer.message);
          this.wss.clients.forEach((client) => {
            client.send(JSON.stringify(answer));
          });
        }
      });
      ws.on('close', () => {
        console.log('Client disconnected' + userID);
        //delete this.websocketClients[userID];
      });
      ws.on('error', () => {
        console.log('Client error');
      });
    });
  }
}

export { WebSocketInitializer };

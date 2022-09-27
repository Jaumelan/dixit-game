import websocket from 'ws';
import { config } from './config';
import { WebSocketServices, GameServices } from './services';
import crypto from 'crypto';

//const rooms: any = {};

class WebSocketInitializer {
  public wss: websocket.Server;

  public websocketClients: any = {};

  private GameServices = new GameServices();

  public rooms: any = {};

  private websocketservices = new WebSocketServices();

  constructor() {
    this.wss = new websocket.Server({
      port: Number(config.port) + 1 || 8081,
      host: '68.232.175.134',
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
              if (index > -1) {
                this.rooms[data.id].splice(index, 1);
              }
              //this.rooms[data.id].splice(index, 1);
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
      ws.on('close', async (ws) => {
        console.log('Client closed ' + userID);
        const findRoomWithClient = Object.keys(this.rooms).find((room) => {
          return this.rooms[room].includes(this.websocketClients[userID]);
        });
        //console.log('room with client ', findRoomWithClient);
        if (findRoomWithClient) {
          //console.log('room with client ', findRoomWithClient);
          const index = this.rooms[findRoomWithClient].indexOf(ws);
          this.rooms[findRoomWithClient].splice(index, 1);
          if (this.rooms[findRoomWithClient].length === 0) {
            //console.log('deletando sala');
            delete this.rooms[findRoomWithClient];

            await this.websocketservices.deleteGameSession(findRoomWithClient);
          }
        }
        delete this.websocketClients[userID];
        //delete this.websocketClients[userID];
      });
      ws.on('disconnect', async () => {
        console.log('Client disconnected ' + userID);

        const findRoomWithClient = Object.keys(this.rooms).find((room) => {
          return this.rooms[room].includes(this.websocketClients[userID]);
        });
        console.log('room with client ', findRoomWithClient);
        if (findRoomWithClient) {
          const index = this.rooms[findRoomWithClient].indexOf(ws);
          this.rooms[findRoomWithClient].splice(index, 1);
          if (this.rooms[findRoomWithClient].length === 0) {
            console.log('deletando sala');
            delete this.rooms[findRoomWithClient];
            await this.websocketservices.deleteGameSession(findRoomWithClient);
          }
        }
        delete this.websocketClients[userID];
      });

      ws.on('error', () => {
        console.log('Client error');
      });
    });
  }

  public async runNexPlayer() {
    setInterval(async () => {
      const timeNow = new Date().getTime();
      //console.log('time now', timeNow);
      const timeToContinueArray =
        await this.GameServices.getTimeToContinueArray();
      if (timeToContinueArray.length > 0) {
        //console.log('timeToContinueArray', timeToContinueArray);
        timeToContinueArray.forEach(async (timeIndex) => {
          const data = await this.GameServices.getTimeToContinue(timeIndex);
          //console.log('data', data);
          if (Number(data.timeToContinue) < timeNow) {
            //console.log('time to continue');
            if (this.rooms[data.id]) {
              this.rooms[data.id].forEach((client: websocket) => {
                const answer = {
                  action: 'continue',
                  payload: {
                    id: data.id,
                  },
                };
                client.send(JSON.stringify(answer));
              });
            }
            await this.GameServices.deleteTimeToContinue(data.id);
          }
        });
      }
    }, 1000);
  }
}

export { WebSocketInitializer };

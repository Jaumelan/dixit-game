import GameServices from './game-services';
import Game from '../clients/dao/redis';
import websocket from 'ws';
import crypto from 'crypto';

class WebSocketServices {
  private Game = Game;

  public websocketClients: any = {};

  public room: any = {};

  private GameServices = new GameServices();

  private createUserID(ws: websocket) {
    const userID = crypto.randomUUID();
    this.websocketClients[userID] = ws;
    console.log(
      'connected: ' +
        userID +
        ' in ' +
        Object.getOwnPropertyNames(this.websocketClients),
    );
    return;
  }

  private createRoom(ws: websocket): string {
    const roomID = crypto.randomUUID();
    this.room[roomID] = ws;
    return roomID;
  }

  public async validate(
    action: string,
    payload: any,
  ): Promise<{ action: string; data: any; message: string }> {
    switch (action) {
      case 'new-player':
        const { id, username, email } = payload;
        const players = await this.GameServices.getPlayersFromGameSession(id);
        const numberOfPlayers = players.reduce((accumulator, currentValue) => {
          if (currentValue === ':') {
            accumulator += 1;
          }
          return accumulator;
        }, 0);

        if (numberOfPlayers === 0) {
          console.log('game full');
          return {
            action: 'new-player',
            data: null,
            message: 'Jogadores completos',
          };
        }

        const checkPlayer = players.find((player: string) => {
          return player.includes(email);
        });

        if (checkPlayer) {
          //console.log('player already exists');
          return {
            action: 'new-player',
            data: null,
            message: 'Jogador já existe',
          };
        }

        let changed = false;
        const newplayers = players.map((player) => {
          if (player === ':') {
            if (!changed) {
              changed = true;
              return `${username}:${email}`;
            }
            return player;
          } else if (player !== ':') {
            return player;
          }
        });
        //console.log('players', newplayers);
        await this.GameServices.updatePlayers(id, newplayers as string[]);
        const data = await this.GameServices.getGameSession(id);
        return {
          action: 'new-player',
          data: { ...data.data, id },
          message: '',
        };
        break;
      case 'enter-room':
        const numberRegex = /\d+/g;
        const roomID = payload.id.match(numberRegex);
        if (roomID) {
          const data = await this.GameServices.getGameSession(roomID[0]);
          return {
            action: 'enter-room',
            data: { ...data.data, id: roomID[0] },
            message: '',
          };
        } else {
          return {
            action: 'enter-room',
            data: null,
            message: 'Room ID not found',
          };
        }
        break;
      case 'leave-room':
        const check = /\d+/g;
        const leaveroomID = payload.id.match(check);
        const userEmail = payload.email;
        if (leaveroomID) {
          const data = await this.GameServices.getGameSession(leaveroomID[0]);

          const { playersString } = data.data;

          const players = playersString.split(',');
          //console.log(players);
          const newPlayers = players.map((player) => {
            if (player.includes(userEmail)) {
              return ':';
            }
            return player;
          });
          //console.log(newPlayers);
          if (newPlayers == players) {
            return {
              action: 'leave-room',
              data: { ...data.data, id: leaveroomID[0] },
              message: 'Player not found',
            };
          } else {
            await this.GameServices.updatePlayers(
              leaveroomID[0],
              newPlayers as string[],
            );
            console.log(' data ', data);
            return {
              action: 'leave-room',
              data: {
                ...data.data,
                playersString: newPlayers.join(','),
                id: leaveroomID[0],
              },
              message: '',
            };
          }
        } else {
          return {
            action: 'leave-room',
            data: { id: leaveroomID[0] },
            message: 'Room ID not found',
          };
        }
        break;

      default:
        return {
          action: 'error',
          data: null,
          message: 'Action not found',
        };
    }
  }
}

export default WebSocketServices;

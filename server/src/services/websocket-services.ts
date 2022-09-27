import GameServices from './game-services';
import Game from '../clients/dao/redis';
import websocket from 'ws';
import crypto from 'crypto';
import { scoreCalculator } from '../utils';

class WebSocketServices {
  private Game = Game;

  public websocketClients: any = {};

  public timerNextPlayer: any = {};

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
        const { id, players } = payload;

        return {
          action: 'new-player',
          data: { players, id },
          message: '',
        };
        break;
      case 'creator':
        const numberRegex = /\d+/g;
        const roomID = payload.id.match(numberRegex);
        if (roomID) {
          const data = await this.GameServices.getGameSession(roomID[0]);
          //console.log('data enter room', data);
          //console.log('enter room data', data);
          return {
            action: 'enter-room',
            data: { id: roomID[0] },
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
          //console.log(data);

          if (Object.entries(data.data).length !== 0) {
            const { playersString } = data.data;
            const players = playersString.split(',');

            const newPlayers = players.map((player) => {
              if (player.includes(userEmail)) {
                return ':';
              }
              return player;
            });

            const noPlayers = newPlayers.filter((player) => {
              return player !== ':';
            });

            if (newPlayers == players) {
              return {
                action: 'leave-room',
                data: { ...data.data, id: leaveroomID[0] },
                message: 'Player not found',
              };
            } else if (noPlayers.length === 0) {
              await this.GameServices.deleteGameSession(payload.id);
              console.log('delete game session');
              return {
                action: 'leave-room',
                data: { ...data.data, id: leaveroomID[0] },
                message: '',
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
              message: '',
            };
          }
        } else {
          return {
            action: 'leave-room',
            data: null,
            message: 'Room ID not found',
          };
        }
        break;
      case 'update-turn':
        //const { turn } = payload;
        console.log('payload ', payload);
        return {
          action: 'update-turn',
          data: { ...payload },
          message: '',
        };
        break;
      case 'update-cards-played':
        //console.log('cardsPlayed', cardsPlayed);
        return {
          action: 'update-cards-played',
          data: { ...payload },
          message: '',
        };
        break;
      case 'discover':
        //console.log('cardsPlayed', cardsPlayed);
        return {
          action: 'discover',
          data: { ...payload },
          message: '',
        };
        break;
      case 'chat-message':
        return {
          action: 'chat-message',
          data: { ...payload },
          message: '',
        };
        break;
      case 'dixit-choose':
        return {
          action: 'dixit-choose',
          data: { ...payload },
          message: '',
        };
        break;
      case 'turns-name':
        return {
          action: 'turns-name',
          data: { ...payload },
          message: '',
        };
        break;
      case 'score':
        const { data, playersName, user } = payload;
        const score = scoreCalculator(data, playersName);

        //console.log('score', payload);

        this.GameServices.insertTimeToContinueArray(payload.id);

        return {
          action: 'score',
          data: { id: payload.id, score, user },
          message: '',
        };
        break;
      case 'continue':
        return {
          action: 'continue',
          data: { ...payload },
          message: '',
        };
        break;
      case 'end-session':
        const game = await this.GameServices.getGameSession(payload.id);
        console.log('game', game);
        if (game.data) {
          await this.GameServices.deleteGameSession(payload.id);
        }

        return {
          action: 'end-session',
          data: 'game deleted',
          message: '',
        };
        break;
      default:
        return {
          action: 'error',
          data: null,
          message: 'Action not found',
        };
    }
  }

  public async deleteGameSession(id: string) {
    const game = await this.GameServices.getGameSession(id);
    if (game.data) {
      await this.GameServices.deleteGameSession(id);
    }
  }
}

export default WebSocketServices;

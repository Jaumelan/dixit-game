import GameServices from './game-services';
import Game from '../clients/dao/redis';
import websocket from 'ws';
import crypto from 'crypto';

class WebSocketServices {
  public answer: any;

  private Game = Game;

  public websocketClients: any = {};

  public room: any = {};

  private GameServices = new GameServices();

  constructor(action: string, payload: any) {
    this.answer = this.validate(action, payload);
  }

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

  private async validate(action: string, payload: any): Promise<any> {
    switch (action) {
      case 'new-player':
        const { gameID, username, email } = payload;
        const players = await this.GameServices.getPlayersFromGameSession(
          gameID,
        );
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
            payload: {
              message: 'Jogadores completos',
            },
          };
        }

        const checkPlayer = players.find((player: string) => {
          return player.includes(email);
        });

        if (checkPlayer) {
          console.log('player already exists');
          return {
            action: 'new-player',
            payload: {
              message: 'Jogador já existe',
            },
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
        console.log('players', newplayers);
        return this.GameServices.updatePlayers(gameID, newplayers as string[]);
        break;
      case 'card-played':
        console.log('card-played');
        break;
      default:
        return {
          action: 'error',
          payload: 'Action not found',
        };
    }
  }
}

export default WebSocketServices;

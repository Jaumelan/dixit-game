import RedisClient from '.';
import { GameSessionI, GameStatus, APIResponse } from '../../../models';
import { WebSocketServices } from '../../../services';

class Game {
  private static instance: RedisClient;

  private webSocketServices = WebSocketServices;

  public async insert(gameSession: GameSessionI): Promise<APIResponse> {
    const redis = RedisClient.getInstance();
    const { id, players, numberOfPlayers, timePerTurn } = gameSession;
    const status = GameStatus.waiting;

    const gameSessionExists = await redis.hgetall(id);
    //console.log('gameSessionExists', gameSessionExists);

    if (Object.keys(gameSessionExists).length > 0) {
      throw new Error('400: Já existe uma sessão com esse id');
    }

    let playersString = '';
    players.forEach((item, index) => {
      if (index === players.length) {
        playersString += item.username + ':' + item.email;
      } else {
        playersString += item.username + ':' + item.email + ',';
      }
    });

    //console.log('playersString', playersString);
    const gameSessionCreation = await redis.hmset(id, {
      numberOfPlayers,
      playersString,
      status,
      timePerTurn,
    });

    new this.webSocketServices(id);

    //console.log('id', id);
    this.addGameToGameList(id);

    const data = {
      id,
    };

    if (gameSessionCreation === 'OK') {
      return {
        data,
        messages: [],
      };
    } else {
      throw new Error(
        '500: an error occurred while inserting game session on database',
      );
    }
  }

  public async getActiveGames() {
    const redis = RedisClient.getInstance();
    const games = await redis.lrange('games', 0, -1);
    return games;
  }

  public async getGameSession(id: string) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.hgetall(id);
    //const games = await redis.flushall();
    return gameSession;
  }

  public async updatePlayers(id: string, players: string[]) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.hmset(id, { players });
    return gameSession;
  }

  public async updateStatus(id: string, status: GameStatus) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.hmset(id, { status });
    return gameSession;
  }

  public async deleteGameSession(id: string) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.del(id);
    return gameSession;
  }

  public async addGameToGameList(id: string) {
    const redis = RedisClient.getInstance();
    const games = await redis.rpush('games', id);
    return games;
  }

  public async deleteGameFromList(id: string) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.lrem('games', 0, id);
    return gameSession;
  }

  public async deleteAllGames() {
    const redis = RedisClient.getInstance();
    const games = await redis.del('games');
    return games;
  }

  public async deleteAllGameSessions() {
    const redis = RedisClient.getInstance();
    const games = await redis.flushall();
    return games;
  }
}

export default Game;

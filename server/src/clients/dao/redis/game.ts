import RedisClient from '.';
import { GameStatus, APIResponse, GameSessionDB } from '../../../models';
import { images } from '../../../assets/images-src';

class Game {
  private static instance: RedisClient;

  public async insert(gameSession: GameSessionDB): Promise<APIResponse> {
    const redis = RedisClient.getInstance();
    const { id, players, numberOfPlayers, turns, pointsToWin, cards } =
      gameSession;
    const status = GameStatus.waiting;

    const gameSessionExists = await redis.hgetall(id);
    //console.log('gameSessionExists', gameSessionExists);

    if (Object.keys(gameSessionExists).length > 0) {
      throw new Error('400: Já existe uma sessão com esse id');
    }

    let playersString = '';
    players.forEach((item: { username: string; email: string }, index) => {
      playersString += `${item.username}:${item.email}`;
      if (index < players.length - 1) {
        playersString += ',';
      }
    });

    //console.log('playersString', playersString);
    const gameSessionCreation = await redis.hmset(id, {
      numberOfPlayers,
      playersString,
      status,
      turns,
      pointsToWin,
      cards,
    });

    const numbersArray = cards.split(',');

    const cardsSrc: string[] = [];
    numbersArray.forEach((item) => {
      cardsSrc.push(images[Number(item)]);
    });

    //new this.webSocketServices(id);

    //console.log('id', id);
    this.addGameToGameList(id);
    //await redis.flushall();
    const data = {
      id,
      cardsSrc,
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
    let playersEmpty = 0;

    players.forEach((item) => {
      if (item === ':') {
        playersEmpty += 1;
      }
    });

    if (playersEmpty === players.length) {
      const deleteGame = await this.deleteGameSession(id);

      await this.deleteGameFromList(id);
      return deleteGame;
    } else {
      let playersString = '';

      players.forEach((item: string, index) => {
        playersString += item;
        if (index < players.length - 1) {
          playersString += ',';
        }
      });

      //console.log('playersString', playersString);

      const gameSession = await redis.hset(id, 'playersString', playersString);
      return gameSession;
    }
  }

  public async updateStatus(id: string, status: GameStatus) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.hmset(id, { status });
    return gameSession;
  }

  public async updateCards(id: string, cards: string) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.hmset(id, { cards });
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

  public async addGameTimeToContinue(id: string, timeToContinue: number) {
    const redis = RedisClient.getInstance();
    const games = await redis.hmset(`${id}-time`, { timeToContinue, id });
    //console.log('games', games);
    return games;
  }

  public async getGameTimeToContinue(id: string) {
    const redis = RedisClient.getInstance();
    //const games = await redis.hgetall(`${id}-time`);
    const games = await redis.hgetall(id);
    return games;
  }

  public async deleteGameTimeToContinue(id: string) {
    const redis = RedisClient.getInstance();
    const games = await redis.del(`${id}-time`);
    return games;
  }

  public async getTimeToContinueWithout(id: string) {
    const redis = RedisClient.getInstance();
    const games = await redis.hgetall(`${id}-time`);
    return games;
  }

  public async addtimeToList(id: string) {
    const redis = RedisClient.getInstance();
    const list = await redis.lrange('time-list', 0, -1);

    if (list.length !== 0) {
      //console.log('list.length !== 0');
      let alreadyInList = false;
      list.forEach((item) => {
        if (item === `${id}-time`) {
          //console.log('item === `${id}-time`');
          alreadyInList = true;
        }
      });

      if (!alreadyInList) {
        //console.log('!alreadyInList');
        const games = await redis.rpush('time-list', `${id}-time`);
        return games;
      }
      return;
    } else {
      const games = await redis.rpush('time-list', `${id}-time`);
      return games;
    }
  }

  public async deleteTimeFromList(id: string) {
    const redis = RedisClient.getInstance();
    const gameSession = await redis.lrem('time-list', 0, `${id}-time`);
    return gameSession;
  }

  public async getTimeToList() {
    const redis = RedisClient.getInstance();
    const games = await redis.lrange('time-list', 0, -1);
    return games;
  }
}

export default Game;

import {
  APIResponse,
  GameSessionI,
  GameStatus,
  GameSessionDB,
  UpdateGame,
} from '../models';
import { images } from '../assets/images-src';
import Game from '../clients/dao/redis/game';

import { GameCreationValidator } from '../validators';

class GameServices {
  private game = new Game();

  private gameValidator = GameCreationValidator;

  public async createGameSession(
    gameSession: GameSessionI,
  ): Promise<APIResponse> {
    //console.log('gameSession', gameSession);
    const gameSessionValidated = new this.gameValidator(gameSession);

    if (gameSessionValidated.errors) {
      throw new Error(`400: ${gameSessionValidated.errors}`);
    }
    //console.log('gameSessionValidated');

    const activeGames = await this.getActiveGames();

    if (activeGames.data.includes(gameSessionValidated.gameSession.id)) {
      throw new Error(
        `400: game session with id ${gameSessionValidated.gameSession.id} already exists`,
      );
    }

    const cards = await this.getCards(gameSession.numberOfPlayers);

    gameSession.cards = cards.data;

    delete gameSession.email;

    const gameSessionCreated = await this.game.insert(
      gameSession as GameSessionDB,
    );

    return gameSessionCreated;
  }

  public async getActiveGames() {
    const games = await this.game.getActiveGames();

    return { data: games, messages: [] };
  }

  public async getGameSession(id: string) {
    const gameSession = await this.game.getGameSession(id);
    return {
      data: gameSession,
      messages: [],
    };
  }

  public async updateGameSession(
    id: string,
    gameSession: UpdateGame,
  ): Promise<APIResponse> {
    const gameData = await this.game.getGameSession(id);

    if (!gameData) {
      throw new Error(`400: game session with id ${id} does not exists`);
    }

    if (gameData.status !== GameStatus.waiting) {
      throw new Error(
        `400: game session with id ${id} is not in waiting for players`,
      );
    }

    const players = gameData.playersString.split(',');

    players.forEach((player) => {
      if (player.includes(gameSession.email)) {
        throw new Error(
          `400: player with email ${gameSession.email} already exists in game session with id ${id}`,
        );
      }
    });

    let playersComplete = true;
    players.find((player) => {
      if (player === ':') {
        playersComplete = false;
      }
    });

    if (playersComplete) {
      throw new Error(`400: game session with id ${id} is full`);
    }

    let changed = false;
    const newPlayers = players.map((player) => {
      if (player === ':') {
        if (!changed) {
          changed = true;
          return `${gameSession.username}:${gameSession.email}`;
        }
        return player;
      }
      return player;
    });

    let newComplete = true;
    newPlayers.find((player) => {
      if (player === ':') {
        newComplete = false;
      }
    });

    if (newComplete) {
      await this.game.updateStatus(id, GameStatus.started);
      await this.game.deleteGameFromList(id);
    }

    console.log(newPlayers);

    await this.game.updatePlayers(id, newPlayers);

    const gameUpdated = await this.game.getGameSession(id);

    const cardsArray = gameUpdated.cards.split(',');
    const cardsSrc: string[] = [];
    cardsArray.forEach((item) => {
      cardsSrc.push(images[Number(item)]);
    });

    return { data: { ...gameUpdated, cards: cardsSrc }, messages: [] };
    //const players = sessionExists.data.playersString.split(',');
  }

  public async getPlayersFromGameSession(id: string) {
    const gameSession = await this.game.getGameSession(id);
    const players = gameSession.playersString.split(',');
    return players;
  }

  public async getCards(players: number /*, gameid: string */) {
    // console.log('players', players);
    if (players >= 3 && players < 7) {
      const numbersArray: number[] = [];
      while (numbersArray.length < (5 + players * 2) * players) {
        const number: number = Math.floor(Math.random() * 63) + 1;
        if (!numbersArray.includes(number)) {
          numbersArray.push(number);
        }
      }

      const cardsString = numbersArray.join(',');

      return { data: cardsString, messages: [] };
    } else {
      throw new Error('400: invalid number of players');
    }
  }

  public async updatePlayers(id: string, players: string[]) {
    const gameSession = await this.game.updatePlayers(id, players);
    return gameSession;
  }

  public async updateStatus(id: string, status: GameStatus) {
    const gameSession = await this.game.updateStatus(id, status);
    return gameSession;
  }

  public async sendNumber() {
    const activeGames = await this.getActiveGames();
    let number = Math.floor(Math.random() * 100) + 1;
    while (activeGames.data.includes(number.toString())) {
      number = Math.floor(Math.random() * 100) + 1;
    }

    return { data: number, messages: ['number generated successfully'] };
  }

  public async deleteGameSession(id: string) {
    const gameSession = await this.game.deleteGameSession(id);
    await this.game.deleteGameFromList(id);
    //console.log('gameSession', gameSession);
    return gameSession;
  }

  public async insertTimeToContinueArray(id: string) {
    //console.log('insertTimeToContinueArray', id);
    const exist = await this.game.getTimeToContinueWithout(id);
    //console.log('exists ', exist);
    if (Object.keys(exist).length !== 0) {
      return;
    }
    console.log('insertTimeToContinueArray', id);
    const timeInterval = new Date().setSeconds(new Date().getSeconds() + 10);
    await this.game.addGameTimeToContinue(id, timeInterval);
    const gameSession = await this.game.addtimeToList(id);
    return gameSession;
  }

  public async getTimeToContinueArray() {
    const timeToContinueArray = await this.game.getTimeToList();
    return timeToContinueArray;
  }

  public async getTimeToContinue(id: string) {
    const timeToContinue = await this.game.getGameTimeToContinue(id);
    return timeToContinue;
  }

  public async deleteTimeToContinue(id: string) {
    const timeToContinue = await this.game.deleteGameTimeToContinue(id);
    await this.game.deleteTimeFromList(id);
    return timeToContinue;
  }
}

export default GameServices;

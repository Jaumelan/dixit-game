import { APIResponse, GameSessionI, GameStatus } from '../models';
import Game from '../clients/dao/redis/game';

import { GameCreationValidator } from '../validators';

class GameServices {
  private game = new Game();

  private gameValidator = GameCreationValidator;

  public async createGameSession(
    gameSession: GameSessionI,
  ): Promise<APIResponse> {
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

    const gameSessionCreated = await this.game.insert(gameSession);

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

  public async getPlayersFromGameSession(id: string) {
    const gameSession = await this.game.getGameSession(id);
    const players = gameSession.playersString.split(',');
    return players;
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
    return gameSession;
  }
}

export default GameServices;

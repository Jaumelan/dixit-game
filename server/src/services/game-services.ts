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
    return { data: games, messages: ['games retrieved successfully'] };
  }

  public async getGameSession(id: string) {
    const gameSession = await this.game.getGameSession(id);
    return {
      data: gameSession,
      messages: ['game session retrieved successfully'],
    };
  }

  public async updatePlayers(id: string, players: string[]) {
    const gameSession = await this.game.updatePlayers(id, players);
    return gameSession;
  }

  public async updateStatus(id: string, status: GameStatus) {
    const gameSession = await this.game.updateStatus(id, status);
    return gameSession;
  }

  public async deleteGameSession(id: string) {
    const gameSession = await this.game.deleteGameSession(id);
    return gameSession;
  }
}

export default GameServices;

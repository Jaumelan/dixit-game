export interface GameSessionI {
  cards?: string;
  id: string;
  numberOfPlayers: number;
  players: { username: string; email: string }[];
  timePerTurn: number;
}

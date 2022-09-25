export interface GameSessionDB {
  id: string;
  numberOfPlayers: number;
  players: { username: string; email: string }[];
  turns: number;
  pointsToWin: number;
  cards: string;
}

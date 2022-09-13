export interface GameSessionDB {
  id: string;
  numberOfPlayers: number;
  players: { username: string; email: string }[];
  timePerTurn: number;
  cards: string;
}

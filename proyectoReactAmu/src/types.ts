
export type GameStatus = 'Pendiente' | 'Jugando' | 'Completado';

export interface Videogame {
  id?: string;           
  title: string;         
  hoursPlayed: number;   
  status: GameStatus;
  platform: string;  
}
import type { Videogame } from "./types";

export const mockGames: Videogame[] = [
  { id: '1', title: 'The Legend of Zelda', hoursPlayed: 120, status: 'Completado', platform: 'Nintendo Switch' },
  { id: '2', title: 'Hollow Knight', hoursPlayed: 15, status: 'Jugando', platform: 'PC' },
  { id: '3', title: 'Cyberpunk 2077', hoursPlayed: 0, status: 'Pendiente', platform: 'PS5' }
];
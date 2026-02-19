import type { Videogame } from '../types';
import GameCard from './GameCard';

interface Props {
  games: Videogame[];
  onDelete: (id: string) => void;
}

export default function GameList({ games, onDelete }: Props) {
  if (games.length === 0) {
    return <p style={{ textAlign: 'center' }}>No tienes juegos todavía. ¡Añade uno!</p>;
  }

  return (
    <div style={{ display: 'grid', gap: '15px' }}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} onDelete={onDelete} />
      ))}
    </div>
  );
}
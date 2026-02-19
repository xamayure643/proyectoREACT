import type { Videogame } from '../types';
import GameCard from './GameCard';

interface Props {
  games: Videogame[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Videogame>) => void;
}

export default function GameList({ games, onDelete, onUpdate }: Props) {
  if (games.length === 0) return <p style={{ color: '#333' }}>No hay juegos en la lista.</p>;

  return (
    <div style={{ display: 'grid', gap: '15px' }}>
      {games.map(game => (
        <GameCard key={game.id} game={game} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
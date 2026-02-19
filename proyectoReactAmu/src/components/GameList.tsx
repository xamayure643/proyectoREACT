import type { Videogame } from '../types';
import GameCard from './GameCard';

interface Props {
  games: Videogame[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Videogame>) => void;
}

export default function GameList({ games, onDelete, onUpdate }: Props) {
  if (games.length === 0) return <p style={{ textAlign: 'center' }}>No hay juegos en la lista.</p>;

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', // <-- Tarjetas más anchas
      gap: '30px', // <-- Más espacio entre ellas
    }}>
      {games.map(game => (
        <GameCard key={game.id} game={game} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
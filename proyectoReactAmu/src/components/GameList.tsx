import type { Videogame } from '../types';
import GameCard from './GameCard';

interface Props {
  games: Videogame[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Videogame>) => void;
}

export default function GameList({ games, onDelete, onUpdate }: Props) {
  if (games.length === 0) return <p style={{ textAlign: 'center', color: '#666' }}>Tu colección está vacía.</p>;

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px', 
    }}>
      <style>{`
        @media (min-width: 900px) {
          .game-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
      <div className="game-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', width: '100%' }}>
        {games.map(game => (
          <GameCard key={game.id} game={game} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}
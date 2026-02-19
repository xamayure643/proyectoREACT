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
      // Forzamos 3 columnas. En móviles se ajustará automáticamente si el espacio es poco.
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      // Para asegurar exactamente 3 en pantallas grandes, podrías usar: 'repeat(3, 1fr)'
      gap: '25px', 
    }}>
      {/* Si quieres forzar 3 SIEMPRE en PC, cambia auto-fit por 3 */}
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
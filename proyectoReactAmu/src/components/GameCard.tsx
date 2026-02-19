import type { Videogame } from "../types";

interface Props {
  game: Videogame;
  onDelete: (id: string) => void;
}

export default function GameCard({ game, onDelete }: Props) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#fff', color: '#333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2 style={{ marginTop: 0 }}>{game.title}</h2>
        <p style={{ margin: '5px 0' }}><strong>Plataforma:</strong> {game.platform}</p>
        <p style={{ margin: '5px 0' }}><strong>Estado:</strong> {game.status}</p>
        <p style={{ margin: '5px 0' }}><strong>Horas jugadas:</strong> {game.hoursPlayed} h</p>
      </div>
      
      <button 
        onClick={() => game.id && onDelete(game.id)}
        style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', height: 'fit-content' }}
      >
        Borrar
      </button>
    </div>
  );
}
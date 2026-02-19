import { useState } from 'react';
import type { Videogame, GameStatus } from '../types';

interface Props {
  game: Videogame;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Videogame>) => void;
}

export default function GameCard({ game, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<GameStatus>(game.status);
  const [editHours, setEditHours] = useState<number>(game.hoursPlayed);

  const handleSave = () => {
    if (game.id) {
      onUpdate(game.id, { status: editStatus, hoursPlayed: editHours });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div style={{ border: '2px solid #007BFF', padding: '15px', borderRadius: '8px', backgroundColor: '#f4f9ff' }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>{game.title}</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ color: '#333' }}>Estado: </label>
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as GameStatus)}>
            <option value="Pendiente">Pendiente</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ color: '#333' }}>Horas: </label>
          <input type="number" value={editHours} onChange={(e) => setEditHours(Number(e.target.value))} />
        </div>
        <button onClick={handleSave} style={{ marginRight: '10px', backgroundColor: '#28a745', color: 'white' }}>Guardar</button>
        <button onClick={() => setIsEditing(false)}>Cancelar</button>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <div style={{ color: '#333' }}>
        <h2 style={{ marginTop: 0 }}>{game.title}</h2>
        <p>Plataforma: {game.platform}</p>
        <p>Estado: {game.status}</p>
        <p>Horas: {game.hoursPlayed}h</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107' }}>Editar</button>
        <button onClick={() => game.id && onDelete(game.id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Borrar</button>
      </div>
    </div>
  );
}
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

  return (
    <div style={{ 
      backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
      border: isEditing ? '2px solid #007BFF' : '1px solid #eee'
    }}>
      {/* IMAGEN DE LA TARJETA */}
      <img 
        src={game.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} 
        alt={game.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />

      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#1a1a1a' }}>{game.title}</h3>
        
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as GameStatus)} style={{padding: '5px'}}>
              <option value="Pendiente">Pendiente</option>
              <option value="Jugando">Jugando</option>
              <option value="Completado">Completado</option>
            </select>
            <input type="number" value={editHours} onChange={(e) => setEditHours(Number(e.target.value))} style={{padding: '5px'}} />
            <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px' }}>Guardar</button>
          </div>
        ) : (
          <>
            <p style={textStyle}><strong>Plataforma:</strong> {game.platform}</p>
            <p style={textStyle}><strong>Estado:</strong> <span style={statusStyle(game.status)}>{game.status}</span></p>
            <p style={textStyle}><strong>Horas:</strong> {game.hoursPlayed} h</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => setIsEditing(true)} style={btnEdit}>Editar</button>
              <button onClick={() => game.id && onDelete(game.id)} style={btnDelete}>Borrar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const textStyle = { margin: '4px 0', fontSize: '0.9rem', color: '#555' };
const btnEdit = { flex: 1, padding: '8px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const btnDelete = { flex: 1, padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const statusStyle = (status: string) => ({
  backgroundColor: status === 'Completado' ? '#d4edda' : status === 'Jugando' ? '#fff3cd' : '#f8d7da',
  color: status === 'Completado' ? '#155724' : status === 'Jugando' ? '#856404' : '#721c24',
  padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
});
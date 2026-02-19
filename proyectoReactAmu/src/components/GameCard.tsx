import { useState } from 'react';
import type { Videogame, GameStatus } from '../types';

interface Props {
  game: Videogame;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Videogame>) => void;
}

export default function GameCard({ game, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  // Estados para TODOS los campos del objeto
  const [editTitle, setEditTitle] = useState(game.title);
  const [editPlatform, setEditPlatform] = useState(game.platform);
  const [editStatus, setEditStatus] = useState<GameStatus>(game.status);
  const [editHours, setEditHours] = useState<number>(game.hoursPlayed);
  const [editImageUrl, setEditImageUrl] = useState(game.imageUrl);

  const handleSave = () => {
    if (game.id) {
      // Enviamos todos los campos actualizados a Firebase
      onUpdate(game.id, { 
        title: editTitle,
        platform: editPlatform,
        status: editStatus, 
        hoursPlayed: editHours,
        imageUrl: editImageUrl
      });
      setIsEditing(false);
    }
  };

  // --- VISTA MODO EDICIÓN (FORMULARIO TOTAL) ---
  if (isEditing) {
    return (
      <div style={{ 
        backgroundColor: '#f0f7ff', borderRadius: '12px', padding: '15px', 
        border: '2px solid #007BFF', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' 
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Editando Juego</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            placeholder="Título"
            style={editInputStyle}
          />

          <select 
            value={editPlatform} 
            onChange={(e) => setEditPlatform(e.target.value)} 
            style={editInputStyle}
          >
            <option value="PC">PC</option>
            <option value="PS5">PlayStation 5</option>
            <option value="PS4">PlayStation 4</option>
            <option value="Switch">Nintendo Switch</option>
            <option value="Xbox">Xbox Series</option>
            <option value="Retro">Retro</option>
          </select>

          <select 
            value={editStatus} 
            onChange={(e) => setEditStatus(e.target.value as GameStatus)} 
            style={editInputStyle}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
          </select>

          <input 
            type="number" 
            value={editHours} 
            onChange={(e) => setEditHours(Number(e.target.value))} 
            placeholder="Horas"
            style={editInputStyle}
          />

          <input 
            type="text" 
            value={editImageUrl} 
            onChange={(e) => setEditImageUrl(e.target.value)} 
            placeholder="URL de la imagen"
            style={editInputStyle}
          />

          {/* Previsualización de la nueva imagen mientras editas */}
          <div style={{ textAlign: 'center' }}>
            <img 
              src={editImageUrl} 
              alt="Preview" 
              style={{ width: '80px', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #007BFF' }} 
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <button onClick={handleSave} style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              ✅ Guardar cambios
            </button>
            <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              ❌ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL (TARJETA PROFESIONAL) ---
  return (
    <div style={{ 
      backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
      border: '1px solid #eee'
    }}>
      <img 
        src={game.imageUrl || 'https://via.placeholder.com/300x400?text=Sin+Imagen'} 
        alt={game.title} 
        style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
      />

      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#222' }}>{game.title}</h3>
        
        <p style={labelStyle}><strong>Plataforma:</strong> {game.platform}</p>
        <p style={labelStyle}>
            <strong>Estado:</strong> 
            <span style={statusBadgeStyle(game.status)}>{game.status}</span>
        </p>
        <p style={labelStyle}><strong>Horas:</strong> {game.hoursPlayed} h</p>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
          <button onClick={() => setIsEditing(true)} style={btnStyle('#ffc107', '#000')}>Editar</button>
          <button onClick={() => game.id && onDelete(game.id)} style={btnStyle('#dc3545', '#fff')}>Borrar</button>
        </div>
      </div>
    </div>
  );
}

// Estilos rápidos
const editInputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const labelStyle = { margin: '5px 0', fontSize: '0.9rem', color: '#555' };
const btnStyle = (bg: string, color: string) => ({
  flex: 1, padding: '10px', backgroundColor: bg, color: color, 
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' as const
});
const statusBadgeStyle = (status: string) => ({
    marginLeft: '5px', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem',
    backgroundColor: status === 'Completado' ? '#d1e7dd' : status === 'Jugando' ? '#fff3cd' : '#f8d7da',
    color: status === 'Completado' ? '#0f5132' : status === 'Jugando' ? '#664d03' : '#842029'
});
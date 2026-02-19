import { useState } from 'react';
import type { Videogame, GameStatus } from '../types';

interface Props {
  game: Videogame;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Videogame>) => void;
}

export default function GameCard({ game, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  // Estados para la edición de TODOS los campos
  const [editTitle, setEditTitle] = useState(game.title);
  const [editPlatform, setEditPlatform] = useState(game.platform);
  const [editStatus, setEditStatus] = useState<GameStatus>(game.status);
  const [editHours, setEditHours] = useState<number>(game.hoursPlayed);
  const [editImageUrl, setEditImageUrl] = useState(game.imageUrl);

  const handleSave = () => {
    if (game.id) {
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

  const handleCancel = () => {
    setEditTitle(game.title);
    setEditPlatform(game.platform);
    setEditStatus(game.status);
    setEditHours(game.hoursPlayed);
    setEditImageUrl(game.imageUrl);
    setIsEditing(false);
  };

  // --- VISTA MODO EDICIÓN ---
  if (isEditing) {
    return (
      <div style={cardStyle}>
        <div style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Editar juego</h3>

          {/* Preview de la imagen al editar */}
          <div style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden', height: '150px', backgroundColor: '#f0f0f0' }}>
            <img
              src={editImageUrl}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Sin+Imagen')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Título" style={inputStyle} />
            <select value={editPlatform} onChange={(e) => setEditPlatform(e.target.value)} style={inputStyle}>
                <option value="PC">PC</option>
                <option value="PS5">PS5</option>
                <option value="Switch">Switch</option>
                <option value="Xbox">Xbox</option>
                <option value="Retro">Retro</option>
            </select>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as GameStatus)} style={inputStyle}>
              <option value="Pendiente">Pendiente</option>
              <option value="Jugando">Jugando</option>
              <option value="Completado">Completado</option>
            </select>
            <input type="number" value={editHours} onChange={(e) => setEditHours(Number(e.target.value))} placeholder="Horas" style={inputStyle} />
            <input type="text" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} placeholder="URL Imagen" style={inputStyle} />

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleSave} style={{ ...btnStyle, backgroundColor: '#28a745', color: 'white' }}>Guardar</button>
              <button onClick={handleCancel} style={{ ...btnStyle, backgroundColor: '#6c757d', color: 'white' }}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL ---
  return (
    <div style={cardStyle}>
      {/* Imagen de cabecera que ocupa todo el ancho */}
      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
        <img
          src={game.imageUrl || 'https://via.placeholder.com/400x200?text=Sin+Imagen'}
          alt={game.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333', fontWeight: 'bold', lineHeight: '1.3' }}>{game.title}</h3>
          <span style={statusBadge(game.status)}>{game.status}</span>
        </div>

        <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
          <strong>{game.platform}</strong> · {game.hoursPlayed} horas
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '15px', display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsEditing(true)} style={iconBtnStyle} title="Editar">✏️</button>
          <button onClick={() => game.id && onDelete(game.id)} style={{...iconBtnStyle, color: '#dc3545'}} title="Borrar">🗑️</button>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS ---
const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  border: '1px solid #eee',
  display: 'flex',
  flexDirection: 'column' as const,
  height: '100%', // Para que todas las cards tengan la misma altura en el grid
};

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' };

const btnStyle = { flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' as const, fontSize: '0.9rem' };

const iconBtnStyle = {
  padding: '8px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1.2rem',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.2s',
};

const statusBadge = (status: string) => ({
  padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' as const, textTransform: 'uppercase' as const,
  backgroundColor: status === 'Completado' ? '#d1e7dd' : status === 'Jugando' ? '#fff3cd' : '#f8d7da',
  color: status === 'Completado' ? '#0f5132' : status === 'Jugando' ? '#664d03' : '#842029',
  whiteSpace: 'nowrap' as const,
  marginLeft: '10px'
});
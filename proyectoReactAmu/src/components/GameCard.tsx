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
      <div style={{ 
        backgroundColor: '#fff', borderRadius: '12px', padding: '15px', 
        border: '2px solid #007BFF', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', gap: '10px'
      }}>
        {/* Preview pequeña pero COMPLETA */}
        <div style={{ height: '120px', backgroundColor: '#f9f9f9', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={editImageUrl} 
            alt="Preview" 
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
        
        <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Título" style={inputStyle} />
        
        <div style={{ display: 'flex', gap: '5px' }}>
          <select value={editPlatform} onChange={(e) => setEditPlatform(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
            <option value="PC">PC</option>
            <option value="PS5">PlayStation 5</option>
            <option value="Switch">Nintendo Switch</option>
            <option value="Xbox">Xbox Series</option>
            <option value="Retro">Retro / Otros</option>
          </select>
          <input type="number" value={editHours} onChange={(e) => setEditHours(Number(e.target.value))} style={{ ...inputStyle, width: '70px' }} />
        </div>

        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as GameStatus)} style={inputStyle}>
          <option value="Pendiente">Pendiente</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
        </select>

        <input type="text" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} placeholder="URL Imagen" style={inputStyle} />

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSave} style={{ ...btnSmall, backgroundColor: '#007BFF', color: 'white' }}>Guardar</button>
          <button onClick={handleCancel} style={{ ...btnSmall, backgroundColor: '#6c757d', color: 'white' }}>X</button>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL (ANCHA Y COMPACTA) ---
  return (
    <div style={{ 
      backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column',
      border: '1px solid #eee', height: '100%'
    }}>
      {/* Contenedor de imagen con altura fija para que no sea muy larga */}
      <div style={{ height: '220px', backgroundColor: '#f3f3f3', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <img 
          src={game.imageUrl || 'https://via.placeholder.com/300x400?text=Sin+Imagen'} 
          alt={game.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>

      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {game.title}
        </h3>
        
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
          <strong>{game.platform}</strong> · {game.hoursPlayed}h
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={statusBadge(game.status)}>{game.status}</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={() => setIsEditing(true)} style={btnAction}>✏️</button>
            <button onClick={() => game.id && onDelete(game.id)} style={{ ...btnAction, color: '#dc2626' }}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS ---
const inputStyle = { padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.85rem' };
const btnSmall = { flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' as const, fontSize: '0.8rem' };
const btnAction = { backgroundColor: '#f0f0f0', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' };

const statusBadge = (status: string) => ({
  padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' as const,
  backgroundColor: status === 'Completado' ? '#dcfce7' : status === 'Jugando' ? '#fef9c3' : '#f3f4f6',
  color: status === 'Completado' ? '#166534' : status === 'Jugando' ? '#854d0e' : '#374151',
});
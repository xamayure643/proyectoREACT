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
    // Resetear estados a los valores originales del juego
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
        backgroundColor: '#fff', borderRadius: '16px', padding: '20px', 
        border: '3px solid #007BFF', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Editar información</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={fieldGroup}>
            <label style={labelStyle}>Título:</label>
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={inputStyle} />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Plataforma:</label>
            <select value={editPlatform} onChange={(e) => setEditPlatform(e.target.value)} style={inputStyle}>
              <option value="PC">PC</option>
              <option value="PS5">PlayStation 5</option>
              <option value="Switch">Nintendo Switch</option>
              <option value="Xbox">Xbox Series</option>
              <option value="Retro">Retro / Otros</option>
            </select>
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Estado:</label>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as GameStatus)} style={inputStyle}>
              <option value="Pendiente">Pendiente</option>
              <option value="Jugando">Jugando</option>
              <option value="Completado">Completado</option>
            </select>
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Horas:</label>
            <input type="number" value={editHours} onChange={(e) => setEditHours(Number(e.target.value))} style={inputStyle} />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>URL Imagen:</label>
            <input type="text" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} style={inputStyle} />
          </div>

          {/* Mini preview para confirmar el cambio de imagen */}
          <img 
            src={editImageUrl} 
            alt="Preview" 
            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '5px' }} 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={handleSave} style={btnSave}>Guardar</button>
            <button onClick={handleCancel} style={btnCancel}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL (CARD GRANDE) ---
  return (
    <div style={{ 
      backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', 
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out'
    }}>
      {/* Imagen ancha y alta */}
      <img 
        src={game.imageUrl || 'https://via.placeholder.com/400x600?text=Sin+Imagen'} 
        alt={game.title} 
        style={{ width: '100%', height: '350px', objectFit: 'cover' }} 
      />

      <div style={{ padding: '20px' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#111', fontWeight: 'bold' }}>
          {game.title}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
          <p style={infoText}><strong>🎮 Plataforma:</strong> {game.platform}</p>
          <p style={infoText}>
            <strong>📌 Estado:</strong> 
            <span style={statusBadge(game.status)}>{game.status}</span>
          </p>
          <p style={infoText}><strong>⏱️ Tiempo:</strong> {game.hoursPlayed} horas</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsEditing(true)} style={btnEdit}>Editar</button>
          <button onClick={() => game.id && onDelete(game.id)} style={btnDelete}>Borrar</button>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS ---
const fieldGroup = { display: 'flex', flexDirection: 'column' as const, gap: '4px' };
const labelStyle = { fontSize: '0.85rem', fontWeight: 'bold', color: '#666' };
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem' };
const infoText = { margin: 0, fontSize: '0.95rem', color: '#444' };

const btnEdit = { 
  flex: 1, padding: '12px', backgroundColor: '#f0f0f0', color: '#333', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const
};
const btnDelete = { 
  flex: 1, padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const
};
const btnSave = { 
  flex: 1, padding: '12px', backgroundColor: '#007BFF', color: 'white', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const
};
const btnCancel = { 
  flex: 1, padding: '12px', backgroundColor: '#6c757d', color: 'white', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const
};

const statusBadge = (status: string) => ({
  marginLeft: '8px', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' as const,
  backgroundColor: status === 'Completado' ? '#dcfce7' : status === 'Jugando' ? '#fef9c3' : '#f3f4f6',
  color: status === 'Completado' ? '#166534' : status === 'Jugando' ? '#854d0e' : '#374151',
});
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Videogame, GameStatus } from '../types';

interface Props {
  onGameAdded: (game: Videogame) => void;
}

export default function GameForm({ onGameAdded }: Props) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState<GameStatus>('Pendiente');
  const [hoursPlayed, setHoursPlayed] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGameData = { title, platform, status, hoursPlayed, imageUrl };
    try {
      const docRef = await addDoc(collection(db, 'videogames'), newGameData);
      onGameAdded({ id: docRef.id, ...newGameData });
      // Limpiar campos
      setTitle(''); setPlatform(''); setHoursPlayed(0); setImageUrl('');
    } catch (error) {
      console.error("Detalles del error:", error);
      alert("Error al guardar en Firebase");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', 
      marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column', gap: '12px' 
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Añadir nuevo juego</h3>
      
      <input placeholder="Título" required value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <select value={platform} onChange={e => setPlatform(e.target.value)} required style={{ ...inputStyle, flex: 1 }}>
          <option value="">Plataforma...</option>
          <option value="PC">PC</option>
          <option value="PS5">PlayStation 5</option>
          <option value="Switch">Nintendo Switch</option>
          <option value="Xbox">Xbox Series</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value as GameStatus)} style={{ ...inputStyle, flex: 1 }}>
          <option value="Pendiente">Pendiente</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
        </select>
      </div>

      <input 
        placeholder="URL de la imagen (Carátula)" 
        required 
        value={imageUrl} 
        onChange={e => setImageUrl(e.target.value)} 
        style={inputStyle} 
      />

      {imageUrl && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>Previsualización:</p>
          <img 
            src={imageUrl} 
            alt="Preview" 
            style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #007BFF' }} 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ color: '#333' }}>Horas jugadas:</label>
        <input type="number" min="0" value={hoursPlayed} onChange={e => setHoursPlayed(Number(e.target.value))} style={{ ...inputStyle, width: '80px' }} />
      </div>

      <button type="submit" style={{ 
        backgroundColor: '#007BFF', color: 'white', padding: '12px', 
        border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
      }}>
        + Agregar a mi colección
      </button>
    </form>
  );
}

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' };
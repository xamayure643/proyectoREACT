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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGameData = { title, platform, status, hoursPlayed };
    try {
      const docRef = await addDoc(collection(db, 'videogames'), newGameData);
      onGameAdded({ id: docRef.id, ...newGameData });
      
      // Limpiamos el formulario tras guardar
      setTitle(''); 
      setPlatform(''); 
      setHoursPlayed(0);
      setStatus('Pendiente');
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar en Firebase");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#eee', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input 
        placeholder="Título del videojuego" 
        required 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        style={{ padding: '8px' }}
      />
      
      <select value={platform} onChange={e => setPlatform(e.target.value)} required style={{ padding: '8px' }}>
        <option value="">Selecciona plataforma...</option>
        <option value="PC">PC</option>
        <option value="PS5">PlayStation 5</option>
        <option value="Switch">Nintendo Switch</option>
        <option value="Xbox">Xbox Series</option>
      </select>

      <select value={status} onChange={e => setStatus(e.target.value as GameStatus)} style={{ padding: '8px' }}>
        <option value="Pendiente">Pendiente</option>
        <option value="Jugando">Jugando</option>
        <option value="Completado">Completado</option>
      </select>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ color: '#333' }}>Horas:</label>
        <input 
          type="number" 
          min="0"
          value={hoursPlayed} 
          onChange={e => setHoursPlayed(Number(e.target.value))} 
          style={{ padding: '8px', width: '80px' }}
        />
      </div>

      <button type="submit" style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Añadir a la colección
      </button>
    </form>
  );
}
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
  const [hoursPlayed, setHoursPlayed] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGameData = { title, platform, status, hoursPlayed };

    try {
      const docRef = await addDoc(collection(db, 'videogames'), newGameData);
      const newGame: Videogame = { id: docRef.id, ...newGameData };
      
      onGameAdded(newGame); // Le avisamos al componente padre que añadimos uno nuevo

      setTitle('');
      setPlatform('');
      setStatus('Pendiente');
      setHoursPlayed(0);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar el juego.");
    }
  };

  return (
    <div style={{ backgroundColor: '#eef2f3', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3>Añadir nuevo juego</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Nombre del juego" required value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '8px' }} />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: '8px' }} required>
          <option value="" disabled>Selecciona una plataforma</option>
          <option value="PC">PC</option>
          <option value="PS5">PlayStation 5</option>
          <option value="PS4">PlayStation 4</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Xbox Series">Xbox Series X/S</option>
          <option value="Retro">Consola Retro</option>
          <option value="Móvil">Móvil</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as GameStatus)} style={{ padding: '8px' }}>
          <option value="Pendiente">Pendiente</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
        </select>
        <input type="number" placeholder="Horas jugadas" min="0" required value={hoursPlayed} onChange={(e) => setHoursPlayed(Number(e.target.value))} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Guardar Juego</button>
      </form>
    </div>
  );
}
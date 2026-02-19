import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Videogame } from './types';
import GameForm from './components/GameForm';
import GameList from './components/GameList';

export default function App() {
  const [games, setGames] = useState<Videogame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videogames'));
        const docs = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Videogame));
        setGames(docs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleAdd = (game: Videogame) => setGames([...games, game]);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Borrar juego?")) {
      await deleteDoc(doc(db, 'videogames', id));
      setGames(games.filter(g => g.id !== id));
    }
  };

  const handleUpdate = async (id: string, fields: Partial<Videogame>) => {
    await updateDoc(doc(db, 'videogames', id), fields);
    setGames(games.map(g => g.id === id ? { ...g, ...fields } : g));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎮 Mis Juegos</h1>
      <GameForm onGameAdded={handleAdd} />
      {loading ? <p style={{ color: '#333' }}>Cargando...</p> : <GameList games={games} onDelete={handleDelete} onUpdate={handleUpdate} />}
    </div>
  );
}
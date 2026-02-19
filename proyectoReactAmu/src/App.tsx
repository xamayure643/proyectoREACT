import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Videogame } from './types';
import GameForm from './components/GameForm';
import GameList from './components/GameList';

export default function App() {
  const [games, setGames] = useState<Videogame[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false); // Para mostrar/ocultar el form

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

  const handleAdd = (game: Videogame) => {
    setGames([...games, game]);
    setIsFormOpen(false); // Cerramos el form al añadir
  };

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
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* --- MENU SUPERIOR (HEADER) --- */}
      <header style={{
        backgroundColor: '#1a1a1a', color: 'white', padding: '15px 30px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>🎮 GameVault</h1>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          style={{
            backgroundColor: '#007BFF', color: 'white', border: 'none', 
            padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          {isFormOpen ? 'Cerrar' : '+ Añadir Juego'}
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
        {/* Sección del formulario (solo se ve si pulsas el botón) */}
        {isFormOpen && (
          <div style={{ marginBottom: '40px' }}>
             <GameForm onGameAdded={handleAdd} />
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>Cargando colección...</p>
        ) : (
          <GameList games={games} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </main>
    </div>
  );
}
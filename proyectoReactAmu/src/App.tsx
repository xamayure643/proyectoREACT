import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Videogame } from './types';
import GameForm from './components/GameForm';
import GameList from './components/GameList';

export default function App() {
  const [games, setGames] = useState<Videogame[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videogames'));
        const docs = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Videogame));
        setGames(docs);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchGames();
  }, []);

  const handleAdd = (game: Videogame) => { setGames([...games, game]); setShowForm(false); };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar juego?")) {
      await deleteDoc(doc(db, 'videogames', id));
      setGames(games.filter(g => g.id !== id));
    }
  };

  const handleUpdate = async (id: string, fields: Partial<Videogame>) => {
    await updateDoc(doc(db, 'videogames', id), fields);
    setGames(games.map(g => g.id === id ? { ...g, ...fields } : g));
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden; /* Evita que la página se mueva hacia los lados */
        }
        * {
          box-sizing: border-box; /* Asegura que el padding no añada tamaño extra */
        }
      `}</style>

      <header style={{ 
        backgroundColor: '#111', 
        color: '#fff', 
        padding: '15px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        width: '100%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Mi lista de juegos</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={{ 
            backgroundColor: '#007BFF', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
        >
          {showForm ? 'Cerrar' : '+ Añadir Juego'}
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 5%' }}>
        {showForm && (
          <div style={{ 
            marginBottom: '40px',
            animation: 'fadeIn 0.3s ease-in' 
          }}>
            <GameForm onGameAdded={handleAdd} />
          </div>
        )}
        
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>Cargando colección...</p>
          </div>
        ) : (
          <GameList games={games} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
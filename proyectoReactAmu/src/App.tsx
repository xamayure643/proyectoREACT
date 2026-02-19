import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import type { Videogame } from './types';
import GameForm from './components/GameForm';
import GameList from './components/GameList';

function App() {
  const [games, setGames] = useState<Videogame[]>([]);
  const [loading, setLoading] = useState(true); 

  // Cargar juegos al inicio
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videogames'));
        const gamesList: Videogame[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          platform: doc.data().platform,
          status: doc.data().status,
          hoursPlayed: doc.data().hoursPlayed,
        }));
        setGames(gamesList);
      } catch (error) {
        console.error("Error al cargar:", error);
        alert("Hubo un error al cargar los datos.");
      } finally {
        setLoading(false); 
      }
    };
    fetchGames();
  }, []);

  // Función para cuando el formulario crea un juego nuevo
  const handleGameAdded = (newGame: Videogame) => {
    setGames([...games, newGame]);
  };

  // Función para cuando la tarjeta pide borrar un juego
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este juego de tu colección?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'videogames', id));
        setGames(games.filter((game) => game.id !== id));
      } catch (error) {
        console.error("Error al borrar:", error);
        alert("No se pudo borrar el juego.");
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🎮 Mi Gestor de Videojuegos</h1>

      {/* Usamos nuestros nuevos componentes! */}
      <GameForm onGameAdded={handleGameAdded} />

      {loading ? (
        <h2 style={{ textAlign: 'center', color: '#666' }}>⏳ Cargando tu colección...</h2>
      ) : (
        <GameList games={games} onDelete={handleDelete} />
      )}
      
    </div>
  );
}

export default App;
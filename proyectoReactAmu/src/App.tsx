import { useState, useEffect } from 'react';
// IMPORTANTE: Añadimos 'doc' y 'deleteDoc' a nuestras herramientas de Firebase
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import type { Videogame, GameStatus } from './types';

function App() {
  const [games, setGames] = useState<Videogame[]>([]);
  const [loading, setLoading] = useState(true); 

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState<GameStatus>('Pendiente');
  const [hoursPlayed, setHoursPlayed] = useState<number>(0);

  // --- READ: Cargar juegos ---
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

  // --- CREATE: Guardar juego ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGameData = { title, platform, status, hoursPlayed };

    try {
      const docRef = await addDoc(collection(db, 'videogames'), newGameData);
      const newGame: Videogame = { id: docRef.id, ...newGameData };
      setGames([...games, newGame]);

      setTitle('');
      setPlatform('');
      setStatus('Pendiente');
      setHoursPlayed(0);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar el juego.");
    }
  };

  // --- DELETE: Borrar juego ---
  const handleDelete = async (id: string) => {
    // Confirmación visual (Requisito del profesor ✅)
    const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este juego de tu colección?");
    
    if (confirmDelete) {
      try {
        // 1. Lo borramos de la base de datos de Firebase
        await deleteDoc(doc(db, 'videogames', id));
        
        // 2. Lo quitamos de la lista visual en React
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

      {loading ? (
        <h2 style={{ textAlign: 'center', color: '#666' }}>⏳ Cargando tu colección...</h2>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {games.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No tienes juegos todavía. ¡Añade uno!</p>
          ) : (
            games.map((game) => (
              <div key={game.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#fff', color: '#333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ marginTop: 0 }}>{game.title}</h2>
                  <p style={{ margin: '5px 0' }}><strong>Plataforma:</strong> {game.platform}</p>
                  <p style={{ margin: '5px 0' }}><strong>Estado:</strong> {game.status}</p>
                  <p style={{ margin: '5px 0' }}><strong>Horas jugadas:</strong> {game.hoursPlayed} h</p>
                </div>
                
                {/* BOTÓN DE BORRAR */}
                <button 
                  onClick={() => game.id && handleDelete(game.id)}
                  style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', height: 'fit-content' }}
                >
                  Borrar
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
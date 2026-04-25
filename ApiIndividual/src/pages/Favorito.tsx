import { useState, useEffect } from 'react';

const Favorito = () => {
  const [myFavorites, setMyFavorites] = useState<any[]>([]);

  useEffect(() => {
    // Al cargar la pestaña, leemos el localStorage
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setMyFavorites(saved);
  }, []);

  const removeFavorite = (id: string) => {
    const updated = myFavorites.filter(fav => fav.id !== id);
    setMyFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Cohetes Favoritos</h1>
      
      {myFavorites.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ color: '#8b949e', fontSize: '1.2rem' }}>Aún no has seleccionado favoritos.</p>
          <p>Ve al Home y selecciona "Guardar Favorito" en un cohete.</p>
        </div>
      ) : (
        <div className="rocket-grid">
          {myFavorites.map(rocket => (
            <div key={rocket.id} className="rocket-card">
              <img src={rocket.flickr_images[0]} alt={rocket.name} />
              <div className="rocket-info">
                <h3>{rocket.name}</h3>
                <button 
                  onClick={() => removeFavorite(rocket.id)}
                  style={{ background: '#f85149', width: '100%', padding: '10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ELIMINAR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Favorito;
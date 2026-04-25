import { useState, useEffect } from 'react';

const Home = () => {
  const [rockets, setRockets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [selectedRocket, setSelectedRocket] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then(response => response.json())
      .then(data => setRockets(data))
      .catch(error => console.error("Error cargando SpaceX:", error));
  }, []);

  const toggleFavorite = (rocket: any) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = savedFavorites.some((fav: any) => fav.id === rocket.id);
    
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = savedFavorites.filter((fav: any) => fav.id !== rocket.id);
      alert(`❌ ${rocket.name} eliminado de favoritos`);
    } else {
      updatedFavorites = [...savedFavorites, rocket];
      alert(`⭐ ${rocket.name} guardado en favoritos`);
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredRockets = rockets.filter(rocket => {
    const matchesSearch = rocket.name.toLowerCase().includes(search.toLowerCase());
    const matchesActive = filterActive ? rocket.active : true;
    return matchesSearch && matchesActive;
  });

  return (
    <div style={{ paddingBottom: '50px' }}>
      <div className="controls">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}> SpaceX Fleet</h1>
        <p>Explora la tecnología que nos llevará a las estrellas.</p>
        
        <div style={{ marginTop: '20px' }}>
          <input 
            type="text" 
            placeholder="Buscar cohete (ej: Falcon)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label style={{ marginLeft: '20px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={filterActive} 
              onChange={() => setFilterActive(!filterActive)} 
            />
            Ver solo activos
          </label>
        </div>
      </div>

      <div className="rocket-grid">
        {filteredRockets.map(rocket => (
          <div key={rocket.id} className="rocket-card">
            <img src={rocket.flickr_images[0]} alt={rocket.name} />
            <div className="rocket-info">
              <span className={`status-badge ${rocket.active ? 'active' : 'inactive'}`}>
                {rocket.active ? "● ACTIVO" : "● INACTIVO"}
              </span>
              <h3>{rocket.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>Primer vuelo: {rocket.first_flight}</p>
              
              <button 
                onClick={() => setSelectedRocket(rocket)}
                style={{ 
                  marginTop: '15px', 
                  cursor: 'pointer', 
                  backgroundColor: 'transparent',
                  color: '#3190fd',
                  border: '1px solid #3190fd',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  transition: '0.3s',
                  width: '100%',
                  textTransform: 'uppercase'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(49, 144, 253, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(49, 144, 253, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                DETALLES DE MISIÓN
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRocket && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(8px)', padding: '20px'
        }}>
          <div style={{
            background: '#161b22', padding: '30px', borderRadius: '15px',
            maxWidth: '600px', width: '100%', border: '1px solid #58a6ff', color: 'white',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h2 style={{ color: '#58a6ff', marginTop: 0 }}>{selectedRocket.name}</h2>
            <img 
              src={selectedRocket.flickr_images[1] || selectedRocket.flickr_images[0]} 
              style={{ width: '100%', borderRadius: '8px', height: '200px', objectFit: 'cover' }} 
            />
            
            <p style={{ lineHeight: '1.6', margin: '20px 0', color: '#d1d5db' }}>
              {selectedRocket.description}
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '15px', 
              background: 'rgba(255,255,255,0.05)',
              padding: '15px',
              borderRadius: '8px'
            }}>
              <div><strong>Altura:</strong> {selectedRocket.height.meters} m</div>
              <div><strong>Diámetro:</strong> {selectedRocket.diameter.meters} m</div>
              <div><strong>Masa:</strong> {selectedRocket.mass.kg.toLocaleString()} kg</div>
              <div><strong>Etapas:</strong> {selectedRocket.stages}</div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong>Costo:</strong> 
                <span style={{ color: '#3fb950' }}> ${selectedRocket.cost_per_launch.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <button 
                onClick={() => setSelectedRocket(null)}
                style={{ 
                  flex: 1,
                  background: '#f85149', 
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cerrar Info
              </button>
              
              <button 
                onClick={() => toggleFavorite(selectedRocket)}
                style={{ 
                  flex: 1,
                  background: '#e3b341', 
                  color: 'black',
                  fontWeight: 'bold',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Favorito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
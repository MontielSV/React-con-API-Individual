import { useState, useEffect } from 'react';

const Original = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then(res => res.json())
      .then(data => {

        const expensive = [...data].sort((a, b) => b.cost_per_launch - a.cost_per_launch)[0];

        // Convertimos el string "YYYY-MM-DD" a fecha para comparar
        const veteran = [...data].sort((a, b) => 
          new Date(a.first_flight).getTime() - new Date(b.first_flight).getTime()
        )[0];

        const totalHeight = data.reduce((acc: number, r: any) => acc + r.height.meters, 0);

        setStats({
          expensive,
          veteran,
          total: data.length,
          avgHeight: (totalHeight / data.length).toFixed(1)
        });
      });
  }, []);

  if (!stats) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando análisis de flota...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#58a6ff', textTransform: 'uppercase', letterSpacing: '2px' }}>
         Análisis de Ingeniería SpaceX
      </h1>
      <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '40px' }}>
        Datos técnicos extraídos en tiempo real de la API oficial.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '25px' 
      }}>
        
        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', color: '#e3b341', fontWeight: 'bold' }}> MAYOR INVERSIÓN</div>
          <h2 style={{ margin: '10px 0' }}>{stats.expensive.name}</h2>
          <p style={{ fontSize: '1.5rem', margin: '5px 0' }}>
            ${stats.expensive.cost_per_launch.toLocaleString()}
          </p>
          <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>Costo por cada lanzamiento individual.</p>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', color: '#3fb950', fontWeight: 'bold' }}> MÁS VETERANO</div>
          <h2 style={{ margin: '10px 0' }}>{stats.veteran.name}</h2>
          <p style={{ fontSize: '1.5rem', margin: '5px 0' }}>
            {new Date().getFullYear() - new Date(stats.veteran.first_flight).getFullYear()} Años
          </p>
          <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>
            En la flota desde su primer vuelo en {stats.veteran.first_flight.split('-')[0]}.
          </p>
        </div>

        <div style={{ ...cardStyle, background: 'linear-gradient(145deg, #161b22, #1c2128)' }}>
          <div style={{ fontSize: '0.8rem', color: '#3190fd', fontWeight: 'bold' }}> ESCALA MEDIA</div>
          <h2 style={{ margin: '10px 0' }}>{stats.avgHeight} Metros</h2>
          <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>Altura promedio de los cohetes diseñados por SpaceX.</p>
        </div>

        <div style={{ ...cardStyle, background: 'linear-gradient(145deg, #161b22, #1c2128)' }}>
          <div style={{ fontSize: '0.8rem', color: '#a371f7', fontWeight: 'bold' }}> TOTAL MODELOS</div>
          <h2 style={{ margin: '10px 0' }}>{stats.total} Diseños</h2>
          <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>Variaciones de ingeniería registradas hasta hoy.</p>
        </div>

      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        border: '1px solid #30363d', 
        borderRadius: '8px', 
        backgroundColor: 'rgba(49, 144, 253, 0.05)',
        textAlign: 'center'
      }}>
        <p style={{ color: '#58a6ff', margin: 0, fontSize: '0.9rem' }}>
          <strong>Nota:</strong> Estos cálculos se muestran automaticamente apartir de la información de la Api de SpaceX.
        </p>
      </div>
    </div>
  );
};

const cardStyle = {
  background: '#161b22',
  padding: '30px',
  borderRadius: '16px',
  border: '1px solid #30363d',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  transition: 'transform 0.3s ease'
};

export default Original;
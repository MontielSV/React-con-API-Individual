const Informativa = () => {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      color: '#d1d5db', 
      lineHeight: '1.8',
      fontFamily: 'sans-serif' 
    }}>

      <h1 style={{ color: '#58a6ff', textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>
        Documentación del Proyecto
      </h1>
      <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '40px' }}>
        Análisis técnico y origen de la información
      </p>

      <hr style={{ borderColor: '#30363d', marginBottom: '40px' }} />

      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#ffffff' }}> Origen de los Datos (API)</h2>
        <p>
          Esta aplicación consume información en tiempo real de la <strong>SpaceX API (r-spacex)</strong>, 
          una base de datos de código abierto que proporciona detalles exhaustivos sobre lanzamientos, 
          cohetes, cápsulas y naves espaciales desarrolladas por SpaceX.
        </p>
        <div style={{ 
          background: '#161b22', 
          padding: '15px', 
          borderRadius: '8px', 
          borderLeft: '4px solid #3fb950',
          marginTop: '15px'
        }}>
          <strong>Endpoint utilizado:</strong> <code>https://api.spacexdata.com/v4/rockets</code>
        </div>
      </section>

      <section style={{ 
        marginBottom: '50px', 
        padding: '30px', 
        background: 'linear-gradient(145deg, #0d1117, #161b22)', 
        borderRadius: '15px',
        border: '1px solid #30363d'
      }}>
        <h2 style={{ color: '#ffffff', marginTop: 0 }}> Contexto Institucional</h2>
        <p>
          Este proyecto ha sido desarrollado como parte del proceso de formación académica en el 
          <strong> Instituto San Agustín</strong>. La aplicación demuestra la integración de 
          tecnologías modernas de desarrollo web (React + TypeScript) para la gestión y 
          visualización de datos complejos.
        </p>
        <p>
          La temática espacial fue elegida para poner a prueba el manejo de estados, 
          hooks de efectos y la persistencia de datos mediante el almacenamiento local.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#ffffff' }}> Stack Tecnológico</h2>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
          <li><strong style={{ color: '#58a6ff' }}>React 18:</strong> Librería principal para la interfaz.</li>
          <li><strong style={{ color: '#58a6ff' }}>TypeScript:</strong> Para un tipado fuerte y reducción de errores.</li>
          <li><strong style={{ color: '#58a6ff' }}>React Router:</strong> Gestión de las 5 pestañas de navegación.</li>
          <li><strong style={{ color: '#58a6ff' }}>LocalStorage:</strong> Persistencia de la lista de favoritos.</li>
        </ul>
      </section>

      <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '0.8rem', color: '#8b949e' }}>
        <p>© 2026 - Desarrollo de Software | San Agustín</p>
      </footer>
    </div>
  );
};

export default Informativa;
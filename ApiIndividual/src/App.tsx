import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorito from './pages/Favorito';
import Original from './pages/Original';
import Informativa from './pages/Informativa';
import Usuario from './pages/Usuario';
import './index.css';

function App() {
  return (
    <Router>

      <nav style={{ 
        padding: '15px', 
        background: '#000', 
        display: 'flex', 
        gap: '20px',
        justifyContent: 'center' 
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/favoritos" style={{ color: 'white', textDecoration: 'none' }}>Favoritos</Link>
        <Link to="/original" style={{ color: 'white', textDecoration: 'none' }}>Original</Link>
        <Link to="/informativa" style={{ color: 'white', textDecoration: 'none' }}>Informativa</Link>
        <Link to="/usuario" style={{ color: 'white', textDecoration: 'none' }}>Usuario</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorito />} />
        <Route path="/original" element={<Original />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import NotificationContainer from './components/NotificationContainer';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Usuarios from './pages/Usuarios';
import Peliculas from './pages/Peliculas';
import DetallePelicula from './pages/DetallePelicula';
import DetallePeliculaTMDB from './pages/DetallePeliculaTMDB';
import Carrito from './pages/Carrito';
import Foro from './pages/Foro';
import ForoTema from './pages/ForoTema';
import Empresa from './pages/Empresa';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/peliculas" element={<Peliculas />} />
                <Route path="/pelicula/:id" element={<DetallePelicula />} />
                <Route path="/pelicula/tmdb/:id" element={<DetallePeliculaTMDB />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/foro" element={<Foro />} />
                <Route path="/foro/tema/:id" element={<ForoTema />} />
                <Route path="/empresa" element={<Empresa />} />
              </Routes>
            </div>
            <NotificationContainer />
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
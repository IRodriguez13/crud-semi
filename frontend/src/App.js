import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Usuarios from './pages/Usuarios';
import Productos from './pages/Productos';
import Empresa from './pages/Empresa';
import ConsultaUsuarios from './pages/ConsultaUsuarios';

function App() {
  return (
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
              <Route path="/productos" element={<Productos />} />
              <Route path="/consulta-usuarios" element={<ConsultaUsuarios />} />
              <Route path="/empresa" element={<Empresa />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
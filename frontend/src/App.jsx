// ✅ BENAR - hanya pakai <Routes> dan <Route> di App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Logbook from './pages/Logbook';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logbook" element={<Logbook />} />
    </Routes>
  );
}

export default App;

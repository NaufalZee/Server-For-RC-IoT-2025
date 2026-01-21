import { Link, useNavigate } from 'react-router-dom';

function Navbar({ username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="fw-bold fs-5">🔵 RC SmartControl</div>

      <div className="d-flex gap-4 align-items-center">
        <Link to="/dashboard" className="text-decoration-none text-dark">Analytic Dashboard</Link>
        <Link to="/logbook" className="text-decoration-none text-dark">Logbook</Link>
        <Link to="/settings" className="text-decoration-none text-dark">Settings</Link>

        <span className="text-muted">Hi, {username || 'Guest'}</span>
        <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

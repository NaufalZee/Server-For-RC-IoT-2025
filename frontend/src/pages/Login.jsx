import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <img src="/logo.png" alt="Zaly Logo" style={{ width: '300px', marginBottom: '20px' }} />
      <h5 className="mb-4 fw-bold">ZALY REMOTE DRIVE</h5>

      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '350px' }}>
        <h5 className="mb-3 text-center">Sign In to Your Account</h5>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-danger mb-3 text-center">{error}</div>}

        <button onClick={handleLogin} className="btn btn-primary w-100">Sign In</button>

        <div className="text-center mt-3">
          <small>Don't have an account? <Link to="/register">Sign Up</Link></small>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Register successful!');
        navigate('/'); // Redirect ke login setelah register
      } else {
        alert(data.message || 'Register failed');
      }
    } catch (err) {
      console.error(err);
      alert('Register request failed');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <img src="/logo.png" alt="Zaly Logo" style={{ width: '300px', marginBottom: '20px' }} />
      <h5 className="mb-4 fw-bold">ZALY REMOTE DRIVE</h5>

      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '350px' }}>
        <h5 className="mb-3 text-center">Create a New Account</h5>

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

        <button onClick={handleRegister} className="btn btn-primary w-100">Sign Up</button>

        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/">Sign In</Link></small>
        </div>
      </div>
    </div>
  );
}

export default Register;

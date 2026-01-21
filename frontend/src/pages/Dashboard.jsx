import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [telemetry, setTelemetry] = useState({});
  const [user, setUser] = useState('Guest');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token) {
      navigate('/'); // Redirect ke login kalau belum login
    } else {
      setUser(username || 'Guest');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/telemetry/latest');
        const data = await res.json();
        setTelemetry(data);
      } catch (err) {
        console.error('Gagal mengambil data telemetry:', err);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar username={user} />

      <div className="container mt-4">
        <div className="card p-4 shadow">
          <div className="d-flex justify-content-between">
            <h5>Welcome, {user}</h5>
            <div>{telemetry.timestamp ? new Date(telemetry.timestamp).toLocaleString() : '---'}</div>
          </div>
          <hr />
          {!telemetry.speed && !telemetry.distance ? (
            <p className="text-center text-muted">Loading telemetry data...</p>
          ) : (
            <div className="d-flex justify-content-around text-center mt-4">
              <div>
                <h4>Speed</h4>
                <p className="fs-2">{telemetry.speed || 0} <small>km/h</small></p>
              </div>
              <div>
                <h4>Distance</h4>
                <p className="fs-2">{telemetry.distance || 0} <small>m</small></p>
                <span className="badge bg-success">Connected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Logbook() {
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token) {
      navigate('/'); // Redirect ke login jika belum login
    } else {
      setUser(username || 'Guest');
      fetchLogData(token);
    }
  }, [navigate]);

  const fetchLogData = async (token) => {
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setLogs(data.data || []);
    } catch (err) {
      console.error('Gagal mengambil data log:', err);
    }
  };

  return (
    <div>
      <Navbar username={user} />

      <div className="container mt-4">
        <h3>Login Activity Log</h3>
        <div className="card p-3 shadow mt-3">
          {logs.length === 0 ? (
            <p className="text-muted text-center">No login data available.</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log._id}>
                    <td>{index + 1}</td>
                    <td>{log.username}</td>
                    <td>
                      <span className={`badge ${log.status === 'success' ? 'bg-success' : 'bg-danger'}`}>
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td>{log.loginTime ? new Date(log.loginTime).toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Logbook;

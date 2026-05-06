import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      alert("Fel inloggning");
      return;
    }

    const data = await res.json();

    localStorage.setItem("user", data.email);

    navigate("/my-plans");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#174a7c" }}>
      
      <div className="bg-white p-4 rounded" style={{ width: "300px" }}>
        <h4 className="mb-3">Logga in</h4>

        <input
          className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <input className="form-control mb-3" type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary">Avbryt</button>
          <button className="btn btn-primary"onClick={handleLogin}>
            Logga in
          </button>
        </div>
      </div>

    </div>
  );
}

export default Login;

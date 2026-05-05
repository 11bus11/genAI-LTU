import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#174a7c" }}>
      
      <div className="bg-white p-4 rounded" style={{ width: "300px" }}>
        <h4 className="mb-3">Logga in</h4>

        <input className="form-control mb-2" placeholder="Email" />
        <input className="form-control mb-3" type="password" placeholder="Lösenord" />

        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary">Avbryt</button>
          <button className="btn btn-primary">Logga in</button>
        </div>
      </div>

    </div>
  );
}

export default Login;

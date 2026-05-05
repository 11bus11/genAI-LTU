import 'bootstrap/dist/css/bootstrap.min.css';

function ViewPlan() {
  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#174a7c" }}>

      <div className="d-flex justify-content-between text-white mb-4">
        <span>Home</span>
        <span>Logga ut</span>
      </div>

      <h2 className="text-center text-white mb-5">Studieplan Databaser</h2>

      <div className="bg-white p-4 rounded mx-auto" style={{ maxWidth: "800px" }}>
        
        <p><strong>Start:</strong> 10 maj</p>
        <p><strong>Deadline:</strong> 15 maj</p>
        <p><strong>Studietid:</strong> 20h/vecka</p>

        <hr />

        <p>Vecka 1:</p>
        <p>Måndag: Läs kapitel 1</p>
        <p>Tisdag: Övningar</p>

        <div className="text-end mt-3">
          <button className="btn btn-danger">Avbryt</button>
        </div>

      </div>

    </div>
  );
}

export default ViewPlan;

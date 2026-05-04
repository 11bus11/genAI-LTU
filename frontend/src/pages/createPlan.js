import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function CreatePlan() {
  const [chatResponse] = useState(null);

  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#174a7c" }}>

      {/* Top bar */}
      <div className="d-flex justify-content-between text-white mb-4">
        <span>Home</span>
        <span>Logga ut</span>
      </div>

      <h2 className="text-center text-white mb-5">Generera studieplan</h2>

      {chatResponse ? (
        <p className="text-white">{chatResponse.response}</p>
      ) : (
        <p className="text-white">Laddar...</p>
      )}

      <div className="row bg-white rounded p-4 mx-auto" style={{ maxWidth: "1000px" }}>

        {/* Left side */}
        <div className="col-md-5">

          <div className="mb-3">
            <label>Kursnamn</label>
            <input className="form-control" placeholder="Skriv kurs..." />
          </div>

          <div className="mb-3">
            <label>Deadline</label>
            <input type="date" className="form-control" />
          </div>

          <div className="mb-3">
            <label>Studietid (timmar/vecka)</label>
            <input className="form-control" placeholder="T.ex. 10" />
          </div>

          <div className="mb-3">
            <label>Beskrivning</label>
            <textarea className="form-control" placeholder="Beskriv kursen..."></textarea>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-success">Generera studieplan</button>
            <button className="btn btn-danger">Avbryt</button>
          </div>

        </div>

        {/* Right side */}
        <div
          className="col-md-6 offset-md-1 border rounded d-flex align-items-center justify-content-center"
          style={{ height: "300px", backgroundColor: "#ffffff" }}
        >
          <p className="text-muted">Studieplan kommer visas här</p>
        </div>

      </div>
    </div>
  );
}

export default CreatePlan;

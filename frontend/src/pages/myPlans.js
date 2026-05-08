import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function MyPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch ("http://localhost:5000/api/studyplan/my-plans", {
      headers: {
        "user-email": localStorage.getItem("user")
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPlans(data);
      })
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#174a7c" }}>

      {/* Top bar */}
      <div className="d-flex justify-content-between text-white mb-4">
        <span>Home</span>
        <span>Logga ut</span>
      </div>

      <h2 className="text-center text-white mb-5">Mina studieplaner</h2>

      <div className="bg-white rounded p-4 mx-auto" style={{ maxWidth: "800px" }}>

        {/* EXEMPEL (matchar wireframe med innehåll) */}
        <div className="mb-3 p-3 border rounded">
          <h5>Databaser D007E</h5>
          <p>Deadline: 15 maj</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-sm">Öppna</button>
            <button className="btn btn-danger btn-sm">Ta bort</button>
          </div>
        </div>

        <div className="mb-3 p-3 border rounded">
          <h5>Java programmering D007E</h5>
          <p>Deadline: 1 juni</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-sm">Öppna</button>
            <button className="btn btn-danger btn-sm">Ta bort</button>
          </div>
        </div>

        {/* TOM STATE */}
        <p className="text-center text-muted mt-4">
          Du har inga studieplaner
        </p>

        <div className="text-end mt-3">
          <button className="btn btn-success">
            Generera ny studieplan
          </button>
        </div>

      </div>

    </div>
  );
}

export default MyPlans;

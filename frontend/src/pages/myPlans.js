import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

function MyPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

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

    const handleDelete = async (id) => {
      const response = await fetch(`http://localhost:5000/api/studyplan/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Kunde inte ta bort studieplanen');
        return;
      }
      setPlans(plans.filter(plan => plan.id !== id));
    }

  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#174a7c" }}>

      {/* Top bar */}
      <div className="d-flex justify-content-between text-white mb-4">
        <span>Home</span>
        <span onClick={() => logout(navigate)} style={{ cursor: 'pointer' }}>
          Logga ut
        </span>
      </div>

      <h2 className="text-center text-white mb-5">Mina studieplaner</h2>

      <div className="bg-white rounded p-4 mx-auto" style={{ maxWidth: "800px" }}>

        {plans.length > 0 ? (
          plans.map((plan) => (
            <div key={plan.id} className="mb-3 p-3 border rounded">
              <h5>{plan.courseName}</h5>
              <p>
                Deadline: {new Date(plan.deadline).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/view-plan/${plan.id}`)}
                >
                  Öppna
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(plan.id)}
              >
                Ta bort
              </button>
            </div>
          </div>
        ))
) : (
  <p className="text-center text-muted mt-4">
    Du har inga studieplaner
  </p>
)}

        <div className="text-end mt-3">
          <button className="btn btn-success" onClick={() => navigate('/create-plan')}>
            Generera ny studieplan
          </button>
        </div>

      </div>

    </div>
  );
}

export default MyPlans;

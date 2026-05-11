import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/StudyPlan/my-plans", {
      headers: {
        "user-email": "student@ltu.se"
      }
    })
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Kunde inte hämta studieplaner:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/StudyPlan/${id}`, {
        method: "DELETE"
      });

      setPlans(plans.filter((plan) => plan.id !== id));
    } catch (err) {
      console.error("Kunde inte ta bort studieplan:", err);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Saknas";
    return new Date(date).toLocaleDateString("sv-SE");
  };

  return (
    <div
      className="container-fluid min-vh-100 p-4"
      style={{ backgroundColor: "#174a7c" }}
    >
      <div className="d-flex justify-content-between text-white mb-4">
        <span>Home</span>
        <span>Logga ut</span>
      </div>

      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-white">Mina studieplaner</h2>

          <button className="btn btn-success btn-sm">
            + Generera ny studieplan
          </button>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white p-4 rounded text-center">
            <p className="mb-0">Du har inga studieplaner ännu.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded p-3 mb-3 shadow-sm"
            >
              <h5 className="mb-2">
                {plan.courseName || plan.name}{" "}
                {plan.courseCode && `(${plan.courseCode})`}
              </h5>

              <p className="mb-1 text-muted">
                Här kan man lägga beskrivning för studieplan
              </p>

              <p className="mb-1">
                <strong>Start:</strong> {formatDate(plan.startDate)}
              </p>

              <p className="mb-3">
                <strong>Deadline:</strong> {formatDate(plan.deadline)}
              </p>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/viewPlan/${plan.id}`)}
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
        )}
      </div>
    </div>
  );
}

export default MyPlans;
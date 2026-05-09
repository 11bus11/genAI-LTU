import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewPlan() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/StudyPlan/${id}`)
      .then(res => res.json())
      .then(data => setPlan(data))
      .catch(err => console.error("Kunde inte hämta studieplan:", err));
  }, [id]);

  if (!plan) {
    return <p>Laddar studieplan...</p>;
  }

  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#174a7c" }}>
      <div className="d-flex justify-content-between text-white mb-4">
        <span>Home</span>
        <span>Logga ut</span>
      </div>

      <h2 className="text-center text-white mb-5">
        {plan.courseName || plan.name}
      </h2>

      <div className="bg-white p-4 rounded mx-auto" style={{ maxWidth: "800px" }}>
        <p><strong>Kurs:</strong> {plan.courseName}</p>
        <p><strong>Kurskod:</strong> {plan.courseCode}</p>
        <p><strong>Start:</strong> {new Date(plan.startDate).toLocaleDateString()}</p>
        <p><strong>Deadline:</strong> {new Date(plan.deadline).toLocaleDateString()}</p>
        <p><strong>Studietid:</strong> {plan.studyHoursPerWeek}h/vecka</p>

        <hr />

        <h5>AI-genererad studieplan</h5>
        <p style={{ whiteSpace: "pre-line" }}>
          {plan.generatedPlan}
        </p>

        <div className="text-end mt-3">
          <button className="btn btn-danger">Avbryt</button>
        </div>
      </div>
    </div>
  );
}

export default ViewPlan;
import 'bootstrap/dist/css/bootstrap.min.css';
import { use, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { logout } from '../utils/auth';

function CreatePlan() {
  const [chatResponse, setChatResponse] = useState();
  const corse = "";
  const deadline = "";
  const startTime = "";
  const studyTime = "";
  const description = "";
  const planContent = "";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDataAi(email, course, deadline, startTime, studyTime, description) {
      // Example of fetching data from the backend
      fetch('/api/Chat/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify('Skapa en studieplan för kursen ' + course + 'med deadline' + deadline + 'startdatum ' + startTime + ', studietid ' + studyTime + 'timmar per vecka och beskrivning ' + description + '. Planen ska innehålla en översikt över vad som behöver göras varje vecka fram till deadline.'),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setChatResponse(data);
          savePlan(email, data.response , course, deadline, startTime, studyTime, description);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    async function savePlan(email, planContent, course, deadline, startTime, studyTime, description) {
      fetch('/api/studyplan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          planContent: planContent,
          courseCode: course,
          startDate: startTime,
          deadline: deadline,
          studyHoursPerWeek: parseInt(studyTime)
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Plan saved:', data);
          navigate('/view-plan/' + data.id);
        })
        .catch(error => console.error('Error saving plan:', error));

      
    }

    const generateButton = document.querySelector('#generate');
    const handleClick = (e) => {
      e.target.textContent = "Genererar...";

      const email = localStorage.getItem("user");
      if (!email) {
        alert("Du måste logga in först");
        return;
      }

      const course = document.querySelector('#course').value;
      const deadline = document.querySelector('#deadline').value;
      const startTime = document.querySelector('#startTime').value;
      const studyTime = document.querySelector('#time').value;
      const description = document.querySelector('#desc').value;

      //const planContent = "fetchDataAi(course, deadline, startTime, studyTime, description)";
      fetchDataAi(email, course, deadline, startTime, studyTime, description);

      
    };

    if (generateButton) {
      generateButton.addEventListener('click', handleClick);
    }

    return () => {
      if (generateButton) {
        generateButton.removeEventListener('click', handleClick);
      }
    };
  }, []);


  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#174a7c" }}>

      {/* Top bar */}
      <div className="d-flex justify-content-between text-white mb-4">
        <NavLink to="/my-plans" activeStyle>Home</NavLink>
        <span onClick={() => logout(navigate)} style={{ cursor: 'pointer' }}>
          Logga ut
        </span>
      </div>

      <h2 className="text-center text-white mb-5">Generera studieplan</h2>

      

      <div className="row bg-white rounded p-4 mx-auto" style={{ maxWidth: "1000px" }}>

        {/* Left side */}
        <div className="col-md-5">

          <div className="mb-3">
            <label>Kursnamn</label>
            <input id="course" className="form-control" placeholder="Skriv kurs..." />
          </div>

          <div className="mb-3">
            <label>Deadline</label>
            <input id="deadline" type="date" className="form-control" />
          </div>

          <div className="mb-3">
            <label>Studiestart</label>
            <input id="startTime" type="date" className="form-control" />
          </div>

          <div className="mb-3">
            <label>Studietid (timmar/vecka)</label>
            <input id="time" className="form-control" placeholder="T.ex. 10" />
          </div>

          <div className="mb-3">
            <label>Beskrivning</label>
            <textarea id="desc" className="form-control" placeholder="Beskriv kursen..."></textarea>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button id="generate" className="btn btn-success">Generera studieplan</button>
            <button className="btn btn-danger">Avbryt</button>
          </div>

        </div>

        {/* Right side */}
        <div
          className="col-md-6 offset-md-1 border rounded d-flex align-items-center justify-content-center"
          style={{ height: "300px", backgroundColor: "#ffffff" }}
        >
        {chatResponse ? (
          <p className="text-black">{chatResponse.response}</p>
          ) : (
          <p className="text-muted">Laddar...</p>
        )}
        </div>

      </div>
    </div>
  );
}

export default CreatePlan;

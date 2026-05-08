import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function CreatePlan() {
  const [chatResponse, setChatResponse] = useState();
  const corse = "";
  const deadline = "";
  const studyTime = "";
  const description = "";
  const planContent = "";

  useEffect(() => {
    async function fetchDataAi(corse, deadline, studyTime, description) {
      // Example of fetching data from the backend
      fetch('/api/Chat/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify('Skapa en studieplan för kursen ' + corse + 'med deadline' + deadline + ', studietid ' + studyTime + 'timmar per vecka och beskrivning ' + description + '. Planen ska innehålla en översikt över vad som behöver göras varje vecka fram till deadline.'),
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
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    const generateButton = document.querySelector('#generate');
    const handleClick = (e) => {
      e.target.textContent = "Genererar...";

      const corse = document.querySelector('#course').value;
      const deadline = document.querySelector('#deadline').value;
      const studyTime = document.querySelector('#time').value;
      const description = document.querySelector('#desc').value;

      fetchDataAi(corse, deadline, studyTime, description);
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
        <span>Logga ut</span>
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

import 'bootstrap/dist/css/bootstrap.min.css';
import { use, useEffect, useState } from 'react';

function App() {
  const [chatResponse, setChatResponse] = useState();

  useEffect(() => {
    // Example of fetching data from the backend
    fetch('/api/Chat/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('Hello'),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setChatResponse(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Generera studieplan</h2>
      {chatResponse ? <p>{chatResponse.response}</p> : <p>Laddar...</p>}

      <div className="row">
        
        <div className="col-md-4">
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

          <button className="btn btn-dark">Generera studieplan</button>
        </div>

        <div
          className="col-md-6 offset-md-1 border d-flex align-items-center justify-content-center"
          style={{ height: "300px" }}
        >
          <p className="text-muted">Dra in filer eller klicka för att ladda upp</p>
        </div>

      </div>
    </div>
  );
}

export default App;

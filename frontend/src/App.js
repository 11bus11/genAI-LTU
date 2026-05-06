import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import CreatePlan from './pages/createPlan';
import MyPlans from './pages/myPlans';
import Login from './pages/login';
import ViewPlan from './pages/viewPlan';

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
    <Router>
     <Routes> 
  <Route path="/" element={<Login />} />       
  <Route path="/create-plan" element={<CreatePlan />} />
  <Route path="/my-plans" element={<MyPlans />} />
  <Route path="/login" element={<Login />} />
  <Route path="/view-plan" element={<ViewPlan />} />
</Routes>
    </Router>
  );
}

export default App;

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
  

  return (
    <Router>
     <Routes> 
  <Route path="/" element={<Login />} />       
  <Route path="/create-plan" element={<CreatePlan />} />
  <Route path="/my-plans" element={<MyPlans />} />
  <Route path="/login" element={<Login />} />
  <Route path="/view-plan/:id" element={<ViewPlan />} />
</Routes>
    </Router>
  );
}

export default App;

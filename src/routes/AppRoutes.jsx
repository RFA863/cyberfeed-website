import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
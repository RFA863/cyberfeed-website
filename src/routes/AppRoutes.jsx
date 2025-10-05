import {  Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import LoginPage from "../pages/LoginPage";
import MyPostPage from "../pages/MyPostPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes(){
  return(
    <>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path ="/register" element={<RegisterPage/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/my-post" element={<MyPostPage/>}/>
        </Route>

      </Routes>
    </>
  );
}

export default AppRoutes;
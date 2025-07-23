import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import EditJob from "./pages/EditJob";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        <Route element={<Layout/>}>
           <Route path="/dashboard" element={isAuthenticated ? <Dashboard/>:<Login/>}/>
        <Route path="/add-job" element={<AddJob/>}/>
        <Route path="/edit-job/:id"  element={isAuthenticated ? <EditJob /> : <Login />}/>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

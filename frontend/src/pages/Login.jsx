import { useState } from "react";
import API from "../services/api";
import {Link, useNavigate } from "react-router-dom";

const Login =()=>{
    const [form, setForm] = useState({email:"",password:""})
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await API.post("/auth/login",form);
            alert("Login successfully");
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            navigate("/dashboard");
        }catch(error){
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input 
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
        />
        <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
        />

        <Link
        to="/forgot-password"
        className="text-sm text-blue-600 hover:underline block text-right"
      >
        Forgot Password?
      </Link>

        <button
        type = "submit"
        className="bg-blue-600 hover:bg-blue-700 w-full text-white p-2 rounded"
        >Login</button>
        </form>
    );
}

export default Login;   
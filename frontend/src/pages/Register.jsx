import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register=()=>{
    const [form, setForm] = useState({name:"",email:"",password:""})
    const navigate = useNavigate();

const handleChange =(e)=>{
    setForm({...form, [e.target.name]:e.target.value});
};

const validateForm =()=>{
    const {name,email,password} = form;
    if(!name || !email || !password){
        toast.error("All fields are required");
        return false;
    }
    if(password.length<6){
        toast.warn("password should be atleat 6 characters");
        return false;
    }
    return true; 
};

const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!validateForm())
        return;

    try{
        const res = await API.post("/auth/register",form);
        toast.success(res.data.message || "Registered successfully");
        setTimeout(()=>navigate("/login"),1000)
    }catch(err){
        toast.error(err.response?.data?.error || "Registration Failed")
    }
};

return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
        <input name="name" placeholder="Name" className="w-full p-2 rounded" onChange={handleChange}/>
        <input name="email" type="email" placeholder="Email" className="w-full p-2 rounded" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" className="w-full p-2 rounded" onChange={handleChange}/>
        <button type = "submit" className="bg-blue-600 w-full py-2 text-white rounded">Create Account</button>
        </form>
);
};

export default Register;
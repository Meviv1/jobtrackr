import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import React from 'react'

const ForgotPassword = () => {
    const [email, setemail] = useState("")
    const [loading, setloading] = useState(false)

    const handleSubmit = async  (e)=>{
        e.preventDefault();

        if(!email){
            toast.error("Please enter the email")
            return;
        }
        try{
            setloading(true);
            toast.success("password reset link sent");
                setemail("");
        }catch(err){
            toast.error("Something went wrong! Try again");
        }finally{
            setloading(false);
        }
    };
  return (
    <div className="max-w-md mx-auto mt-20 shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-x-4">
        <input 
        type="email"
        placeholder="enter your registered mail"
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition${
            loading ? "bg-blue-400 cursor-not-allowed"
            :         "bg-blue-600 hover:bg-blue-700"
        }`}
        >
            {loading ? "Sending...": "Send ResetLink"}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword

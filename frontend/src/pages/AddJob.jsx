import React,{useState} from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddJob = () => {
    const [form, setform] = useState({
        position:"",
        company:"",
        status:"",
    });

    const [loading, setloading] = useState(false)
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setform({...form, [e.target.name]:e.target.value});
    };

    const validateForm =()=>{
        const {position,status,company}=form;
        if(!position || !status || !company){
            toast.error("All fields are mandatory");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!validateForm)return;
        try{
            setloading(true);
            const token = localStorage.getItem("token");
           const res = await API.post("/job",form,{
                headers :{
                    Authorization : `Bearer ${token}`,
                },
            });
            toast.success("Job added successfully");
            setTimeout(() => navigate("/dashboard"), 1000);
        }catch(err){
            toast.error(err.response?.data?.error || "Failed to add job");
        }
        finally {
      setloading(false);
    }
    };
  return (
    <div className='max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md space-y-4'>
        <h2 className='text-2xl font-semibold text-center text-gray-800'>Add New Job</h2>
    <form
    onSubmit={handleSubmit}
className='space-y-4'

    >
        <input  
        type="text"
        name="position"
        placeholder='Job-Position'
        value={form.position}
        className='w-full p-2 border border-gray-300 rounded rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={handleChange}
        />
        
        <input  
        type="text"
        name="company"
        placeholder='Company-Name'
        value={form.company}
        className='w-full p-2 border border-gray-300 rounded rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={handleChange}
        />

        <select name="status" 
        value={form.status}
        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={handleChange}
        >
            <option value="" disabled hidden>-- Select Status --</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
        </select>
        <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >{loading ? "Submitting..." : "Add Job"}</button>
    </form>
    </div>
  )
}

export default AddJob

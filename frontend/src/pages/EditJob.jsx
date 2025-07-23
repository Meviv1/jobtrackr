import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    position: "",
    company: "",
    status: "applied",
  });
  const [loading, setloading] = useState(true)
  const [submitting, setsubmitting] = useState(false)

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm(res.data);
    } catch (err) {
      toast.error("Failed to fetch job");
      navigate("/dashboard");
    }
    finally{
      setloading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []
  );
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm=()=>{
    const {postion,company,status}=form;
    if(!postion || !company || !status){
      toast.error("All fields are mandatory");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm)return;
    try {
      setsubmitting(true);
      const token = localStorage.getItem("token");
      const res = await API.put(`/job/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job updated");
      setTimeout(()=>("/dashboard"),1000)
    } catch (err) {
      toast.error("Failed to update job");
    }
    finally{
      setsubmitting(false);
    }
  };

  if(loading){
    return(
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Edit Job
      </h2> 
    <form
      onSubmit={handleSubmit}
      className="space-y-4 "
    >
      <input
      type="text"
        name="position"
        value={form.position}
        placeholder="Job-Position"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
      />
      <input
      type="text"
        name="company"
        value={form.company}
        placeholder="Company-Name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
      />
      <select
        name="status"
        value={form.status}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
      </select>
      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            submitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {submitting ? "Updating..." : "Update Job"}
      </button>
    </form>
    </div>
  );
};

export default EditJob;

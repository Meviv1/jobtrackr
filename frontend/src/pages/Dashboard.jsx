import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import JobCard from "../components/JobCard";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setloading] = useState(true)
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      setloading(true);
      const res = await API.get("/job", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.log(err);
      alert("Session expired or unauthorized!");
      navigate("/login");
    }
    finally{
      setloading(false);  
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Job deleted");
      fetchJobs();
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-6">


        
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
      </div>
      {loading ? (
      <Loader/>
  ):
       jobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No jobs yet! Start by adding one </p>
        </div>
      ) : (
        // Job Cards
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard
            key={job._id}
            job = {job}
            onDelete={handleDelete}
            />  
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

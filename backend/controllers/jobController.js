import Job from "../models/Job.js"

export const createJob = async (req,res)=>{
    try{
        const {position,company,status} = req.body;
        const job = await Job.create({
            position,
            company,
            status,
            createdBy:req.userId
        });
        res.status(201).json(job);
    }
    catch(err){
        res.status(500).json({error:"Failed to create job"});
    }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
};
                

export const deleteJob =async (req,res)=>{
    try{
        const job = await Job.findOneAndDelete({
            _id:req.params.id,
            createdBy:req.userId,
        });

        if(!job){
            return res.status(404).json({error: "Job not found or unauthorised!"});
        }

        res.json({message : "Job deleted successfully"});
    }catch(error){
        console.error("delete job error",error);
        res.status(500).json({error : "Failed to delete job"});
    }
};

export const getJobs = async(req,res)=>{
    try{
        const jobs = await Job.find({createdBy :req.userId}).sort({createdAt :-1})
        res.json(jobs);
    }catch(err){
        console.log(" Job Create Error:", err);
        res.status(500).json({error:"Failed to fetch jobs"});
    }
};
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    status: {
        type:String,
        enum:["applied","interview","rejected","offer"],
        default:"applied",
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},
{timestamps:true});

export default mongoose.model("Job",jobSchema);
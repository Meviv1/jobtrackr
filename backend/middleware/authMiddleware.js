import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"No token provided"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        console.log(" Authenticated User ID:", decoded.userId);
        next();
    }
    catch(err){
        return res.status(401).json({error:" Invalid token"})
    }
};
export default authMiddleware;
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect=async(req,res,next)=>{
   const authHeader=req.headers.authorization;

   if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({message:"No Token provided"})
   }

   const token=authHeader?.split(" ")[1]?.trim()
   
   try {
    const decoded = jwt.verify(token, process.env.jwt_secret);

    const user=await User.findById(decoded.id).select("-password")

    if(!user){
        return res.status(401).json({message:"No user found"})
    }

    req.user=user

    next()
   } catch (error) {
    console.error(error)
    res.status(401).json({message:"Token Invalid or Expired"})
   }
}

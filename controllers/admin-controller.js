const admin= require('../models/Admin');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const getAdmin= async (req, res, next) => {
    let Admin;
    try{
        Admin= await admin.find();
    }
    catch(err){
        return console.error(err);
    }
    if(!Admin){
        return res.status(500).json({message:"Unexpected error"})
    }
    return res.status(200).json({Admin});
}

const addAdmin = async (req, res, next) => {
    const {email, password} = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) 
      {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
    let existingAdmin;
    try{
        existingAdmin = await admin.findOne({email});
    }
    catch(err) {
        return console.log(err);
    }
    if(existingAdmin){
        return res.status(400).json({message:'Admin Already Exists'});
    } 
    let Admin;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        Admin=new admin({email,password:hashedPassword});
        Admin=await Admin.save();
    }
    catch(err) {
        return console.log(err);
    }
    if(!Admin){
        return res.status(500).json({message:'Unexpected to store the admin'});
    }
    return res.status(201).json({Admin})


}

const adminLogin = async function(req, res, next) {
    const {email, password} = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) 
      {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
      let existingAdmin;
      try{
            existingAdmin = await admin.findOne({email});
      }
      catch(err){
        return console.log(err);
      }
      if (!existingAdmin){
        return res.status(400).json({message:'Admin not found'})
      }
      const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
      if (!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
      }
      const token=jwt.sign({id:existingAdmin._id}, process.env.SECRET_KEY,{
        expiresIn:'7d',  
      })


      
      return res.status(200).json({message:"Authentication successful", token,id:existingAdmin._id})
}

module.exports = {getAdmin, addAdmin, adminLogin}
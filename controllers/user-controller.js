const user = require("../models/User");
const bcrypt= require('bcryptjs');
const getAllUser = async function (req, res, next) {
  let users;

  try {
    users = await user.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({
      message: "Unexpected error"
     });
  }
  return res.status(200).json({ users });
};


const signup = async function (req, res, next) {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword= bcrypt.hashSync(password);
  let users;
  try { 
    users =new user({ name, email, password: hashedPassword});
    users =await users.save();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(201).json({id: users._id });
};

const updateUser = async (req, res , next)=> {
  const id= req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) 
  {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword= bcrypt.hashSync(password);
  let users;
  try{
      users= await user.findByIdAndUpdate(id,
        {
          name,
          email,
          password:hashedPassword
        })
  }
  catch(err){
    return console.log(err);
  }
   if (!users){
    return res.status(500).json({message:"Something went wrong"})
   }
   return res.status(200).json({message:"Updated Successfully"})

};

const deleteUser= async (req, res,next) => {
  const id=req.params.id;

  let users;
  try{
    users = await user.findByIdAndRemove(id); 
  }
  catch(err){
    return console.log(err);
  }
  if (!users){
    return res.status(500).json({message:"Something went wrong"})
   }
  return res.status(200).json({message:"Deleted Successfully"})

}

const login = async (req, res , next) => {
  const { email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) 
  {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try{
    existingUser = await user.findOne({ email })

  }
  catch(err){
    return console.log(err);
  }
  if (!existingUser){
    return res.status(400).json({message:"Unable to find user from this id"})
  }
  const isPasswordCorrect=bcrypt.compareSync(password, existingUser.password)
  if (!isPasswordCorrect){
    return res.status(400).json({message:'Incorrect Password'});
  }
  return res.status(200).json({message:"Login Successful"});
}
module.exports = { getAllUser, signup , updateUser , deleteUser , login };

const prisma = require("../config/prisma");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const sanitizeUser = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};

const generateToken = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register=async(req,res,next)=>{
    try{
        const {
            name,
            email,
            password
        }=req.body;

        // email should be unique
        const existingUser=await prisma.user.findUnique({
            where:{
                email
            }
        });

        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }

        // email is unique so hash the password and store it
        const hashedPassword= await bcrypt.hash(
            password,
            10
        );

        const user= await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        });

        const token = generateToken(user.id);

        res.status(201).json({
            message:"User registered successfully",
            token,
            user: sanitizeUser(user)
        });
    }
    catch(error){
        next(error);
    }
};

const login=async (req,res,next)=>{
    try{
        const {email,password}=req.body;

        const user= await prisma.user.findUnique({
            where:{
                email
            }
        });

        if(!user){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }

        // user exist so compare password
        const isMatch= await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }

        const token = generateToken(user.id);

        res.json({
            message:"Login successfully",
            token,
            user: sanitizeUser(user)
        });
    }
    catch(error){
        next(error);
    }
};

module.exports={register,login};
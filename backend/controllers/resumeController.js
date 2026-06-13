const prisma=require('../config/prisma');

const createResume=async (req, res) => {
    try {
        const {
            title,
            firstName,
            lastName,
            email,
            phone,
            summary
        } = req.body;

        const resume = await prisma.resume.create({
            data: {
                title,
                firstName,
                lastName,
                email,
                phone,
                summary
            }
        });

        res.status(201).json(resume);
    } catch (error) {
        next(error);
        // next() will pass the error to the error handling middleware
        // error jo bhi hoga wo ab error middleware krega handle

        // console.log(error);

        // res.status(500).json({
        //     message: "Something went wrong"
        // });
    }
};

const getAllResumes=async (req,res)=>{
    try {
        const resumes=await prisma.resume.findMany();

        res.json(resumes);
    }
    catch(error){
        next(error);
        // console.log(error);
        // res.status(500).json({
        //     message:"Something went wrong"
        // });
    }
};

const getResumeById=async(req,res)=>{
    try{
        const {id}=req.params;

        const resume=await prisma.resume.findUnique({
            where:{
                id:Number(id)
            }
        })

        if (!resume) {
                return res.status(404).json({
                    message: "Resume not found"
                });
            }

        res.json(resume);
    }
    catch(error){
        next(error);
        // console.log(error);

        // res.status(500).json({
        //     message:"Something went wrong"
        // });
    }
};

const updateResume=async (req, res) => {
    try {
        const {id}=req.params;
        const {title}=req.body;

        const resume = await prisma.resume.update({
            where: {
                id: Number(id)  
            },
            data: {
                title
            }
        });

        res.json(resume);
    } catch (error) {
        next(error);
        // console.log(error);

        // res.status(500).json({
        //     message: "Something went wrong"
        // });
    }
};

const deleteResume=async (req, res) => {
    try {
        const {id}=req.params;

        const resume = await prisma.resume.delete({
            where: {
                id: Number(id)
            }
        });

        res.json(resume);
    } catch (error) {
        next(error);
        // console.log(error);

        // res.status(500).json({
        //     message: "Something went wrong"
        // });
    }
};

module.exports = {  createResume, getAllResumes,getResumeById, updateResume, deleteResume };  
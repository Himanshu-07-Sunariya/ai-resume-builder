const prisma=require('../config/prisma');

const createResume=async (req, res, next) => {
    try {
        const {
            title,
            firstName = 'Untitled',
            lastName = 'Resume',
            email = 'not-provided@example.com',
            phone = 'N/A',
            summary = '',
            template = 'modern',
        } = req.body;

        const resume = await prisma.resume.create({
            data: {
                title,
                firstName,
                lastName,
                email,
                phone,
                summary,
                template,
                userId: req.user.userId
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

const getAllResumes=async (req,res,next)=>{
    try {
        const resumes=await prisma.resume.findMany({
            where:{
                userId:req.user.userId
            }
        });

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

const getResumeById=async(req,res,next)=>{
    try{
        const {id}=req.params;

        const resume=await prisma.resume.findFirst({
            where:{
                id:Number(id),
                userId:req.user.userId
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

const getFullResume=async(req,res,next)=>{
    try{
        const {id}=req.params;

        const resume = await prisma.resume.findFirst({
            where:{
                id:Number(id),
                userId:req.user.userId
            },
            include:{
                educations:true,
                experiences:true,
                projects:true,
                skills:true
            }
        });

        if(!resume){
            return res.status(404).json({
                message:"Resume not found"
            });
        }

        res.json(resume);
    }
     catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const updateResume=async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            title,
            firstName,
            lastName,
            email,
            phone,
            summary,
            template,
        } = req.body;

        const existingResume =
        await prisma.resume.findFirst({
            where:{
                id:Number(id),
                userId:req.user.userId
            }
        });

        if(!existingResume){
            return res.status(404).json({
                message:"Resume not found"
            });
        }

        const resume = await prisma.resume.update({
            where: {
                id: Number(id)
            },
            data: {
                ...(title !== undefined && { title }),
                ...(firstName !== undefined && { firstName }),
                ...(lastName !== undefined && { lastName }),
                ...(email !== undefined && { email }),
                ...(phone !== undefined && { phone }),
                ...(summary !== undefined && { summary }),
                ...(template !== undefined && { template }),
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

const updateTemplate = async(req,res,next)=>{
    try{

        const { id } = req.params;
        const { template } = req.body;

        const existingResume =
        await prisma.resume.findFirst({
            where:{
                id:Number(id),
                userId:req.user.userId
            }
        });

        if(!existingResume){
            return res.status(404).json({
                message:"Resume not found"
            });
        }

        const resume =
        await prisma.resume.update({
            where:{
                id:Number(id)
            },
            data:{
                template
            }
        });

        res.json(resume);

    }catch(error){
        next(error);
    }
};

const deleteResume=async (req, res, next) => {
    try {
        const {id}=req.params;

        const existingResume =
            await prisma.resume.findFirst({
                where:{
                    id:Number(id),
                    userId:req.user.userId
                }
            });

            if(!existingResume){
                return res.status(404).json({
                    message:"Resume not found"
                });
            }

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

module.exports = {  createResume, getAllResumes,getResumeById, updateResume, deleteResume ,getFullResume,updateTemplate};  
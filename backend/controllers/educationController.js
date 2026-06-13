const prisma = require('../config/prisma');

const createEducation=async (req,res,next)=>{
    try{
        const { resumeId } = req.params;

        const existingResume = await prisma.resume.findFirst({
            where:{
                id:Number(resumeId),
                userId:req.user.userId
            }
        });
        
        if(!existingResume){
            return res.status(404).json({
                message:"Resume not found"
            });
        }

        const {
            institution,
            degree,
            field,
            startYear,
            endYear
        } = req.body;

        const education= await prisma.education.create({
            data: {
                institution,
                degree,
                field,
                startYear,
                endYear,
                resumeId: Number(resumeId)
            }
        });

        res.status(201).json(education);
    }
    catch(error){
        next(error);
    }
};

module.exports={
    createEducation
};

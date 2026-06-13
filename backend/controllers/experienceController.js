const prisma=require('../config/prisma');

const createExperience= async(req,res,next)=>{
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
            company,
            role,
            description,
            startDate,
            endDate
        } = req.body;


        const experience=await prisma.experience.create({
            data:{
                company,
                role,
                description,
                startDate,
                endDate,
                resumeId: Number(resumeId)
            }
        });

        res.status(201).json(experience);
    }
    catch(error){
        next(error);
    }
};

module.exports={createExperience};
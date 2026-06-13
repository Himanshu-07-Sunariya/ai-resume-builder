const prisma = require("../config/prisma");

const createSkill = async(req,res,next)=>{
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

        const { name } = req.body;

        const skill = await prisma.skill.create({
            data:{
                name,
                resumeId:Number(resumeId)
            }
        });

        res.status(201).json(skill);

    }catch(error){
        next(error);
    }
};

module.exports = {
    createSkill
};
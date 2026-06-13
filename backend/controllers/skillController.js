const prisma = require("../config/prisma");

const createSkill = async(req,res,next)=>{
    try{

        const { resumeId } = req.params;

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
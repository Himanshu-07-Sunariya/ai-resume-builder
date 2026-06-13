const prisma = require("../config/prisma");

const createProject = async (req,res,next)=>{
    try{

        const { resumeId } = req.params;

        const {
            title,
            description,
            githubLink,
            liveLink
        } = req.body;

        const project = await prisma.project.create({
            data:{
                title,
                description,
                githubLink,
                liveLink,
                resumeId:Number(resumeId)
            }
        });

        res.status(201).json(project);

    }catch(error){
        next(error);
    }
};

module.exports = {
    createProject
};
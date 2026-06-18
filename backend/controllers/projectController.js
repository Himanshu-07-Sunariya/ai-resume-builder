const prisma = require("../config/prisma");

const createProject = async (req,res,next)=>{
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

const updateProject = async (req,res,next)=>{
  try{

    const { id } = req.params;

    const {
      title,
      description,
      githubLink,
      liveLink
    } = req.body;

    const project =
      await prisma.project.update({
        where:{
          id:Number(id)
        },
        data:{
          title,
          description,
          githubLink,
          liveLink
        }
      });

    res.json(project);

  }catch(error){
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {

    const { id } = req.params;

    await prisma.project.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Project deleted"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  deleteProject,
    updateProject
};
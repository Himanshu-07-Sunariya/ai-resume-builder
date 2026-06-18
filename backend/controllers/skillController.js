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

const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const skill = await prisma.skill.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    res.json(skill);
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {

    const { id } = req.params;

    await prisma.skill.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Skill deleted"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill
};
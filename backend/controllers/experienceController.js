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

const updateExperience = async (req,res,next)=>{
  try{

    const { id } = req.params;

    const {
      company,
      role,
      description,
      startDate,
      endDate
    } = req.body;

    const experience =
      await prisma.experience.update({
        where:{
          id:Number(id)
        },
        data:{
          company,
          role,
          description,
          startDate,
          endDate
        }
      });

    res.json(experience);

  }catch(error){
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {

    const { id } = req.params;

    await prisma.experience.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Experience deleted"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExperience,
  deleteExperience,
    updateExperience
};
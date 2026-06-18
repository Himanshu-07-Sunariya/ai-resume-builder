const prisma = require('../config/prisma');

const createEducation=async (req,res,next)=>{
    try{
        const { resumeId } = req.params;
        
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

const updateEducation = async (req,res,next)=>{
  try{

    const { id } = req.params;

    const {
      institution,
      degree,
      field,
      startYear,
      endYear
    } = req.body;

    const education =
      await prisma.education.update({
        where:{
          id:Number(id)
        },
        data:{
          institution,
          degree,
          field,
          startYear,
          endYear
        }
      });

    res.json(education);

  }catch(error){
    next(error);
  }
};

const deleteEducation = async (req,res) => {

  const { id } = req.params;

  await prisma.education.delete({
    where:{
      id:Number(id)
    }
  });

  res.json({
    message:"Education deleted"
  });

};

module.exports={
    createEducation,deleteEducation,updateEducation
};

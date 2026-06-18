const express=require('express');

const {
    createEducation,deleteEducation,updateEducation
}=require('../controllers/educationController');

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router=express.Router();      

router.post('/api/resumes/:resumeId/educations', authMiddleware, createEducation);
router.patch(
  "/api/educations/:id",
  authMiddleware,
  updateEducation
);

router.delete(
  "/api/educations/:id",
  authMiddleware,
  deleteEducation
);

module.exports=router;
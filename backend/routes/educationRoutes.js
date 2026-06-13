const express=require('express');

const {
    createEducation
}=require('../controllers/educationController');

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router=express.Router();      

router.post('/api/resumes/:resumeId/educations', authMiddleware, createEducation);

module.exports=router;
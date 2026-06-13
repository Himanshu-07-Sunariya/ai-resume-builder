const express=require('express');

const {
    createEducation
}=require('../controllers/educationController');

const router=express.Router();      

router.post('/api/resumes/:resumeId/educations', createEducation);

module.exports=router;
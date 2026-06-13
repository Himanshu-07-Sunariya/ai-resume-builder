const express = require('express');
const validateResume = require('../middleware/validateResume');

const {
    createResume,
    getAllResumes,
    updateResume,
    deleteResume,
    getResumeById
}=require('../controllers/resumeController');

const router = express.Router();

router.post("/api/resumes", validateResume, createResume);
router.get("/api/resumes", getAllResumes);
router.get("/api/resumes/:id",getResumeById);
router.patch("/api/resumes/:id", updateResume);
router.delete("/api/resumes/:id", deleteResume);

module.exports = router;
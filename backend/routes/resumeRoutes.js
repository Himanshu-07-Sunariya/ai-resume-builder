const express = require('express');
const validateResume = require('../middleware/validateResume');

const {
    createResume,
    getAllResumes,
    updateResume,
    deleteResume,
    getResumeById,
    getFullResume
}=require('../controllers/resumeController');

const router = express.Router();

router.post("/api/resumes", validateResume, createResume);
router.get("/api/resumes", getAllResumes);
router.get("/api/resumes/:id",getResumeById);
router.get("/api/resumes/:id/full",getFullResume);
router.patch("/api/resumes/:id", updateResume);
router.delete("/api/resumes/:id", deleteResume);

module.exports = router;
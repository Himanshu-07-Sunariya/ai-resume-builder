const express = require('express');
const validateResume = require('../middleware/validateResume');

const {
    createResume,
    getAllResumes,
    updateResume,
    deleteResume,
    getResumeById,
    getFullResume,
    updateTemplate
}=require('../controllers/resumeController');

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router = express.Router();

router.post("/api/resumes",authMiddleware, validateResume, createResume);
router.get("/api/resumes",authMiddleware,getAllResumes);
router.get("/api/resumes/:id",authMiddleware,getResumeById);
router.get("/api/resumes/:id/full",authMiddleware,getFullResume);
router.patch("/api/resumes/:id",authMiddleware,updateResume);
router.patch(
    "/api/resumes/:id/template",
    authMiddleware,
    updateTemplate
);
router.delete("/api/resumes/:id",authMiddleware, deleteResume);

module.exports = router;
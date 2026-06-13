const express = require('express');
const router = express.Router();
const { createExperience } = require('../controllers/experienceController');

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

router.post(
    "/api/resumes/:resumeId/experiences",   authMiddleware,
    createExperience
);

module.exports = router;
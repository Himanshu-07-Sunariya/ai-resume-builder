const express = require('express');
const router = express.Router();
const { createExperience } = require('../controllers/experienceController');

router.post(
    "/api/resumes/:resumeId/experiences",
    createExperience
);

module.exports = router;
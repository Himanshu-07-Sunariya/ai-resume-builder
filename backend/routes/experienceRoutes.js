const express = require('express');
const router = express.Router();
const { createExperience,deleteExperience,updateExperience } = require('../controllers/experienceController');

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

router.post(
    "/api/resumes/:resumeId/experiences",   authMiddleware,
    createExperience
);

router.patch(
  "/api/experiences/:id",
  authMiddleware,
  updateExperience
);

router.delete(
  "/api/experiences/:id",
  authMiddleware,
  deleteExperience
);

module.exports = router;
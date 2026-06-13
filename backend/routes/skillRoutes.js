const express = require("express");

const {
    createSkill
} = require("../controllers/skillController");
const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router = express.Router();

router.post(
    "/api/resumes/:resumeId/skills",authMiddleware,
    createSkill
);

module.exports = router;
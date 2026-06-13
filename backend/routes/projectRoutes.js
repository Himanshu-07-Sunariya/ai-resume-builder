const express = require("express");

const {
    createProject
} = require("../controllers/projectController");

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router = express.Router();

router.post(
    "/api/resumes/:resumeId/projects",authMiddleware,
    createProject
);

module.exports = router;
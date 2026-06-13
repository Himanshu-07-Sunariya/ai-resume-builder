const express = require("express");

const {
    createProject
} = require("../controllers/projectController");

const router = express.Router();

router.post(
    "/api/resumes/:resumeId/projects",
    createProject
);

module.exports = router;
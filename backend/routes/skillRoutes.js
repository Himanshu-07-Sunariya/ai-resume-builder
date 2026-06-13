const express = require("express");

const {
    createSkill
} = require("../controllers/skillController");

const router = express.Router();

router.post(
    "/api/resumes/:resumeId/skills",
    createSkill
);

module.exports = router;
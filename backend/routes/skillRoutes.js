const express = require("express");

const {
    createSkill,deleteSkill,updateSkill
} = require('../controllers/skillController');
const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router = express.Router();

router.post(
    "/api/resumes/:resumeId/skills",authMiddleware,
    createSkill
);

router.patch(
  "/api/skills/:id",
  authMiddleware,
  updateSkill
);

router.delete(
  "/api/skills/:id",
  authMiddleware,
  deleteSkill
);

module.exports = router;
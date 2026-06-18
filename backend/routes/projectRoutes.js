const express = require("express");

const {
    createProject,deleteProject,updateProject
} = require("../controllers/projectController");

const authMiddleware=require('../middleware/authMiddleware').authMiddleware;

const router = express.Router();

router.post(
    "/api/resumes/:resumeId/projects",authMiddleware,
    createProject
);

router.patch(
  "/api/projects/:id",
  authMiddleware,
  updateProject
);

router.delete(
  "/api/projects/:id",
  authMiddleware,
  deleteProject
);

module.exports = router;
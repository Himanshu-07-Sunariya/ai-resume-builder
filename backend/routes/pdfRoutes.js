const express = require("express");

const {
    generatePdf
} = require("../controllers/pdfController");

const authMiddleware =
require("../middleware/authMiddleware").authMiddleware;

const router = express.Router();

router.get("/api/resumes/:id/pdf",authMiddleware,generatePdf);

module.exports = router;

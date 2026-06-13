const express = require("express");
const resumeRoutes = require("./routes/resumeRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);
// global middleware

app.use("/", resumeRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("AI Resume Builder Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
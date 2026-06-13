const express = require("express");
const resumeRoutes = require("./routes/resumeRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const educationRoutes=require('./routes/educationRoutes');
const experienceRoutes=require('./routes/experienceRoutes');
const projectRoutes=require('./routes/projectRoutes');
const skillRoutes=require('./routes/skillRoutes');

const app = express();

app.use(express.json());

app.use(loggerMiddleware);
// global middleware

app.use("/", resumeRoutes);

app.use("/",educationRoutes);

app.use("/",experienceRoutes);

app.use("/",projectRoutes);

app.use("/",skillRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("AI Resume Builder Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// bcrypt.js is used for hashing passwords before storing them in the database, ensuring that even if the database is compromised, the actual passwords remain secure.
// json webtoken is used for generating the webtoken :) to access the protected route that is backend
// first bcrypt matches the password and then if it match it generates the JWT token then u can have a access to the database of the some user
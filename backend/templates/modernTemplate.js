const modernTemplate = (resume) => {
  return `
<!DOCTYPE html>
<html>

<head>

<style>

body{
    font-family: Arial, sans-serif;
    margin:0;
    padding:0;
}

.container{
    display:flex;
    min-height:100vh;
}

.sidebar{
    width:30%;
    background:#f4f4f4;
    padding:20px;
}

.main{
    width:70%;
    padding:30px;
}

h1{
    margin-bottom:5px;
}

.section{
    margin-bottom:25px;
}

.section h2{
    border-bottom:2px solid #333;
    padding-bottom:5px;
}

.skill{
    margin-bottom:8px;
}

.project{
    margin-bottom:15px;
}

</style>

</head>

<body>

<div class="container">

<div class="sidebar">

<h2>Skills</h2>

${resume.skills.map(skill => `
<div class="skill">
${skill.name}
</div>
`).join("")}

</div>

<div class="main">

<h1>
${resume.firstName}
${resume.lastName}
</h1>

<p>
${resume.email}
|
${resume.phone}
</p>

<div class="section">
<h2>Summary</h2>

<p>
${resume.summary || ""}
</p>
</div>

<div class="section">
<h2>Experience</h2>

${resume.experiences.map(exp => `
<p>
<strong>${exp.role}</strong>
-
${exp.company}
</p>

<p>
${exp.description}
</p>
`).join("")}

</div>

<div class="section">
<h2>Projects</h2>

${resume.projects.map(project => `
<div class="project">

<strong>
${project.title}
</strong>

<p>
${project.description}
</p>

</div>
`).join("")}

</div>

<div class="section">
<h2>Education</h2>

${resume.educations.map(edu => `
<p>
<strong>${edu.degree}</strong>
-
${edu.institution}
</p>
`).join("")}

</div>

</div>

</div>

</body>
</html>
`;
};

module.exports = modernTemplate;
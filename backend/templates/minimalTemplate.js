const minimalTemplate = (resume) => {
    resume = resume || {};
    resume.experiences = resume.experiences || [];
    resume.projects = resume.projects || [];
    resume.educations = resume.educations || [];
    resume.skills = resume.skills || [];

    return `

<!DOCTYPE html>

<html>
<head>
<style>

body{
font-family: Arial, sans-serif;
padding:40px;
max-width:800px;
margin:auto;
color:#333;
}

h1{
text-align:center;
margin-bottom:5px;
}

.contact{
text-align:center;
margin-bottom:30px;
}

.section{
margin-top:25px;
}

.section h2{
border-bottom:1px solid #ccc;
padding-bottom:5px;
}

.item{
margin-bottom:15px;
}

</style>
</head>

<body>

<h1>${resume.firstName} ${resume.lastName}</h1>

<div class="contact">
    ${resume.email} | ${resume.phone}
</div>

<div class="section">
    <h2>Summary</h2>
    <p>${resume.summary || ""}</p>
</div>

<div class="section">
    <h2>Experience</h2>

${resume.experiences.map(exp => `
    <div class="item">
        <strong>${exp.role}</strong> - ${exp.company}
        <p>${exp.description}</p>
    </div>
`).join("")}

</div>

<div class="section">
    <h2>Projects</h2>

${resume.projects.map(project => `
    <div class="item">
        <strong>${project.title}</strong>
        <p>${project.description}</p>
    </div>
`).join("")}

</div>

<div class="section">
    <h2>Education</h2>

${resume.educations.map(edu => `
    <div class="item">
        <strong>${edu.degree}</strong> - ${edu.institution}
    </div>
`).join("")}

</div>

<div class="section">
    <h2>Skills</h2>

${resume.skills.map(skill => skill.name).join(", ")}

</div>

</body>
</html>
`;
};

module.exports = minimalTemplate;

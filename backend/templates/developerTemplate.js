const developerTemplate = (resume) => {
return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:"Times New Roman", serif;
    font-size:14px;
    line-height:1.4;
    color:#000;
    padding:20px 30px;
}

.header{
    text-align:center;
    margin-bottom:10px;
}

.header h1{
    font-size:28px;
    font-weight:bold;
    margin-bottom:8px;
}

.contact{
    display:flex;
    justify-content:space-between;
    font-size:14px;
    margin-bottom:15px;
}

.section-title{
    border:1px solid black;
    background:#f2f2f2;
    padding:4px 8px;
    font-size:16px;
    font-weight:bold;
    margin-top:15px;
    margin-bottom:8px;
    text-transform:uppercase;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-bottom:10px;
}

table th{
    border:1px solid black;
    padding:6px;
    text-align:left;
    background:#f7f7f7;
}

table td{
    border:1px solid black;
    padding:6px;
}

.entry{
    margin-bottom:12px;
}

.entry-header{
    display:flex;
    justify-content:space-between;
    font-weight:bold;
}

.entry-subtitle{
    font-style:italic;
}

ul{
    margin-left:20px;
    margin-top:5px;
}

li{
    margin-bottom:3px;
}

.skills-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px;
}

.skill-category{
    border:1px solid black;
    padding:6px;
}

.skill-category strong{
    display:block;
    margin-bottom:4px;
}

.link{
    color:black;
    text-decoration:none;
}

</style>

</head>

<body>

<div class="header">

<h1>
${resume.firstName || ""} ${resume.lastName || ""}
</h1>

</div>

<div class="contact">

<div>
${resume.phone || ""}
</div>

<div>
${resume.email || ""}
</div>

</div>

<div class="section-title">
Education
</div>

<table>

<tr>
<th>Degree</th>
<th>Institution</th>
<th>Duration</th>
</tr>

${resume.educations.map(edu => `

<tr>
<td>${edu.degree || ""}</td>
<td>${edu.institution || ""}</td>
<td>
${edu.startYear || ""}
-
${edu.endYear || ""}
</td>
</tr>
`).join("")}

</table>

<div class="section-title">
Professional Summary
</div>

<p>
${resume.summary || ""}
</p>

<div class="section-title">
Internships / Experience
</div>

${resume.experiences.map(exp => `

<div class="entry">

<div class="entry-header">

<div>
${exp.role || ""}
</div>

<div>
${exp.startDate || ""}
${exp.endDate ? ` - ${exp.endDate}` : ""}
</div>

</div>

<div class="entry-subtitle">
${exp.company || ""}
</div>

<p>
${exp.description || ""}
</p>

</div>

`).join("")}

<div class="section-title">
Projects
</div>

${resume.projects.map(project => `

<div class="entry">

<div class="entry-header">

<div>
${project.title || ""}
</div>

</div>

<p>
${project.description || ""}
</p>

${project.githubLink
? `

<p>
<strong>GitHub:</strong>
${project.githubLink}
</p>
`
: ""
}

${project.liveLink
? `

<p>
<strong>Live:</strong>
${project.liveLink}
</p>
`
: ""
}

</div>

`).join("")}

<div class="section-title">
Technical Skills
</div>

<div class="skills-grid">

<div class="skill-category">

<strong>Programming</strong>

${resume.skills
.filter(skill =>
skill.name &&
(
skill.name.includes("C++") ||
skill.name.includes("Java") ||
skill.name.includes("Python") ||
skill.name.includes("JavaScript")
))
.map(skill => skill.name)
.join(", ")
}

</div>

<div class="skill-category">

<strong>Technologies</strong>

${resume.skills
.map(skill => skill.name)
.join(", ")
}

</div>

</div>

<div class="section-title">
Additional Information
</div>

<ul>

<li>
Resume generated using AI Resume Builder
</li>

<li>
GitHub, LinkedIn and Portfolio links can be added here.
</li>

<li>
Open Source Contributions, Coding Profiles and Achievements can be listed here.
</li>

</ul>

</body>

</html>
`;
};

module.exports = developerTemplate;

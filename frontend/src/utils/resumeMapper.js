import {
  resumeAPI,
  educationAPI,
  experienceAPI,
  projectAPI,
  skillAPI,
} from '../api/endpoints';

const splitName = (fullName) => {
  if (!fullName?.trim()) {
    return { firstName: 'Untitled', lastName: 'Resume' };
  }
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ') || 'Resume',
  };
};

const parseYear = (dateStr) => {
  if (!dateStr) return null;
  const year = new Date(dateStr).getFullYear();
  return Number.isNaN(year) ? null : year;
};

export const toBackendResume = (frontendResume) => {
  const personal = frontendResume.personal || {};
  const { firstName, lastName } = splitName(personal.fullName);

  return {
    title: frontendResume.title || 'Untitled Resume',
    firstName,
    lastName,
    email: personal.email || 'not-provided@example.com',
    phone: personal.phone || 'N/A',
    summary: frontendResume.summary || '',
    template: frontendResume.template || 'modern',
  };
};

const toBackendEducation = (edu) => ({
  institution: edu.school || edu.institution || 'N/A',
  degree: edu.degree || 'N/A',
  field: edu.fieldOfStudy || edu.field || '',
  startYear: edu.startYear || parseYear(edu.startDate) || new Date().getFullYear(),
  endYear: edu.endYear || parseYear(edu.graduationDate) || new Date().getFullYear(),
});

const toBackendExperience = (exp) => ({
  company: exp.company || 'N/A',
  role: exp.jobTitle || exp.role || 'N/A',
  description: exp.description || '',
  startDate: exp.startDate || '',
  endDate: exp.isCurrent ? 'Present' : exp.endDate || '',
});

const toBackendProject = (project) => ({
  title: project.title || 'Untitled Project',
  description: [project.description, project.technologies ? `Technologies: ${project.technologies}` : '']
    .filter(Boolean)
    .join('\n'),
  githubLink: project.githubLink || null,
  liveLink: project.link || project.liveLink || null,
});

const toBackendSkill = (skill) => ({
  name: skill.level ? `${skill.name} (${skill.level})` : skill.name,
});

export const toFrontendResume = (backendResume) => ({
  id: backendResume.id,
  title: backendResume.title,
  template: backendResume.template || 'modern',
  summary: backendResume.summary || '',
  personal: {
    fullName: [backendResume.firstName, backendResume.lastName].filter(Boolean).join(' '),
    profession: '',
    email: backendResume.email || '',
    phone: backendResume.phone || '',
    location: '',
    website: '',
  },
  educations: (backendResume.educations || []).map((edu) => ({
    id: edu.id,
    school: edu.institution,
    degree: edu.degree,
    fieldOfStudy: edu.field,
    startDate: edu.startYear ? `${edu.startYear}-01-01` : '',
    graduationDate: edu.endYear ? `${edu.endYear}-01-01` : '',
  })),
  experiences: (backendResume.experiences || []).map((exp) => ({
    id: exp.id,
    company: exp.company,
    jobTitle: exp.role,
    description: exp.description,
    startDate: exp.startDate || '',
    endDate: exp.endDate === 'Present' ? '' : exp.endDate || '',
    isCurrent: exp.endDate === 'Present',
  })),
  projects: (backendResume.projects || []).map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description || '',
    technologies: '',
    link: project.liveLink || project.githubLink || '',
  })),
  skills: (backendResume.skills || []).map((skill) => ({
    id: skill.id,
    name: skill.name,
    level: '',
  })),
});

const syncSection = async ({
  resumeId,
  items,
  existingItems,
  toBackend,
  create,
  update,
  remove,
}) => {
  const currentItems = items || [];
  const previousItems = existingItems || [];

  for (const existing of previousItems) {
    if (!currentItems.some((item) => item.id === existing.id)) {
      await remove(existing.id);
    }
  }

  for (const item of currentItems) {
    const payload = toBackend(item);
    if (item.id) {
      await update(item.id, payload);
    } else {
      await create(resumeId, payload);
    }
  }
};

export const saveResumeSections = async (resumeId, frontendResume, existingResume = null) => {
  await syncSection({
    resumeId,
    items: frontendResume.educations,
    existingItems: existingResume?.educations,
    toBackend: toBackendEducation,
    create: educationAPI.create,
    update: educationAPI.update,
    remove: educationAPI.delete,
  });

  await syncSection({
    resumeId,
    items: frontendResume.experiences,
    existingItems: existingResume?.experiences,
    toBackend: toBackendExperience,
    create: experienceAPI.create,
    update: experienceAPI.update,
    remove: experienceAPI.delete,
  });

  await syncSection({
    resumeId,
    items: frontendResume.projects,
    existingItems: existingResume?.projects,
    toBackend: toBackendProject,
    create: projectAPI.create,
    update: projectAPI.update,
    remove: projectAPI.delete,
  });

  await syncSection({
    resumeId,
    items: frontendResume.skills,
    existingItems: existingResume?.skills,
    toBackend: toBackendSkill,
    create: skillAPI.create,
    update: skillAPI.update,
    remove: skillAPI.delete,
  });
};

export const saveResume = async (frontendResume, resumeId = null, existingResume = null) => {
  const payload = toBackendResume(frontendResume);

  if (resumeId) {
    const updated = await resumeAPI.update(resumeId, payload);
    await saveResumeSections(resumeId, frontendResume, existingResume);
    return toFrontendResume({
      ...updated,
      educations: frontendResume.educations,
      experiences: frontendResume.experiences,
      projects: frontendResume.projects,
      skills: frontendResume.skills,
    });
  }

  const created = await resumeAPI.create(payload);
  await saveResumeSections(created.id, frontendResume);
  const fullResume = await resumeAPI.getFull(created.id);
  return toFrontendResume(fullResume);
};

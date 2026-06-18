import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import PersonalSection from '../resumeSections/PersonalSection';
import SummarySection from '../resumeSections/SummarySection';
import EducationSection from '../resumeSections/EducationSection';
import ExperienceSection from '../resumeSections/ExperienceSection';
import ProjectSection from '../resumeSections/ProjectSection';
import SkillSection from '../resumeSections/SkillSection';

export default function ResumeBuilderLeft({ resume, setResume }) {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    summary: true,
    education: true,
    experience: true,
    projects: true,
    skills: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    { id: 'personal', label: 'Personal Information', component: PersonalSection },
    { id: 'summary', label: 'Professional Summary', component: SummarySection },
    { id: 'education', label: 'Education', component: EducationSection },
    { id: 'experience', label: 'Experience', component: ExperienceSection },
    { id: 'projects', label: 'Projects', component: ProjectSection },
    { id: 'skills', label: 'Skills', component: SkillSection }
  ];

  return (
    <div className="w-96 border-r border-gray-200 overflow-auto bg-white">
      <div className="p-4 space-y-2">
        {sections.map((section) => {
          const Component = section.component;
          const isExpanded = expandedSections[section.id];

          return (
            <motion.div
              key={section.id}
              initial={false}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-dark">{section.label}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 bg-gray-50 p-4"
                  >
                    <Component resume={resume} setResume={setResume} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

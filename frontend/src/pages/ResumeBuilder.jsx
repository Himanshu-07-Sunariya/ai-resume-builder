import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { resumeAPI } from '../api/endpoints';
import { useToast } from '../hooks/useToast';
import ResumeBuilderLeft from '../components/builder/ResumeBuilderLeft';
import ResumePreview from '../components/builder/ResumePreview';
import { Save, Download } from 'lucide-react';
import { RESUME_TEMPLATES } from '../constants';
import { saveResume, toFrontendResume } from '../utils/resumeMapper';

const createEmptyResume = (template = 'modern') => ({
  title: 'Untitled Resume',
  template,
  personal: {},
  summary: '',
  educations: [],
  experiences: [],
  projects: [],
  skills: [],
});

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();
  const [resume, setResume] = useState(null);
  const [existingResume, setExistingResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume();
    } else {
      const selectedTemplate = location.state?.template || 'modern';
      setResume(createEmptyResume(selectedTemplate));
      setIsLoading(false);
    }
  }, [id, location.state?.template]);

  const fetchResume = async () => {
    try {
      const data = await resumeAPI.getFull(id);
      setExistingResume(data);
      setResume(toFrontendResume(data));
    } catch (error) {
      showError('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateChange = (template) => {
    setResume((prev) => ({ ...prev, template }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const savedResume = await saveResume(resume, id || null, existingResume);

      if (!id) {
        navigate(`/builder/${savedResume.id}`, { replace: true });
      } else {
        const refreshed = await resumeAPI.getFull(id);
        setExistingResume(refreshed);
        setResume(toFrontendResume(refreshed));
      }

      showSuccess(id ? 'Resume saved successfully' : 'Resume created successfully');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save resume';
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    try {
      if (!id) {
        showError('Please save the resume first');
        return;
      }
      const blob = await resumeAPI.getPDF(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resume.title || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess('Resume downloaded');
    } catch (error) {
      showError('Failed to download resume');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-light overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <input
              type="text"
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              className="text-2xl font-bold text-dark bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Template</label>
            <select
              value={resume.template}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {RESUME_TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
            disabled={isSaving}
          >
            <Download size={18} />
            Download PDF
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-primary transition disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-70px)] overflow-hidden">
        <ResumeBuilderLeft resume={resume} setResume={setResume} />
        <div className="flex-1 overflow-auto">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}

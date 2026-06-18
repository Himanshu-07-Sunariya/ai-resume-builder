import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resumeAPI } from '../api/endpoints';
import { useToast } from '../hooks/useToast';
import ResumeBuilderLeft from '../components/builder/ResumeBuilderLeft';
import ResumePreview from '../components/builder/ResumePreview';
import { Save, Download } from 'lucide-react';

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume();
    } else {
      // Create new resume
      setResume({
        title: 'Untitled Resume',
        template: 'modern',
        personal: {},
        summary: '',
        educations: [],
        experiences: [],
        projects: [],
        skills: []
      });
      setIsLoading(false);
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const data = await resumeAPI.getFull(id);
      setResume(data);
    } catch (error) {
      showError('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (id) {
        await resumeAPI.update(id, resume);
        showSuccess('Resume saved successfully');
      } else {
        const created = await resumeAPI.create(resume);
        navigate(`/builder/${created.id}`);
        showSuccess('Resume created successfully');
      }
    } catch (error) {
      showError('Failed to save resume');
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark">{resume.title}</h1>
          <p className="text-sm text-gray-500">Template: {resume.template}</p>
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

      {/* Main Content */}
      <div className="flex h-[calc(100vh-70px)] overflow-hidden">
        <ResumeBuilderLeft resume={resume} setResume={setResume} />
        <div className="flex-1 overflow-auto">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash2, Download, Edit2, Eye } from 'lucide-react';
import { resumeAPI } from '../api/endpoints';
import { useToast } from '../hooks/useToast';
import { useResumeStore } from '../store/store';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const data = await resumeAPI.getAll();
      setResumes(data);
    } catch (error) {
      showError('Failed to fetch resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.delete(id);
        setResumes(resumes.filter(r => r.id !== id));
        showSuccess('Resume deleted successfully');
      } catch (error) {
        showError('Failed to delete resume');
      }
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const blob = await resumeAPI.getPDF(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess('Resume downloaded successfully');
    } catch (error) {
      showError('Failed to download resume');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">My Resumes</h1>
          <p className="text-gray-600">Manage your professional resumes</p>
        </div>
        <Link to="/builder" className="bg-gradient-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-primary transition-shadow">
          <Plus size={20} />
          Create New Resume
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Resumes', value: resumes.length, icon: FileText },
          { label: 'ATS Score', value: '85/100', icon: null },
          { label: 'Downloads', value: '12', icon: null },
          { label: 'Last Updated', value: 'Today', icon: null }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          >
            <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-dark">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Resumes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        {isLoading ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">Loading resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-dark mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started</p>
            <Link to="/dashboard" className="btn-primary inline-block">
              Create Resume
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Template</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume) => (
                  <tr key={resume.id} className="border-b border-gray-100 hover:bg-light transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-dark">{resume.title}</p>
                        <p className="text-sm text-gray-500">{resume.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                        {resume.template || 'Modern'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/builder/${resume.id}`}
                          className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDownloadPDF(resume.id)}
                          className="p-2 hover:bg-green-50 rounded-lg transition text-green-600"
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(resume.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

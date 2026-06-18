import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';
import { RESUME_TEMPLATES } from '../constants';

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Resume Templates</h1>
        <p className="text-gray-600">Choose from our professional templates</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {RESUME_TEMPLATES.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-400 mb-2">A</div>
                <p className="text-gray-500 font-medium">{template.name} Template</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-dark mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{template.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="flex-1 border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 transition font-medium flex items-center justify-center gap-2"
                >
                  <Eye size={18} />
                  Preview
                </button>
                <Link
                  to={`/builder`}
                  state={{ template: template.id }}
                  className="flex-1 bg-gradient-primary text-white py-2 rounded-lg hover:shadow-primary transition font-medium flex items-center justify-center gap-2"
                >
                  Use
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedTemplate(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-dark mb-6">{selectedTemplate.name} Template Preview</h2>
              <div className="bg-light rounded-lg p-8 min-h-96">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="bg-gradient-primary h-32 -m-8 mb-8 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold">Your Name</h3>
                      <p className="text-sm opacity-90">Professional Title</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                    <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="mt-6 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

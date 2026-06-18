import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ProjectSection({ resume, setResume }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editingId, setEditingId] = useState(null);

  const projects = resume?.projects || [];

  const onSubmit = (data) => {
    if (editingId !== null) {
      const updated = projects.map((proj, idx) => idx === editingId ? data : proj);
      setResume({ ...resume, projects: updated });
      setEditingId(null);
    } else {
      setResume({ ...resume, projects: [...projects, data] });
    }
    reset();
  };

  const handleDelete = (index) => {
    setResume({
      ...resume,
      projects: projects.filter((_, idx) => idx !== index)
    });
  };

  const handleEdit = (index) => {
    setEditingId(index);
    reset(projects[index]);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
        <div>
          <label className="text-sm font-medium text-dark">Project Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Project Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Description</label>
          <textarea
            {...register('description')}
            placeholder="Describe your project..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Technologies</label>
          <input
            {...register('technologies')}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Project Link</label>
          <input
            {...register('link')}
            type="url"
            placeholder="https://project.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          {editingId !== null ? 'Update' : 'Add'} Project
        </button>
      </form>

      <div className="space-y-2">
        {projects.map((proj, idx) => (
          <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-start">
            <div>
              <p className="font-semibold text-dark text-sm">{proj.title}</p>
              <p className="text-gray-600 text-xs">{proj.technologies}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(idx)}
                className="p-1 hover:bg-blue-50 rounded text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="p-1 hover:bg-red-50 rounded text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

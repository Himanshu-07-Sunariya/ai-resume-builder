import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ExperienceSection({ resume, setResume }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editingId, setEditingId] = useState(null);

  const experiences = resume?.experiences || [];

  const onSubmit = (data) => {
    if (editingId !== null) {
      const updated = experiences.map((exp, idx) => idx === editingId ? data : exp);
      setResume({ ...resume, experiences: updated });
      setEditingId(null);
    } else {
      setResume({ ...resume, experiences: [...experiences, data] });
    }
    reset();
  };

  const handleDelete = (index) => {
    setResume({
      ...resume,
      experiences: experiences.filter((_, idx) => idx !== index)
    });
  };

  const handleEdit = (index) => {
    setEditingId(index);
    reset(experiences[index]);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
        <div>
          <label className="text-sm font-medium text-dark">Company</label>
          <input
            {...register('company', { required: 'Company is required' })}
            placeholder="Company Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Job Title</label>
          <input
            {...register('jobTitle', { required: 'Job title is required' })}
            placeholder="Senior Developer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-dark">Start Date</label>
            <input
              {...register('startDate')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-dark">End Date</label>
            <input
              {...register('endDate')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('isCurrent')} className="rounded" />
          <span className="text-dark">Currently working here</span>
        </label>

        <div>
          <label className="text-sm font-medium text-dark">Description</label>
          <textarea
            {...register('description')}
            placeholder="Describe your responsibilities..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          {editingId !== null ? 'Update' : 'Add'} Experience
        </button>
      </form>

      <div className="space-y-2">
        {experiences.map((exp, idx) => (
          <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-start">
            <div>
              <p className="font-semibold text-dark text-sm">{exp.jobTitle}</p>
              <p className="text-gray-600 text-sm">{exp.company}</p>
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

import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function EducationSection({ resume, setResume }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editingId, setEditingId] = useState(null);

  const educations = resume?.educations || [];

  const onSubmit = (data) => {
    if (editingId !== null) {
      const updated = educations.map((edu, idx) => idx === editingId ? data : edu);
      setResume({ ...resume, educations: updated });
      setEditingId(null);
    } else {
      setResume({ ...resume, educations: [...educations, data] });
    }
    reset();
  };

  const handleDelete = (index) => {
    setResume({
      ...resume,
      educations: educations.filter((_, idx) => idx !== index)
    });
  };

  const handleEdit = (index) => {
    setEditingId(index);
    reset(educations[index]);
  };

  return (
    <div className="space-y-4">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
        <div>
          <label className="text-sm font-medium text-dark">School</label>
          <input
            {...register('school', { required: 'School is required' })}
            placeholder="University Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Degree</label>
          <input
            {...register('degree', { required: 'Degree is required' })}
            placeholder="Bachelor of Science"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Field of Study</label>
          <input
            {...register('fieldOfStudy')}
            placeholder="Computer Science"
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
            <label className="text-sm font-medium text-dark">Graduation Date</label>
            <input
              {...register('graduationDate')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          {editingId !== null ? 'Update' : 'Add'} Education
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {educations.map((edu, idx) => (
          <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-start">
            <div>
              <p className="font-semibold text-dark text-sm">{edu.degree}</p>
              <p className="text-gray-600 text-sm">{edu.school}</p>
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

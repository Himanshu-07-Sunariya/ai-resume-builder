import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function SkillSection({ resume, setResume }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editingId, setEditingId] = useState(null);

  const skills = resume?.skills || [];

  const onSubmit = (data) => {
    if (editingId !== null) {
      const updated = skills.map((skill, idx) => idx === editingId ? data : skill);
      setResume({ ...resume, skills: updated });
      setEditingId(null);
    } else {
      setResume({ ...resume, skills: [...skills, data] });
    }
    reset();
  };

  const handleDelete = (index) => {
    setResume({
      ...resume,
      skills: skills.filter((_, idx) => idx !== index)
    });
  };

  const handleEdit = (index) => {
    setEditingId(index);
    reset(skills[index]);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
        <div>
          <label className="text-sm font-medium text-dark">Skill Name</label>
          <input
            {...register('name', { required: 'Skill name is required' })}
            placeholder="e.g., JavaScript, React, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-dark">Proficiency Level</label>
          <select
            {...register('level')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          {editingId !== null ? 'Update' : 'Add'} Skill
        </button>
      </form>

      <div className="space-y-2">
        {skills.map((skill, idx) => (
          <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center">
            <div>
              <p className="font-semibold text-dark text-sm">{skill.name}</p>
              {skill.level && <p className="text-gray-600 text-xs">{skill.level}</p>}
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

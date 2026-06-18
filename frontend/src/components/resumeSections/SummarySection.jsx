import { useForm } from 'react-hook-form';

export default function SummarySection({ resume, setResume }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { summary: resume?.summary || '' }
  });

  const onSubmit = (data) => {
    setResume({
      ...resume,
      summary: data.summary
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="text-sm font-medium text-dark">Professional Summary</label>
        <textarea
          {...register('summary')}
          placeholder="Brief summary of your professional background..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
      >
        Save
      </button>
    </form>
  );
}

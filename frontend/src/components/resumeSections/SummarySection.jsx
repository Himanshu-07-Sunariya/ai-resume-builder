import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function SummarySection({ resume, setResume }) {
  const { register, watch, reset } = useForm({
    defaultValues: { summary: resume?.summary || '' }
  });

  useEffect(() => {
    reset({ summary: resume?.summary || '' });
  }, [resume?.id, reset]);

  useEffect(() => {
    const subscription = watch((data) => {
      setResume((prev) => ({
        ...prev,
        summary: data.summary,
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch, setResume]);

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium text-dark">Professional Summary</label>
        <textarea
          {...register('summary')}
          placeholder="Brief summary of your professional background..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
}

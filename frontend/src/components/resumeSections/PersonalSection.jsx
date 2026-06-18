import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function PersonalSection({ resume, setResume }) {
  const { register, watch, reset } = useForm({
    defaultValues: resume?.personal || {}
  });

  useEffect(() => {
    reset(resume?.personal || {});
  }, [resume?.id, reset]);

  useEffect(() => {
    const subscription = watch((data) => {
      setResume((prev) => ({
        ...prev,
        personal: data,
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch, setResume]);

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium text-dark">Full Name</label>
        <input
          {...register('fullName')}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-dark">Professional Title</label>
        <input
          {...register('profession')}
          placeholder="Full Stack Developer"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-dark">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="john@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-dark">Phone</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-dark">Location</label>
        <input
          {...register('location')}
          placeholder="City, Country"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-dark">Website/Portfolio</label>
        <input
          {...register('website')}
          placeholder="https://yourportfolio.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
}

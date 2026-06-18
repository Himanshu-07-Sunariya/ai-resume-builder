import { useForm } from 'react-hook-form';

export default function PersonalSection({ resume, setResume }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: resume?.personal || {}
  });

  const onSubmit = (data) => {
    setResume({
      ...resume,
      personal: data
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="text-sm font-medium text-dark">Full Name</label>
        <input
          {...register('fullName', { required: 'Name is required' })}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
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
          {...register('email', { required: 'Email is required' })}
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

      <button
        type="submit"
        className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
      >
        Save
      </button>
    </form>
  );
}

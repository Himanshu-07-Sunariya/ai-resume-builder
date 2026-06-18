import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Clock, Award, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-20 bg-gradient-to-br from-primary-50 via-light to-secondary-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-dark">
              Build Your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Professional Resume</span>
              {' '}in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create an ATS-optimized resume with AI-powered assistance. Choose from professional templates and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/auth/register" className="btn-primary flex items-center justify-center gap-2">
                Build Resume Now <ArrowRight size={20} />
              </Link>
              <button className="btn-secondary flex items-center justify-center gap-2">
                View Templates <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-gray-500 text-sm">✓ No credit card required • ✓ 3 templates included • ✓ Download as PDF</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-primary h-40 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold">Your Name</h3>
                  <p className="text-sm opacity-90">Full Stack Developer</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded w-full"></div>
                <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                <div className="space-y-3 pt-4">
                  <div className="h-2 bg-primary-100 rounded w-1/3"></div>
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                  <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Why Choose Our Resume Builder?</h2>
            <p className="text-xl text-gray-600">Everything you need to create a professional resume</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'AI-Powered',
                description: 'Get intelligent suggestions for your resume content'
              },
              {
                icon: Clock,
                title: 'Quick Creation',
                description: 'Build your resume in under 10 minutes'
              },
              {
                icon: Award,
                title: 'ATS Optimized',
                description: 'Pass applicant tracking systems with ease'
              },
              {
                icon: Users,
                title: 'Templates',
                description: '3+ professional templates to choose from'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Choose Your Template</h2>
            <p className="text-xl text-gray-600">Professional designs that get results</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Modern', 'Minimal', 'Developer'].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gray-400 mb-2">A</div>
                    <p className="text-gray-500 font-medium">{template} Template</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark mb-4">{template} Resume</h3>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                    Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 3-step process to create your resume</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: 1, title: 'Sign Up', description: 'Create your free account in seconds' },
              { step: 2, title: 'Fill Information', description: 'Add your details with AI suggestions' },
              { step: 3, title: 'Download', description: 'Get your ATS-optimized PDF resume' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-6 text-3xl text-primary-200">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals who've created their perfect resume
            </p>
            <Link to="/auth/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-shadow inline-flex items-center gap-2">
              Get Started Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

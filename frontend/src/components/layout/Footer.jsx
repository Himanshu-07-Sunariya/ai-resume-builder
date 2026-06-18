import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                AR
              </div>
              <span className="font-bold text-lg">Resume Builder</span>
            </div>
            <p className="text-gray-400 text-sm">
              Create professional resumes in minutes with AI-powered assistance.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-light transition">Features</Link></li>
              <li><Link to="/dashboard/templates" className="hover:text-light transition">Templates</Link></li>
              <li><a href="#pricing" className="hover:text-light transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-light transition">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-light transition">About Us</a></li>
              <li><a href="#blog" className="hover:text-light transition">Blog</a></li>
              <li><a href="#contact" className="hover:text-light transition">Contact</a></li>
              <li><a href="#careers" className="hover:text-light transition">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="mailto:support@resumebuilder.com" className="text-gray-400 hover:text-light transition">
                <Mail size={20} />
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-light transition">
                <Linkedin size={20} />
              </a>
              <a href="#github" className="text-gray-400 hover:text-light transition">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AI Resume Builder. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}

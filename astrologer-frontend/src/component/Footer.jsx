import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const allowedRoutes = ['/', '/chat'];

  if (!allowedRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        

        {/* Brand Section */}

        <div>
          <h3 className="text-xl font-bold text-white mb-2">InsightAstro</h3>
          <p className="text-sm text-gray-400">Guiding You Through the Stars</p>
        </div>


        {/* Quick Links */}'
        
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>


        {/* Socials */}
        
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-80 transition">
              <img
                src="https://www.wavetransit.com/wp-content/uploads/2021/08/Facebook-logo.png"
                alt="Facebook"
                className="h-7 w-12"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                alt="Instagram"
                className="h-7 w-6"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
                alt="LinkedIn"
                className="h-10 w-10"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img
                src="https://images.indianexpress.com/2024/03/YouTube-Pixabay-2.jpg"
                alt="YouTube"
                className="h-8 w-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2025 InsightAstro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

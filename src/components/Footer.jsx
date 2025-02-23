import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">&copy; 2025 CareerLens. All rights reserved.</p>
        {/* <div className="mt-4">
          <a href="/privacy-policy" className="text-blue-500 hover:underline mx-2">Privacy Policy</a>
          <a href="/terms-of-service" className="text-blue-500 hover:underline mx-2">Terms of Service</a>
          <a href="/contact" className="text-blue-500 hover:underline mx-2">Contact Us</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
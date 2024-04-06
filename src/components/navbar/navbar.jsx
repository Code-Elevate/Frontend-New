import React from 'react';

const Navbar = () => {
  return (
    <div className="gradient-bg p-4 flex justify-between">
      <a href="#" className="text-white hover:text-blue-800">CodeElevate</a>
      <ul className="flex justify-center">
        <li className="mr-6"><a href="#" className="text-white hover:text-blue-800">Home</a></li>
        <li className="mr-6"><a href="#" className="text-white hover:text-blue-800">Problems</a></li>
      </ul>
      <a href="/signin" className="text-white hover:text-blue-800">Login</a>
      <style>
        {`
          .gradient-bg {
            background-color: #667EEA; /* Fallback color */
            background-image: linear-gradient(to bottom, #667EEA, #764BA2); /* Vertical gradient */
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;

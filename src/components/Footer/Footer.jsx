import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-200 mt-20 py-4 text-center">
            <div className="flex justify-center space-x-4">
                {/* Social Media Links */}
                <a href="https://www.facebook.com/avzit" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-primary text-xl hover:text-blue-800" />
                </a>
                <a href="https://www.linkedin.com/in/abhijitsarker" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-primary text-xl hover:text-blue-800" />
                </a>
                <a href="https://twitter.com/Abhijit__Sarker" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-primary text-xl hover:text-blue-800" />
                </a>
                <a href="https://github.com/AbhijitSarker/" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-primary text-xl hover:text-blue-800" />
                </a>
                <a href="https://www.instagram.com/_avzit_" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-primary text-xl hover:text-blue-800" />
                </a>
            </div>
            {/* Credit */}
            <p className="mt-4 text-gray-600">Developed by Abhijit Sarker</p>
        </footer>
    );
};

export default Footer;

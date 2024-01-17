import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-bg md: h-60 border-t border-t-gray-700 mt-20 py-20 text-center text-secondary ">
            <div className="flex justify-center space-x-4">
                {/* Social Media Links */}
                <a href="https://www.facebook.com/avzit" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className=" text-3xl hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/abhijitsarker" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className=" text-3xl hover:text-white" />
                </a>
                <a href="https://twitter.com/Abhijit__Sarker" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className=" text-3xl hover:text-white" />
                </a>
                <a href="https://github.com/AbhijitSarker/" target="_blank" rel="noopener noreferrer">
                    <FaGithub className=" text-3xl hover:text-white" />
                </a>
                <a href="https://www.instagram.com/_avzit_" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className=" text-3xl hover:text-white" />
                </a>
            </div>
            {/* Credit */}
            <p className="mt-4 ">Developed by Abhijit Sarker</p>
        </footer>
    );
};

export default Footer;

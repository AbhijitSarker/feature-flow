import React from 'react';
import img from '../../assets/about.jpg'
const About = () => {
    return (
        <div className="hero-bg min-h-screen py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-7xl text-headingText font-bold mb-16 text-center">About</h1>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="max-w-md">
                        <p className="text-gray-400">
                            Welcome to Feature Flow, where innovation meets collaboration. We are a feature management application designed to streamline the process of proposing, voting on, and discussing new features for your projects.
                        </p>
                        <p className="text-gray-400 mt-4">
                            Our platform empowers users to actively participate in shaping the development roadmap. From proposing groundbreaking ideas to voting on features that matter most to you, Feature Flow is your go-to tool for feature management.
                        </p>
                    </div>
                    <div className=''>
                        <img src={img} alt="Feature Flow Office" className="rounded-md h-[500px] w-[500px] object-cover shadow-md" />
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-5xl text-headingText font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-400">
                        At Feature Flow, our mission is to foster a collaborative environment where every user's voice is heard. We believe in the power of collective innovation and aim to provide a platform that empowers individuals and teams to contribute to the development process seamlessly.
                        At Feature Flow, our mission is to foster a collaborative environment where every user's voice is heard. We believe in the power of collective innovation and aim to provide a platform that empowers individuals and teams to contribute to the development process seamlessly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

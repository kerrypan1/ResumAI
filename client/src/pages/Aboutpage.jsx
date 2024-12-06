import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="about-header">
          <h1 className="main-heading">
            About
          </h1>
        </header>

        <div className="main-content">
          <div className="about-section">
            <motion.div
              className="about-card"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="section-title">What is ResumAI?</h2>
              <p className="mt-4 text-text-secondary">
                ResumAI is a full-stack machine learning project focused on helping individuals craft professional and optimized resumes. 
                We guide users in providing tailored feedback to their resumes given some objective they want to accomplish such as applying to a specific job. 
                Through utilizing AI and machine learning, we aim to provide metrics that can help you gauge how polished and strong your resume is and helps us give specific points and places for improvement.
              </p>
            </motion.div>

            <motion.div
              className="prompt-container"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="section-title">How It Works</h2>
              <ul className="list-disc pl-5 text-text-secondary">
                <li className="mb-2">Upload your resume in PDF format</li>
                <li className="mb-2">Ask specific questions about your resume</li>
                <li className="mb-2">Receive instant, AI-powered feedback</li>
                <li>Iterate and improve your resume with targeted suggestions</li>
              </ul>
            </motion.div>
          </div>

          <div className="interaction-section">
            <motion.div
              className="image-container"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/logo.png" 
                alt="ResumAI Team" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
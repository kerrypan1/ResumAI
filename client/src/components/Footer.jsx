import { SparklesIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Footer.css';

function Footer() {
  return (
  <div className='footer'>
    <p className='footer_logo'> 
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        ResumAI 
      </a>
    </p>
    <div class='footer_text'>
      <p>Keep up with the latest updates:</p>
      <input type='text' placeholder='Enter your email' class='footer_input'/>
       <button class='footer_button'>Subscribe</button>
    </div>
    <div className="footer_links">
        <a href='/'>Home</a>
        <a href='/about'>About Us</a>
        <a href='/contact'>Contact</a>
      </div>
  </div>
  );
}

export default Footer;

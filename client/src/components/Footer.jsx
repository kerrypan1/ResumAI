import { SparklesIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
  <div className='footer'>
    <p className='footer_logo'> 
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        ResumAI 
      </a>
    </p>
    <div className='footer_text'>
      <p>Keep up with the latest update:</p>
      <input type='text' placeholder='Enter your email to hear from us!' className='footer_input'/>
       <button className='footer_button'>Subscribe</button>
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
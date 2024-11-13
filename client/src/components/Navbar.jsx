import React from 'react';

const Navbar = () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const styles = {
    nav: {
      background: 'linear-gradient(90deg, #E3A8A0 0%, #D29A97 100%)', // Indigo to purple gradient
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    container: {
      padding: '0 2rem',
    },
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
    },
    logo: {
      color: 'white',
      fontSize: '1.75rem',
      fontWeight: 'bold',
      fontFamily: '"Poppins", sans-serif',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
      letterSpacing: '1px',
    },
    linksContainer: {
      display: 'flex',
      gap: '2.5rem',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '500',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease',
      borderRadius: '25px',
      border: '2px solid transparent',
    }
  };

  // Add Poppins font from Google Fonts
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.flexContainer}>
          {/* Logo */}
          <div>
            <span style={styles.logo}>ResumAI</span>
          </div>

          {/* Navigation */}
          <div style={styles.linksContainer}>
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                style={styles.link}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.border = '2px solid transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
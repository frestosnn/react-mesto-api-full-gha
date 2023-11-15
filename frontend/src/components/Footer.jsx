import React from 'react';
function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">© {currentDate} Mesto Russia</p>
    </footer>
  );
}

export default Footer;

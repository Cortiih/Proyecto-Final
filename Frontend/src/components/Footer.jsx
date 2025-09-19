import React from "react";
import "./Footer.css";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"; 

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© {currentYear} Santino Corti</span>
      </div>

      <div className="footer-right">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
      </div>
    </footer>
  );
};

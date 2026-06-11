import React from "react";
import "./Navbar.css";

const NAV_LINKS = ["Reports", "Villages", "Settings"];

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <div className="navbar-logo-icon">
          <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
            <polygon points="7.5,1.5 13.5,5 13.5,10.5 7.5,14 1.5,10.5 1.5,5"
              stroke="white" strokeWidth="1.75" fill="none" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="navbar-brand-text">
          <div className="navbar-brand-title-row">
            <span className="navbar-brand-name">EA Consulting</span>
            <span className="navbar-badge">CRSDP</span>
          </div>
          <span className="navbar-brand-subtitle">PDD Management System</span>
        </div>
      </div>

      {/* Separator */}
      <div className="navbar-divider" />

      {/* Nav links */}
      <div className="navbar-links">
        <a href="#" className="nav-link-active">
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.8"/>
            <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" fill="currentColor"/>
            <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor"/>
            <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.8"/>
          </svg>
          PDD Generator
        </a>
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className="nav-link">{link}</a>
        ))}
      </div>

      {/* User */}
      <div className="navbar-user">
        <div className="navbar-user-text">
          <div className="navbar-user-name">EA Engineer</div>
          <div className="navbar-user-role">Administrator</div>
        </div>
        <div className="navbar-avatar">EA</div>
      </div>
    </nav>
  );
}
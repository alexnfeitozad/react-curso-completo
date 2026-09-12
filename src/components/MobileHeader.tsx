import React from 'react';
import { Link } from 'react-router-dom';

interface MobileHeaderProps {
  onToggle: () => void;
  onClose: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onToggle, onClose }) => {
  return (
    <header className="mobile-topbar">
      <button className="mobile-toggle-btn" onClick={onToggle} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link to="/" className="mobile-brand" onClick={onClose}>
        <span style={{ fontSize: '1.4rem' }}>⚛️</span>
        <span className="brand-title">Do Componente ao Arquiteto</span>
      </Link>
      <span className="badge badge-primary">React 19</span>
    </header>
  );
};

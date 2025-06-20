import React from 'react';
import { Link } from '@tanstack/react-router';
export default function HomePage() {
  return (
    <section className="page-container">
      <div className="page-hero">
        <h1 className="page-title">Welcome to Kanban Pro Max</h1>
        <p className="page-subtitle">
         Manage tasks easily and keep everything on track.
        </p>
        <div className="page-actions">
          <Link to="/projects/PGM-3">
            <button className="page-button page-button--primary">Go to PGM-3 Board</button>
          </Link>
          <Link to="/projects/PGM-4">
            <button className="page-button page-button--secondary">Go to PGM-4 Board</button>
          </Link>
        </div>
      </div>
      <div className="page-section page-features">
        <div className="page-feature">
          <h3 className="page-section-title">Backlog Management</h3>
          <p className="page-feature-text">Add and organize tasks quickly</p>
        </div>
        <div className="page-feature">
          <h3 className="page-section-title">Real-time Collaboration</h3>
          <p className="page-feature-text">Collaborate live with your team.</p>
        </div>
        <div className="page-feature">
          <h3 className="page-section-title">Custom Labels & Filters</h3>
          <p className="page-feature-text">Label and filter tasks easily.</p>
        </div>
      </div>
    </section>
  );
}

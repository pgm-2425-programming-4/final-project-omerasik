
import React from 'react';
export default function AboutPage() {
  return (
    <section className="page-container">
      <div className="page-hero">
        <h1 className="page-title">About Me</h1>
      </div>
      <div className="page-section">
        <p className="page-text">
          Hello! I’m <strong>Omer Asik</strong>, a Programming student at Artevelde University.
        </p>
        <p className="page-text">
          I developed this Kanban application to streamline task and project management,
          leveraging React, CSS, and a Node.js backend with Express.
        </p>
        <p className="page-text">
          With features like board creation, drag-and-drop task management, and real-time updates,
          this app helps teams stay organized and productive.
        </p>
      </div>
      <div className="page-section page-contacts">
        <p>
          <strong>Contact:</strong>{' '}
          <a href="mailto:omerasik@student.arteveldehs.be" className="page-link">
            omerasik@student.arteveldehs.be
          </a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/omerasik/" className="page-link" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/omerasik
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{' '}
          <a href="https://github.com/omerasik" className="page-link" target="_blank" rel="noopener noreferrer">
            github.com/omerasik
          </a>
        </p>
      </div>
    </section>
  );
}

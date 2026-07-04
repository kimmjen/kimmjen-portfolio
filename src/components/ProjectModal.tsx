'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faExternalLinkAlt, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { PersonalProject } from '@/data/resumeData';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectModalProps {
  project: PersonalProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--modal-overlay)] p-4 backdrop-blur-sm">
      <div className="bg-[var(--card-background)] rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-[var(--border-color)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--section-bg)]">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">{project.title}</h3>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors p-2 hover:bg-[var(--card-hover)] rounded-full"
          >
            <FontAwesomeIcon icon={faX} className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Project Info */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              {project.period && (
                <div className="flex items-center text-sm text-[var(--text-secondary)] bg-[var(--section-bg)] px-3 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 mr-2 text-[var(--accent)]" />
                  <span className="font-medium">{project.period}</span>
                </div>
              )}
              {project.type && (
                <div className="flex items-center text-sm text-[var(--text-secondary)] bg-[var(--section-bg)] px-3 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faTag} className="w-4 h-4 mr-2 text-[var(--accent)]" />
                  <span className="font-medium">{project.type}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-[var(--text-secondary)] leading-relaxed bg-[var(--section-bg)] p-4 rounded-lg text-sm">
              {project.description}
            </p>
          </div>

          {/* Technologies (if available) */}
          {project.technologies && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">{t('tech_stack')}</h4>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[var(--accent-light)] text-[var(--accent-text)] text-sm rounded-full font-medium border border-[var(--border-color)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features (if available) */}
          {project.features && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">{t('features')}</h4>
              <div className="bg-[var(--section-bg)] p-4 rounded-lg">
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Challenges (if available) */}
          {project.challenges && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">{t('challenges')}</h4>
              <div className="bg-[var(--section-bg)] p-4 rounded-lg">
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-6 border-t border-[var(--border-color)] bg-[var(--section-bg)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--card-background)] border border-[var(--border-color)] rounded-md hover:bg-[var(--card-hover)] hover:text-[var(--foreground)] transition-all duration-200"
          >
            {t('close')}
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-[var(--background)] bg-[var(--foreground)] rounded-md hover:opacity-90 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4 mr-2" />
              {t('view_project')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

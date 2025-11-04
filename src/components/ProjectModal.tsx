'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faExternalLinkAlt, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { PersonalProject } from '@/data/resumeData';

interface ProjectModalProps {
  project: PersonalProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div className="bg-[var(--card-background)] rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-[var(--border-color)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
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
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium">{project.period}</span>
                </div>
              )}
              {project.type && (
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faTag} className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">{project.type}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg text-sm">
              {project.description}
            </p>
          </div>

          {/* Technologies (if available) */}
          {project.technologies && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">사용 기술</h4>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm rounded-full font-medium shadow-sm"
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
              <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">주요 기능</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
              <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">기술적 도전과 해결</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-6 border-t border-[var(--border-color)] bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-800 transition-all duration-200"
          >
            닫기
          </button>
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4 mr-2" />
              프로젝트 보기
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

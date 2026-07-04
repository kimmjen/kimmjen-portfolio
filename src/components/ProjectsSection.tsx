'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProjectModal from './ProjectModal';
import { PersonalProject } from '@/data/resumeData';

const ProjectsSection = () => {
  const { data, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<PersonalProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: PersonalProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-16">
      <div className="jm-biography">
        <h3 className="text-xl font-bold uppercase tracking-widest text-center mb-12 mt-8">
          {t('projects')}
          <div className="w-16 h-0.5 bg-[var(--underline-color)] mx-auto mt-1"></div>
        </h3>

        <div className="jm-biography__wrapper">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]" onClick={() => openModal(project)}>
                <div className="bg-[var(--section-bg)] h-32 flex flex-col items-center justify-center border-b border-[var(--border-color)] p-4 rounded-t-lg">
                  <h4 className="text-xl font-bold text-center text-[var(--foreground)]">{project.title}</h4>
                  {project.period &&
                    <p className="text-sm text-[var(--text-muted)] mt-2">{project.period}</p>
                  }
                </div>
                <div className="p-6">
                  <p className="text-sm mb-6 leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--accent)] font-medium hover:text-[var(--foreground)] transition-colors">
                      {t('view_project')} →
                    </span>

                    <div className="text-xs text-[var(--text-muted)] font-semibold bg-[var(--section-bg)] px-2 py-1 rounded-full">
                      {project.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default ProjectsSection; 
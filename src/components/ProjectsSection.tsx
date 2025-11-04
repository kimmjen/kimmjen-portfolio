'use client';

import React, { useState } from 'react';
import resumeData from '@/data/resumeData';
import ProjectModal from './ProjectModal';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof resumeData.projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: typeof resumeData.projects[0]) => {
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
          PROJECTS
          <div className="w-16 h-0.5 bg-black mx-auto mt-1"></div>
        </h3>
        
        <div className="jm-biography__wrapper">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]" onClick={() => openModal(project)}>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-32 flex flex-col items-center justify-center border-b border-[var(--border-color)] p-4 rounded-t-lg">
                  <h4 className="text-xl font-bold text-center text-gray-800">{project.title}</h4>
                  {project.period && 
                    <p className="text-sm text-gray-600 mt-2">{project.period}</p>
                  }
                </div>
                <div className="p-6">
                  <p className="text-sm mb-6 leading-relaxed text-gray-700">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                      자세히 보기 →
                    </span>
                    
                    <div className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-1 rounded-full">
                      {project.type || (index === 0 ? '개인 프로젝트' : '회사 프로젝트')}
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
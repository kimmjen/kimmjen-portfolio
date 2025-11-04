'use client';

import React from 'react';
import Link from 'next/link';
import resumeData from '@/data/resumeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faBirthdayCake, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ResumePage = () => {
  return (
    <div className="resume-container min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Print Controls */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-xs font-medium"
        >
          🏠 Home
        </Link>
        <Link
          href="/resumev2"
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-xs font-medium"
        >
          🎓 Academic CV
        </Link>
        <button
          onClick={() => window.print()}
          className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
        >
          📄 Download PDF
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8 sm:p-12">
        {/* Header */}
        <header className="border-b-2 border-gray-800 pb-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{resumeData.name}</h1>
          <h2 className="text-xl sm:text-2xl text-gray-600 mb-6">{resumeData.nameEn}</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{resumeData.profile}</p>
        </header>

        {/* Contact Info */}
        <section className="mb-10 pb-8 border-b border-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center">
            <span className="w-1 h-6 bg-blue-600 mr-3"></span>
            Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2 text-gray-600" />
              <span>{resumeData.contact.email}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2 text-gray-600" />
              <span>{resumeData.contact.phone}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-gray-600" />
              <span>{resumeData.contact.address}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBirthdayCake} className="w-4 h-4 mr-2 text-gray-600" />
              <span>{resumeData.contact.birth}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4 mr-2 text-gray-600" />
              <a href="https://github.com/kimmjen" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                github.com/kimmjen
              </a>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 mr-2 text-gray-600" />
              <a href="https://kimmjen.github.io/kimmjen-portfolio/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-10 pb-8 border-b border-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center">
            <span className="w-1 h-6 bg-green-600 mr-3"></span>
            Education
          </h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-5 pl-4 border-l-2 border-gray-200 hover:border-green-500 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{edu.school}</h4>
                  <p className="text-sm text-gray-700 mt-1">{edu.degree}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">{edu.period}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="mb-10 pb-8 border-b border-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center">
            <span className="w-1 h-6 bg-purple-600 mr-3"></span>
            Experience
          </h3>
          {resumeData.experience.map((exp, expIndex) => (
            <div key={expIndex} className="mb-8 pl-4 border-l-2 border-gray-200 hover:border-purple-500 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{exp.company}</h4>
                  <p className="text-sm text-gray-700 mt-1">{exp.position}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">{exp.period}</span>
              </div>
              
              {exp.projects.map((project, projIndex) => (
                <div key={projIndex} className="ml-2 mb-5 bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h5 className="font-semibold text-gray-800 text-base">{project.title}</h5>
                    {project.date && (
                      <span className="text-xs text-gray-600 whitespace-nowrap">{project.date}</span>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 mt-3">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex} className="leading-relaxed pl-2">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-10 pb-8 border-b border-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center">
            <span className="w-1 h-6 bg-orange-600 mr-3"></span>
            Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-3 text-base">{skill.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center">
            <span className="w-1 h-6 bg-red-600 mr-3"></span>
            Projects
          </h3>
          {resumeData.projects.filter(p => p.type === '개인 프로젝트').map((project, index) => (
            <div key={index} className="mb-8 pl-4 border-l-2 border-gray-200 hover:border-red-500 transition-colors bg-gray-50 p-5 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h4>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all">
                      {project.link}
                    </a>
                  )}
                </div>
                {project.period && (
                  <span className="text-sm text-gray-600 whitespace-nowrap">{project.period}</span>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{project.description}</p>
              
              {project.technologies && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-gray-800 block mb-2">기술 스택</span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {project.features && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-800 mb-2">주요 기능</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
                    {project.features.slice(0, 4).map((feature, fIndex) => (
                      <li key={fIndex} className="leading-relaxed pl-2">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      <style jsx global>{`
        @media print {
          .resume-container {
            padding: 0 !important;
            background: white !important;
          }
          
          body {
            background: white !important;
          }
          
          .max-w-5xl {
            max-width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 20mm !important;
          }
          
          section {
            page-break-inside: avoid;
          }
          
          h3 {
            page-break-after: avoid;
          }
          
          .bg-gray-50 {
            background: #f9fafb !important;
          }
          
          .shadow-xl {
            box-shadow: none !important;
          }
          
          .rounded-lg {
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;


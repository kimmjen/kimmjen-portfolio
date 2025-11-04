'use client';

import React from 'react';
import Link from 'next/link';
import resumeData from '@/data/resumeData';

const ResumeV2Page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-xs font-medium"
        >
          🏠 Home
        </Link>
        <Link
          href="/resume"
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-xs font-medium"
        >
          💼 Standard Version
        </Link>
        <button
          onClick={() => window.print()}
          className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
        >
          📄 Download PDF
        </button>
      </div>

      {/* CV Container */}
      <div className="max-w-[8.5in] mx-auto bg-white p-16 shadow-lg">
        {/* Header */}
        <header className="text-center mb-8 pb-6 border-b-2 border-gray-900">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            {resumeData.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{resumeData.nameEn}</p>
          
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
            <span>{resumeData.contact.email}</span>
            <span>•</span>
            <span>{resumeData.contact.phone}</span>
            <span>•</span>
            <a href="https://github.com/kimmjen" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              github.com/kimmjen
            </a>
            <span>•</span>
            <a href="https://kimmjen.github.io/kimmjen-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              Portfolio
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Research Interests
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            {resumeData.profile}
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-700 italic">{edu.degree}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap ml-4">{edu.period}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Research & Work Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Research & Work Experience
          </h2>
          {resumeData.experience.map((exp, expIndex) => (
            <div key={expIndex} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <p className="text-sm text-gray-700 italic">{exp.position}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap ml-4">{exp.period}</span>
              </div>
              
              {exp.projects.map((project, projIndex) => (
                <div key={projIndex} className="ml-4 mb-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    {project.title}
                    {project.date && <span className="font-normal text-gray-600 ml-2">({project.date})</span>}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm text-gray-700 ml-2">
                    {project.description.slice(0, 3).map((desc, descIndex) => (
                      <li key={descIndex} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Technical Skills
          </h2>
          <div className="space-y-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex">
                <span className="font-semibold text-gray-900 min-w-[120px] text-sm">{skill.category}:</span>
                <span className="text-sm text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects & Publications */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Selected Projects
          </h2>
          {resumeData.projects.filter(p => p.type === '개인 프로젝트').map((project, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                {project.period && (
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">{project.period}</span>
                )}
              </div>
              
              {project.link && (
                <p className="text-xs text-blue-600 mb-2">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {project.link}
                  </a>
                </p>
              )}
              
              <p className="text-sm text-gray-700 mb-2 leading-relaxed">{project.description}</p>
              
              {project.technologies && (
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                </p>
              )}
              
              {project.features && project.features.length > 0 && (
                <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-700 mt-2 ml-2">
                  {project.features.slice(0, 3).map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* Additional Information */}
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Additional Information
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-semibold text-gray-900 min-w-[120px]">Languages:</span>
              <span className="text-gray-700">Korean (Native), English (Professional Working Proficiency)</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-900 min-w-[120px]">Location:</span>
              <span className="text-gray-700">{resumeData.contact.address}</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        </footer>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          
          body {
            background: white;
          }
          
          .max-w-\\[8\\.5in\\] {
            max-width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          
          .shadow-lg {
            box-shadow: none !important;
          }
          
          section {
            page-break-inside: avoid;
          }
          
          h2 {
            page-break-after: avoid;
          }
          
          a {
            color: #1e40af !important;
            text-decoration: none !important;
          }
        }
        
        @media screen {
          .max-w-\\[8\\.5in\\] {
            min-height: 11in;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeV2Page;


'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import resumeData from '@/data/resumeData';
import { pdf } from '@react-pdf/renderer';
import { EnglishResumePDF } from '@/components/ResumePDF';

const ResumeV2Page = () => {
  const data = resumeData.en;
  const [generating, setGenerating] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    setGenerating(true);
    try {
      const blob = await pdf(<EnglishResumePDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'KimJeMin_Resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('PDF generation failed:', e);
    } finally {
      setGenerating(false);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[var(--section-bg)] py-10 px-4">
      {/* Print Controls */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          Home
        </Link>
        <Link
          href="/resume"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          한국어 이력서
        </Link>
        <button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* CV Container — single page feel */}
      <div className="max-w-[8.5in] mx-auto bg-[var(--card-background)] shadow-lg">
        <div className="p-12 sm:p-16">

          {/* ========== Header ========== */}
          <header className="text-center mb-6 pb-4 border-b-2 border-[var(--foreground)]">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1 tracking-tight uppercase">
              {data.name}
            </h1>

            {/* Contact line — email • github • portfolio only */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)] mt-3">
              <span>{data.contact.email}</span>
              <span className="text-[var(--border-color)]">|</span>
              <a href="https://github.com/kimmjen" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                github.com/kimmjen
              </a>
              <span className="text-[var(--border-color)]">|</span>
              <a href="https://kimmjen.github.io/kimmjen-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                Portfolio
              </a>
            </div>
          </header>

          {/* ========== Professional Summary ========== */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-2 uppercase tracking-widest border-b border-[var(--border-color)] pb-1">
              Professional Summary
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {data.profile}
            </p>
          </section>

          {/* ========== Experience (first for Western style) ========== */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-3 uppercase tracking-widest border-b border-[var(--border-color)] pb-1">
              Experience
            </h2>
            {data.experience.map((exp, expIndex) => (
              <div key={expIndex} className="mb-5 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-[var(--foreground)] text-sm">{exp.company}</span>
                    <span className="text-[var(--text-muted)] text-sm"> — </span>
                    <span className="text-sm text-[var(--text-secondary)] italic">{exp.position}</span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap ml-4 font-mono">{exp.period}</span>
                </div>

                {exp.projects.map((project, projIndex) => (
                  <div key={projIndex} className="ml-3 mb-3 last:mb-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] mb-1">
                      {project.title}
                      {project.date && <span className="font-normal text-[var(--text-muted)] ml-2 text-xs">({project.date})</span>}
                    </p>
                    <ul className="list-disc ml-5 space-y-0.5 text-sm text-[var(--text-secondary)]">
                      {project.description.slice(0, 3).map((desc, descIndex) => (
                        <li key={descIndex} className="leading-relaxed">{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </section>

          {/* ========== Technical Skills ========== */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-2 uppercase tracking-widest border-b border-[var(--border-color)] pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex text-sm">
                  <span className="font-semibold text-[var(--foreground)] min-w-[110px]">{skill.category}:</span>
                  <span className="text-[var(--text-secondary)]">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ========== Selected Projects ========== */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-3 uppercase tracking-widest border-b border-[var(--border-color)] pb-1">
              Selected Projects
            </h2>
            {data.projects.filter(p => p.type === '개인 프로젝트' || p.type === 'Personal Project').map((project, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[var(--foreground)] text-sm">{project.title}</h3>
                  {project.period && (
                    <span className="text-xs text-[var(--text-muted)] whitespace-nowrap ml-4 font-mono">{project.period}</span>
                  )}
                </div>

                {project.link && (
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                      {project.link}
                    </a>
                  </p>
                )}

                <p className="text-sm text-[var(--text-secondary)] mb-1 leading-relaxed">{project.description}</p>

                {project.technologies && (
                  <p className="text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--foreground)]">Tech:</span> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* ========== Education (last for Western style) ========== */}
          <section className="mb-4">
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-2 uppercase tracking-widest border-b border-[var(--border-color)] pb-1">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-2 last:mb-0 flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-[var(--foreground)] text-sm">{edu.school}</span>
                  <span className="text-sm text-[var(--text-secondary)] italic"> — {edu.degree}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)] whitespace-nowrap ml-4 font-mono">{edu.period}</span>
              </div>
            ))}
          </section>

        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            background: white !important;
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
            color: inherit !important;
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

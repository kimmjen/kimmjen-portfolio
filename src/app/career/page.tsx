'use client';

import React from 'react';
import Link from 'next/link';
import resumeData from '@/data/resumeData';

const CareerPage = () => {
  const data = resumeData.ko;

  // 회사 프로젝트도 projects 배열에서 가져와 experience와 매칭
  const getProjectDetail = (title: string) => {
    return data.projects.find(p => p.title === title);
  };

  return (
    <div className="min-h-screen bg-[var(--section-bg)] py-12 px-4 sm:px-6 lg:px-8">
      {/* 상단 버튼 */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          홈
        </Link>
        <Link
          href="/resume"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          이력서
        </Link>
        <Link
          href="/coverletter"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          자기소개서
        </Link>
        <button
          onClick={() => window.print()}
          className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          PDF 다운로드
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* ========== 제목 ========== */}
        <div className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="p-8 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] text-center mb-6 tracking-tight">
              경 력 기 술 서
            </h1>

            {/* 인적사항 간략 */}
            <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      성 명
                    </th>
                    <td className="px-4 py-3 text-[var(--foreground)] font-bold text-lg">
                      {data.name} ({data.nameEn})
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      연락처
                    </th>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">
                      {data.contact.email} | {data.contact.phone}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 요약 */}
            <div className="mt-6 p-4 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {data.profile}
              </p>
            </div>
          </div>
        </div>

        {/* ========== 경력별 프로젝트 상세 ========== */}
        {data.experience.map((exp, expIndex) => (
          <div key={expIndex} className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden mb-6">
            {/* 회사 헤더 */}
            <div className="bg-[var(--foreground)] text-[var(--background)] px-6 sm:px-8 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <div>
                  <h2 className="text-lg font-bold">{exp.company}</h2>
                  <p className="text-sm opacity-80">{exp.position}</p>
                </div>
                <span className="text-sm font-mono opacity-80">{exp.period}</span>
              </div>
            </div>

            {/* 프로젝트 목록 */}
            <div className="p-6 sm:p-8 space-y-8">
              {exp.projects.map((project, projIndex) => {
                const detail = getProjectDetail(project.title);
                return (
                  <div key={projIndex} className="last:mb-0">
                    {/* 프로젝트 제목 */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4 pb-3 border-b-2 border-[var(--foreground)]">
                      <h3 className="text-lg font-bold text-[var(--foreground)]">
                        {project.title}
                      </h3>
                      {project.date && (
                        <span className="text-sm text-[var(--text-muted)] font-mono">{project.date}</span>
                      )}
                    </div>

                    {/* 프로젝트 개요 */}
                    {detail && (
                      <div className="mb-4 p-4 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                        <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">프로젝트 개요</h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {detail.description}
                        </p>
                      </div>
                    )}

                    {/* 기술 스택 */}
                    {detail?.technologies && detail.technologies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">사용 기술</h4>
                        <div className="flex flex-wrap gap-2">
                          {detail.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="text-xs bg-[var(--section-bg)] text-[var(--foreground)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 담당 업무 */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">담당 업무</h4>
                      <ul className="space-y-2">
                        {project.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                            <span className="text-[var(--foreground)] mt-1 flex-shrink-0">-</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 주요 기능 */}
                    {detail?.features && detail.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">주요 성과 / 기능</h4>
                        <ul className="space-y-1.5">
                          {detail.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                              <span className="text-[var(--foreground)] mt-1 flex-shrink-0">-</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 트러블슈팅 / 챌린지 */}
                    {detail?.challenges && detail.challenges.length > 0 && (
                      <div className="mb-2">
                        <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">트러블슈팅 / 기술적 도전</h4>
                        <ul className="space-y-1.5">
                          {detail.challenges.map((challenge, cIndex) => (
                            <li key={cIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                              <span className="text-[var(--foreground)] mt-1 flex-shrink-0">-</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* ========== 개인 프로젝트 ========== */}
        <div className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden mb-6">
          <div className="bg-[var(--accent)] text-[var(--background)] px-6 sm:px-8 py-4">
            <h2 className="text-lg font-bold">개인 프로젝트</h2>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {data.projects
              .filter(p => p.type === '개인 프로젝트')
              .map((project, index) => (
                <div key={index} className="last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4 pb-3 border-b-2 border-[var(--foreground)]">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--foreground)]">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline">
                          {project.link}
                        </a>
                      )}
                    </div>
                    {project.period && (
                      <span className="text-sm text-[var(--text-muted)] font-mono">{project.period}</span>
                    )}
                  </div>

                  {/* 프로젝트 개요 */}
                  <div className="mb-4 p-4 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                    <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">프로젝트 개요</h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* 기술 스택 */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">사용 기술</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs bg-[var(--section-bg)] text-[var(--foreground)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 주요 기능 */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">주요 성과 / 기능</h4>
                      <ul className="space-y-1.5">
                        {project.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                            <span className="text-[var(--foreground)] mt-1 flex-shrink-0">-</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 트러블슈팅 */}
                  {project.challenges && project.challenges.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">트러블슈팅 / 기술적 도전</h4>
                      <ul className="space-y-1.5">
                        {project.challenges.map((challenge, cIndex) => (
                          <li key={cIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                            <span className="text-[var(--foreground)] mt-1 flex-shrink-0">-</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* ========== 기술 스택 요약 ========== */}
        <div className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 pb-2 border-b-2 border-[var(--foreground)]">
              보유 기술
            </h2>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {data.skills.map((skill, index) => (
                  <tr key={index} className="border border-[var(--border-color)] hover:bg-[var(--card-hover)] transition-colors">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-32 font-semibold border-r border-[var(--border-color)]">
                      {skill.category}
                    </th>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, itemIndex) => (
                          <span key={itemIndex} className="text-xs bg-[var(--section-bg)] text-[var(--foreground)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; background: white !important; }
          .shadow-xl { box-shadow: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          .mb-6, .mb-8 { margin-bottom: 12px !important; }
          section, div { page-break-inside: avoid; }
          h2, h3 { page-break-after: avoid; }
          * { color: #1e293b !important; background-color: transparent !important; }
          .bg-\\[var\\(--foreground\\)\\] { background-color: #1e293b !important; color: white !important; }
          .bg-\\[var\\(--accent\\)\\] { background-color: #334155 !important; color: white !important; }
          .bg-\\[var\\(--section-bg\\)\\] { background-color: #f8fafc !important; }
          .border { border-color: #e2e8f0 !important; }
        }
      `}</style>
    </div>
  );
};

export default CareerPage;

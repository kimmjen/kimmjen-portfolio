'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import resumeData from '@/data/resumeData';
import { pdf } from '@react-pdf/renderer';
import { KoreanResumePDF } from '@/components/ResumePDF';
import profilePic from '../../../public/images/profile.jpg';

const ResumePage = () => {
  const data = resumeData.ko;
  const [generating, setGenerating] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    setGenerating(true);
    try {
      const blob = await pdf(<KoreanResumePDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '김제민_이력서.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('PDF generation failed:', e);
    } finally {
      setGenerating(false);
    }
  }, [data]);

  return (
    <div className="resume-container min-h-screen bg-[var(--section-bg)] py-12 px-4 sm:px-6 lg:px-8">
      {/* Print Controls */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          홈
        </Link>
        <Link
          href="/resumev2"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          English Resume
        </Link>
        <Link
          href="/career"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          경력기술서
        </Link>
        <Link
          href="/coverletter"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          자기소개서
        </Link>
        <button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium disabled:opacity-50"
        >
          {generating ? '생성 중...' : 'PDF 다운로드'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden">

        {/* ========== Header: 인적사항 테이블 ========== */}
        <header className="p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] text-center mb-8 tracking-tight">
            이 력 서
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* 증명사진 */}
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="w-32 h-40 sm:w-36 sm:h-44 border-2 border-[var(--border-color)] rounded overflow-hidden bg-[var(--section-bg)]">
                <Image
                  src={profilePic}
                  alt="증명사진"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 인적사항 테이블 */}
            <div className="flex-1">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      성 명
                    </th>
                    <td className="px-4 py-3 text-[var(--foreground)] font-bold text-lg" colSpan={3}>
                      {data.name} ({data.nameEn})
                    </td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      생년월일
                    </th>
                    <td className="px-4 py-3 text-[var(--text-secondary)] border-r border-[var(--border-color)]">
                      {data.contact.birth}
                    </td>
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      연락처
                    </th>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">
                      {data.contact.phone}
                    </td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      이메일
                    </th>
                    <td className="px-4 py-3 text-[var(--text-secondary)]" colSpan={3}>
                      {data.contact.email}
                    </td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      주 소
                    </th>
                    <td className="px-4 py-3 text-[var(--text-secondary)]" colSpan={3}>
                      {data.contact.address}
                    </td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">
                      GitHub
                    </th>
                    <td className="px-4 py-3" colSpan={3}>
                      <a href="https://github.com/kimmjen" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                        github.com/kimmjen
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 자기소개 */}
          <div className="mt-6 p-4 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
              &ldquo;{data.profile}&rdquo;
            </p>
          </div>
        </header>

        {/* ========== 학력사항 ========== */}
        <section className="px-8 sm:px-10 pb-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 pb-2 border-b-2 border-[var(--foreground)]">
            학력사항
          </h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--section-bg)] border border-[var(--border-color)]">
                <th className="px-4 py-3 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)] w-40">기간</th>
                <th className="px-4 py-3 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)]">학교/기관명</th>
                <th className="px-4 py-3 text-left text-[var(--foreground)] font-semibold">전공/과정</th>
              </tr>
            </thead>
            <tbody>
              {data.education.map((edu, index) => (
                <tr key={index} className="border border-[var(--border-color)] hover:bg-[var(--card-hover)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-muted)] border-r border-[var(--border-color)] whitespace-nowrap">{edu.period}</td>
                  <td className="px-4 py-3 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">{edu.school}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{edu.degree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ========== 경력사항 ========== */}
        <section className="px-8 sm:px-10 pb-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 pb-2 border-b-2 border-[var(--foreground)]">
            경력사항
          </h2>
          {data.experience.map((exp, expIndex) => (
            <div key={expIndex} className="mb-6 last:mb-0">
              {/* 회사 헤더 */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3 pb-2 border-b border-[var(--border-color)]">
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-base">{exp.company}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{exp.position}</p>
                </div>
                <span className="text-sm text-[var(--text-muted)] font-mono">{exp.period}</span>
              </div>

              {/* 프로젝트 목록 */}
              {exp.projects.map((project, projIndex) => (
                <div key={projIndex} className="ml-2 sm:ml-4 mb-4 last:mb-0 pl-4 border-l-2 border-[var(--border-color)] hover:border-[var(--foreground)] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                    <h4 className="font-semibold text-[var(--foreground)] text-sm">{project.title}</h4>
                    {project.date && (
                      <span className="text-xs text-[var(--text-muted)] font-mono">{project.date}</span>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex} className="leading-relaxed pl-1">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* ========== 기술역량 ========== */}
        <section className="px-8 sm:px-10 pb-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 pb-2 border-b-2 border-[var(--foreground)]">
            기술역량
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
        </section>

        {/* ========== 프로젝트 ========== */}
        <section className="px-8 sm:px-10 pb-10">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 pb-2 border-b-2 border-[var(--foreground)]">
            프로젝트
          </h2>
          {data.projects.filter(p => p.type === '개인 프로젝트' || p.type === 'Personal Project').map((project, index) => (
            <div key={index} className="mb-6 last:mb-0 p-5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)] hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--foreground)] text-base mb-1">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline break-all">
                      {project.link}
                    </a>
                  )}
                </div>
                {project.period && (
                  <span className="text-sm text-[var(--text-muted)] font-mono whitespace-nowrap">{project.period}</span>
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{project.description}</p>

              {project.technologies && (
                <div className="mb-3">
                  <span className="text-xs font-semibold text-[var(--foreground)] block mb-2">기술 스택</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-[var(--card-background)] text-[var(--foreground)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.features && (
                <div className="mt-3">
                  <span className="text-xs font-semibold text-[var(--foreground)] block mb-2">주요 기능</span>
                  <ul className="list-disc list-inside space-y-1 text-sm text-[var(--text-secondary)]">
                    {project.features.slice(0, 4).map((feature, fIndex) => (
                      <li key={fIndex} className="leading-relaxed pl-1">{feature}</li>
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
          .max-w-4xl {
            max-width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          section {
            page-break-inside: avoid;
          }
          h2 {
            page-break-after: avoid;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;

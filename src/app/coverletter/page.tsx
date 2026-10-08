'use client';

import React from 'react';
import Link from 'next/link';
import { coverLetterData } from '@/data/coverLetterData';
import resumeData from '@/data/resumeData';

const CoverLetterPage = () => {
  const name = resumeData.ko.name;
  const nameEn = resumeData.ko.nameEn;

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
          href="/career"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          경력기술서
        </Link>
        <button
          onClick={() => window.print()}
          className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          PDF 다운로드
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden pb-12">
        {/* ========== 헤더 ========== */}
        <div className="bg-[var(--foreground)] text-[var(--background)] p-8 sm:p-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">자 기 소 개 서</h1>
          <p className="text-lg opacity-90 font-medium">지원자: {name} ({nameEn})</p>
        </div>

        {/* ========== 본문 ========== */}
        <div className="p-8 sm:p-12 space-y-12">
          {coverLetterData.map((section, index) => (
            <section key={index} className="break-inside-avoid">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 pb-2 border-b-2 border-[var(--foreground)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-sm leading-none">{String(index + 1).padStart(2, '0')}.</span>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((p, pIndex) => (
                  <p key={pIndex} className="text-base text-[var(--text-secondary)] leading-loose text-justify break-keep">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; background: white !important; }
          .shadow-xl { box-shadow: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          section { page-break-inside: avoid; margin-bottom: 2rem !important; }
          h1, h2, h3 { page-break-after: avoid; }
          h2 { color: #1e293b !important; border-bottom-color: #1e293b !important; }
          .text-\\[var\\(--text-secondary\\)\\] { color: #334155 !important; }
          .bg-\\[var\\(--foreground\\)\\] { background-color: #1e293b !important; color: white !important; }
          .text-\\[var\\(--accent\\)\\] { color: #334155 !important; }
          .break-inside-avoid { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
};

export default CoverLetterPage;

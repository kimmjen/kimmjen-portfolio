'use client';

import React from 'react';
import Link from 'next/link';
import { kepcoCoverLetterData } from '@/data/coverLetterData';

const KepcoCoverLetterPage = () => {
  return (
    <div className="min-h-screen bg-[var(--section-bg)] py-12 px-4 sm:px-6 lg:px-8">
      {/* 상단 버튼 */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          홈
        </Link>
        <Link
          href="/apply/kepco"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          입사지원서
        </Link>
        <Link
          href="/career"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          경력기술서
        </Link>
        <button
          onClick={() => window.print()}
          className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium cursor-pointer"
        >
          PDF 다운로드 / 인쇄
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden">
          {/* 헤더 */}
          <div className="bg-[var(--foreground)] text-[var(--background)] p-8 sm:p-10 text-center">
            <p className="text-xs opacity-70 mb-1 tracking-widest uppercase">Korea Electric Power Corporation · ICT</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">자 기 소 개 서</h1>
            <p className="text-base opacity-90">지원자: 김제민 (KIM JE MIN)</p>
          </div>

          {/* 양식 안내 */}
          <div className="print:hidden px-8 sm:px-12 pt-6">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed border border-[var(--border-color)] rounded-md px-4 py-3 bg-[var(--section-bg)]">
              ※ 한국전력공사 입사지원서 자기소개서 3개 문항 양식에 맞춰 작성했습니다.
              양식 주의사항에 따라 본문에는 개인 식별정보(성명, 수험번호, 성별, 출신지역, 출신학교, 가족관계 등)를 기재하지 않았습니다.
            </p>
          </div>

          {/* 본문 섹션들 */}
          <div className="p-8 sm:p-12 space-y-10">
            {kepcoCoverLetterData.map((item, index) => {
              const charCount = item.paragraphs.join('\n\n').length;
              return (
                <section key={item.id} className="break-inside-avoid">
                  <h2 className="text-lg font-bold text-[var(--foreground)] mb-3 pb-2 border-b-2 border-[var(--foreground)] flex items-start gap-2">
                    <span className="text-[var(--accent)] font-mono text-sm mt-0.5">0{index + 1}.</span>
                    <span className="flex-1 break-keep">{item.title.replace(/^0\d\.\s*/, '')}</span>
                    {item.limit && (
                      <span className="shrink-0 text-xs font-mono font-normal text-[var(--text-muted)] mt-1">
                        {charCount} / {item.limit}자
                      </span>
                    )}
                  </h2>
                  <div className="space-y-3">
                    {item.paragraphs.map((para, pIdx) => {
                      // "[소제목]"만으로 이루어진 문단은 강조 표시
                      const isHeading = /^\[[^\]]+\]$/.test(para.trim());
                      return (
                        <p
                          key={pIdx}
                          className={
                            isHeading
                              ? 'text-[14px] font-bold text-[var(--foreground)] break-keep'
                              : 'text-[14px] text-[var(--text-secondary)] leading-[1.9] text-justify break-keep'
                          }
                        >
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* 인쇄 전용 스타일 */}
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .min-h-screen { padding: 0 !important; background: white !important; }
          .shadow-xl { box-shadow: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          h1, h2 { color: #0f172a !important; }
          h2 { border-bottom-color: #0f172a !important; }
          .text-\\[var\\(--text-secondary\\)\\] { color: #334155 !important; }
          .text-\\[var\\(--foreground\\)\\] { color: #0f172a !important; }
          .bg-\\[var\\(--section-bg\\)\\] { background-color: #f8fafc !important; }
          .bg-\\[var\\(--card-background\\)\\] { background-color: white !important; }
          .border-b-2 { border-bottom-color: #cbd5e1 !important; }
          p { font-size: 12px !important; line-height: 1.8 !important; }
        }
      `}</style>
    </div>
  );
};

export default KepcoCoverLetterPage;

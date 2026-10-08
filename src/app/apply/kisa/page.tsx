'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { kisaEssayData } from '@/data/coverLetterData';

const KisaApplicationPage = () => {
  const [selectedEssayId, setSelectedEssayId] = useState<'comprehensive' | 'single'>(
    'comprehensive'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeEssay =
    selectedEssayId === 'comprehensive' ? kisaEssayData[0] : kisaEssayData[1];

  const fullText = activeEssay.paragraphs.join('\n\n');
  const charCountWithSpace = fullText.length;
  const charCountWithoutSpace = fullText.replace(/\s/g, '').length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--section-bg)] py-12 px-4 sm:px-6 lg:px-8">
      {/* 상단 네비게이션 버튼 */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
        <Link
          href="/"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          홈
        </Link>
        <Link
          href="/career"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          상세 경력기술서
        </Link>
        <a
          href="https://kisa.applyin.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 bg-[var(--accent)] text-white rounded-md shadow-sm hover:opacity-90 transition-opacity text-xs font-medium"
        >
          KISA 접수처 바로가기 ↗
        </a>
        <button
          onClick={() => window.print()}
          className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium cursor-pointer"
        >
          PDF 다운로드 / 인쇄
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            {/* 헤더 타이틀 */}
            <div className="border-b-2 border-[var(--foreground)] pb-5 mb-8 text-center">
              <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                Korea Internet & Security Agency · 2026 하반기
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight mt-1 mb-2">
                한국인터넷진흥원(KISA) 입사지원 가이드
              </h1>
              <p className="text-sm text-[var(--text-muted)] font-medium">
                기술 직군 (정보보호 / 개인정보 활용·관리 / 플랫폼 기술) · 서류 15배수 대비
              </p>
            </div>

            {/* 마감 임박 알림 배너 */}
            <div className="print:hidden mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="inline-block px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded mr-2">
                  D-3 마감
                </span>
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  접수 마감: 2026년 10월 6일(화) 오전 10:00
                </span>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  1차 서류전형은 [정량평가 10점(자격증)] + [정성평가 90점(서술형 1문항)]으로 15배수를 선발합니다.
                </p>
              </div>
              <a
                href="https://kisa.applyin.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded shadow-sm"
              >
                접수 사이트 이동
              </a>
            </div>

            {/* 1. 핵심 전형 요약 카드 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b border-[var(--border-color)]">
                01. 서류전형 핵심 기준 및 체크포인트
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[var(--border-color)] rounded-lg p-4 bg-[var(--section-bg)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--accent)] uppercase">Quantitative (10점)</span>
                    <span className="text-xs font-medium text-[var(--text-muted)]">최고점 1개만 인정</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">정량평가 : 자격증</h3>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1 list-disc list-inside">
                    <li><strong className="text-[var(--foreground)]">10점:</strong> 정보처리기사, 빅데이터분석기사, 정보보안기사, CPPG 등</li>
                    <li><strong className="text-[var(--foreground)]">7점:</strong> SQLD, ADsP, 리눅스마스터 1급, 정보보안산업기사</li>
                    <li><strong className="text-[var(--foreground)]">5점:</strong> 정보처리산업기사 등</li>
                  </ul>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2">
                    ※ 보유 자격증 중 배점이 가장 높은 1개를 반드시 등록하십시오.
                  </p>
                </div>

                <div className="border border-[var(--border-color)] rounded-lg p-4 bg-[var(--section-bg)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--accent)] uppercase">Qualitative (90점)</span>
                    <span className="text-xs font-medium text-amber-500 font-semibold">과락기준 70% (63점)</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">정성평가 : 직무역량 서술형</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    입사지원서에 기재한 경력·경험 중 직무역량 향상에 영향을 준 사항(이유, 과정, 결과) 기술.
                  </p>
                  <div className="mt-2 pt-2 border-t border-[var(--border-color)] text-[11px] text-[var(--text-muted)] space-y-0.5">
                    <p>• 블라인드 철저 준수: 학교명, 지역명(OO 처리), 성별 기재 금지</p>
                    <p>• 자기소개서는 1차 면접 합격자에 한해 추후 별도 제출</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 서술형 문항 작성본 & 원클릭 복사 */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-4 border-b-2 border-[var(--foreground)] gap-2">
                <div>
                  <h2 className="text-base font-bold text-[var(--foreground)]">
                    02. 정성평가 서술형 작성본
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    공고 문항: 본인의 직무역량 향상에 영향을 준 사항을 1개 이상 선택하고 그 이유, 과정, 결과 등을 기술
                  </p>
                </div>

                {/* 버전 선택 탭 (1,500자 종합형 vs 1,000자 집중형) */}
                <div className="print:hidden flex items-center gap-1 bg-[var(--section-bg)] p-1 rounded-md border border-[var(--border-color)]">
                  <button
                    onClick={() => setSelectedEssayId('comprehensive')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      selectedEssayId === 'comprehensive'
                        ? 'bg-[var(--card-background)] text-[var(--foreground)] shadow-xs font-bold'
                        : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    1,500자 종합형 (권장)
                  </button>
                  <button
                    onClick={() => setSelectedEssayId('single')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      selectedEssayId === 'single'
                        ? 'bg-[var(--card-background)] text-[var(--foreground)] shadow-xs font-bold'
                        : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    1,000자 집중형
                  </button>
                </div>
              </div>

              {/* 글자수 카운터 및 복사 버튼 바 */}
              <div className="flex items-center justify-between bg-[var(--section-bg)] px-4 py-2.5 rounded-t-md border-t border-x border-[var(--border-color)] text-xs">
                <div className="flex gap-4 font-mono">
                  <span>
                    공백 포함: <strong className="text-[var(--foreground)]">{charCountWithSpace}자</strong>
                    {activeEssay.limit && (
                      <span className="text-[var(--text-muted)]"> / {activeEssay.limit}자 기준</span>
                    )}
                  </span>
                  <span>
                    공백 제외: <strong className="text-[var(--foreground)]">{charCountWithoutSpace}자</strong>
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(fullText, activeEssay.id)}
                  className="print:hidden px-3 py-1 bg-[var(--foreground)] text-[var(--background)] rounded text-xs font-medium hover:opacity-85 transition-opacity"
                >
                  {copiedId === activeEssay.id ? '✓ 복사 완료!' : '본문 전체 복사'}
                </button>
              </div>

              {/* 에세이 본문 */}
              <div className="border border-[var(--border-color)] rounded-b-md p-6 bg-[var(--card-background)] space-y-4">
                {activeEssay.paragraphs.map((para, pIdx) => {
                  const isHeading = /^\[[^\]]+\]$/.test(para.trim());
                  return (
                    <p
                      key={pIdx}
                      className={
                        isHeading
                          ? 'text-sm font-bold text-[var(--foreground)] pt-2 border-t border-dashed border-[var(--border-color)] first:border-0 first:pt-0'
                          : 'text-sm text-[var(--text-secondary)] leading-relaxed text-justify break-keep'
                      }
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* 3. 지원서 입력용 경력사항 요약 (블라인드 준수 버전) */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3 pb-1 border-b-2 border-[var(--foreground)]">
                <div>
                  <h2 className="text-base font-bold text-[var(--foreground)]">
                    03. 입사지원서 기재용 경력사항 (블라인드 검토 완료)
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    ※ 기업명 기재는 가능하나 학교명/지역명 포함 시 마스킹 처리(OO 처리) 필수
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* 1. KENTECH 차세대그리드연구소 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden text-sm">
                  <div className="bg-[var(--section-bg)] px-4 py-2 border-b border-[var(--border-color)] flex flex-wrap justify-between items-center gap-2">
                    <span className="font-bold text-[var(--foreground)]">
                      차세대그리드연구소 (OO 대학교 부설 연구소)
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      2026.05 ~ 현재 (재직중) · 계약직 연구원
                    </span>
                  </div>
                  <div className="p-4 bg-[var(--card-background)]">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>직무내용:</strong> 연구 플랫폼 웹 시스템 운영 및 소프트웨어 유지보수, 전력 연구 데이터 시각화 인터페이스 개발 및 연구실 웹 인프라 관리.
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      사용기술: React, Next.js, TypeScript, Python, FastAPI, Docker
                    </p>
                  </div>
                </div>

                {/* 2. 주식회사 에코아이티 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden text-sm">
                  <div className="bg-[var(--section-bg)] px-4 py-2 border-b border-[var(--border-color)] flex flex-wrap justify-between items-center gap-2">
                    <span className="font-bold text-[var(--foreground)]">
                      주식회사 에코아이티 (ECHOIT)
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      2025.07 ~ 2025.12 · 계약직
                    </span>
                  </div>
                  <div className="p-4 bg-[var(--card-background)]">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>직무내용:</strong> 전문 텍스트 데이터 품질 검수 및 10가지 규칙 기반 자동 품질 검사·라벨링 검수 웹 플랫폼(labeling-qc.com) 자체 기획·개발. 데이터 무결성 검증 체계 확립.
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      사용기술: React, TypeScript, FastAPI, Docker, Supabase, AWS Lightsail
                    </p>
                  </div>
                </div>

                {/* 3. 주식회사 이아이피그리드 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden text-sm">
                  <div className="bg-[var(--section-bg)] px-4 py-2 border-b border-[var(--border-color)] flex flex-wrap justify-between items-center gap-2">
                    <span className="font-bold text-[var(--foreground)]">
                      주식회사 이아이피그리드
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      2022.08 ~ 2024.07 · 정규직 대리
                    </span>
                  </div>
                  <div className="p-4 bg-[var(--card-background)]">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>직무내용:</strong> VPP 에너지 플랫폼 기준부하 계산 시스템(D1) 운영 및 시계열 분석 플랫폼(D3) 풀스택 개발. Flask에서 FastAPI 비동기 분산 아키텍처로 마이그레이션하여 성능 병목 개선.
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      사용기술: Python, FastAPI, KDB+, PostgreSQL, Vue.js, Docker, GitHub Actions, AWS
                    </p>
                  </div>
                </div>

                {/* 4. 주식회사 아이온커뮤니케이션즈 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden text-sm">
                  <div className="bg-[var(--section-bg)] px-4 py-2 border-b border-[var(--border-color)] flex flex-wrap justify-between items-center gap-2">
                    <span className="font-bold text-[var(--foreground)]">
                      (주)아이온커뮤니케이션즈
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      2021.12 ~ 2022.08 · 정규직 사원
                    </span>
                  </div>
                  <div className="p-4 bg-[var(--card-background)]">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>직무내용:</strong> 전력거래소 규정 기반 고객 기준 부하(CBL) 7종 알고리즘 구현 및 수요반응 성과(RRMSE) 정량 산출. 대용량 시계열 데이터 조회·가공.
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      사용기술: Python, Flask, PostgreSQL, Docker, Vue.js
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. 블라인드 채용 필수 유의사항 */}
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-md">
              <h3 className="text-xs font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                KISA 지원 시 블라인드 금지사항 필수 확인
              </h3>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 list-disc list-inside">
                <li>출신 대학교명(예: 대전대 등) 및 대학원 언급 절대 금지</li>
                <li>연구소나 직장 명칭에 학교명 또는 특정 지역명이 포함된 경우 반드시 OO 또는 ** 처리</li>
                <li>성별, 연령, 생년월일, 가족관계, 출신 지역을 유추할 수 있는 일체의 표현 배제</li>
                <li>이메일 주소에 학교명이나 특정 기관명이 포함된 계정 사용 금지 (개인 Gmail 권장)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 인쇄 전용 스타일 */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .min-h-screen {
            padding: 0 !important;
            background: white !important;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
          .rounded-lg {
            border-radius: 0 !important;
          }
          h1,
          h2,
          h3 {
            color: #0f172a !important;
          }
          .text-\\[var\\(--text-secondary\\)\\] {
            color: #334155 !important;
          }
          .text-\\[var\\(--foreground\\)\\] {
            color: #0f172a !important;
          }
          .bg-\\[var\\(--section-bg\\)\\] {
            background-color: #f8fafc !important;
          }
          .bg-\\[var\\(--card-background\\)\\] {
            background-color: white !important;
          }
          .border-b-2 {
            border-bottom-color: #cbd5e1 !important;
          }
          p {
            font-size: 12px !important;
            line-height: 1.8 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default KisaApplicationPage;

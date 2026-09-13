'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilePic from '../../../../public/images/profile.jpg';

const KentechApplicationPage = () => {
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
          href="/apply/kentech/coverletter"
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
        <div className="bg-[var(--card-background)] shadow-xl rounded-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            {/* 제목 */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] text-center mb-2 tracking-tight">
              응 시 원 서
            </h1>
            <p className="text-center text-sm text-[var(--text-muted)] mb-8">
              차세대그리드연구소 (김집 교수 연구실) 일반연구원 (웹/앱 운영/유지보수 개발자)
            </p>

            {/* 인적사항 + 사진 */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8">
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
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">성 명</th>
                      <td className="px-4 py-3 text-[var(--foreground)] font-bold text-lg" colSpan={3}>김제민 (KIM JE MIN)</td>
                    </tr>
                    <tr className="border border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">생년월일</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)] border-r border-[var(--border-color)]">1992.08.14</td>
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">연락처</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">010-3021-2356</td>
                    </tr>
                    <tr className="border border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">이메일</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)]" colSpan={3}>wpals814@gmail.com</td>
                    </tr>
                    <tr className="border border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">주 소</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)]" colSpan={3}>서울특별시 강남구 역삼동 809-6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 지원분야 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">지원 분야</h2>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">모집분야</th>
                    <td className="px-4 py-3 text-[var(--foreground)] font-medium">일반연구원 (웹/앱 운영/유지보수 개발자)</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">소 속</th>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">차세대그리드연구소 (김집 교수 연구실)</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">희망형태</th>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">전일제 또는 파트타임 (협의 가능)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 학력사항 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">학력사항</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--section-bg)] border border-[var(--border-color)]">
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)] w-40">기간</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)]">학교/기관명</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold">전공/과정</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2012.03 ~ 2019.08</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">대전대학교</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">경영학 학사</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2019.11 ~ 2020.05</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">비트교육센터</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">AI를 활용한 빅데이터 분석 플랫폼 개발 전문가 과정</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2021.08 ~ 2021.11</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">한국소프트웨어산업협회</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">아이온커뮤니케이션즈 채용확정형 교육과정</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 경력사항 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">경력사항</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--section-bg)] border border-[var(--border-color)]">
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)] w-40">기간</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)]">회사명</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)]">직위</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold">주요 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2025.07 ~ 2025.11</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">ECHOIT</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)] border-r border-[var(--border-color)]">데이터 검수자</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">AI 데이터 구축 · QC 플랫폼 개발</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2024.12 ~ 2025.03</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">소프트웨어공작소</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)] border-r border-[var(--border-color)]">선임연구원</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">Toyota 텔레매틱스 웹퍼블리싱</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2022.08 ~ 2024.07</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">이아이피그리드</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)] border-r border-[var(--border-color)]">대리</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">VPP 플랫폼 5개 프로젝트 개발·운영</td>
                  </tr>
                  <tr className="border border-[var(--border-color)]">
                    <td className="px-4 py-2 text-[var(--text-muted)] border-r border-[var(--border-color)]">2021.12 ~ 2022.08</td>
                    <td className="px-4 py-2 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">아이온커뮤니케이션즈</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)] border-r border-[var(--border-color)]">사원</td>
                    <td className="px-4 py-2 text-[var(--text-secondary)]">CBL 계산 시스템 개발</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 보유 기술 */}
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">보유 기술</h2>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    { category: 'Back-End', items: 'Python (Flask, FastAPI), Spring Boot' },
                    { category: 'Front-End', items: 'Vue.js, React, Next.js, TypeScript, JavaScript, HTML/CSS' },
                    { category: 'Database', items: 'PostgreSQL, KDB+ (시계열), Supabase, Redis (세션 저장소)' },
                    { category: 'Data/ML', items: 'Pandas, NumPy, Scikit-learn, PuLP, Pyomo (LP 최적화)' },
                    { category: 'Infra', items: 'Docker, GitHub Actions, AWS (EC2, Beanstalk, RDS, S3)' },
                  ].map((skill, index) => (
                    <tr key={index} className="border border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-2 text-left w-24 font-semibold border-r border-[var(--border-color)] whitespace-nowrap">{skill.category}</th>
                      <td className="px-4 py-2 text-[var(--text-secondary)] whitespace-nowrap">{skill.items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .min-h-screen { padding: 0 !important; background: white !important; }
          .shadow-xl { box-shadow: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          h2 { color: #1e293b !important; border-bottom-color: #1e293b !important; }
          .text-\\[var\\(--text-secondary\\)\\] { color: #334155 !important; }
          .text-\\[var\\(--text-muted\\)\\] { color: #64748b !important; }
          .text-\\[var\\(--foreground\\)\\] { color: #1e293b !important; }
          .bg-\\[var\\(--section-bg\\)\\] { background-color: #f8fafc !important; }
          .bg-\\[var\\(--card-background\\)\\] { background-color: white !important; }
          .border, .border-r, .border-b { border-color: #e2e8f0 !important; }
          table { font-size: 12px !important; }
        }
      `}</style>
    </div>
  );
};

export default KentechApplicationPage;

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilePic from '../../../../public/images/profile.jpg';

const KepcoApplicationPage = () => {
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
          href="/apply/kepco/coverletter"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          자기소개서
        </Link>
        <Link
          href="/career"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium text-[var(--foreground)]"
        >
          상세 경력기술서
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
          <div className="p-8 sm:p-10">

            {/* 헤더 타이틀 */}
            <div className="border-b-2 border-[var(--foreground)] pb-4 mb-8 text-center">
              <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">Korea Electric Power Corporation</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight mt-1 mb-2">
                입 사 지 원 서
              </h1>
              <p className="text-sm text-[var(--text-muted)] font-medium">
                한국전력공사 (KEPCO) · ICT / 전력 IT 분야
              </p>
            </div>

            {/* 인적사항 + 증명사진 */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8">
              {/* 증명사진 */}
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-32 h-40 sm:w-36 sm:h-44 border-2 border-[var(--border-color)] rounded overflow-hidden bg-[var(--section-bg)] shadow-sm">
                  <Image
                    src={profilePic}
                    alt="증명사진"
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* 인적사항 테이블 */}
              <div className="flex-1">
                <table className="w-full text-sm border-collapse border border-[var(--border-color)]">
                  <tbody>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">성 명</th>
                      <td className="px-4 py-3 text-[var(--foreground)] font-bold text-lg" colSpan={3}>
                        김제민 <span className="text-sm font-normal text-[var(--text-muted)] ml-2">(KIM JE MIN)</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">생년월일</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)] border-r border-[var(--border-color)]">1992.08.14</td>
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">연락처</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">010-3021-2356</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">이메일</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)]" colSpan={3}>wpals814@gmail.com</td>
                    </tr>
                    <tr>
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-3 text-left w-24 font-semibold border-r border-[var(--border-color)]">주 소</th>
                      <td className="px-4 py-3 text-[var(--text-secondary)]" colSpan={3}>서울특별시 강남구 역삼동 809-6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 지원사항 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)] flex justify-between items-center">
                <span>01. 지원 사항</span>
              </h2>
              <table className="w-full text-sm border-collapse border border-[var(--border-color)]">
                <tbody>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-2.5 text-left w-28 font-semibold border-r border-[var(--border-color)]">지원회사</th>
                    <td className="px-4 py-2.5 text-[var(--foreground)] font-medium">한국전력공사 (KEPCO)</td>
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-2.5 text-left w-28 font-semibold border-r border-[var(--border-color)]">지원분야</th>
                    <td className="px-4 py-2.5 text-[var(--foreground)] font-medium">ICT / 전력 IT</td>
                  </tr>
                  <tr>
                    <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-2.5 text-left w-28 font-semibold border-r border-[var(--border-color)]">전문분야</th>
                    <td className="px-4 py-2.5 text-[var(--text-secondary)]" colSpan={3}>
                      전력망 운영 소프트웨어, 대용량 시계열 데이터 파이프라인(KDB+/PostgreSQL), VPP/CBL 최적화 알고리즘, 풀스택 웹 플랫폼 엔지니어링
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 학력사항 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">
                02. 학력 및 교육 이수 사항
              </h2>
              <table className="w-full text-sm border-collapse border border-[var(--border-color)]">
                <thead>
                  <tr className="bg-[var(--section-bg)] border-b border-[var(--border-color)]">
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)] w-36">기간</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)]">학교 / 교육기관명</th>
                    <th className="px-4 py-2 text-left text-[var(--foreground)] font-semibold border-r border-[var(--border-color)]">전공 / 과정명</th>
                    <th className="px-4 py-2 text-center text-[var(--foreground)] font-semibold w-24">구분</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="px-4 py-2.5 text-[var(--text-muted)] border-r border-[var(--border-color)]">2012.03 ~ 2019.08</td>
                    <td className="px-4 py-2.5 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">대전대학교</td>
                    <td className="px-4 py-2.5 text-[var(--text-secondary)] border-r border-[var(--border-color)]">경영학과</td>
                    <td className="px-4 py-2.5 text-center text-[var(--text-secondary)]">학사 졸업</td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="px-4 py-2.5 text-[var(--text-muted)] border-r border-[var(--border-color)]">2019.11 ~ 2020.05</td>
                    <td className="px-4 py-2.5 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">비트교육센터</td>
                    <td className="px-4 py-2.5 text-[var(--text-secondary)] border-r border-[var(--border-color)]">AI를 활용한 빅데이터 분석 플랫폼 개발 전문가 과정</td>
                    <td className="px-4 py-2.5 text-center text-[var(--text-secondary)]">수료</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-[var(--text-muted)] border-r border-[var(--border-color)]">2021.08 ~ 2021.11</td>
                    <td className="px-4 py-2.5 text-[var(--foreground)] font-medium border-r border-[var(--border-color)]">한국소프트웨어산업협회</td>
                    <td className="px-4 py-2.5 text-[var(--text-secondary)] border-r border-[var(--border-color)]">아이온커뮤니케이션즈 채용확정형 교육과정</td>
                    <td className="px-4 py-2.5 text-center text-[var(--text-secondary)]">수료</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 경력사항 (KEPCO 입력 규격 100자 요약 매핑) */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3 pb-1 border-b-2 border-[var(--foreground)]">
                <h2 className="text-base font-bold text-[var(--foreground)]">
                  03. 경력 사항 <span className="text-xs font-normal text-[var(--text-muted)] ml-2">(한국전력공사 100자 요약 규격 대응)</span>
                </h2>
                <span className="text-xs text-[var(--text-muted)]">※ 재직중 종료일: 접수마감일(2026-09-14)</span>
              </div>
              <div className="space-y-4">
                {/* 1. KENTECH */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="bg-[var(--section-bg)] border-b border-[var(--border-color)]">
                        <td className="px-4 py-2 font-bold text-[var(--foreground)] w-1/3">
                          한국에너지공과대학교 차세대그리드연구소
                        </td>
                        <td className="px-4 py-2 text-[var(--text-secondary)] w-1/4">
                          연구원 (웹/앱 개발자)
                        </td>
                        <td className="px-4 py-2 text-right text-[var(--text-muted)] font-mono">
                          2026.05.01 ~ 2026.09.14 (재직중)
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 bg-[var(--card-background)]">
                          <p className="text-xs font-semibold text-[var(--accent)] mb-1">활동내용 (공백포함 88자):</p>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            AGM Center 웹페이지 운영 및 KPG 애플리케이션의 Python 핵심 로직 수정, 성능 최적화와 차세대 전력망 데이터 시각화 인터페이스 유지보수 수행.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 2. ECHOIT */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="bg-[var(--section-bg)] border-b border-[var(--border-color)]">
                        <td className="px-4 py-2 font-bold text-[var(--foreground)] w-1/3">
                          주식회사 에코아이티 (ECHOIT)
                        </td>
                        <td className="px-4 py-2 text-[var(--text-secondary)] w-1/4">
                          데이터 검수자 (개발·검수)
                        </td>
                        <td className="px-4 py-2 text-right text-[var(--text-muted)] font-mono">
                          2025.07.22 ~ 2025.12.01
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 bg-[var(--card-background)]">
                          <p className="text-xs font-semibold text-[var(--accent)] mb-1">활동내용 (공백포함 80자):</p>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            국회 AI 텍스트 데이터 품질 검수 및 10가지 규칙 기반 자동 품질 검사·라벨링 검수 웹 플랫폼을 자체 개발하여 데이터 검수 프로세스 자동화.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 3. 소프트웨어공작소 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="bg-[var(--section-bg)] border-b border-[var(--border-color)]">
                        <td className="px-4 py-2 font-bold text-[var(--foreground)] w-1/3">
                          소프트웨어공작소
                        </td>
                        <td className="px-4 py-2 text-[var(--text-secondary)] w-1/4">
                          선임연구원 (프론트엔드)
                        </td>
                        <td className="px-4 py-2 text-right text-[var(--text-muted)] font-mono">
                          2024.12.08 ~ 2025.03.08
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 bg-[var(--card-background)]">
                          <p className="text-xs font-semibold text-[var(--accent)] mb-1">활동내용 (공백포함 85자):</p>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            Toyota 텔레매틱스 콜센터 및 운영 관리 웹 관제 시스템 퍼블리싱, 반응형 인터페이스 구현 및 로딩 속도 향상을 위한 이미지·에셋 최적화 수행.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 4. 이아이피그리드 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="bg-[var(--section-bg)] border-b border-[var(--border-color)]">
                        <td className="px-4 py-2 font-bold text-[var(--foreground)] w-1/3">
                          주식회사 이아이피그리드
                        </td>
                        <td className="px-4 py-2 text-[var(--text-secondary)] w-1/4">
                          대리 (풀스택 개발)
                        </td>
                        <td className="px-4 py-2 text-right text-[var(--text-muted)] font-mono">
                          2022.08.05 ~ 2024.07.01
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 bg-[var(--card-background)]">
                          <p className="text-xs font-semibold text-[var(--accent)] mb-1">활동내용 (공백포함 91자):</p>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            VPP 분산자원 데이터 가상화, Balancing Group 분석 및 ESS 충전소 실시간 모니터링 대시보드(Vue.js/FastAPI)와 시계열 데이터 파이프라인 구축.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 5. 아이온커뮤니케이션즈 */}
                <div className="border border-[var(--border-color)] rounded-md overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="bg-[var(--section-bg)] border-b border-[var(--border-color)]">
                        <td className="px-4 py-2 font-bold text-[var(--foreground)] w-1/3">
                          (주)아이온커뮤니케이션즈
                        </td>
                        <td className="px-4 py-2 text-[var(--text-secondary)] w-1/4">
                          사원 (소프트웨어 개발)
                        </td>
                        <td className="px-4 py-2 text-right text-[var(--text-muted)] font-mono">
                          2021.12.08 ~ 2022.08.05
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 bg-[var(--card-background)]">
                          <p className="text-xs font-semibold text-[var(--accent)] mb-1">활동내용 (공백포함 90자):</p>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            전력거래소 기준 고객기준부하(CBL) 계산 알고리즘 개발, KDB+ 기반 대용량 시계열 전력 데이터 쿼리 작성 및 Flask/FastAPI 백엔드 시스템 구축.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 주요 프로젝트 및 전력 ICT 직무 수행 실적 */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">
                04. 전력 ICT 핵심 직무 수행 실적
              </h2>
              <div className="space-y-3 text-sm">
                <div className="p-3.5 bg-[var(--section-bg)] border border-[var(--border-color)] rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[var(--foreground)]">차세대 전력망 AGM Center 및 KPG 애플리케이션 운영</span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">한국에너지공과대학교 | 2026.05.01 ~ 재직중</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    차세대그리드연구소 AGM Center 공식 플랫폼 운영 및 전력망 조류 계산/해석을 수행하는 KPG Run/View 애플리케이션의 Python 핵심 로직 수정, 계산 속도 성능 최적화, 전력 계통 데이터 시각화 웹 화면 유지보수 담당.
                  </p>
                </div>

                <div className="p-3.5 bg-[var(--section-bg)] border border-[var(--border-color)] rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[var(--foreground)]">전력거래소 기준 고객기준부하(CBL) 계산 시스템 개발 (D1)</span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">아이온커뮤니케이션즈·이아이피그리드 | 2021.12.08 ~ 2024.07.01</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    전력거래소 수요반응(DR) 기준서 기반 CBL 계산 알고리즘 7종(MAX_4_5, MID_4_6 등) Python 구현. KDB+ 시계열 DB 쿼리 작성, 대용량 미터링 데이터 이상치 보정, Flask 동기 API를 FastAPI 비동기/Gevent 워커 기반으로 마이그레이션하여 병목 개선.
                  </p>
                </div>

                <div className="p-3.5 bg-[var(--section-bg)] border border-[var(--border-color)] rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[var(--foreground)]">분산 에너지(VPP) 시계열 데이터 분석 및 모니터링 (D3 & Amadeus)</span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">이아이피그리드 | 2022.08.05 ~ 2024.07.01</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    분산 에너지 자원의 시계열 데이터를 PostgreSQL 기반으로 모델링하고 Vue.js + Highcharts 기반으로 시각화 대시보드 구축. VPP 참여자들의 Balancing Group 생성·분석 및 전력 지령 수행 여부 실시간 모니터링 시스템 구축.
                  </p>
                </div>

                <div className="p-3.5 bg-[var(--section-bg)] border border-[var(--border-color)] rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[var(--foreground)]">ESS(에너지저장장치) 배터리 상태 실시간 관제 시스템 (Arkn)</span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">이아이피그리드 | 2023.08 ~ 2023.12</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    전기차 충전소 및 이동형 ESS(MBESS) 충·방전량, 배터리 수명 및 셀(Cell) 단위 데이터를 실시간으로 모니터링하는 관제 UI 개발. PuLP/Pyomo를 활용한 전기요금 최소화 기반 배터리 충·방전 선형 최적화(LP) 알고리즘 연구 경험.
                  </p>
                </div>
              </div>
            </div>

            {/* 보유 기술 역량 */}
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)] mb-3 pb-1 border-b-2 border-[var(--foreground)]">
                05. 보유 기술 및 도구
              </h2>
              <table className="w-full text-sm border-collapse border border-[var(--border-color)]">
                <tbody>
                  {[
                    { category: 'Back-End', items: 'Python (FastAPI, Flask), Spring Boot, RESTful API 설계' },
                    { category: 'Front-End', items: 'React, Vue.js (2/3), Next.js, TypeScript, Tailwind CSS, Highcharts' },
                    { category: 'Database', items: 'PostgreSQL, KDB+ (대용량 시계열 DB), Supabase, Redis' },
                    { category: 'Data / Opt', items: 'Pandas, NumPy, PuLP/Pyomo (선형 프로그래밍 수학적 최적화)' },
                    { category: 'Infra / DevOps', items: 'Docker, GitHub Actions (CI/CD 자동화), AWS (EC2, Beanstalk), Linux' },
                  ].map((skill, index) => (
                    <tr key={index} className="border-b border-[var(--border-color)] last:border-b-0">
                      <th className="bg-[var(--section-bg)] text-[var(--foreground)] px-4 py-2 text-left w-32 font-semibold border-r border-[var(--border-color)] whitespace-nowrap">
                        {skill.category}
                      </th>
                      <td className="px-4 py-2 text-[var(--text-secondary)]">
                        {skill.items}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* 인쇄 전용 스타일 */}
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .min-h-screen { padding: 0 !important; background: white !important; }
          .shadow-xl { box-shadow: none !important; }
          .rounded-lg, .rounded-md, .rounded { border-radius: 0 !important; }
          h1, h2 { color: #0f172a !important; }
          h2 { border-bottom-color: #0f172a !important; }
          .text-\\[var\\(--text-secondary\\)\\] { color: #334155 !important; }
          .text-\\[var\\(--text-muted\\)\\] { color: #64748b !important; }
          .text-\\[var\\(--foreground\\)\\] { color: #0f172a !important; }
          .bg-\\[var\\(--section-bg\\)\\] { background-color: #f8fafc !important; }
          .bg-\\[var\\(--card-background\\)\\] { background-color: white !important; }
          .border, .border-b, .border-r { border-color: #cbd5e1 !important; }
          table { font-size: 11.5px !important; }
        }
      `}</style>
    </div>
  );
};

export default KepcoApplicationPage;

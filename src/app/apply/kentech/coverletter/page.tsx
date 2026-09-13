'use client';

import React from 'react';
import Link from 'next/link';

const KentechCoverLetterPage = () => {
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
          href="/apply/kentech"
          className="px-3 py-2 bg-[var(--card-background)] border border-[var(--border-color)] rounded-md shadow-sm hover:opacity-80 transition-colors text-xs font-medium"
        >
          응시원서
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
          {/* 헤더 */}
          <div className="bg-[var(--foreground)] text-[var(--background)] p-8 sm:p-10 text-center">
            <p className="text-xs opacity-60 mb-1 tracking-widest">한국에너지공과대학교(KENTECH) 차세대그리드연구소</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">자 기 소 개 서</h1>
            <p className="text-base opacity-90">지원자: 김제민 (KIM JE MIN)</p>
          </div>

          {/* 본문 */}
          <div className="p-8 sm:p-12 space-y-8">

            {/* 01. 지원 동기 */}
            <section>
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3 pb-2 border-b-2 border-[var(--foreground)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-sm">01.</span>
                지원 동기
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.85] text-justify break-keep">
                저는 아이온커뮤니케이션즈와 이아이피그리드에서 약 3년간 VPP(가상발전소) 플랫폼을 개발·운영한 풀스택 개발자입니다. 전력거래소 기준서에 따른 고객 기준 부하(CBL) 계산 알고리즘을 Python으로 직접 구현하고, KDB+ 시계열 데이터베이스로 대용량 전력 데이터를 처리하며, Flask/FastAPI 백엔드부터 Vue.js 프론트엔드까지 엔드투엔드로 구축한 경험이 있습니다. 차세대그리드연구소의 주요 업무인 &lsquo;AGM Center 웹페이지 운영&rsquo;과 &lsquo;KPG Run/View 애플리케이션의 Python 로직 수정 및 성능 개선&rsquo;은 제가 D1·D3 프로젝트에서 수행한 업무—웹 시스템 유지보수, CBL 알고리즘 코드 수정, 시계열 데이터 파이프라인 운영, 배포 및 장애대응—와 본질적으로 동일합니다. 전력망 도메인에 대한 이해와 Python 기반 최적화 경험을 갖춘 개발자로서, 별도의 도메인 교육 없이 즉시 기여할 수 있습니다.
              </p>
            </section>

            {/* 02. AGM Center 웹페이지 운영 역량 */}
            <section>
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3 pb-2 border-b-2 border-[var(--foreground)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-sm">02.</span>
                웹페이지 운영 역량 — 프론트엔드 · 백엔드 · 배포 · 장애대응
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.85] text-justify break-keep">
                이아이피그리드에서 5개 에너지 프로젝트(D1 운영, D3, Arkn, Amadeus, EnergyHub)의 웹 시스템을 개발하고 운영했습니다. <strong>프론트엔드</strong> 측면에서는 Vue.js 2/3 기반 대시보드 UI 전체를 설계·구현했으며, Highcharts를 활용한 시계열 차트, GridLayout 드래그앤드롭 대시보드, Quasar/Bootstrap Vue 컴포넌트 개발, Vue I18n 다국어 지원 등을 수행하여 JS/CSS 수정 및 화면 개선 업무에 즉시 대응할 수 있습니다. <strong>백엔드</strong> 측면에서는 Flask/FastAPI 기반 RESTful API 30여 개 엔드포인트를 설계·개발하고, PostgreSQL 스키마 설계, KDB+ Q 언어 쿼리 작성을 담당하여 기능 점검 및 업데이트, 시스템 연동, 오류 대응 경험이 있습니다. <strong>배포 및 장애대응</strong> 측면에서는 Docker 컨테이너화, GitHub Actions CI/CD 파이프라인 구축(빌드 → Docker Hub → AWS Elastic Beanstalk 배포 → 알림 자동화), dev/staging/prod 환경 분리를 설계했으며, D1 프로젝트에서는 2년간 프로덕션 서비스의 서버 모니터링, 데이터 이슈 대응, 알고리즘 코드 수정을 지속적으로 수행하며 서비스 안정성을 유지했습니다.
              </p>
            </section>

            {/* 03. KPG Run/View Python 로직 역량 */}
            <section>
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3 pb-2 border-b-2 border-[var(--foreground)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-sm">03.</span>
                Python 애플리케이션 운영 역량 — 로직 수정 · 최적화 · 성능 개선
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.85] text-justify break-keep">
                D1 프로젝트에서 전력거래소 기준서 기반 CBL 알고리즘 7종(MAX_4_5, MID_4_6, JP_STANDARD_BL 등)을 Python으로 직접 구현했습니다. 대량의 시계열 미터 데이터에서 참조일 선정, 비정상 운영일 필터링, 특별 조정 알고리즘(SAA) 적용 등의 복잡한 로직을 Pandas/NumPy로 최적화하여 처리했습니다. 또한 PuLP와 Pyomo를 활용하여 ESS 배터리 충·방전 최적화를 선형 프로그래밍(LP)으로 구현했으며, 피크 부하 관리, SOC(충전 상태) 범위 제약, PCS 출력 제한 등의 조건 하에서 전기료 최소화를 목적함수로 설정하는 수학적 최적화 문제를 코드로 풀어낸 경험은 KPG Run/View의 최적화 로직 수정 및 개선 업무에 직접적으로 활용할 수 있습니다. <strong>성능 개선 사례</strong>로는 Flask 동기 방식의 API가 대량 CBL 계산 요청에서 병목을 일으키자 자발적으로 FastAPI 비동기 구조로 마이그레이션하여 Uvicorn ASGI 서버에서 비동기 I/O 처리를 가능하게 했고, Gevent 기반 분산 작업 워커(8개 태스크)를 도입하여 동시 다발적인 계산 요청을 안정적으로 처리하는 구조를 만들었습니다. 기존 로직의 성능 병목을 분석하고 구조적으로 개선하는 이러한 역량은 KPG 애플리케이션의 성능 및 안정성 개선에 기여할 수 있습니다.
              </p>
            </section>

            {/* 04. Rust/Julia 적응력 + 추가 역량 */}
            <section>
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3 pb-2 border-b-2 border-[var(--foreground)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-sm">04.</span>
                새로운 기술 환경 적응력 및 추가 역량
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.85] text-justify break-keep">
                KPG Run/View의 백엔드가 Rust와 Julia를 포함한다는 점을 인지하고 있습니다. 비전공자(경영학)에서 출발하여 전력거래소 CBL 알고리즘, KDB+ Q 언어, ESS 선형 프로그래밍 등 난이도 높은 도메인 기술을 빠르게 습득해 온 경험이 있으며, Python 풀스택 역량을 기반으로 새로운 언어 환경에도 빠르게 적응할 수 있습니다. 최근에는 개인 프로젝트를 통해 기술적 범위를 지속적으로 넓히고 있습니다. &lsquo;Refine&rsquo; 프로젝트에서 Next.js + Supabase + Google Gemini AI를 결합한 PWA 북마크 매니저를 구축하여 AI API의 프로덕션 연동(Rate Limiting, 벌크 처리), 100개+ 플랫폼 자동 인식, Vitest 46개 테스트를 갖춘 서비스를 운영 중이며, ECHOIT에서는 React + FastAPI + Supabase 기반의 라벨링 품질 검수 플랫폼을 단독으로 기획·개발하여 Docker + CI/CD + AWS Lightsail로 실서비스 운영까지 수행했습니다.
              </p>
            </section>

            {/* 05. 입사 후 포부 */}
            <section>
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3 pb-2 border-b-2 border-[var(--foreground)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-sm">05.</span>
                입사 후 포부
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.85] text-justify break-keep">
                차세대그리드연구소에 합류하게 된다면, 3년간 VPP 플랫폼에서 축적한 전력 도메인 지식과 풀스택 개발 역량을 바탕으로 AGM Center 웹페이지의 안정적 운영과 KPG 애플리케이션의 지속적 고도화에 기여하겠습니다. 특히 Python 기반 로직 코드의 성능 최적화, 프론트엔드 기능 개선, 배포 자동화 구축에서 즉각적인 성과를 낼 수 있다고 확신합니다. 원격 근무 환경에서도 GitHub 기반 코드 리뷰, 화상 회의를 통한 진행상황 공유, 프로세스 문서화를 통해 연구실 구성원들과 원활하게 협업하겠습니다.
              </p>
            </section>

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
          section { page-break-inside: avoid; }
          h1, h2, h3 { page-break-after: avoid; }
          .space-y-8 > * + * { margin-top: 20px !important; }
          h2 { color: #1e293b !important; border-bottom-color: #1e293b !important; }
          p { font-size: 12.5px !important; line-height: 1.75 !important; }
          .text-\\[var\\(--text-secondary\\)\\] { color: #334155 !important; }
          .text-\\[var\\(--text-muted\\)\\] { color: #64748b !important; }
          .text-\\[var\\(--foreground\\)\\] { color: #1e293b !important; }
          .bg-\\[var\\(--foreground\\)\\] { background-color: #1e293b !important; color: white !important; }
          .bg-\\[var\\(--section-bg\\)\\] { background-color: #f8fafc !important; }
          .bg-\\[var\\(--card-background\\)\\] { background-color: white !important; }
          .text-\\[var\\(--accent\\)\\] { color: #334155 !important; }
          .border, .border-r, .border-b { border-color: #e2e8f0 !important; }
          table { font-size: 11px !important; }
        }
      `}</style>
    </div>
  );
};

export default KentechCoverLetterPage;

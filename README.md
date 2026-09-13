# 김제민 포트폴리오 & 입사지원 시스템

Next.js 15와 React 19를 기반으로 제작된 풀스택 개발자 김제민의 개인 포트폴리오 및 맞춤형 입사지원 웹 애플리케이션입니다.

---

## 📌 주요 페이지 및 기능

### 1. 메인 포트폴리오 (`/`)
- 반응형 웹 디자인 (모바일, 태블릿, 데스크톱 완벽 대응)
- 라이트 / 다크 테마 지원
- 경력 타임라인, 프로젝트 쇼케이스, 기술 스택 인터랙티브 시각화

### 2. 이력서 & 상세 경력기술서
- **웹 이력서 (`/resume`, `/resumev2`)**: `@react-pdf/renderer` 기반 브라우저 내 고품질 한글 PDF 실시간 생성 및 다운로드
- **상세 경력기술서 (`/career`)**: 프로젝트별 상세 아키텍처, 기술적 난제 해결 과정(Troubleshooting), 성과 지표 기술

### 3. 자기소개서 (`/coverletter`)
- 데이터 엔지니어링, 전력 VPP 도메인, 문제 해결 주도성, 가치관을 담은 전문 산문 자기소개서

### 4. 기업 맞춤형 입사지원서 & 자기소개서
- **한국전력공사 (KEPCO) (`/apply/kepco`, `/apply/kepco/coverletter`)**
  - 공기업/한전 100자 요약 규격 대응 경력 매핑 (KENTECH, ECHOIT, 소프트웨어공작소, 이아이피그리드, 아이온커뮤니케이션즈)
  - 전력 ICT 핵심 직무 수행 실적 (KENTECH AGM Center, D1 CBL, D3/Amadeus VPP, Arkn ESS)
  - 한전 전용 자기소개서 4문항 (지원동기, 직무전문성, 문제해결, 협업소통)
  - 인쇄 및 PDF 최적화 미디어 쿼리 적용 (`window.print()` 지원)
- **한국에너지공과대학교 (KENTECH) (`/apply/kentech`, `/apply/kentech/coverletter`)**
  - 차세대 전력망 연구소 맞춤 지원서 및 자기소개서

---

## 🛠 기술 스택

- **Core**: Next.js 15 (App Router, Static HTML Export), React 19, TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: `@react-pdf/renderer` (Noto Sans KR 폰트 연동), `md-to-pdf`
- **Icons**: FontAwesome (`@fortawesome/react-fontawesome`)
- **Deploy**: GitHub Pages (`gh-pages`), Vercel

---

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
# 또는
pnpm install
```

### 2. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

### 3. 프로덕션 빌드 및 정적 익스포트
```bash
npm run build
```

### 4. GitHub Pages 배포
```bash
npm run deploy
```

---

## 📂 프로젝트 구조

```text
src/
├── app/
│   ├── apply/
│   │   ├── kentech/        # KENTECH 지원서 및 자기소개서
│   │   └── kepco/          # 한국전력공사(KEPCO) 지원서 및 자기소개서
│   ├── career/             # 상세 경력기술서 페이지
│   ├── coverletter/        # 일반 자기소개서 페이지
│   ├── resume/             # 이력서 페이지 (PDF 다운로드 포함)
│   └── page.tsx            # 메인 포트폴리오
├── components/             # 공용 UI 컴포넌트 및 PDF 렌더러
├── context/                # 전역 테마 및 상태 관리
└── data/
    ├── coverLetterData.ts  # 일반 및 KEPCO 자기소개서 데이터
    └── resumeData.ts       # 다국어(국문/영문) 이력서 및 프로젝트 데이터
```

---

## 📄 라이선스

MIT License
export interface Project {
  title: string;
  date?: string;
  description: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  projects: Project[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PersonalProject {
  title: string;
  description: string;
  image?: string;
  link?: string;
  period?: string;
  type?: string;
  technologies?: string[];
  features?: string[];
  challenges?: string[];
}

export interface ResumeData {
  name: string;
  nameEn: string;
  profile: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    birth: string;
  };
  education: {
    school: string;
    degree: string;
    period: string;
  }[];
  experience: Experience[];
  skills: Skill[];
  projects: PersonalProject[];
}

const resumeData: ResumeData = {
  name: "김제민",
  nameEn: "KIM JE MIN",
  profile: "VPP 플랫폼, 에너지 데이터 분석, AI 데이터 구축 등 다양한 도메인에서 데이터 처리와 시각화 경험을 쌓은 풀스택 개발자",
  contact: {
    phone: "010-****-****",
    email: "wpals814@gmail.com",
    address: "서울특별시 강남구 역삼동 809-6",
    birth: "1992.08.14",
  },
  education: [
    {
      school: "대전대학교",
      degree: "경영학 학사",
      period: "2012.03 - 2019.08",
    },
    {
      school: "비트교육센터",
      degree: "AI를 활용한 빅데이터 분석 플랫폼 개발 전문가 과정",
      period: "2019.11 - 2020.05",
    },
    {
      school: "한국소프트웨어 산업협회",
      degree: "아이온커뮤니케이션즈 채용확정형 교육과정",
      period: "2021.08 - 2021.11",
    },
  ],
  experience: [
    {
      company: "ECHOIT",
      position: "데이터라벨링 · 임시직/프리랜서",
      period: "2025.07 ~ 재직중",
      projects: [
        {
          title: "국회 AI를 위한 데이터 구축",
          description: [
            "국회도서관 외국 입법례, 정책, 분석 자료 분류 및 검수 작업",
            "법률명, 정책명, 국가명 관련 수동 데이터 라벨링 및 검수",
            "자료 중복 데이터 검수 및 데이터 품질 관리",
            "라벨링 툴을 활용한 데이터 업로드 및 초기 라벨링 작업",
            "AI 모델 학습을 위한 대규모 데이터셋 구축 프로젝트 참여",
            "외국어 자료 포함 법률 및 정책 문서 데이터 처리",
          ],
        },
      ],
    },
    {
      company: "소프트웨어공작소",
      position: "선임연구원",
      period: "2024.12 - 2025.03",
      projects: [
        {
          title: "Toyota 텔레매틱스 프로젝트",
          description: [
            "HTML5, CSS3, JavaScript를 활용한 데이터 처리 및 시각화",
            "Git을 활용한 데이터 버전 관리 시스템 구축",
            "UI 컴포넌트 및 레이아웃 구현을 통한 데이터 시각화",
          ],
        },
      ],
    },
    {
      company: "이아이피그리드",
      position: "대리",
      period: "2022.08 - 2024.07",
      projects: [
        {
          title: "EnergyHub 프로젝트",
          date: "2023.12 ~ 2024.07",
          description: [
            "EIP의 VPP 플랫폼의 리소스의 데이터를 가상으로 만드는 서비스 개발",
            "EIP의 VPP의 connector UI, 스케줄 관리, 데이터 업데이트 서비스 개발",
            "Vue.js를 활용한 사용자 중심 대시보드 구현",
            "FastAPI를 이용한 백엔드 API 서비스 구축",
          ],
        },
        {
          title: "Amadeus 프로젝트",
          date: "2023.12 ~ 2024.07",
          description: [
            "EIP의 VPP 플랫폼의 참여자들의 데이터를 기반으로 Balancing Group 생성 및 분석, 지령 참여 여부를 통해 보고서를 공유하기 위한 서비스 개발",
            "Balancing Group(군집화 되어있는 참여자) 들의 지령 수행 여부를 확인하는 UI 개발",
            "Amadeus 시스템의 전체 알림 UI 개발",
            "데이터 시각화 및 실시간 모니터링 대시보드 구축",
          ],
        },
        {
          title: "Arkn 프로젝트",
          date: "2023.08 ~ 2023.12",
          description: [
            "전기 자동차 충전소를 관리하는 사용자에게 현재 충전 차량 정보, ESS(Energy Storage System) 정보 및 충전소의 배터리 정보를 실시간으로 제공하는 서비스",
            "MBESS(Mobile Battery Energy Service System)의 실시간 충전량, 방전량 및 배터리 수명을 제공하는 UI 개발",
            "배터리 시스템 알림창, 배터리 내 Cell 데이터 실시간 정보를 제공하는 UI개발",
            "실시간 데이터 시각화 UI 개발 및 대시보드 설계 구현",
          ],
        },
        {
          title: "D3 프로젝트",
          date: "2022.08 ~ 2023.09",
          description: [
            "분산 에너지 자원의 시계열 데이터를 분석하고, 시각화 및 통계 데이터 보고서를 쉽게 생성 및 공유하기 위한 데이터 분석 및 시각화 서비스",
            "기획, 프로세스 문서 및 스프린트 단위로 개발",
            "어플리케이션 레이아웃, 데이터 셋, 어드민 페이지 UI 구현",
            "PostgreSQL을 활용한 RDB 구축 및 최적화",
            "Vue.js를 활용한 사용자 인터페이스 설계",
            "Flask 기반 API 개발 및 Docker 컨테이너화",
            "GitHub Actions를 활용한 CI/CD 파이프라인 구축",
          ],
        },
      ],
    },
    {
      company: "아이온커뮤니케이션즈",
      position: "사원",
      period: "2021.12 - 2022.08",
      projects: [
        {
          title: "D1 프로젝트",
          date: "2021.12 ~ 2022.08",
          description: [
            "수요 반응 프로그램 평가를 위한 고객 기준 부하, 참여 전력 소비 형태 검증 기준(RRMSE)를 계산 및 예측하는 서비스",
            "고객 기준 부하 예측을 위한 UI 개발",
            "GitHub Actions을 이용한 CI/CD 적용",
            "GitHub 브랜치 전략 수립",
            "서버 배포 및 릴리즈 노트 작성",
            "데이터 분석 결과 시각화",
            "데이터 이상치 분석",
            "Flask 기반 API 개발 및 FastAPI로 마이그레이션",
            "데이터 검증 및 정확도 향상",
          ],
        },
      ],
    },
  ],
  skills: [
    {
      category: "Front-End",
      items: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3", "JavaScript"],
    },
    {
      category: "Back-End",
      items: ["Python (Flask, FastAPI)", "Spring Boot"],
    },
    {
      category: "Database",
      items: ["SQL (PostgreSQL)", "Supabase"],
    },
    {
      category: "Infra",
      items: ["Docker", "Kubernetes"],
    },
    {
      category: "Cloud",
      items: ["AWS EC2", "AWS Elastic Beanstalk", "AWS S3", "AWS Route53", "AWS Lightsail"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "GitHub Actions", "Vite", "Webpack", "Slack"],
    },
    {
      category: "Others",
      items: ["CI/CD", "RESTful API", "데이터 시각화"],
    },
  ],
  projects: [
    {
      title: "라벨링 품질 검수 플랫폼",
      description: "라벨링 품질 검수 및 인터랙티브 편집 플랫폼. React + TypeScript + Vite + FastAPI로 개발되었으며, 10가지 검증 규칙을 통한 자동 품질 검사 시스템을 핵심 기능으로 제공합니다. 다른 사용자들을 위한 페이지 분석 도구, 라벨링 편집(프리뷰, 검증방법), 전체 변환 및 삭제, 전체/개별 다운로드 기능을 포함합니다. Docker 컨테이너화, GitHub Actions CI/CD, AWS Lightsail 배포, Supabase 연동을 통해 운영됩니다.",
      period: "2025.07 ~",
      link: "http://labeling-qc.com",
      type: "개인 프로젝트",
      technologies: ["React", "TypeScript", "Vite", "FastAPI", "Python", "Docker", "GitHub Actions", "AWS Lightsail", "Supabase"],
      features: [
        "10가지 검증 규칙을 통한 자동 품질 검사 시스템 (핵심 기능)",
        "다른 사용자들을 위한 페이지 분석 도구 (대용량 ZIP 파일 처리 및 구조 분석)",
        "라벨링 편집 기능 (프리뷰, 검증방법 포함)",
        "전체 변환 및 삭제 기능 (라벨 타입 변환, 일괄 삭제)",
        "전체 다운로드 및 개별 다운로드 기능",
        "실시간 품질 지표 시각화 대시보드 및 사용자별 통계",
        "GitHub Actions를 활용한 CI/CD 파이프라인 구축",
        "AWS Lightsail 배포 및 Supabase 데이터베이스 연동"
      ],
      challenges: [
        "10가지 검증 규칙 설계 및 자동 검사 로직 구현",
        "대용량 ZIP 파일 처리 성능 최적화 및 페이지 분석 기능 개발",
        "라벨링 편집 기능의 프리뷰 및 검증방법 구현",
        "전체 변환/삭제 및 다운로드 기능의 사용자 경험 최적화",
        "GitHub Actions CI/CD 파이프라인 구축 및 자동화",
        "AWS Lightsail 배포 환경 구성 및 Docker 컨테이너화",
        "Supabase 연동 및 VPN 환경 대응 로직 구현"
      ]
    },
    {
      title: "뜬뜬(ddendden) 프로젝트",
      description: "유재석과 안테나 플러스 제작사의 콘텐츠 중심 웹 플랫폼. React, Next.js, TypeScript, Tailwind CSS로 개발된 팬 커뮤니티 허브로, 다양한 콘텐츠 시리즈(핑계고, 풍향고, 이달의 계원 등)를 제공하며 다국어 지원 및 시상식 시스템을 갖추고 있습니다.",
      period: "2024.11 - 2025.02",
      link: "https://ddendden.vercel.app/",
      type: "개인 프로젝트",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      features: [
        "다양한 콘텐츠 시리즈 제공 (핑계고, 풍향고, 이달의 계원 등)",
        "다국어 지원 시스템",
        "시상식 시스템 및 투표 기능",
        "반응형 웹 디자인",
        "사용자 인증 및 권한 관리"
      ],
      challenges: [
        "대용량 미디어 콘텐츠 최적화 및 로딩 성능 개선",
        "다국어 지원을 위한 i18n 구현",
        "실시간 투표 시스템의 동시성 처리",
        "모바일 환경에서의 사용자 경험 최적화"
      ]
    },
    {
      title: "포트폴리오 웹사이트",
      description: "Next.js와 React를 활용한 개인 포트폴리오 웹사이트. Tailwind CSS로 반응형 디자인을 구현하고 사용자 경험을 개선했습니다.",
      period: "2024",
      link: "https://github.com/kimmjen/kimmjen-portpolio",
      type: "개인 프로젝트",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
      features: [
        "반응형 웹 디자인",
        "다크/라이트 모드 지원",
        "이메일 연락 기능",
        "프로젝트 상세 모달",
        "GitHub Pages 자동 배포"
      ],
      challenges: [
        "GitHub Pages 정적 호스팅 환경에서의 Next.js 최적화",
        "반응형 디자인을 위한 Tailwind CSS 활용",
        "이메일 기능 구현을 위한 API 라우트 제거 및 대안 구현",
        "SEO 최적화 및 메타데이터 관리"
      ]
    },
    {
      title: "EnergyHub 프로젝트",
      description: "EIP의 VPP 플랫폼 리소스 데이터를 가상으로 생성하는 서비스 개발. Spring Boot + FastAPI + Vue.js 기반 풀스택으로 개발되었으며, Vue.js로 대시보드 UI를 구현하고 FastAPI를 이용한 백엔드 API 서비스를 구축했습니다.",
      period: "2023.12 - 2024.07",
      link: "",
      type: "회사 프로젝트",
      technologies: ["Spring Boot", "FastAPI", "Vue.js", "Python"]
    },
    {
      title: "Amadeus 프로젝트",
      description: "VPP 플랫폼 참여자 데이터 기반 Balancing Group 생성 및 분석 서비스. Spring Boot + Vue.js + PostgreSQL + AWS EC2 + FastAPI 기반 풀스택으로 개발되었으며, 지령 수행 여부를 확인하는 UI와 실시간 모니터링 대시보드를 구축했습니다.",
      period: "2023.12 - 2024.07",
      link: "",
      type: "회사 프로젝트",
      technologies: ["Spring Boot", "Vue.js", "PostgreSQL", "AWS EC2", "FastAPI"]
    },
    {
      title: "Arkn 프로젝트",
      description: "전기 자동차 충전소 관리 시스템. Spring Boot + Vue.js 기반 풀스택으로 개발되었으며, MBESS의 충전량, 방전량, 배터리 정보를 실시간으로 모니터링하는 UI를 개발했습니다.",
      period: "2023.08 - 2023.12",
      link: "",
      type: "회사 프로젝트",
      technologies: ["Spring Boot", "Vue.js"]
    },
    {
      title: "D3 프로젝트",
      description: "분산 에너지 자원의 시계열 데이터 분석 및 시각화 서비스. Flask + PostgreSQL + Docker + GitHub Actions + Vue.js 기반 풀스택으로 개발되었으며, Vue.js로 사용자 인터페이스를 설계하고 PostgreSQL로 데이터베이스를 구축했습니다.",
      period: "2022.08 - 2023.09",
      link: "",
      type: "회사 프로젝트",
      technologies: ["Flask", "PostgreSQL", "Docker", "GitHub Actions", "Vue.js", "AWS EC2", "AWS Beanstalk"]
    },
    {
      title: "D1 프로젝트",
      description: "수요 반응 프로그램 평가를 위한 부하 검증 서비스. Flask + PostgreSQL + Docker + GitHub Actions + Vue.js 기반 풀스택으로 개발되었으며, 고객 기준 부하 예측 UI를 개발하고 GitHub Actions으로 CI/CD를 적용했습니다. Flask를 FastAPI로 마이그레이션했습니다.",
      period: "2021.12 - 2022.08",
      link: "",
      type: "회사 프로젝트",
      technologies: ["Flask", "FastAPI", "PostgreSQL", "Docker", "GitHub Actions", "Vue.js", "AWS EC2"]
    }
  ],
};

export default resumeData; 
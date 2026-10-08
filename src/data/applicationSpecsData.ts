// 지원서 작성 시 자주 조회 및 복사하는 인적·학력·병역·경력 상세 데이터
export interface EducationSpec {
  id: string;
  level: string; // 고등학교, 대학교, 대학원 등
  schoolName: string;
  major?: string;
  degree?: string;
  status: string; // 졸업, 졸업예정, 수료, 중퇴
  dayNight: string; // 주간 / 야간
  location: string;
  startDateFull: string; // YYYY.MM.DD
  startDateShort: string; // YYYY.MM
  endDateFull: string; // YYYY.MM.DD
  endDateShort: string; // YYYY.MM
  gpa?: string; // 평균평점 (예: 2.75)
  gpaMax?: string; // 만점 (예: 4.5)
  totalCredits?: string; // 총 취득학점 (예: 136)
  appliedCredits?: string; // 신청학점 (예: 143)
  earnedCredits?: string; // 취득학점 (예: 136)
  percentileScore?: string; // 총점평균 / 백분율 환산 점수 (예: 76.48)
  gpaTotalPoints?: string; // 평점총계 (예: 379.00)
  scoreTotal?: string; // 점수총점 (예: 10,554.3)
  majorCredits?: string; // 전공 이수학점
  college?: string; // 단과대학 (예: 경영대학)
  degreeNumber?: string; // 학위등록번호 (예: 대전대2018(학) 2734)
  certificateNumber?: string; // 증서번호 (예: 50759)
  gradCohort?: string; // 졸업기수 (예: 38기)
}

export interface MilitarySpec {
  serviceType: string; // 현역 (필), 면제, 미필, 복무중
  branch: string; // 육군, 해군, 공군, 해병대, 사회복무요원
  rank: string; // 병장 만기제대
  specialty: string; // 보병, 행정, 통신 등
  startDateFull: string; // YYYY.MM.DD
  startDateShort: string; // YYYY.MM
  endDateFull: string; // YYYY.MM.DD
  endDateShort: string; // YYYY.MM
  durationMonths: string; // 21개월
  militaryNumber: string; // 군번
  dischargeType: string; // 만기전역, 의가사전역 등
}

export interface CareerSpec {
  id: string;
  company: string;
  department: string;
  position: string;
  employmentType: string; // 정규직, 계약직, 프리랜서
  startDateFull: string; // YYYY.MM.DD
  startDateShort: string; // YYYY.MM
  endDateFull: string; // YYYY.MM.DD 또는 현재
  endDateShort: string; // YYYY.MM 또는 현재
  isCurrent: boolean;
  durationText: string; // 1년 11개월, 8개월 등
  taskSummary: string;
}

export interface TrainingSpec {
  id: string;
  institution: string;
  courseName: string;
  startDateFull: string;
  startDateShort: string;
  endDateFull: string;
  endDateShort: string;
  durationHours: string;
  status: string;
}

export interface PersonalSpec {
  nameKo: string;
  nameHanja: string;
  nameHanjaMeaning: string;
  nameEnUpperSpaced: string; // KIM JE MIN
  nameEnUpperJoined: string; // KIM JEMIN
  nameEnFirstLast: string; // Jemin Kim
  nameEnLastFirst: string; // Kim, Jemin
  nameEnLower: string; // kim jemin
  githubId: string;
  birthDateFull: string; // 1992.08.14
  birthDateShort: string; // 1992.08
  birthYear: number;
  phone: string;
  email: string;
  addressRoad: string;
  addressJibun: string;
  addressDetail: string;
  zipCode: string;
}

export interface ApplicationSpecs {
  personal: PersonalSpec;
  military: MilitarySpec;
  highSchool: EducationSpec;
  university: EducationSpec;
  careers: CareerSpec[];
  trainings: TrainingSpec[];
}

export const defaultApplicationSpecs: ApplicationSpecs = {
  personal: {
    nameKo: "김제민",
    nameHanja: "金濟民",
    nameHanjaMeaning: "金(쇠 금) 濟(건널 제) 民(백성 민)",
    nameEnUpperSpaced: "KIM JE MIN",
    nameEnUpperJoined: "KIM JEMIN",
    nameEnFirstLast: "Jemin Kim",
    nameEnLastFirst: "Kim, Jemin",
    nameEnLower: "kim jemin",
    githubId: "kimmjen",
    birthDateFull: "1992.08.14",
    birthDateShort: "1992.08",
    birthYear: 1992,
    phone: "010-3021-2356",
    email: "wpals814@naver.com",
    addressRoad: "서울특별시 강남구 테헤란로 (역삼동)",
    addressJibun: "서울특별시 강남구 역삼동 809-6",
    addressDetail: "상세주소",
    zipCode: "06125",
  },
  military: {
    serviceType: "현역 (전환복무)",
    branch: "의무경찰 (육군 전환복무)",
    rank: "병장 (수경 만기전역)",
    specialty: "의무경찰",
    startDateFull: "2014.06.19",
    startDateShort: "2014.06",
    endDateFull: "2016.03.18",
    endDateShort: "2016.03",
    durationMonths: "21개월",
    militaryNumber: "14-72000000",
    dischargeType: "만기제대",
  },
  highSchool: {
    id: "high-school",
    level: "고등학교",
    schoolName: "강진고등학교",
    major: "인문계",
    status: "졸업",
    dayNight: "주간",
    location: "전라남도 강진군 (전남)",
    startDateFull: "2008.03.02",
    startDateShort: "2008.03",
    endDateFull: "2011.02.10",
    endDateShort: "2011.02",
  },
  university: {
    id: "university",
    level: "대학교 (4년제 학사)",
    schoolName: "대전대학교",
    major: "경영학과",
    degree: "경영학 학사",
    status: "졸업",
    dayNight: "주간",
    location: "대전광역시 동구 (대전)",
    startDateFull: "2012.03.01",
    startDateShort: "2012.03",
    endDateFull: "2019.08.22",
    endDateShort: "2019.08",
    gpa: "2.75",
    gpaMax: "4.5",
    totalCredits: "136",
    appliedCredits: "143",
    earnedCredits: "136",
    percentileScore: "76.48",
    gpaTotalPoints: "379.00",
    scoreTotal: "10,554.3",
    majorCredits: "66",
    college: "경영대학",
    degreeNumber: "대전대2018(학) 2734",
    certificateNumber: "50759",
    gradCohort: "38",
  },
  careers: [
    {
      id: "career-kentech",
      company: "한국에너지공과대학교 (KENTECH)",
      department: "전력계통모델링고도화센터 (EGO Lab, AGM-Center)",
      position: "개발자 · 연구원 (웹 인프라 구축 및 관리)",
      employmentType: "계약직",
      startDateFull: "2026.05.01",
      startDateShort: "2026.05",
      endDateFull: "현재 (재직중)",
      endDateShort: "현재",
      isCurrent: true,
      durationText: "재직중",
      taskSummary: "AGM Center 공식 웹 플랫폼 및 연구 대시보드 운영, 전력망 소프트웨어(KPG) 운영 및 데이터 시각화",
    },
    {
      id: "career-echoit",
      company: "ECOIT (에코아이티)",
      department: "데이터라벨",
      position: "계약직",
      employmentType: "계약",
      startDateFull: "2025.07.21",
      startDateShort: "2025.07",
      endDateFull: "2025.11.30",
      endDateShort: "2025.11",
      isCurrent: false,
      durationText: "4개월 10일",
      taskSummary: "국회 AI 데이터라벨링 및 데이터 검수자",
    },
    {
      id: "career-swfactory",
      company: "소프트웨어공작소",
      department: "프론트팀",
      position: "선임연구원",
      employmentType: "정규",
      startDateFull: "2024.12.09",
      startDateShort: "2024.12",
      endDateFull: "2025.03.07",
      endDateShort: "2025.03",
      isCurrent: false,
      durationText: "3개월",
      taskSummary: "웹 퍼블리싱 및 프로젝트 매니저",
    },
    {
      id: "career-eipgrid",
      company: "주식회사이아이피그리드",
      department: "서비스팀",
      position: "대리",
      employmentType: "정규",
      startDateFull: "2022.08.05",
      startDateShort: "2022.08",
      endDateFull: "2024.07.01",
      endDateShort: "2024.07",
      isCurrent: false,
      durationText: "1년 11개월",
      taskSummary: "데이터 분석 플랫폼 어플리케이션 개발",
    },
    {
      id: "career-i-on",
      company: "아이온커뮤니케이션즈",
      department: "이아이피그리드 - 데이터분석팀",
      position: "사원",
      employmentType: "정규",
      startDateFull: "2021.12.08",
      startDateShort: "2021.12",
      endDateFull: "2022.08.05",
      endDateShort: "2022.08",
      isCurrent: false,
      durationText: "8개월",
      taskSummary: "데이터 분석 플랫폼 어플리케이션 개발",
    },
  ],
  trainings: [
    {
      id: "training-bit",
      institution: "비트교육센터",
      courseName: "AI를 활용한 빅데이터 분석 플랫폼 개발 전문가 과정",
      startDateFull: "2019.11.04",
      startDateShort: "2019.11",
      endDateFull: "2020.05.08",
      endDateShort: "2020.05",
      durationHours: "960시간",
      status: "수료",
    },
    {
      id: "training-kosa",
      institution: "한국소프트웨어산업협회 (KOSA)",
      courseName: "아이온커뮤니케이션즈 채용확정형 교육과정",
      startDateFull: "2021.08.16",
      startDateShort: "2021.08",
      endDateFull: "2021.11.19",
      endDateShort: "2021.11",
      durationHours: "480시간",
      status: "수료",
    },
  ],
};

// 날짜 형식 변환 유틸리티
export function formatDate(dateStr: string, format: 'dots' | 'dashes' | 'korean' | 'raw'): string {
  if (!dateStr || dateStr.includes('현재')) return dateStr;
  const digits = dateStr.replace(/[^0-9]/g, '');
  if (digits.length === 8) {
    const y = digits.substring(0, 4);
    const m = digits.substring(4, 6);
    const d = digits.substring(6, 8);
    switch (format) {
      case 'dots': return `${y}.${m}.${d}`;
      case 'dashes': return `${y}-${m}-${d}`;
      case 'korean': return `${y}년 ${m}월 ${d}일`;
      case 'raw': return digits;
    }
  } else if (digits.length === 6) {
    const y = digits.substring(0, 4);
    const m = digits.substring(4, 6);
    switch (format) {
      case 'dots': return `${y}.${m}`;
      case 'dashes': return `${y}-${m}`;
      case 'korean': return `${y}년 ${m}월`;
      case 'raw': return digits;
    }
  }
  return dateStr;
}

// 만 나이 계산기
export function calculateAge(birthDateStr: string): { fullAge: number; koreanAge: number } {
  const digits = birthDateStr.replace(/[^0-9]/g, '');
  if (digits.length < 8) return { fullAge: 32, koreanAge: 34 };
  const birthYear = parseInt(digits.substring(0, 4), 10);
  const birthMonth = parseInt(digits.substring(4, 6), 10);
  const birthDay = parseInt(digits.substring(6, 8), 10);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  let fullAge = currentYear - birthYear;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    fullAge--;
  }

  const koreanAge = currentYear - birthYear + 1;
  return { fullAge, koreanAge };
}

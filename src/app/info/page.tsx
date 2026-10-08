'use client';

import React, { useState, useEffect, useMemo, useId } from 'react';
import Link from 'next/link';
import {
  defaultApplicationSpecs,
  ApplicationSpecs,
  calculateAge,
} from '@/data/applicationSpecsData';

type DateFormatMode = 'all' | 'dots' | 'months' | 'hyphen' | 'raw' | 'korean';

const CopyContext = React.createContext<{
  copyToClipboard: (text: string, label?: string) => void;
  formatMode: DateFormatMode;
}>({
  copyToClipboard: () => {},
  formatMode: 'all',
});

// 원클릭 복사용 뱃지 컴포넌트
function CopyChip({
  text,
  formatTag,
  title,
  className = "",
}: {
  text: string;
  formatTag?: string;
  title?: string;
  className?: string;
}) {
  const { copyToClipboard } = React.useContext(CopyContext);
  return (
    <button
      type="button"
      onClick={() => copyToClipboard(text, title || formatTag)}
      title={`${title || text} 복사`}
      className={`group inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-[var(--border-color)] bg-[var(--card-background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-transparent transition-all cursor-pointer font-mono font-medium shadow-2xs hover:scale-[1.02] active:scale-95 ${className}`}
    >
      {formatTag && (
        <span className="text-[10px] text-[var(--text-muted)] group-hover:text-[var(--background)] font-sans opacity-80">
          [{formatTag}]
        </span>
      )}
      <span className="truncate">{text}</span>
      <svg
        className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </button>
  );
}

// 날짜 세트 (년월일, 년월, 하이픈, 8자리, 한글) 복사 그룹
function DateButtonGroup({
  fullDate,
  shortDate,
  title,
}: {
  fullDate: string;
  shortDate?: string;
  title?: string;
}) {
  const { formatMode } = React.useContext(CopyContext);
  if (!fullDate || fullDate.includes('현재')) {
    return <CopyChip text={fullDate || '현재'} formatTag="재직중" title={title} />;
  }

  const digits = fullDate.replace(/[^0-9]/g, '');
  const y = digits.substring(0, 4);
  const m = digits.substring(4, 6);
  const d = digits.length >= 8 ? digits.substring(6, 8) : '';

  const dots = d ? `${y}.${m}.${d}` : `${y}.${m}`;
  const dotsMonth = shortDate || `${y}.${m}`;
  const hyphen = d ? `${y}-${m}-${d}` : `${y}-${m}`;
  const rawDigits = digits;
  const korean = d ? `${y}년 ${m}월 ${d}일` : `${y}년 ${m}월`;
  const koreanMonth = `${y}년 ${m}월`;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {(formatMode === 'all' || formatMode === 'dots') && (
        <CopyChip text={dots} formatTag="년.월.일" title={title} />
      )}
      {(formatMode === 'all' || formatMode === 'months') && (
        <CopyChip text={dotsMonth} formatTag="년.월" title={title} />
      )}
      {(formatMode === 'all' || formatMode === 'hyphen') && (
        <CopyChip text={hyphen} formatTag="하이픈" title={title} />
      )}
      {(formatMode === 'all' || formatMode === 'raw') && (
        <CopyChip text={rawDigits} formatTag="숫자만" title={title} />
      )}
      {(formatMode === 'all' || formatMode === 'korean') && (
        <CopyChip text={korean} formatTag="한글" title={title} />
      )}
      {formatMode === 'korean' && d && (
        <CopyChip text={koreanMonth} formatTag="한글(월)" title={title} />
      )}
    </div>
  );
}

// 구간 날짜 (시작일 ~ 종료일) 복사 그룹
function DateRangeButtonGroup({
  startFull,
  startShort,
  endFull,
  endShort,
  title,
}: {
  startFull: string;
  startShort: string;
  endFull: string;
  endShort: string;
  title?: string;
}) {
  const { formatMode } = React.useContext(CopyContext);
  const rangeFullDots = `${startFull} ~ ${endFull}`;
  const rangeShortDots = `${startShort} ~ ${endShort}`;
  const rangeFullHyphen = `${startFull.replace(/\./g, '-')} ~ ${endFull.replace(/\./g, '-')}`;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <CopyChip text={rangeFullDots} formatTag="구간(년월일)" title={title} className="bg-[var(--section-bg)]" />
      <CopyChip text={rangeShortDots} formatTag="구간(년월)" title={title} className="bg-[var(--section-bg)]" />
      {formatMode === 'hyphen' && (
        <CopyChip text={rangeFullHyphen} formatTag="구간(하이픈)" title={title} />
      )}
    </div>
  );
}

export default function ApplicationSpecsPage() {
  const [specs, setSpecs] = useState<ApplicationSpecs>(defaultApplicationSpecs);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [formatMode, setFormatMode] = useState<DateFormatMode>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'personal' | 'military' | 'education' | 'career' | 'tools'>('all');
  const [calcInput, setCalcInput] = useState('');
  const [dateConverterInput, setDateConverterInput] = useState('');
  const [saveToast, setSaveToast] = useState(false);
  const memoInputId = useId();

  // LocalStorage 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kimmjen_application_specs');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSpecs(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Failed to load specs from localStorage', e);
    }
  }, []);

  // 검색엔진 노출 완전 차단 (noindex, nofollow)
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';
  }, []);

  // 복사 핸들러
  const copyToClipboard = React.useCallback(async (text: string, label?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label ? `${label}: ${text}` : text);
      setTimeout(() => {
        setCopiedText(null);
      }, 2000);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  }, []);

  // LocalStorage 저장
  const handleSave = () => {
    try {
      localStorage.setItem('kimmjen_application_specs', JSON.stringify(specs));
      setIsEditing(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  // 기본값 리셋
  const handleReset = () => {
    if (confirm('저장된 데이터를 기본값으로 초기화하시겠습니까?')) {
      localStorage.removeItem('kimmjen_application_specs');
      setSpecs(defaultApplicationSpecs);
      setIsEditing(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  // 나이 계산
  const age = useMemo(() => calculateAge(specs.personal.birthDateFull), [specs.personal.birthDateFull]);

  // 글자수 & 바이트수 계산기
  const textStats = useMemo(() => {
    const text = calcInput;
    const lenWithSpace = text.length;
    const lenWithoutSpace = text.replace(/\s/g, '').length;
    // EUC-KR / 한글 2바이트 기준
    let byteEucKr = 0;
    // UTF-8 / 한글 3바이트 기준
    let byteUtf8 = 0;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code <= 0x007f) {
        byteEucKr += 1;
        byteUtf8 += 1;
      } else {
        byteEucKr += 2;
        byteUtf8 += 3;
      }
    }
    return { lenWithSpace, lenWithoutSpace, byteEucKr, byteUtf8 };
  }, [calcInput]);

  // 임의 날짜 변환기
  const convertedDates = useMemo(() => {
    const raw = dateConverterInput.replace(/[^0-9]/g, '');
    if (raw.length === 8) {
      const y = raw.substring(0, 4);
      const m = raw.substring(4, 6);
      const d = raw.substring(6, 8);
      return {
        dots: `${y}.${m}.${d}`,
        monthDots: `${y}.${m}`,
        hyphen: `${y}-${m}-${d}`,
        raw,
        korean: `${y}년 ${m}월 ${d}일`,
        koreanMonth: `${y}년 ${m}월`,
      };
    } else if (raw.length === 6) {
      const y = raw.substring(0, 4);
      const m = raw.substring(4, 6);
      return {
        dots: `${y}.${m}`,
        monthDots: `${y}.${m}`,
        hyphen: `${y}-${m}`,
        raw,
        korean: `${y}년 ${m}월`,
        koreanMonth: `${y}년 ${m}월`,
      };
    }
    return null;
  }, [dateConverterInput]);

  const copyContextValue = useMemo(
    () => ({ copyToClipboard, formatMode }),
    [copyToClipboard, formatMode]
  );

  return (
    <CopyContext.Provider value={copyContextValue}>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">
      {/* ================= 상단 고정 네비게이션 ================= */}
      <header className="sticky top-0 z-40 bg-[var(--card-background)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--section-bg)] text-xs font-medium transition-colors"
              title="홈으로"
            >
              ← 홈
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)]">
                  지원서 작성 퀵 치트시트
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full">
                  1-Click Copy
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                년월일 vs 년월, 한자·영문 성명, 군복무, 학점, 경력 일자 원클릭 복사
              </p>
            </div>
          </div>

          {/* 우측 조작 버튼 */}
          <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs"
                >
                  ✓ 변경사항 저장
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border-color)] hover:bg-[var(--section-bg)] transition-colors"
                >
                  취소
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border-color)] bg-[var(--card-background)] hover:bg-[var(--section-bg)] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>✏️</span>
                <span>내 정보 직접 수정</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 text-xs text-[var(--text-muted)] hover:text-rose-500 rounded-md border border-[var(--border-color)] hover:border-rose-200 transition-colors"
              title="원래 기본값으로 복원"
            >
              초기화
            </button>

            <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block mx-1" />

            <Link
              href="/resume/"
              prefetch={false}
              className="px-2.5 py-1.5 text-xs rounded-md border border-[var(--border-color)] hover:bg-[var(--section-bg)] text-[var(--text-secondary)] font-medium"
            >
              이력서
            </Link>
            <Link
              href="/career/"
              prefetch={false}
              className="px-2.5 py-1.5 text-xs rounded-md border border-[var(--border-color)] hover:bg-[var(--section-bg)] text-[var(--text-secondary)] font-medium"
            >
              경력기술서
            </Link>
            <Link
              href="/coverletter/"
              prefetch={false}
              className="px-2.5 py-1.5 text-xs rounded-md border border-[var(--border-color)] hover:bg-[var(--section-bg)] text-[var(--text-secondary)] font-medium"
            >
              자기소개서
            </Link>
          </div>
        </div>
      </header>

      {/* ================= 컨트롤 바 (포맷 전환 및 탭 필터) ================= */}
      <section aria-label="필터 및 설정" className="bg-[var(--section-bg)] border-b border-[var(--border-color)] py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* 섹션 필터 탭 */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] mr-1 shrink-0">
              섹션:
            </span>
            {[
              { id: 'all', label: '전체' },
              { id: 'personal', label: '인적사항' },
              { id: 'education', label: '학력 (고교/대학/학점)' },
              { id: 'military', label: '병역 (군복무)' },
              { id: 'career', label: '경력 (5개사)' },
              { id: 'tools', label: '글자수·계산기' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap transition-all font-medium ${
                  activeTab === tab.id
                    ? 'bg-[var(--foreground)] text-[var(--background)] shadow-2xs font-semibold'
                    : 'bg-[var(--card-background)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 날짜 포맷 필터 */}
          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] mr-1">
              날짜 포맷:
            </span>
            {[
              { id: 'all', label: '전체 보기' },
              { id: 'dots', label: 'YYYY.MM.DD' },
              { id: 'months', label: 'YYYY.MM' },
              { id: 'hyphen', label: 'YYYY-MM-DD' },
              { id: 'raw', label: 'YYYYMMDD' },
              { id: 'korean', label: '한글' },
            ].map(fmt => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setFormatMode(fmt.id as DateFormatMode)}
                className={`px-2 py-0.5 text-[11px] rounded transition-all font-mono ${
                  formatMode === fmt.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-background)]'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 안내 배너 ================= */}
      {isEditing && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2.5 text-center text-xs text-amber-800 dark:text-amber-200">
          ⚠️ <strong>직접 수정 모드 활성화 중:</strong> 고등학교명, 한자 뜻, 군복무 시작/종료일, 대학교 학점 등을 수정한 뒤 상단의 <strong>[✓ 변경사항 저장]</strong>을 눌러주세요. 브라우저에 안전하게 저장됩니다.
        </div>
      )}

      {/* ================= 메인 컨텐츠 영역 ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 space-y-8">

        {/* 1. 기본 인적사항 섹션 */}
        {(activeTab === 'all' || activeTab === 'personal') && (
          <section className="bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">기본 인적사항</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    한글·한자·영문 성명 표기법 및 생년월일 포맷별 복사
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                만 {age.fullAge}세 (연 {age.koreanAge}세)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 성명 세트 */}
              <div className="space-y-4">
                {/* 한글 성명 */}
                <div className="p-3.5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">한글 성명</span>
                    <span className="text-[10px] text-[var(--text-muted)]">성 / 이름 분리 지원</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={specs.personal.nameKo}
                      onChange={e => setSpecs(prev => ({
                        ...prev,
                        personal: { ...prev.personal, nameKo: e.target.value }
                      }))}
                      className="w-full px-2 py-1 text-sm bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                    />
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <CopyChip text={specs.personal.nameKo} formatTag="전체 성명" className="text-sm font-bold" />
                      <CopyChip text={specs.personal.nameKo.charAt(0)} formatTag="성" />
                      <CopyChip text={specs.personal.nameKo.slice(1)} formatTag="이름" />
                    </div>
                  )}
                </div>

                {/* 한자 성명 */}
                <div className="p-3.5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">한자 성명 (漢字)</span>
                    <span className="text-[10px] text-[var(--text-muted)]">자주 묻는 한자 뜻 포함</span>
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={specs.personal.nameHanja}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, nameHanja: e.target.value }
                        }))}
                        className="w-full px-2 py-1 text-sm bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="한자 성명 (예: 金濟民)"
                      />
                      <input
                        type="text"
                        value={specs.personal.nameHanjaMeaning}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, nameHanjaMeaning: e.target.value }
                        }))}
                        className="w-full px-2 py-1 text-xs bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="한자 뜻과 음"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <CopyChip text={specs.personal.nameHanja} formatTag="한자 전체" className="text-sm font-bold tracking-widest" />
                        <CopyChip text={specs.personal.nameHanja.charAt(0)} formatTag="성(金)" />
                        <CopyChip text={specs.personal.nameHanja.slice(1)} formatTag="이름(濟民)" />
                      </div>
                      <div className="pt-1">
                        <CopyChip text={specs.personal.nameHanjaMeaning} formatTag="뜻풀이" className="text-[11px]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* 영문 성명 */}
                <div className="p-3.5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">영문 성명 (다양한 지원서 표기)</span>
                  </div>
                  {isEditing ? (
                    <div className="space-y-1.5 text-xs">
                      <input
                        type="text"
                        value={specs.personal.nameEnUpperSpaced}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, nameEnUpperSpaced: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="KIM JE MIN"
                      />
                      <input
                        type="text"
                        value={specs.personal.nameEnUpperJoined}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, nameEnUpperJoined: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="KIM JEMIN"
                      />
                      <input
                        type="text"
                        value={specs.personal.nameEnFirstLast}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, nameEnFirstLast: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="Jemin Kim"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <CopyChip text={specs.personal.nameEnUpperSpaced} formatTag="대문자 띄어쓰기" />
                      <CopyChip text={specs.personal.nameEnUpperJoined} formatTag="대문자 붙여쓰기" />
                      <CopyChip text={specs.personal.nameEnFirstLast} formatTag="First Last" />
                      <CopyChip text={specs.personal.nameEnLastFirst} formatTag="Last, First" />
                      <CopyChip text={specs.personal.githubId} formatTag="ID/GitHub" />
                    </div>
                  )}
                </div>
              </div>

              {/* 생년월일 & 연락처 & 주소 */}
              <div className="space-y-4">
                {/* 생년월일 */}
                <div className="p-3.5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">생년월일 및 나이</span>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      만 {age.fullAge}세 (1992년생)
                    </span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={specs.personal.birthDateFull}
                      onChange={e => setSpecs(prev => ({
                        ...prev,
                        personal: { ...prev.personal, birthDateFull: e.target.value }
                      }))}
                      className="w-full px-2 py-1 text-sm bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                      placeholder="1992.08.14"
                    />
                  ) : (
                    <DateButtonGroup
                      fullDate={specs.personal.birthDateFull}
                      shortDate={specs.personal.birthDateShort}
                      title="생년월일"
                    />
                  )}
                  <div className="mt-2.5 pt-2 border-t border-[var(--border-color)] flex flex-wrap gap-2 text-xs">
                    <CopyChip text={`만 ${age.fullAge}세`} formatTag="만 나이" />
                    <CopyChip text={`${age.koreanAge}세`} formatTag="연 나이" />
                    <CopyChip text="1992" formatTag="출생연도" />
                    <CopyChip text="0814" formatTag="월일" />
                  </div>
                </div>

                {/* 연락처 & 이메일 */}
                <div className="p-3.5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">연락처 & 이메일</span>
                  </div>
                  {isEditing ? (
                    <div className="space-y-1.5 text-xs">
                      <input
                        type="text"
                        value={specs.personal.email}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, email: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="이메일"
                      />
                      <input
                        type="text"
                        value={specs.personal.phone}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, phone: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="휴대폰 번호"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <CopyChip text={specs.personal.email} formatTag="네이버 이메일" className="font-bold text-emerald-600 dark:text-emerald-400" />
                        <CopyChip text="wpals814@gmail.com" formatTag="구글 이메일" />
                        <CopyChip text={specs.personal.phone} formatTag="휴대폰(하이픈)" className="font-bold text-blue-600 dark:text-blue-400" />
                        <CopyChip text={specs.personal.phone.replace(/[^0-9]/g, '')} formatTag="휴대폰(숫자만)" />
                      </div>
                    </div>
                  )}
                </div>

                {/* 주소 정보 */}
                <div className="p-3.5 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">주소 정보 (우편번호 / 도로명 / 지번)</span>
                  </div>
                  {isEditing ? (
                    <div className="space-y-1.5 text-xs">
                      <input
                        type="text"
                        value={specs.personal.addressJibun}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, addressJibun: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="지번 주소"
                      />
                      <input
                        type="text"
                        value={specs.personal.zipCode}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          personal: { ...prev.personal, zipCode: e.target.value }
                        }))}
                        className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="우편번호"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <CopyChip text={specs.personal.addressJibun} formatTag="주소(지번)" />
                        <CopyChip text={specs.personal.addressRoad} formatTag="주소(도로명)" />
                        <CopyChip text={specs.personal.zipCode} formatTag="우편번호" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. 학력 사항 (고등학교, 대학교, 평균학점, 이수학점) - 핵심 요청 사항! */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <section className="bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">학력 사항 (고등학교 & 대학교)</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    입학/졸업 년월일 vs 년월, 학점(평점/만점), 총 이수학점 원클릭 복사
                  </p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
                핵심 정보
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 고등학교 카드 */}
              <div className="p-5 rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--section-bg)]/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded border border-amber-500/30">
                      고등학교
                    </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={specs.highSchool.schoolName}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          highSchool: { ...prev.highSchool, schoolName: e.target.value }
                        }))}
                        className="px-2 py-0.5 text-sm font-bold bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                        placeholder="고등학교 이름 입력"
                      />
                    ) : (
                      <CopyChip text={specs.highSchool.schoolName} formatTag="학교명" className="font-bold text-sm" />
                    )}
                  </div>
                  <CopyChip text={specs.highSchool.status} formatTag="구분" />
                </div>

                {/* 기본 정보 */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <CopyChip text={specs.highSchool.major || '인문계'} formatTag="계열" />
                  <CopyChip text={specs.highSchool.dayNight} formatTag="주야" />
                  <CopyChip text={specs.highSchool.location} formatTag="소재지" />
                </div>

                {/* 고등학교 재학 기간 (입학 ~ 졸업) */}
                <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
                  <div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-1 flex items-center justify-between">
                      <span>입학일자</span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">정규 입학</span>
                    </div>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={specs.highSchool.startDateFull}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            highSchool: { ...prev.highSchool, startDateFull: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2008.03.02"
                        />
                        <input
                          type="text"
                          value={specs.highSchool.startDateShort}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            highSchool: { ...prev.highSchool, startDateShort: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2008.03"
                        />
                      </div>
                    ) : (
                      <DateButtonGroup
                        fullDate={specs.highSchool.startDateFull}
                        shortDate={specs.highSchool.startDateShort}
                        title="고교 입학일"
                      />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-1 flex items-center justify-between">
                      <span>졸업일자</span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">자주 묻는 일자!</span>
                    </div>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={specs.highSchool.endDateFull}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            highSchool: { ...prev.highSchool, endDateFull: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2011.02.10"
                        />
                        <input
                          type="text"
                          value={specs.highSchool.endDateShort}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            highSchool: { ...prev.highSchool, endDateShort: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2011.02"
                        />
                      </div>
                    ) : (
                      <DateButtonGroup
                        fullDate={specs.highSchool.endDateFull}
                        shortDate={specs.highSchool.endDateShort}
                        title="고교 졸업일"
                      />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">
                      전체 재학 기간 (입학 ~ 졸업)
                    </div>
                    <DateRangeButtonGroup
                      startFull={specs.highSchool.startDateFull}
                      startShort={specs.highSchool.startDateShort}
                      endFull={specs.highSchool.endDateFull}
                      endShort={specs.highSchool.endDateShort}
                      title="고등학교 재학기간"
                    />
                  </div>
                </div>
              </div>

              {/* 대학교 카드 */}
              <div className="p-5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--card-background)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded border border-blue-500/30">
                      대학교
                    </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={specs.university.schoolName}
                        onChange={e => setSpecs(prev => ({
                          ...prev,
                          university: { ...prev.university, schoolName: e.target.value }
                        }))}
                        className="px-2 py-0.5 text-sm font-bold bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                      />
                    ) : (
                      <CopyChip text={specs.university.schoolName} formatTag="학교명" className="font-bold text-sm" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CopyChip text={specs.university.status} formatTag="구분" />
                    <CopyChip text={specs.university.degree || '학사'} formatTag="학위" />
                  </div>
                </div>

                {/* 전공 및 소재지 */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <CopyChip text={specs.university.college || '경영대학'} formatTag="단과대" />
                  <CopyChip text={specs.university.major || '경영학과'} formatTag="주전공" className="font-bold" />
                  <CopyChip text="경영학사" formatTag="학위명" />
                  <CopyChip text="4년제" formatTag="학제" />
                  <CopyChip text={specs.university.location} formatTag="소재지" />
                  <CopyChip text={specs.university.dayNight} formatTag="주야" />
                  <CopyChip text="본교" formatTag="본분교" />
                </div>

                {/* 학위등록번호 및 증서번호 (공기업/대기업 지원서용) */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-color)]/70 text-xs">
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold">학위·증서번호:</span>
                  <CopyChip text={specs.university.degreeNumber || '대전대2018(학) 2734'} formatTag="학위등록번호" className="font-bold text-indigo-600 dark:text-indigo-400" />
                  <CopyChip text={specs.university.certificateNumber || '50759'} formatTag="증서번호" />
                  <CopyChip text="38기" formatTag="졸업기수" />
                </div>

                {/* ⭐ 학점 & 이수학점 강조 박스 ⭐ */}
                <div className="p-3.5 bg-linear-to-r from-blue-500/5 to-indigo-500/5 rounded-lg border border-blue-500/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                      <span>📊</span> 평균 평점 & 이수 학점 (지원서 핵심 입력란)
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">원클릭 복사</span>
                  </div>

                  {isEditing ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <label htmlFor="edit-gpa" className="text-[10px] text-[var(--text-muted)] block mb-0.5">평균 학점</label>
                        <input
                          id="edit-gpa"
                          type="text"
                          value={specs.university.gpa}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, gpa: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2.75"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-gpa-max" className="text-[10px] text-[var(--text-muted)] block mb-0.5">만점 기준</label>
                        <input
                          id="edit-gpa-max"
                          type="text"
                          value={specs.university.gpaMax}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, gpaMax: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="4.5"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-total-credits" className="text-[10px] text-[var(--text-muted)] block mb-0.5">취득학점 (이수학점)</label>
                        <input
                          id="edit-total-credits"
                          type="text"
                          value={specs.university.totalCredits}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, totalCredits: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="136"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-percentile-score" className="text-[10px] text-[var(--text-muted)] block mb-0.5">백분율 (총점평균)</label>
                        <input
                          id="edit-percentile-score"
                          type="text"
                          value={specs.university.percentileScore || '76.48'}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, percentileScore: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="76.48"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {/* 1열: 평점 & 취득학점 */}
                      <div className="flex flex-wrap items-center gap-2">
                        <CopyChip
                          text={`${specs.university.gpa} / ${specs.university.gpaMax}`}
                          formatTag="학점/만점"
                          className="font-bold text-blue-600 dark:text-blue-400"
                        />
                        <CopyChip text={specs.university.gpa || '2.75'} formatTag="평점만" />
                        <CopyChip text={specs.university.gpaMax || '4.5'} formatTag="만점기준" />
                        <CopyChip
                          text={`${specs.university.totalCredits || '136'}학점`}
                          formatTag="취득(이수)학점"
                          className="font-bold text-indigo-600 dark:text-indigo-400"
                        />
                        <CopyChip text={specs.university.totalCredits || '136'} formatTag="취득학점(숫자)" />
                      </div>

                      {/* 2열: 백분율 환산 & 신청학점 & 평점총계 */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-color)]/60">
                        <CopyChip
                          text={`${specs.university.percentileScore || '76.48'}점`}
                          formatTag="백분율(총점평균)"
                          className="font-bold text-emerald-600 dark:text-emerald-400"
                        />
                        <CopyChip text={specs.university.percentileScore || '76.48'} formatTag="백분율(숫자만)" />
                        <CopyChip text={`${specs.university.appliedCredits || '143'}학점`} formatTag="신청학점" />
                        <CopyChip text={specs.university.appliedCredits || '143'} formatTag="신청학점(숫자)" />
                        <CopyChip text={specs.university.gpaTotalPoints || '379.00'} formatTag="평점총계" />
                      </div>

                      <div className="text-[10px] text-[var(--text-muted)] bg-[var(--card-background)] p-2 rounded border border-[var(--border-color)] flex flex-wrap justify-between gap-1">
                        <span>성적증명서 공식 기록: 취득 136학점 / 신청 143학점 / 평점평균 2.75 / 총점평균 76.48</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">공식 성적표 일치 확인 완료</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 대학교 재학 기간 */}
                <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
                  <div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-1 flex items-center justify-between">
                      <span>입학일자</span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">2012학년도 입학</span>
                    </div>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={specs.university.startDateFull}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, startDateFull: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2012.03.01"
                        />
                        <input
                          type="text"
                          value={specs.university.startDateShort}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, startDateShort: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2012.03"
                        />
                      </div>
                    ) : (
                      <DateButtonGroup
                        fullDate={specs.university.startDateFull}
                        shortDate={specs.university.startDateShort}
                        title="대학 입학일"
                      />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-1 flex items-center justify-between">
                      <span>졸업일자 (학위수여일)</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">후기 학위수여</span>
                    </div>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={specs.university.endDateFull}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, endDateFull: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2019.08.22"
                        />
                        <input
                          type="text"
                          value={specs.university.endDateShort}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            university: { ...prev.university, endDateShort: e.target.value }
                          }))}
                          className="px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2019.08"
                        />
                      </div>
                    ) : (
                      <DateButtonGroup
                        fullDate={specs.university.endDateFull}
                        shortDate={specs.university.endDateShort}
                        title="대학 졸업일"
                      />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">
                      전체 재학 기간 (입학 ~ 졸업)
                    </div>
                    <DateRangeButtonGroup
                      startFull={specs.university.startDateFull}
                      startShort={specs.university.startDateShort}
                      endFull={specs.university.endDateFull}
                      endShort={specs.university.endDateShort}
                      title="대학교 재학기간"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. 병역 사항 (군복무 기간) - 핵심 요청 사항! */}
        {(activeTab === 'all' || activeTab === 'military') && (
          <section className="bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎖️</span>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">병역 사항 (군복무 기간)</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    복무구분, 군별, 계급, 입대일~전역일 (년월일 vs 년월), 복무 개월수 원클릭 복사
                  </p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                군필 (만기제대)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 기본 병역 사항 */}
              <div className="p-4 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)] space-y-3">
                <span className="text-xs font-semibold text-[var(--text-muted)] block">복무 구분 & 군별</span>
                {isEditing ? (
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      value={specs.military.serviceType}
                      onChange={e => setSpecs(prev => ({
                        ...prev,
                        military: { ...prev.military, serviceType: e.target.value }
                      }))}
                      className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                      placeholder="현역 (필)"
                    />
                    <input
                      type="text"
                      value={specs.military.branch}
                      onChange={e => setSpecs(prev => ({
                        ...prev,
                        military: { ...prev.military, branch: e.target.value }
                      }))}
                      className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                      placeholder="육군"
                    />
                    <input
                      type="text"
                      value={specs.military.rank}
                      onChange={e => setSpecs(prev => ({
                        ...prev,
                        military: { ...prev.military, rank: e.target.value }
                      }))}
                      className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded"
                      placeholder="병장 (만기전역)"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <CopyChip text="의무경찰" formatTag="군별" className="font-bold text-blue-600 dark:text-blue-400" />
                      <CopyChip text="육군 (전환복무)" formatTag="군별(상응)" />
                      <CopyChip text="현역 (전환복무)" formatTag="복무구분" />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--border-color)]/60">
                      <CopyChip text="병장" formatTag="계급(육군상응)" className="font-bold" />
                      <CopyChip text="수경" formatTag="계급(경찰)" />
                      <CopyChip text="만기제대" formatTag="전역구분" />
                      <CopyChip text="만기전역" formatTag="전역구분" />
                      <CopyChip text="의경" formatTag="약칭" />
                    </div>
                  </div>
                )}
              </div>

              {/* 입대일 & 전역일 */}
              <div className="p-4 bg-[var(--section-bg)] rounded-lg border border-[var(--border-color)] space-y-4 md:col-span-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    복무 기간 (입대일 ~ 전역일)
                  </span>
                  <CopyChip text={specs.military.durationMonths} formatTag="복무기간" className="font-bold text-emerald-600 dark:text-emerald-400" />
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block mb-1">입대일 (년월일 / 년월)</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={specs.military.startDateFull}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            military: { ...prev.military, startDateFull: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2013.05.07"
                        />
                        <input
                          type="text"
                          value={specs.military.startDateShort}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            military: { ...prev.military, startDateShort: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2013.05"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block mb-1">전역일 (년월일 / 년월)</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={specs.military.endDateFull}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            military: { ...prev.military, endDateFull: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2015.02.06"
                        />
                        <input
                          type="text"
                          value={specs.military.endDateShort}
                          onChange={e => setSpecs(prev => ({
                            ...prev,
                            military: { ...prev.military, endDateShort: e.target.value }
                          }))}
                          className="w-full px-2 py-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded font-mono"
                          placeholder="2015.02"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] text-[var(--text-muted)] font-medium block mb-1">
                        입대일자
                      </span>
                      <DateButtonGroup
                        fullDate={specs.military.startDateFull}
                        shortDate={specs.military.startDateShort}
                        title="군 입대일"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-[var(--text-muted)] font-medium block mb-1">
                        전역일자
                      </span>
                      <DateButtonGroup
                        fullDate={specs.military.endDateFull}
                        shortDate={specs.military.endDateShort}
                        title="군 전역일"
                      />
                    </div>

                    <div className="pt-2 border-t border-[var(--border-color)]">
                      <span className="text-[11px] text-[var(--text-muted)] font-medium block mb-1">
                        전체 복무 구간
                      </span>
                      <DateRangeButtonGroup
                        startFull={specs.military.startDateFull}
                        startShort={specs.military.startDateShort}
                        endFull={specs.military.endDateFull}
                        endShort={specs.military.endDateShort}
                        title="군 복무기간 전체"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 4. 경력 사항 (5개 회사별 정확한 일자 vs 년월) */}
        {(activeTab === 'all' || activeTab === 'career') && (
          <section className="bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">💼</span>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">경력 사항 (직장별 상세 일자)</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    각 직장별 입사일·퇴사일(년월일 vs 년월), 부서, 직급, 근무기간 1-Click 복사
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                총 5건의 경력 이력
              </span>
            </div>

            <div className="space-y-4">
              {specs.careers.map((career, idx) => (
                <div
                  key={career.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    career.isCurrent
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-[var(--border-color)] bg-[var(--section-bg)]/40 hover:bg-[var(--section-bg)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--foreground)] text-[var(--background)]">
                        0{idx + 1}
                      </span>
                      <CopyChip text={career.company} formatTag="회사명" className="font-bold text-sm" />
                      <CopyChip text={career.position} formatTag="직급/직책" />
                      {career.isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full">
                          재직중
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <CopyChip text={career.durationText} formatTag="근무기간" className="text-xs font-semibold text-blue-600 dark:text-blue-400" />
                      <CopyChip text={career.employmentType} formatTag="고용형태" />
                    </div>
                  </div>

                  {/* 입사일 & 퇴사일 날짜 버튼군 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[var(--border-color)]">
                    <div>
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                        입사일자
                      </span>
                      <DateButtonGroup
                        fullDate={career.startDateFull}
                        shortDate={career.startDateShort}
                        title={`${career.company} 입사일`}
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                        퇴사일자 (또는 재직)
                      </span>
                      <DateButtonGroup
                        fullDate={career.endDateFull}
                        shortDate={career.endDateShort}
                        title={`${career.company} 퇴사일`}
                      />
                    </div>
                  </div>

                  {/* 재직 기간 전체 복사 */}
                  <div className="mt-3 pt-2.5 border-t border-[var(--border-color)]/70 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                        재직 구간:
                      </span>
                      <DateRangeButtonGroup
                        startFull={career.startDateFull}
                        startShort={career.startDateShort}
                        endFull={career.endDateFull}
                        endShort={career.endDateShort}
                        title={`${career.company} 재직구간`}
                      />
                    </div>
                    <CopyChip text={career.department} formatTag="부서" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. 교육 및 훈련 이수 사항 */}
        {(activeTab === 'all' || activeTab === 'career') && (
          <section className="bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">직무 교육 및 훈련 이수</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    기관명, 과정명, 이수 기간(년월일 / 년월), 이수 시간 복사
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specs.trainings.map(t => (
                <div key={t.id} className="p-4 rounded-lg bg-[var(--section-bg)] border border-[var(--border-color)] space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <CopyChip text={t.institution} formatTag="기관명" className="font-bold text-xs" />
                    <CopyChip text={t.durationHours} formatTag="이수시간" />
                  </div>
                  <CopyChip text={t.courseName} formatTag="과정명" className="w-full text-left" />

                  <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block mb-1">시작일 ~ 종료일</span>
                      <DateRangeButtonGroup
                        startFull={t.startDateFull}
                        startShort={t.startDateShort}
                        endFull={t.endDateFull}
                        endShort={t.endDateShort}
                        title={t.institution}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <DateButtonGroup fullDate={t.startDateFull} shortDate={t.startDateShort} title="시작일" />
                      <DateButtonGroup fullDate={t.endDateFull} shortDate={t.endDateShort} title="종료일" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. 보너스 유틸리티: 글자수 계산기 & 날짜 간이 변환기 */}
        {(activeTab === 'all' || activeTab === 'tools') && (
          <section className="bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛠️</span>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">지원서 보조 유틸리티 도구</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    실시간 자소서 글자수/바이트 계산기 & 임의 날짜 포맷 자동 변환기
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 자소서 글자수 계산기 */}
              <div className="p-4 bg-[var(--section-bg)] rounded-xl border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--foreground)]">
                    📝 자기소개서 실시간 글자수 세기
                  </span>
                  {calcInput && (
                    <button
                      type="button"
                      onClick={() => setCalcInput('')}
                      className="text-[11px] text-[var(--text-muted)] hover:text-rose-500"
                    >
                      비우기
                    </button>
                  )}
                </div>

                <textarea
                  value={calcInput}
                  onChange={e => setCalcInput(e.target.value)}
                  placeholder="작성 중인 자소서 문항 내용을 여기에 붙여넣으면 공백 포함/제외 글자수 및 바이트 수가 즉시 계산됩니다."
                  rows={4}
                  className="w-full p-2.5 text-xs bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg resize-y focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-[var(--card-background)] rounded-md border border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">공백 포함</span>
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                      {textStats.lenWithSpace}자
                    </span>
                  </div>
                  <div className="p-2 bg-[var(--card-background)] rounded-md border border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">공백 제외</span>
                    <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {textStats.lenWithoutSpace}자
                    </span>
                  </div>
                  <div className="p-2 bg-[var(--card-background)] rounded-md border border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">바이트 (EUC-KR)</span>
                    <span className="text-sm font-mono font-bold text-[var(--foreground)]">
                      {textStats.byteEucKr} Byte
                    </span>
                  </div>
                  <div className="p-2 bg-[var(--card-background)] rounded-md border border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">바이트 (UTF-8)</span>
                    <span className="text-sm font-mono font-bold text-[var(--foreground)]">
                      {textStats.byteUtf8} Byte
                    </span>
                  </div>
                </div>
              </div>

              {/* 임의 날짜 간이 변환기 */}
              <div className="p-4 bg-[var(--section-bg)] rounded-xl border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--foreground)]">
                    📅 임의 날짜 포맷 자동 변환기
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">숫자 6자리 or 8자리 입력</span>
                </div>

                <input
                  type="text"
                  value={dateConverterInput}
                  onChange={e => setDateConverterInput(e.target.value)}
                  placeholder="예: 20130507 또는 202112 입력"
                  className="w-full px-3 py-2 text-xs bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />

                {convertedDates ? (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] text-[var(--text-muted)] block">변환 결과 (클릭하여 복사):</span>
                    <div className="flex flex-wrap gap-1.5">
                      <CopyChip text={convertedDates.dots} formatTag="YYYY.MM.DD" />
                      <CopyChip text={convertedDates.monthDots} formatTag="YYYY.MM" />
                      <CopyChip text={convertedDates.hyphen} formatTag="YYYY-MM-DD" />
                      <CopyChip text={convertedDates.raw} formatTag="숫자만" />
                      <CopyChip text={convertedDates.korean} formatTag="한글" />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-[var(--text-muted)] pt-2 italic">
                    숫자 8자리(예: 20130507) 또는 6자리(예: 201305)를 입력하면 모든 포맷으로 즉시 변환됩니다.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ================= 토스트 알림 팝업 ================= */}
      {copiedText && (
        <output
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[var(--foreground)] text-[var(--background)] text-xs font-medium rounded-full shadow-xl flex items-center gap-2 animate-bounce"
        >
          <span className="text-emerald-400">✓</span>
          <span className="font-mono truncate max-w-xs">{copiedText}</span>
          <span className="opacity-80">클립보드에 복사되었습니다!</span>
        </output>
      )}

      {saveToast && (
        <output
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-emerald-600 text-white text-xs font-medium rounded-full shadow-xl flex items-center gap-2 animate-pulse"
        >
          <span>✓</span>
          <span>내 정보가 브라우저에 안전하게 저장되었습니다!</span>
        </output>
      )}

      {/* 하단 메모 안내 */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 text-center text-xs text-[var(--text-muted)]">
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-background)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <label htmlFor={memoInputId} className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span>💡</span>
            <span>지원서 작성 팁: 이 페이지를 새 창에 띄워두고 듀얼 모니터에서 클릭만으로 복사하여 지원서를 작성하세요.</span>
          </label>
          <input
            id={memoInputId}
            type="text"
            readOnly
            value="https://kimmjen.me/info"
            className="sr-only"
            aria-label="페이지 공유 링크"
          />
          <button
            type="button"
            onClick={() => copyToClipboard(window.location.href, '치트시트 링크')}
            className="text-[11px] underline hover:text-[var(--foreground)] shrink-0"
          >
            현재 페이지 주소 복사
          </button>
        </div>
      </footer>
    </div>
    </CopyContext.Provider>
  );
}

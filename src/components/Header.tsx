'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'experience', 'skills', 'projects', 'contact'];
      const isDesktopLayout = window.innerWidth > 1024;
      const mainContent = document.getElementById('main-content');

      // 활성화 섹션과 뷰포트 중앙의 거리를 기준으로 계산
      const viewportCenter = isDesktopLayout && mainContent ? mainContent.clientHeight / 2 : window.innerHeight / 2;
      let bestSection = '';
      let minDistance = Infinity;

      // 각 섹션을 확인하면서 뷰포트 중앙과 가장 가까운 섹션 찾기
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();

          // 데스크톱과 모바일 레이아웃에 맞게 중앙 위치 계산
          const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - viewportCenter);

          // 현재 섹션이 화면에 표시되고 거리가 더 가까우면 갱신
          if (centerDistance < minDistance) {
            minDistance = centerDistance;
            bestSection = section;
          }
        }
      }

      // 가장 적합한 섹션으로 활성화 상태 변경
      if (bestSection) {
        setActiveSection(bestSection);
      }
    };

    // Add scroll event listeners
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial check on mount
    handleScroll();

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    const mainContent = document.getElementById('main-content');

    if (section && mainContent) {
      // 데스크톱 화면인지 모바일 화면인지 체크
      const isDesktopLayout = window.innerWidth > 1024;

      if (isDesktopLayout) {
        // 데스크톱 화면에서는 컨테이너 내부 스크롤 사용
        mainContent.scrollTo({
          top: section.offsetTop - 100,
          behavior: 'smooth'
        });
      } else {
        // 모바일 화면에서는 일반 window 스크롤 사용
        window.scrollTo({
          top: section.offsetTop - 100,
          behavior: 'smooth'
        });
      }

      // 네비게이션 클릭 시 즉시 해당 섹션 활성화 (기다리지 않고)
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="jm-nav flex-1 w-full max-lg:flex max-lg:flex-row max-lg:items-center max-lg:justify-between max-lg:gap-2 max-lg:pr-4">
      {/* Toggles Wrapper */}
      <div className="mb-4 max-lg:mb-0 flex justify-center items-center gap-3 max-lg:gap-2 max-lg:order-last flex-shrink-0">

        {/* Theme Toggle */}
        {mounted && (
          <div className="relative inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--card-background)] p-0.5">
            <button
              onClick={() => setTheme('light')}
              className={`relative z-10 p-1.5 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'light'
                ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                }`}
              title="Light Mode"
            >
              <FontAwesomeIcon icon={faSun} className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`relative z-10 p-1.5 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'dark'
                ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                }`}
              title="Dark Mode"
            >
              <FontAwesomeIcon icon={faMoon} className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`relative z-10 p-1.5 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'system'
                ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                }`}
              title="System Preference"
            >
              <FontAwesomeIcon icon={faDesktop} className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Language Toggle */}
        <div className="relative inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--card-background)] p-0.5">
          <button
            onClick={() => setLanguage('ko')}
            className={`relative z-10 px-3.5 py-1 text-xs font-medium uppercase tracking-widest rounded-full transition-all duration-300 ${language === 'ko'
              ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
              }`}
          >
            KO
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`relative z-10 px-3.5 py-1 text-xs font-medium uppercase tracking-widest rounded-full transition-all duration-300 ${language === 'en'
              ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
              }`}
          >
            EN
          </button>
        </div>
      </div>

      <ul className="jm-nav__list">
        <li className={`jm-nav__item ${activeSection === 'profile' ? 'jm-nav__item--active' : ''}`}>
          <a
            href="#profile"
            onClick={(e) => { e.preventDefault(); scrollToSection('profile'); }}
            className="transition-all duration-300 hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none px-3 py-2 block hover:scale-105"
          >
            {t('profile')}
          </a>
        </li>
        <li className={`jm-nav__item ${activeSection === 'experience' ? 'jm-nav__item--active' : ''}`}>
          <a
            href="#experience"
            onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}
            className="transition-all duration-300 hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none px-3 py-2 block hover:scale-105"
          >
            {t('experience')}
          </a>
        </li>
        <li className={`jm-nav__item ${activeSection === 'skills' ? 'jm-nav__item--active' : ''}`}>
          <a
            href="#skills"
            onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
            className="transition-all duration-300 hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none px-3 py-2 block hover:scale-105"
          >
            {t('skills')}
          </a>
        </li>
        <li className={`jm-nav__item ${activeSection === 'projects' ? 'jm-nav__item--active' : ''}`}>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className="transition-all duration-300 hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none px-3 py-2 block hover:scale-105"
          >
            {t('projects')}
          </a>
        </li>
        <li className={`jm-nav__item ${activeSection === 'contact' ? 'jm-nav__item--active' : ''}`}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="transition-all duration-300 hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none px-3 py-2 block hover:scale-105"
          >
            {t('contact')}
          </a>
        </li>
        <li className="jm-nav__item">
          <Link
            href="/resume"
            className="transition-all duration-300 hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none px-3 py-2 block hover:scale-105"
          >
            {t('resume')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header; 
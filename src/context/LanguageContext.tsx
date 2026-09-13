'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import resumeData, { ResumeData } from '@/data/resumeData';

type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    data: ResumeData;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('ko');

    // Load saved language from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'ko' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    // Save language to localStorage when changed
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const value = {
        language,
        setLanguage,
        data: resumeData[language],
        t: (key: string) => {
            // Simple translation helper for UI elements not in resumeData
            const translations: Record<string, Record<Language, string>> = {
                'profile': { ko: '프로필', en: 'Profile' },
                'experience': { ko: '경력', en: 'Experience' },
                'skills': { ko: '기술', en: 'Skills' },
                'projects': { ko: '프로젝트', en: 'Projects' },
                'contact': { ko: '연락처', en: 'Contact' },
                'resume': { ko: '이력서', en: 'Resume' },
                'view_project': { ko: '프로젝트 보기', en: 'View Project' },
                'close': { ko: '닫기', en: 'Close' },
                'features': { ko: '주요 기능', en: 'Key Features' },
                'challenges': { ko: '트러블 슈팅', en: 'Challenges & Troubleshooting' },
                'tech_stack': { ko: '기술 스택', en: 'Tech Stack' },
                'period': { ko: '기간', en: 'Period' },
                'type': { ko: '유형', en: 'Type' },
            };
            return translations[key]?.[language] || key;
        }
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

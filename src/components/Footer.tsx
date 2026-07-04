'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-[var(--border-color)]">
      <div className="text-center px-6">
        <p className="text-[var(--text-tertiary)] text-sm">
          &copy; {currentYear} KIM JE MIN. All rights reserved.
        </p>
        <p className="mt-4 text-[var(--text-tertiary)] text-xs italic">
          &ldquo;{language === 'ko'
            ? '다양한 경험을 통해 데이터의 중요성을 느끼고 데이터를 다루고 싶은 데이터 엔지니어'
            : 'Big Data Engineer who understands the importance of data through various experiences'} &rdquo;
        </p>
      </div>
    </footer>
  );
};

export default Footer; 
'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SkillsSection = () => {
  const { data, language, t } = useLanguage();

  return (
    <section id="skills" className="py-16">
      <div className="jm-biography">
        <h3 className="text-xl font-bold uppercase tracking-widest text-center mb-12 mt-8">
          {t('skills')}
          <div className="w-16 h-0.5 bg-[var(--underline-color)] mx-auto mt-1"></div>
        </h3>

        <div className="jm-biography__wrapper">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="border border-[var(--border-color)] p-5 rounded"
              >
                <h4 className="uppercase tracking-wider font-bold mb-4 border-b border-[var(--border-color)] pb-2 flex items-center justify-center">
                  {skill.category}
                </h4>

                <ul className="space-y-4">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-center">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--text-tertiary)] italic text-sm mt-10">
            {language === 'ko'
              ? '지속적으로 새로운 기술을 학습하고 있습니다'
              : 'I am continuously learning new technologies.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 
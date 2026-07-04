'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ProfileSection = () => {
  const { data, language } = useLanguage();

  return (
    <section id="profile" className="py-16">
      <div className="jm-biography">
        <div className="jm-biography__wrapper">
          <div className="jm-biography__info">
            <h4 className="jm-biography__name">{data.nameEn}</h4>
            <p className="jm-biography__date">{data.contact.birth}</p>
          </div>

          <ul className="font-bold leading-tight py-5 text-left mt-8">
            {data.education.map((edu, index) => (
              <li key={index} className="flex">
                <span className="flex-none w-16 inline-block">{edu.period.substring(0, 4)}</span>
                <span className="flex-1">
                  {edu.school} - {edu.degree}
                </span>
              </li>
            ))}
          </ul>

          <div className="font-bold leading-tight py-5 text-left mt-8">
            <div className="flex mt-1">
              <span className="flex-none w-16 inline-block">
                {language === 'ko' ? '이메일' : 'Email'}
              </span>
              <span className="flex-1">{data.contact.email}</span>
            </div>
            <div className="flex mt-1">
              <span className="flex-none w-16 inline-block">
                {language === 'ko' ? '주소' : 'Address'}
              </span>
              <span className="flex-1">{data.contact.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection; 
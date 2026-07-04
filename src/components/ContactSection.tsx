'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ContactSection = () => {
  const { data, t } = useLanguage();

  return (
    <section id="contact" className="py-16">
      <div className="jm-biography">
        <h3 className="uppercase tracking-wider font-bold text-xl text-center mb-8">
          {t('contact')}
        </h3>

        <div className="jm-biography__wrapper text-center">
          <div className="mb-10">
            <p className="text-lg mb-4 text-[var(--foreground)]">{data.contact.email}</p>
            {/* <p className="text-gray-600">{data.contact.phone}</p> */}

            {/* <a
              href={`mailto:${data.contact.email}?subject=포트폴리오 문의`}
              className="mt-6 inline-flex items-center px-4 py-2 border border-[var(--border-color)] hover:bg-gray-50 text-sm font-medium tracking-wider transition-colors duration-300"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              이메일 보내기
            </a> */}
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="border border-[var(--border-color)] flex items-center p-4">
              <FontAwesomeIcon icon={faPhone} className="text-gray-700 text-xs w-3 h-3 mr-2" />
              <p className="text-sm">{data.contact.phone}</p>
            </div>
            
            <div className="border border-[var(--border-color)] flex items-center p-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-700 text-xs w-3 h-3 mr-2" />
              <p className="text-sm">{data.contact.email}</p>
            </div>
            
            <div className="border border-[var(--border-color)] flex items-center p-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-700 text-xs w-3 h-3 mr-2" />
              <p className="text-sm">{data.contact.address}</p>
            </div>
            
            <div className="border border-[var(--border-color)] flex items-center p-4">
              <FontAwesomeIcon icon={faCalendar} className="text-gray-700 text-xs w-3 h-3 mr-2" />
              <p className="text-sm">{data.contact.birth}</p>
            </div>
          </div> */}
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
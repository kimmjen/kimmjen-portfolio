'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SecretShortcut() {
  const router = useRouter();
  const pathname = usePathname();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    // 1. 키보드 단축키 핸들러: Ctrl + Shift + Q 또는 Cmd + Shift + Q
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      // 한글 상태('ㅂ', 'ㅃ'), 영문 대소문자('q', 'Q'), 물리 키 코드('KeyQ') 모두 지원
      const isQ =
        e.code === 'KeyQ' ||
        e.key.toLowerCase() === 'q' ||
        e.key === 'ㅂ' ||
        e.key === 'ㅃ';

      if (isModifier && isShift && isQ) {
        e.preventDefault();

        if (pathname === '/info' || pathname === '/info/') {
          setToastMessage('홈 화면으로 복귀합니다');
          setTimeout(() => {
            router.push('/');
          }, 200);
        } else {
          const isUnlocked = sessionStorage.getItem('secret_info_unlocked') === 'true';
          if (!isUnlocked) {
            sessionStorage.setItem('secret_info_unlocked', 'true');
            window.dispatchEvent(new CustomEvent('toggle-secret-info', { detail: { unlocked: true } }));
            setToastMessage('🔓 [지원정보] 탭이 활성화되었습니다 (단축키 재입력 시 즉시 이동)');
          } else {
            setToastMessage('🔒 지원정보(/info) 페이지로 이동합니다');
            setTimeout(() => {
              router.push('/info/');
            }, 200);
          }
        }

        setTimeout(() => {
          setToastMessage(null);
        }, 3000);
      }
    };

    // 2. 모바일/마우스 히든 제스처: 로고(.jm-logo) 5회 연속 탭 시 토글
    const handleLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.jm-logo')) {
        const now = Date.now();
        if (now - lastClickTimeRef.current < 600) {
          clickCountRef.current += 1;
        } else {
          clickCountRef.current = 1;
        }
        lastClickTimeRef.current = now;

        if (clickCountRef.current === 5) {
          clickCountRef.current = 0;
          if (pathname === '/info' || pathname === '/info/') {
            setToastMessage('홈 화면으로 복귀합니다');
            setTimeout(() => {
              router.push('/');
            }, 200);
          } else {
            const isUnlocked = sessionStorage.getItem('secret_info_unlocked') === 'true';
            if (!isUnlocked) {
              sessionStorage.setItem('secret_info_unlocked', 'true');
              window.dispatchEvent(new CustomEvent('toggle-secret-info', { detail: { unlocked: true } }));
              setToastMessage('🔓 [지원정보] 탭이 활성화되었습니다');
            } else {
              setToastMessage('🔒 지원정보(/info) 페이지로 이동합니다');
              setTimeout(() => {
                router.push('/info/');
              }, 200);
            }
          }
          setTimeout(() => {
            setToastMessage(null);
          }, 3000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleLogoClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleLogoClick);
    };
  }, [router, pathname]);

  if (!toastMessage) return null;

  return (
    <aside
      aria-label="알림"
      className="fixed bottom-6 right-6 z-[9999] px-4 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-xs font-mono font-semibold shadow-2xl flex items-center gap-2 animate-bounce border border-[var(--border-color)]"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      <span>{toastMessage}</span>
    </aside>
  );
}

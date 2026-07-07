'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldUseLenis = useMediaQuery('(min-width: 768px) and (pointer: fine)');
  const lenis = useLenis();

  useEffect(() => {
    if (!shouldUseLenis) {
      window.scrollTo(0, 0);
      return;
    }

    if (!lenis) return;

    // Refresh on route change
    lenis.scrollTo(0, { immediate: true });
    lenis.dimensions.resize();

    // Refresh on DOM changes (e.g. dynamic content)
    const wrapper = document.querySelector('body');
    if (wrapper) {
      const resizeObserver = new ResizeObserver(() => {
        lenis.dimensions.resize();
      });
      resizeObserver.observe(wrapper);
      
      const mutationObserver = new MutationObserver(() => {
        lenis.dimensions.resize();
      });
      mutationObserver.observe(wrapper, { childList: true, subtree: true });

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }
  }, [pathname, lenis, shouldUseLenis]);

  if (!shouldUseLenis) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2, 
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoResize: true,
    }}>
      {children}
    </ReactLenis>
  );
}

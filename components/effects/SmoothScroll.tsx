'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
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
  }, [pathname, lenis]);

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2, 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoResize: true,
    }}>
      {children}
    </ReactLenis>
  );
}

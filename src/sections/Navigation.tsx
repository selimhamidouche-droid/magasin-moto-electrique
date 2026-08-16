import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLenis } from '../hooks/useLenis';
import { navigationConfig as defaultNavigationConfig } from '../config';
import type { NavigationConfig } from '../config';

interface NavigationProps {
  config?: NavigationConfig;
  dark?: boolean;
}

export default function Navigation({
  config = defaultNavigationConfig,
  dark = false,
}: NavigationProps) {
  const navigationConfig = config;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(!dark);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      if (dark) {
        setIsLightSection(false);
        return;
      }

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const probeY = navHeight > 0 ? navHeight * 0.6 : 60;
      
      const lightSectionIds = ['destinations', 'fleet', 'anatomy', 'tiers', 'footer'];
      
      // If the page has a hero section, we default to dark theme when at the top.
      // If there is no hero section, we default to light theme (since detail/other pages have light backgrounds).
      const hasHero = !!document.getElementById('hero');
      let isInLightSection = !hasHero;

      if (hasHero) {
        isInLightSection = lightSectionIds.some((id) => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom >= probeY;
        });
      }

      setIsLightSection(isInLightSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const baseTextColor = isLightSection ? '#0F0F0F' : '#FDFBF7';
  const hoverTextColor = isLightSection ? '#696969' : '#D4AF37';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId.startsWith('/')) {
      navigate(targetId);
      return;
    }
    
    try {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetId);
      } else {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  if (!navigationConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      aria-label="Navigation principale"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: scrolled ? '8px 4px' : '16px 4px',
        transition: 'padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="liquid-glass"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 24px)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: scrolled
            ? isLightSection
              ? 'rgba(240, 236, 215, 0.85)' // Match cream/beige `#f0ecd7`
              : 'rgba(24, 12, 4, 0.85)'     // Match dark brown `#0F0F0F`
            : 'rgba(255, 255, 255, 0.01)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {navigationConfig.brandName ? (
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label={`${navigationConfig.brandName} — Retour en haut de page`}
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: 'clamp(16px, 4vw, 22px)',
              fontWeight: 500,
              color: baseTextColor,
              letterSpacing: '2px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.6s ease',
            }}
          >
            {navigationConfig.brandName}
          </a>
        ) : (
          <div />
        )}

        <div role="list" style={{ display: 'flex', gap: 'clamp(12px, 2vw, 36px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {navigationConfig.links.map((item) => (
            <a
              key={`${item.label}-${item.target}`}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className="nav-link nav-link-animated"
              role="listitem"
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: 'clamp(9px, 2vw, 11px)',
                fontWeight: 600,
                color: baseTextColor,
                letterSpacing: '1.3px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.6s ease',
                opacity: 0.85,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = hoverTextColor;
                (e.target as HTMLAnchorElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = baseTextColor;
                (e.target as HTMLAnchorElement).style.opacity = '0.85';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

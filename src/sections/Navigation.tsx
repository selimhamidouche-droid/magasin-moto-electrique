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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false); // Close menu on click
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
    <>
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

          {/* Desktop Nav */}
          <div className="desktop-nav" role="list" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {navigationConfig.links.map((item) => (
              <a
                key={`${item.label}-${item.target}`}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="nav-link nav-link-animated"
                role="listitem"
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '11px',
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

          {/* Mobile Nav Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: baseTextColor,
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 999,
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Mobile Menu Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '80%',
          maxWidth: '300px',
          height: '100%',
          backgroundColor: 'rgba(240, 236, 215, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          paddingLeft: '32px',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Fermer le menu"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#0F0F0F',
            padding: '8px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '24px' }}>
          {navigationConfig.links.map((item) => (
            <a
              key={`mobile-${item.label}-${item.target}`}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#0F0F0F',
                letterSpacing: '1px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = '#0F0F0F';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

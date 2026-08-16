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

          {/* Mobile Nav Toggle & Morphing Menu */}
          <div className="mobile-nav-toggle" style={{ position: 'relative', width: '28px', height: '24px', cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {/* Top Line */}
            <div style={{
              position: 'absolute',
              top: isMobileMenuOpen ? '11px' : '0',
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: baseTextColor,
              transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '2px',
              zIndex: 1001,
            }} />
            
            {/* Middle Line */}
            <div style={{
              position: 'absolute',
              top: '11px',
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: baseTextColor,
              opacity: isMobileMenuOpen ? 0 : 1,
              transform: isMobileMenuOpen ? 'translateX(10px)' : 'translateX(0)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '2px',
              zIndex: 1001,
            }} />
            
            {/* Bottom Line (Morphs into the Menu) */}
            <div style={{
              position: 'absolute',
              top: isMobileMenuOpen ? '32px' : '22px',
              right: 0,
              width: isMobileMenuOpen ? '220px' : '100%',
              height: isMobileMenuOpen ? `${navigationConfig.links.length * 56 + 32}px` : '2px',
              backgroundColor: isMobileMenuOpen 
                ? (scrolled ? (isLightSection ? 'rgba(240, 236, 215, 0.95)' : 'rgba(24, 12, 4, 0.95)') : 'rgba(255, 255, 255, 0.1)') 
                : baseTextColor,
              backdropFilter: isMobileMenuOpen ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: isMobileMenuOpen ? 'blur(20px)' : 'none',
              border: isMobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
              borderRadius: isMobileMenuOpen ? '16px' : '2px',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 1000,
              boxShadow: isMobileMenuOpen ? '0 8px 32px rgba(0, 0, 0, 0.12)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              padding: isMobileMenuOpen ? '20px 24px' : '0',
              gap: '24px',
              overflow: 'hidden',
              cursor: 'default',
            }}
            onClick={(e) => isMobileMenuOpen && e.stopPropagation()}
            >
              {navigationConfig.links.map((item, i) => (
                <a
                  key={`mobile-${item.label}-${item.target}`}
                  href={item.target}
                  onClick={(e) => {
                    if (!isMobileMenuOpen) return e.preventDefault();
                    handleNavClick(e, item.target);
                  }}
                  style={{
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: baseTextColor,
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    textAlign: 'right',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${isMobileMenuOpen ? 0.2 + (i * 0.05) : 0}s`,
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = hoverTextColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = baseTextColor;
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

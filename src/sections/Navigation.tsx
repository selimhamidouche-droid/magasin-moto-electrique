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
            borderBottomRightRadius: isMobileMenuOpen ? '0' : '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: (scrolled || isMobileMenuOpen)
              ? isLightSection
                ? 'rgba(240, 236, 215, 0.95)' // Match cream/beige `#f0ecd7`
                : 'rgba(24, 12, 4, 0.95)'     // Match dark brown `#0F0F0F`
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Ouvrir le menu"
            style={{
              position: 'relative',
              width: '24px',
              height: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              zIndex: 1002,
            }}
          >
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: baseTextColor,
              transform: isMobileMenuOpen ? 'rotate(45deg)' : 'translateY(-6px)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: baseTextColor,
              opacity: isMobileMenuOpen ? 0 : 1,
              transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: baseTextColor,
              transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'translateY(6px)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          </button>
          
          {/* L-Shape Dropdown Menu attached to Nav */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: '-1px', // Align with the border of the nav
              width: '240px',
              height: isMobileMenuOpen ? `${navigationConfig.links.length * 56 + 32}px` : '0px',
              backgroundColor: (scrolled || isMobileMenuOpen)
                ? isLightSection
                  ? 'rgba(240, 236, 215, 0.95)'
                  : 'rgba(24, 12, 4, 0.95)'
                : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderTop: 'none', // Fuse with the nav bar
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '0',
              transition: 'height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: isMobileMenuOpen ? '20px 24px' : '0 24px',
              gap: '24px',
              zIndex: 99,
            }}
          >
            {/* We use a tiny cover block to hide the nav's bottom border at the junction */}
            <div style={{
              position: 'absolute',
              top: '-1px',
              right: 0,
              width: '240px',
              height: '2px',
              backgroundColor: (scrolled || isMobileMenuOpen)
                ? isLightSection
                  ? 'rgba(240, 236, 215, 0.95)'
                  : 'rgba(24, 12, 4, 0.95)'
                : 'rgba(255, 255, 255, 0.1)',
              zIndex: 10,
              opacity: isMobileMenuOpen ? 1 : 0,
            }} />

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
                  position: 'relative',
                  zIndex: 20,
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
      </nav>
    </>
  );
}

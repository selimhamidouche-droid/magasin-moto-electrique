import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLenis } from '../hooks/useLenis';
import { navigationConfig as defaultNavigationConfig } from '../config';
import type { NavigationConfig } from '../config';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  config?: NavigationConfig;
  dark?: boolean;
}

export default function Navigation({
  config = defaultNavigationConfig,
}: NavigationProps) {
  const navigationConfig = config;
  const { totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const baseTextColor = '#FDFBF7';
  const hoverTextColor = '#c5a059';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu on click

    if (targetId.startsWith('/#')) {
      if (window.location.pathname === '/') {
        const hash = targetId.substring(1);
        try {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(hash);
          } else {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (err) {
          console.error("Navigation error:", err);
        }
      } else {
        navigate(targetId);
      }
      return;
    }

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
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          {navigationConfig.brandName ? (
            <div className="liquid-glass" style={{
              padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 24px)',
              borderRadius: '12px',
              backgroundColor: 'rgba(50, 54, 50, 0.85)',
              pointerEvents: 'auto',
            }}>
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                aria-label={`${navigationConfig.brandName} — Retour à l'accueil`}
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: 'clamp(16px, 4vw, 22px)',
                  fontWeight: 500,
                  color: baseTextColor,
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.6s ease',
                  display: 'block',
                }}
              >
                {navigationConfig.brandName}
              </a>
            </div>
          ) : (
            <div />
          )}

          <div className="liquid-glass" style={{
            padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 24px)',
            borderRadius: '12px',
            backgroundColor: 'rgba(50, 54, 50, 0.85)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}>
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

              {/* Account icon */}
              <a
                href={user ? '/compte' : '/login'}
                onClick={(e) => handleNavClick(e, user ? '/compte' : '/login')}
                title={user ? 'Mon compte' : 'Connexion'}
                style={{ color: baseTextColor, textDecoration: 'none', fontSize: '18px', opacity: 0.85, transition: 'opacity 0.3s', lineHeight: 1 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
              >
                {user ? '👤' : '🔑'}
              </a>

              {/* Cart icon */}
              <a
                href="/panier"
                onClick={(e) => handleNavClick(e, '/panier')}
                title="Panier"
                style={{ position: 'relative', color: baseTextColor, textDecoration: 'none', fontSize: '18px', opacity: 0.85, transition: 'opacity 0.3s', lineHeight: 1 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
              >
                🛒
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-10px',
                    background: '#c5a059', color: '#000',
                    fontSize: '9px', fontWeight: 800,
                    width: '17px', height: '17px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {totalItems}
                  </span>
                )}
              </a>
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
          </div>

          {/* Floating Dropdown Menu attached to Right Pill */}
          <div
            className="liquid-glass"
            style={{
              position: 'absolute',
              top: 'calc(100% + 16px)',
              right: '0',
              width: '200px',
              height: isMobileMenuOpen ? `${navigationConfig.links.length * 56 + 32}px` : '0px',
              opacity: isMobileMenuOpen ? 1 : 0,
              visibility: isMobileMenuOpen ? 'visible' : 'hidden',
              backgroundColor: 'rgba(50, 54, 50, 0.95)',
              borderRadius: '16px',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: isMobileMenuOpen ? '20px' : '0 20px',
              gap: '24px',
              zIndex: 19,
            }}
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

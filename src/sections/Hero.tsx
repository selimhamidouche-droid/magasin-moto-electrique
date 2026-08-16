import { useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { heroConfig as defaultHeroConfig } from '../config';
import type { HeroConfig } from '../config';

interface HeroProps {
  config?: HeroConfig;
}

import { useGSAP } from '@gsap/react';

export default function Hero({ config = defaultHeroConfig }: HeroProps) {
  const heroConfig = config;
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const hasHeroContent =
    heroConfig.videoPath ||
    heroConfig.eyebrow ||
    heroConfig.titleLine ||
    heroConfig.titleEmphasis ||
    heroConfig.subtitleLine1 ||
    heroConfig.subtitleLine2 ||
    heroConfig.ctaText;

  useGSAP(() => {
    if (!hasHeroContent) return;

    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.8, y: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.6'
      );

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }, { dependencies: [hasHeroContent], scope: containerRef });

  if (!hasHeroContent) {
    return null;
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-labelledby="hero-title"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '12vh',
      }}
    >
      {/* Background (Video or Image) */}
      {heroConfig.videoPath && (
        heroConfig.videoPath.endsWith('.mp4') ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            poster={heroConfig.videoPoster}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source src={heroConfig.videoPath} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroConfig.videoPath}
            alt="Hero background"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
        )
      )}

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content Panel */}
      <div
        className="liquid-glass"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '600px',
          width: '90%',
          padding: '48px 40px 40px',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        {heroConfig.eyebrow && (
          <p
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#938977',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {heroConfig.eyebrow}
          </p>
        )}

        {(heroConfig.titleLine || heroConfig.titleEmphasis) && (
          <h1
            id="hero-title"
            ref={titleRef}
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: 'clamp(36px, 5vw, 62px)',
              fontWeight: 800,
              color: '#fcfaee',
              lineHeight: 1.15,
              marginBottom: '20px',
              opacity: 0,
            }}
          >
            {heroConfig.titleLine}
            {heroConfig.titleEmphasis && (
              <>
                <br />
                <em style={{ fontStyle: 'italic' }}>{heroConfig.titleEmphasis}</em>
              </>
            )}
          </h1>
        )}

        {(heroConfig.subtitleLine1 || heroConfig.subtitleLine2) && (
          <p
            ref={subtitleRef}
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 800,
              color: '#fcfaee',
              lineHeight: 1.7,
              marginBottom: '32px',
              opacity: 0,
              maxWidth: '420px',
              margin: '0 auto 32px',
            }}
          >
            {heroConfig.subtitleLine1}
            {heroConfig.subtitleLine1 && heroConfig.subtitleLine2 && <br />}
            {heroConfig.subtitleLine2}
          </p>
        )}

        {heroConfig.ctaText && (
          <a
            ref={ctaRef}
            href={heroConfig.ctaTargetId || '#'}
            aria-label={`${heroConfig.ctaText} — Voir les offres`}
            onClick={(e) => {
              e.preventDefault();
              if (!heroConfig.ctaTargetId) return;
              
              if (heroConfig.ctaTargetId.startsWith('/')) {
                navigate(heroConfig.ctaTargetId);
              } else {
                try {
                  const el = document.querySelector(heroConfig.ctaTargetId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } catch (err) {
                  console.error("Invalid selector", err);
                }
              }
            }}
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#fcfaee',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(252, 250, 238, 0.4)',
              paddingBottom: '4px',
              opacity: 0,
              display: 'inline-block',
              transition: 'border-color 0.6s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.borderBottomColor = '#938977';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.borderBottomColor = 'rgba(252, 250, 238, 0.4)';
            }}
          >
            {heroConfig.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

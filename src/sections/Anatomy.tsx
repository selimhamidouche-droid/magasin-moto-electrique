import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeritageHelix from '../effects/HeritageHelix';
import { anatomyConfig as defaultAnatomyConfig } from '../config';
import type { AnatomyConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface AnatomyProps {
  config?: AnatomyConfig;
}

import { useGSAP } from '@gsap/react';

export default function Anatomy({ config = defaultAnatomyConfig }: AnatomyProps) {
  const anatomyConfig = config;
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillars = anatomyConfig.pillars;

  useGSAP(() => {
    pillarRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'top 40%',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: sectionRef });

  if (!anatomyConfig.sectionLabel && !anatomyConfig.title && pillars.length === 0) {
    return null;
  }

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      aria-labelledby="anatomy-title"
      style={{
        backgroundColor: '#141414',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '100px 24px 40px',
        }}
      >
        {anatomyConfig.sectionLabel && (
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
            {anatomyConfig.sectionLabel}
          </p>
        )}
        {anatomyConfig.title && (
          <h2
            id="anatomy-title"
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: '42px',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#ffffff',
            }}
          >
            {anatomyConfig.title}
          </h2>
        )}
      </div>

      {/* Split Layout */}
      <div
        style={{
          display: 'flex',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: '100vh',
        }}
      >
        {/* Left: Sticky HeritageHelix */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hidden md:flex w-1/2"
        >
          <div style={{ width: '100%', height: '80vh' }}>
            <HeritageHelix />
          </div>
        </div>

        {/* Right: Scrolling Content */}
        <div
          style={{
            padding: '0 48px',
          }}
          className="w-full md:w-1/2"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              ref={(el) => { pillarRefs.current[i] = el; }}
              style={{
                padding: '15vh 0',
                borderBottom: i < pillars.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#938977',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                {pillar.label}
              </p>
              <h3
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '26px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: '#ffffff',
                  marginBottom: '20px',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 800,
                  lineHeight: 1.6,
                  color: '#d0d0d0',
                  maxWidth: '480px',
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

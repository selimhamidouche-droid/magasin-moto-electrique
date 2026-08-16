import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig, frenchMainPageConfig } from '../config.ts';

export default function MainPage() {
  useLenis();

  usePageSEO({
    title: frenchConfig.siteConfig.siteTitle,
    description: frenchConfig.siteConfig.siteDescription,
    lang: 'fr',
    canonicalUrl: 'https://www.motovite.com/',
  });

  return (
    <>
      <Navigation
        config={frenchConfig.navigationConfig}
      />

      <main id="main-content">
        {/* ─── HERO SECTION WITH VIDEO & GLASS INQUIRY CARD ─── */}
        <section
          id="hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '80px 0 20px',
          }}
        >
          {/* Layer 1: Background (Video or Image) */}
          <div className="animate-slow-zoom" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {frenchConfig.heroConfig.videoPath && (
              frenchConfig.heroConfig.videoPath.endsWith('.mp4') ? (
                <video autoPlay muted loop playsInline aria-hidden="true" poster={frenchConfig.heroConfig.videoPoster} style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src={frenchConfig.heroConfig.videoPath} type="video/mp4" />
                </video>
              ) : (
                <img src={frenchConfig.heroConfig.videoPath} alt="MotoVite Hero Background" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )
            )}
          </div>

          {/* Layer 2: Radial Gradient Overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(circle at center, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.85) 100%)' }} />

          {/* Layer 3: Vignette */}
          <div className="vignette" />

          {/* Layer 4: Grain / Noise */}
          <div className="noise-overlay" />

          {/* Layer 5: Volumetric Light */}
          <div className="volumetric-light animate-drifting-light" style={{ top: '10%', right: '20%', width: '80vw', height: '80vw', maxWidth: '800px', maxHeight: '800px' }} />

          {/* Layer 6: Particles (Abstract via CSS noise overlay interaction) */}
          {/* Layer 7: Glass reflections are handled via the .liquid-glass class on components */}

          {/* Hero Content Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 24px',
              gap: '24px',
            }}
          >
            {/* Top Badge & Text */}
            <div style={{ maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', borderRadius: '12px', border: '1px solid rgba(197, 160, 89, 0.25)', backgroundColor: 'rgba(8, 8, 8, 0.5)', backdropFilter: 'blur(12px)', width: 'fit-content' }}>
                <span style={{ display: 'block', width: '6px', height: '6px', borderRadius: '12px', backgroundColor: 'var(--mv-gold)', boxShadow: '0 0 10px var(--mv-gold)' }} className="animate-breathing" />
                <span style={{ color: 'var(--mv-gold)', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Édition 2026</span>
              </div>

              <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 800, color: 'var(--mv-off-white)', lineHeight: 1, letterSpacing: '-2px' }}>
                Ta prochaine moto.
              </h1>

              <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(20px, 5vw, 42px)', fontWeight: 800, color: 'var(--mv-warm-beige)', lineHeight: 1.2 }}>
                Livrée directement chez toi.
              </h2>

              <p style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(14px, 3vw, 18px)', color: '#a0a0a0', lineHeight: 1.6, maxWidth: '520px', marginTop: '16px' }}>
                <span style={{ color: 'var(--mv-off-white)', fontWeight: 500 }}>Choisis. Commande. Nous livrons. Sans concession.</span><br />
                Choisissez votre moto en ligne. Nous nous occupons de l'inspection, des démarches et de la livraison.
              </p>

              {/* Confiance Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                <div style={{ color: 'var(--mv-gold)', fontSize: '18px', letterSpacing: '3px' }}>★★★★★</div>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ color: 'var(--mv-off-white)', fontSize: '14px', fontWeight: 600 }}>4.9/5</span>
                <span style={{ color: '#a0a0a0', fontSize: '14px' }}>+1200 motos livrées en France</span>
              </div>

              {/* Action */}
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <a
                  href="#destinations"
                  className="btn-premium"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    backgroundColor: 'var(--mv-off-white)',
                    color: 'var(--mv-deep-black)',
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: 'clamp(13px, 2.5vw, 15px)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: 'clamp(16px, 3vw, 24px) clamp(24px, 5vw, 56px)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                  }}
                >
                  Configurer ma moto
                  <span style={{ fontSize: '20px' }}>→</span>
                </a>

                {/* Reassurance Checkmarks */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#888', fontSize: '13px', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Livraison à domicile</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Paiement sécurisé</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Garantie incluse</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Reprise possible</span>
                </div>
              </div>
            </div>

            {/* Bottom Stats Cards (Glass) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '0px', width: '100%', maxWidth: '1000px' }}>
              {[
                { label: "Clients satisfaits", value: "98%" },
                { label: "Livraison moyenne", value: "72h" },
                { label: "Paiement sécurisé", value: "100%" }
              ].map((stat, idx) => (
                <div key={idx} className="liquid-glass" style={{ padding: '24px 32px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '48px', fontWeight: 800, color: 'var(--mv-off-white)', lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontSize: '12px', color: '#a0a0a0', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-breathing" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--mv-off-white)' }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--mv-off-white), transparent)' }} />
          </div>
        </section>

        {/* ─── DESTINATIONS / CATÉGORIES SECTION ─── */}
        <section
          id="destinations"
          style={{
            backgroundColor: '#0F0F0F',
            color: '#FDFBF7',
            padding: '120px 24px',
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <p
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#D4AF37',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Gamme MotoVite 2026
              </p>
              <h2
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#FDFBF7',
                  lineHeight: 1.1,
                  marginBottom: '16px',
                }}
              >
                {frenchMainPageConfig.destinationsTitle}
              </h2>
              <p
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '15px',
                  color: '#D4AF37',
                  maxWidth: '560px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                {frenchMainPageConfig.destinationsSubtitle}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '60px 48px',
              }}
            >
              {frenchMainPageConfig.destinations.map((dest) => (
                <article
                  key={dest.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Transparent Floating Image */}
                  <div style={{ width: '100%', marginBottom: '24px', textAlign: 'center' }}>
                    <img
                      src={dest.image}
                      alt={dest.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        maxHeight: '380px',
                        objectFit: 'contain',
                        display: 'block',
                        margin: '0 auto',
                        filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6))',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLImageElement).style.transform = 'scale(1.06)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLImageElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  {/* Content Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                    <p
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#D4AF37',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '8px',
                      }}
                    >
                      {dest.route}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#FDFBF7',
                        marginBottom: '12px',
                      }}
                    >
                      {dest.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: '#a39b8c',
                        marginBottom: '24px',
                        flex: '1 1 auto',
                      }}
                    >
                      {dest.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(252, 250, 238, 0.1)',
                        paddingTop: '16px',
                        marginBottom: '24px',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: '#D4AF37', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Disponibilité</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#FDFBF7' }}>{dest.duration}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: '#D4AF37', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Tarif</span>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#FDFBF7' }}>{dest.price}</span>
                      </div>
                    </div>

                    <a
                      href={`/motos/${dest.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '14px 24px',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(252, 250, 238, 0.3)',
                        color: '#FDFBF7',
                        textTransform: 'uppercase',
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FDFBF7';
                        e.currentTarget.style.color = '#0F0F0F';
                        e.currentTarget.style.borderColor = '#FDFBF7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#FDFBF7';
                        e.currentTarget.style.borderColor = 'rgba(252, 250, 238, 0.3)';
                      }}
                    >
                      Découvrir le modèle →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FLEET SECTION (VOITURES) ─── */}
        <section
          id="fleet"
          style={{
            backgroundColor: '#141414',
            padding: '100px 24px',
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#D4AF37',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Méthode
              </p>
              <h2
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '38px',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                {frenchMainPageConfig.fleetTitle}
              </h2>
              <p
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#d0d0d0',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                {frenchMainPageConfig.fleetSubtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {frenchMainPageConfig.fleet.map((car, index) => (
                <div
                  key={car.title}
                  className="mobile-col"
                  style={{
                    display: 'flex',
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    gap: '40px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      flex: '1 1 450px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0px 8px 15px rgba(168, 142, 113, 0.15)',
                    }}
                  >
                    <img
                      src={car.image}
                      alt={car.title}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#D4AF37',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        display: 'inline-block',
                      }}
                    >
                      {car.feature}
                    </span>
                    <h3
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '32px',
                        fontWeight: 800,
                        color: '#ffffff',
                      }}
                    >
                      {car.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: 1.7,
                        color: '#d0d0d0',
                      }}
                    >
                      {car.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA CLUB / MEMBERSHIP PAGE LINK ─── */}
        <section
          id="club-cta"
          style={{
            backgroundColor: '#0F0F0F',
            padding: '120px 24px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Subtle decoration */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4AF37',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Catalogue
            </p>
            <h2
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: 'clamp(32px, 4vw, 54px)',
                fontWeight: 800,
                color: '#FDFBF7',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              {frenchMainPageConfig.ctaTitle}
            </h2>
            <p
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '16px',
                lineHeight: 1.7,
                color: '#FDFBF7',
                opacity: 0.8,
                maxWidth: '600px',
                margin: '0 auto 40px',
              }}
            >
              {frenchMainPageConfig.ctaSubtitle}
            </p>

            <a
              href="/catalogue"
              style={{
                display: 'inline-block',
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#0F0F0F',
                backgroundColor: '#FDFBF7',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 36px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.4s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#D4AF37';
                (e.target as HTMLAnchorElement).style.color = '#FDFBF7';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#FDFBF7';
                (e.target as HTMLAnchorElement).style.color = '#0F0F0F';
              }}
            >
              {frenchMainPageConfig.ctaButton}
            </a>
          </div>
        </section>
      </main>

      <Footer config={frenchConfig.footerConfig} dark />
    </>
  );
}

import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig, frenchMainPageConfig, staticProducts } from '../config.ts';
import { Link } from 'react-router-dom';
import InspectionBanner from '../components/InspectionBanner';

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

              <p className="hidden md:block" style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(14px, 3vw, 18px)', color: '#a0a0a0', lineHeight: 1.6, maxWidth: '520px', marginTop: '16px' }}>
                <span style={{ color: 'var(--mv-off-white)', fontWeight: 500 }}>Choisis. Commande. Nous livrons. Sans concession.</span><br />
                Choisissez votre moto en ligne. Nous nous occupons de l'inspection, des démarches et de la livraison.
              </p>

              {/* Confiance Badge */}
              <div className="hidden md:flex" style={{ alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                <div style={{ color: 'var(--mv-gold)', fontSize: '18px', letterSpacing: '3px' }}>★★★★★</div>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ color: 'var(--mv-off-white)', fontSize: '14px', fontWeight: 600 }}>4.9/5</span>
                <span style={{ color: '#a0a0a0', fontSize: '14px' }}>+1200 motos livrées en France</span>
              </div>

              {/* Action */}
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <Link
                  to="/catalogue"
                  className="btn-base btn-primary"
                >
                  Voir le Catalogue
                  <span style={{ fontSize: '20px', marginLeft: '12px' }}>→</span>
                </Link>

                {/* Reassurance Checkmarks */}
                <div className="hidden md:flex" style={{ flexWrap: 'wrap', gap: '24px', color: '#888', fontSize: '13px', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Livraison à domicile</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Paiement sécurisé</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Garantie incluse</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--mv-gold)' }}>✓</span> Reprise possible</span>
                </div>
              </div>
            </div>

            {/* Bottom Stats Cards (Glass) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-0 w-full max-w-[1000px]">
              {[
                { label: "Clients satisfaits", value: "98%" },
                { label: "Livraison moyenne", value: "72h" },
                { label: "Paiement sécurisé", value: "100%" }
              ].map((stat, idx) => (
                <div key={idx} className="liquid-glass p-5 md:p-6 lg:p-8 rounded-xl flex flex-col gap-2 md:gap-3 border border-white/5">
                  <span style={{ fontFamily: '"Montserrat", system-ui, sans-serif' }} className="text-4xl md:text-5xl font-extrabold text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-[#a0a0a0] font-semibold tracking-widest uppercase">
                    {stat.label}
                  </span>
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
              {staticProducts.slice(0, 3).map((product) => (
                <Link
                  to={`/motos/${product.slug}`}
                  key={product.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    transition: 'transform 0.4s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Image */}
                  <div style={{ width: '100%', marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9' }}>
                    <img
                      src={product.image_url}
                      alt={product.nom}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
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
                      {product.nom}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Montserrat", system-ui, sans-serif',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#FDFBF7',
                        marginBottom: '12px',
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.categorie}
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
                      {product.description}
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
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#FDFBF7' }}>{product.en_stock ? 'En stock' : 'Sur commande'}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: '#D4AF37', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Tarif</span>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#FDFBF7' }}>{product.prix.toLocaleString('fr-FR')} €</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Voir tout le catalogue */}
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link
                to="/catalogue"
                className="btn-base btn-primary"
              >
                Voir tout le catalogue →
              </Link>
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
                <InspectionBanner
                  key={car.title}
                  feature={car.feature}
                  title={car.title}
                  description={car.description}
                  image={car.image}
                  reverse={index % 2 !== 0}
                />
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
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, opacity: 0.5 }}
          >
            <source src="/videos/roadster.mp4" type="video/mp4" />
          </video>
          {/* Subtle decoration */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: -1,
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
              className="btn-base btn-primary"
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

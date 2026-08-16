import { useParams, Link } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig, frenchMainPageConfig } from '../config.ts';
import { motion } from 'framer-motion';

export default function ModelDetail() {
  useLenis();
  const { id } = useParams<{ id: string }>();

  const model = frenchMainPageConfig.destinations.find(d => d.id === id);

  usePageSEO({
    title: model ? `${model.title} | ${frenchConfig.siteConfig.siteTitle}` : 'Modèle non trouvé',
    description: model?.description || frenchConfig.siteConfig.siteDescription,
    lang: 'fr',
    canonicalUrl: `https://www.motovite.com/motos/${id}`,
  });

  if (!model) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: '"Montserrat", system-ui, sans-serif' }}>
        <h2>Modèle introuvable</h2>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <>
      <Navigation
        config={frenchConfig.navigationConfig}
        dark
      />

      <motion.main 
        id="main-content" 
        style={{ background: 'linear-gradient(145deg, #4a4a4a 0%, #1a1a1a 100%)', minHeight: '100vh', paddingTop: '100px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
      >
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block', marginBottom: '40px' }}>
            <Link 
              to="/" 
              style={{ 
                fontFamily: '"Montserrat", system-ui, sans-serif', 
                fontSize: '13px', 
                color: '#938977', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              ← Retour à l'accueil
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
            {/* Left Col: Details */}
            <div>
              <p style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#938977',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                {model.route}
              </p>
              <h1 style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}>
                {model.title}
              </h1>
              <p style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '16px',
                color: '#cccccc',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}>
                {model.description}
              </p>

              <div style={{ display: 'flex', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                 <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#938977', display: 'block', textTransform: 'uppercase' }}>Délai de livraison</span>
                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#ffffff' }}>{model.duration}</span>
                 </div>
                 <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#938977', display: 'block', textTransform: 'uppercase' }}>Prix du modèle</span>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{model.price}</span>
                 </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <motion.a
                  href="#booking"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a',
                    padding: '16px 32px',
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '12px',
                  }}
                >
                  Commander cette Moto
                </motion.a>
              </div>
            </div>

            {/* Right Col: Video Showcase */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}>
              <video 
                src="/videos/roadster.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </section>
      </motion.main>

      <Footer config={frenchConfig.footerConfig} dark />
    </>
  );
}

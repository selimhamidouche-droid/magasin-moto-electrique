import { Link, useParams, Navigate } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { frenchConfig, brandsConfig, staticProducts } from '../config.ts';

export default function MarquePage() {
  useLenis();
  const { slug } = useParams<{ slug: string }>();

  const brand = brandsConfig.find(b => b.slug === slug);

  usePageSEO({
    title: brand
      ? `${brand.name} — ${brand.tagline} | SurVolté`
      : 'Marque introuvable | SurVolté',
    description: brand
      ? brand.description.slice(0, 160)
      : '',
    lang: 'fr',
    canonicalUrl: `https://www.survolte.com/marques/${slug}`,
  });

  if (!brand) return <Navigate to="/catalogue" replace />;

  const brandProducts = staticProducts.filter(p => p.marque === brand.slug);
  const accentColor = brand.vehicleTypes.includes('scooter') ? '#64b4ff' : '#c5a059';

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', paddingTop: '110px' }}>

        {/* Hero marque */}
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Background image floutée */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${brand.heroImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'blur(40px) saturate(0.5)',
            opacity: 0.15,
            transform: 'scale(1.1)',
          }} />

          <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '32px' }}>
              <ol style={{ listStyle: 'none', display: 'flex', gap: '8px', alignItems: 'center', padding: 0, margin: 0 }}>
                <li><Link to="/" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>Accueil</Link></li>
                <li style={{ color: '#444', fontSize: '12px' }}>/</li>
                <li><Link to="/catalogue" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>Catalogue</Link></li>
                <li style={{ color: '#444', fontSize: '12px' }}>/</li>
                {brand.vehicleTypes.includes('moto') && (
                  <><li><Link to="/catalogue/motos" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>Motos</Link></li><li style={{ color: '#444', fontSize: '12px' }}>/</li></>
                )}
                {brand.vehicleTypes.includes('scooter') && (
                  <><li><Link to="/catalogue/scooters" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>Scooters</Link></li><li style={{ color: '#444', fontSize: '12px' }}>/</li></>
                )}
                <li style={{ color: accentColor, fontSize: '12px', fontWeight: 600 }}>{brand.name}</li>
              </ol>
            </nav>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
              <div>
                <p style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: accentColor, marginBottom: '16px' }}>
                  Marque officielle
                </p>
                <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '16px' }}>
                  {brand.name}
                </h1>
                <p style={{ fontSize: '18px', fontWeight: 600, color: accentColor }}>
                  {brand.tagline}
                </p>
              </div>

              {/* Méta marque */}
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '20px 24px',
                display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Fondée en</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: 0 }}>{brand.founded}</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Pays</p>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>{brand.country}</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Modèles dispo.</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: accentColor, margin: 0 }}>{brandProducts.length}</p>
                </div>
              </div>
            </div>

            {/* Description étirée sur toute la largeur sous la boîte */}
            <p style={{ color: '#aaa', fontSize: '16px', lineHeight: 1.8, maxWidth: '100%' }}>
              {brand.description}
            </p>
          </div>
        </section>

        {/* Separator */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 56px', padding: '0 24px' }}>
          <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }} />
        </div>

        {/* Grille produits */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
          <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
            Nos {brand.name} disponibles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {brandProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Maillage interne */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#555', fontSize: '13px', marginTop: '40px', marginBottom: '16px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Explorer aussi
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {brand.vehicleTypes.includes('moto') && (
              <Link to="/catalogue/motos" style={{ color: '#c5a059', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Toutes les Motos Électriques</Link>
            )}
            {brand.vehicleTypes.includes('scooter') && (
              <Link to="/catalogue/scooters" style={{ color: '#64b4ff', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Tous les Scooters Électriques</Link>
            )}
            {brandsConfig.filter(b => b.slug !== brand.slug).map(b => (
              <Link key={b.slug} to={`/marques/${b.slug}`} style={{ color: '#888', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ {b.name}</Link>
            ))}
            <Link to="/catalogue" style={{ color: '#555', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Tout le catalogue</Link>
          </div>
        </section>

        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

import { useParams, Link, Navigate } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig, staticProducts, brandsConfig } from '../config.ts';

export default function ModelDetail() {
  useLenis();
  const { id } = useParams<{ id: string }>();

  const product = staticProducts.find(p => p.slug === id || p.id === id);
  const brand = product ? brandsConfig.find(b => b.slug === product.marque) : null;

  usePageSEO({
    title: product
      ? `${product.nom} — ${product.prix.toLocaleString('fr-FR')} € | MotoVite`
      : 'Modèle non trouvé | MotoVite',
    description: product?.description || frenchConfig.siteConfig.siteDescription,
    lang: 'fr',
    canonicalUrl: `https://www.motovite.com/motos/${id}`,
  });

  if (!product) return <Navigate to="/catalogue" replace />;

  const accentColor = product.type_vehicule === 'scooter' ? '#64b4ff' : '#c5a059';
  const hubPath = product.type_vehicule === 'moto' ? '/catalogue/motos' : '/catalogue/scooters';
  const hubLabel = product.type_vehicule === 'moto' ? 'Motos Électriques' : 'Scooters Électriques';

  // Autres produits de la même marque
  const related = staticProducts.filter(p => p.marque === product.marque && p.id !== product.id).slice(0, 3);

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', paddingTop: '110px' }}>

        {/* Hero Fiche */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '32px' }}>
            <ol style={{ listStyle: 'none', display: 'flex', gap: '8px', alignItems: 'center', padding: 0, margin: 0, flexWrap: 'wrap' }}>
              <li><Link to="/" style={{ color: '#555', fontSize: '12px', textDecoration: 'none' }}>Accueil</Link></li>
              <li style={{ color: '#333', fontSize: '12px' }}>/</li>
              <li><Link to="/catalogue" style={{ color: '#555', fontSize: '12px', textDecoration: 'none' }}>Catalogue</Link></li>
              <li style={{ color: '#333', fontSize: '12px' }}>/</li>
              <li><Link to={hubPath} style={{ color: '#555', fontSize: '12px', textDecoration: 'none' }}>{hubLabel}</Link></li>
              {brand && (
                <>
                  <li style={{ color: '#333', fontSize: '12px' }}>/</li>
                  <li><Link to={`/marques/${brand.slug}`} style={{ color: '#555', fontSize: '12px', textDecoration: 'none' }}>{brand.name}</Link></li>
                </>
              )}
              <li style={{ color: '#333', fontSize: '12px' }}>/</li>
              <li style={{ color: accentColor, fontSize: '12px', fontWeight: 600 }}>{product.nom}</li>
            </ol>
          </nav>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

            {/* Left — Image */}
            <div style={{
              borderRadius: '24px', overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              aspectRatio: '4/3',
              position: 'relative',
            }}>
              <img
                src={product.image_url}
                alt={product.nom}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Stock badge */}
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                padding: '6px 14px', borderRadius: '20px',
                background: product.en_stock ? 'rgba(80,200,120,0.9)' : 'rgba(255,80,80,0.85)',
                color: '#fff',
              }}>
                {product.en_stock ? '✓ En stock' : 'Sur commande'}
              </div>
            </div>

            {/* Right — Infos */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: accentColor, marginBottom: '8px' }}>
                {product.marque.toUpperCase()} — {product.categorie}
              </p>
              <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
                {product.nom}
              </h1>

              {/* Prix */}
              <div style={{ marginBottom: '28px' }}>
                <span style={{ fontSize: '40px', fontWeight: 800, color: accentColor, fontFamily: '"Montserrat", system-ui, sans-serif' }}>
                  {product.prix.toLocaleString('fr-FR')} €
                </span>
                <span style={{ fontSize: '13px', color: '#555', marginLeft: '12px' }}>ou financement disponible</span>
              </div>

              <p style={{ color: '#888', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px' }}>
                {product.description}
              </p>

              {/* Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {[
                  { label: 'Puissance', value: `${product.puissance_kw} kW` },
                  { label: 'Autonomie', value: `${product.autonomie} km` },
                  { label: 'Vitesse max', value: `${product.vitesse_max} km/h` },
                  { label: 'Permis requis', value: product.permis_requis },
                  ...(product.specs ? Object.entries(product.specs).map(([label, value]) => ({ label, value })) : []),
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    padding: '14px 16px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#555', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  id="btn-commander"
                  style={{
                    flex: 1, minWidth: '160px',
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                    padding: '16px 24px', borderRadius: '12px',
                    background: accentColor, color: '#000', border: 'none', cursor: 'pointer',
                  }}
                >
                  Commander
                </button>
                <button
                  id="btn-essai"
                  style={{
                    flex: 1, minWidth: '160px',
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                    padding: '16px 24px', borderRadius: '12px',
                    background: 'transparent', color: '#fff',
                    border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer',
                  }}
                >
                  Réserver un essai
                </button>
              </div>

              {/* Livraison mention */}
              <p style={{ color: '#444', fontSize: '12px', marginTop: '16px' }}>
                🚚 Livraison à domicile sous 72h — Retour satisfait ou remboursé 14 jours
              </p>
            </div>
          </div>
        </section>

        {/* Séparateur */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
        </div>

        {/* Produits similaires */}
        {related.length > 0 && (
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 100px' }}>
            <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
              Autres modèles {brand?.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {related.map(p => (
                <Link key={p.id} to={`/motos/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    borderRadius: '16px', overflow: 'hidden',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}40`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
                  >
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img src={p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '16px 20px 20px' }}>
                      <p style={{ fontSize: '10px', color: accentColor, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{p.categorie}</p>
                      <p style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{p.nom}</p>
                      <p style={{ fontSize: '18px', fontWeight: 800, color: accentColor }}>{p.prix.toLocaleString('fr-FR')} €</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Maillage interne bas */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '40px' }}>
            <Link to={hubPath} style={{ color: accentColor, fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Tous les {hubLabel}</Link>
            {brand && <Link to={`/marques/${brand.slug}`} style={{ color: '#888', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Tous les {brand.name}</Link>}
            <Link to="/catalogue" style={{ color: '#555', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Catalogue complet</Link>
          </div>
        </section>

        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

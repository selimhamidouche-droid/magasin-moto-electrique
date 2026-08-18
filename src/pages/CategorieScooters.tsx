import { Link } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { frenchConfig, staticProducts, brandsConfig } from '../config.ts';

const scooters = staticProducts.filter(p => p.type_vehicule === 'scooter');

export default function CategorieScooters() {
  useLenis();

  usePageSEO({
    title: `Scooters Électriques — Niu & plus | SurVolté`,
    description: `Nos scooters électriques connectés pour la ville : Niu NQi GT Pro, UQi GT Pro. Batterie amovible, application mobile, livraison sous 72h.`,
    lang: 'fr',
    canonicalUrl: 'https://www.survolte.com/catalogue/scooters',
  });

  const scooterBrands = brandsConfig.filter(b => b.vehicleTypes.includes('scooter'));

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', paddingTop: '110px' }}>

        {/* Hero */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 56px' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
            <ol style={{ listStyle: 'none', display: 'flex', gap: '8px', alignItems: 'center', padding: 0, margin: 0 }}>
              <li><Link to="/" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>Accueil</Link></li>
              <li style={{ color: '#444', fontSize: '12px' }}>/</li>
              <li><Link to="/catalogue" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>Catalogue</Link></li>
              <li style={{ color: '#444', fontSize: '12px' }}>/</li>
              <li style={{ color: '#64b4ff', fontSize: '12px', fontWeight: 600 }}>Scooters</li>
            </ol>
          </nav>

          <p style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#64b4ff', marginBottom: '16px' }}>
            Catégorie
          </p>
          <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
            Scooters<br />
            <em style={{ fontStyle: 'italic', color: '#64b4ff' }}>Électriques</em>
          </h1>
          <p style={{ color: '#888', fontSize: '16px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '40px' }}>
            Des scooters électriques intelligents et connectés, taillés pour la ville. 
            Batteries amovibles, application mobile intégrée, zéro entretien moteur. Découvrez nos <strong style={{ color: '#ccc' }}>{scooters.length} modèles</strong> disponibles, accessibles dès le BSR.
          </p>

          {/* Marques links */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {scooterBrands.map(b => (
              <Link key={b.slug} to={`/marques/${b.slug}`} className="btn-base btn-primary btn-sm">
                Voir toutes les {b.name} →
              </Link>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 48px', padding: '0 24px' }}>
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(100,180,255,0.2), transparent)' }} />
        </div>

        {/* Grille produits */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {scooters.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Maillage interne bas de page */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#555', fontSize: '13px', marginTop: '40px', marginBottom: '16px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Explorer aussi
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/catalogue/motos" style={{ color: '#c5a059', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Motos Électriques</Link>
            <Link to="/catalogue" style={{ color: '#888', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>→ Tout le catalogue</Link>
          </div>
        </section>

        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

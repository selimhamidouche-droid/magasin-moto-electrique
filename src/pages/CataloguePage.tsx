import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { frenchConfig, staticProducts, brandsConfig } from '../config.ts';
import type { ProductConfig, VehicleType } from '../config.ts';
import { supabase } from '../lib/supabase';

type FilterType = 'all' | VehicleType;

export default function CataloguePage() {
  useLenis();

  const [products, setProducts] = useState<ProductConfig[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<FilterType>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');

  useEffect(() => {
    async function fetchMotos() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('motos')
          .select('*')
          .order('prix', { ascending: true });

        if (error) {
          console.warn('Supabase indispo, affichage des données statiques:', error.message);
        } else if (data && data.length > 0) {
          setProducts(data as ProductConfig[]);
        }
      } catch {
        console.warn('Impossible de contacter Supabase, données statiques utilisées.');
      } finally {
        setLoading(false);
      }
    }
    fetchMotos();
  }, []);

  usePageSEO({
    title: `Catalogue Motos & Scooters Électriques — MotoVite`,
    description: `Découvrez notre catalogue complet de motos et scooters électriques : Surron, Niu et plus. Livraison sous 72h, garantie certifiée.`,
    lang: 'fr',
    canonicalUrl: 'https://www.motovite.com/catalogue',
  });

  const filtered = products.filter(p => {
    const typeOk = activeType === 'all' || p.type_vehicule === activeType;
    const brandOk = activeBrand === 'all' || p.marque === activeBrand;
    return typeOk && brandOk;
  });

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: '"Montserrat", system-ui, sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '10px 20px',
    borderRadius: '30px',
    border: active ? '1px solid #c5a059' : '1px solid rgba(255,255,255,0.12)',
    background: active ? 'rgba(197,160,89,0.15)' : 'transparent',
    color: active ? '#c5a059' : '#888',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  });

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', paddingTop: '110px' }}>

        {/* Hero Header */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 48px' }}>
          <p style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c5a059', marginBottom: '16px' }}>
            Notre Catalogue
          </p>
          <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
            Motos & Scooters<br />
            <em style={{ fontStyle: 'italic', color: '#c5a059' }}>Électriques</em>
          </h1>
          <p style={{ color: '#888', fontSize: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
            {filtered.length} véhicule{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}. Livraison sous 72h, garantie certifiée.
          </p>
        </section>

        {/* Filtres */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Type filters */}
            <button id="filter-all" style={filterBtnStyle(activeType === 'all')} onClick={() => setActiveType('all')}>Tous</button>
            <button id="filter-motos" style={filterBtnStyle(activeType === 'moto')} onClick={() => setActiveType('moto')}>Motos</button>
            <button id="filter-scooters" style={filterBtnStyle(activeType === 'scooter')} onClick={() => setActiveType('scooter')}>Scooters</button>

            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px', margin: '0 4px' }}>|</span>

            {/* Brand filters */}
            <button id="filter-brand-all" style={filterBtnStyle(activeBrand === 'all')} onClick={() => setActiveBrand('all')}>Toutes marques</button>
            {brandsConfig.map(b => (
              <button
                key={b.slug}
                id={`filter-brand-${b.slug}`}
                style={filterBtnStyle(activeBrand === b.slug)}
                onClick={() => setActiveBrand(b.slug)}
              >
                {b.name}
              </button>
            ))}
          </div>
        </section>

        {/* Hubs de catégorie (maillage interne) */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/catalogue/motos" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', fontWeight: 600, color: '#c5a059', textDecoration: 'none',
              padding: '10px 20px', borderRadius: '12px',
              background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.2)',
              transition: 'background 0.2s',
            }}>
              🏍 Hub Motos Électriques →
            </Link>
            <Link to="/catalogue/scooters" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', fontWeight: 600, color: '#64b4ff', textDecoration: 'none',
              padding: '10px 20px', borderRadius: '12px',
              background: 'rgba(100,180,255,0.08)', border: '1px solid rgba(100,180,255,0.2)',
              transition: 'background 0.2s',
            }}>
              🛵 Hub Scooters Électriques →
            </Link>
            {brandsConfig.map(b => (
              <Link key={b.slug} to={`/marques/${b.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', fontWeight: 600, color: '#fff', textDecoration: 'none',
                padding: '10px 20px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                {b.name} →
              </Link>
            ))}
          </div>
        </section>

        {/* Grille produits */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#888', padding: '80px 0', fontSize: '16px' }}>
              Chargement du catalogue…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', padding: '80px 0', fontSize: '16px' }}>
              Aucun véhicule pour ce filtre.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>

        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

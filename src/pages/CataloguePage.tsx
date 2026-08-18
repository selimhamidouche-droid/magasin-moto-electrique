import { useState, useEffect } from 'react';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { frenchConfig, staticProducts } from '../config.ts';
import type { ProductConfig, VehicleType } from '../config.ts';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

type FilterType = 'all' | VehicleType;

export default function CataloguePage() {
  useLenis();

  const [products, setProducts] = useState<ProductConfig[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<FilterType>('all');
  const [activeBrand] = useState<string>('all');

  useEffect(() => {
    async function fetchMotos() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('motos')
          .select('slug, prix, en_stock');

        if (error) {
          console.warn('Supabase indispo, affichage des données statiques:', error.message);
        } else if (data && data.length > 0) {
          // Utiliser staticProducts comme base pour garantir les images et types corrects,
          // et on applique juste les prix/stocks de Supabase.
          const mergedData = staticProducts.map(staticItem => {
            const dbItem = data.find(db => db.slug === staticItem.slug);
            if (dbItem) {
              return { ...staticItem, prix: dbItem.prix, en_stock: dbItem.en_stock };
            }
            return staticItem;
          });
          setProducts(mergedData);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Erreur Supabase:', e);
      }
      setProducts(staticProducts);
      setLoading(false);
    }
    fetchMotos();
  }, []);

  usePageSEO({
    title: `Catalogue Motos & Scooters Électriques — SurVolté`,
    description: `Découvrez notre catalogue complet de motos et scooters électriques : Surron, Niu et plus. Livraison sous 72h, garantie certifiée.`,
    lang: 'fr',
    canonicalUrl: 'https://www.survolte.com/catalogue',
  });

  const filtered = products.filter(p => {
    const typeOk = activeType === 'all' || p.type_vehicule === activeType;
    const brandOk = activeBrand === 'all' || p.marque === activeBrand;
    return typeOk && brandOk;
  });



  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', paddingTop: '110px' }}>

        {/* Hero Header */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
          </motion.div>
        </section>

        {/* Filtres */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Type filters */}
            <button id="filter-all" className={`btn-base btn-primary btn-sm filter-btn ${activeType === 'all' ? 'active' : ''}`} onClick={() => setActiveType('all')}>Tous</button>
            <button id="filter-motos" className={`btn-base btn-primary btn-sm filter-btn ${activeType === 'moto' ? 'active' : ''}`} onClick={() => setActiveType('moto')}>Motos</button>
            <button id="filter-scooters" className={`btn-base btn-primary btn-sm filter-btn ${activeType === 'scooter' ? 'active' : ''}`} onClick={() => setActiveType('scooter')}>Scooters</button>


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
              {filtered.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

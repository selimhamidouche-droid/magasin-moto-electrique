import { useState, useEffect } from 'react';
import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig } from '../config.ts';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Moto {
  id: string;
  nom: string;
  categorie: string;
  prix: number;
  vitesse_max: number;
  autonomie: number;
  puissance_kw: number;
  permis_requis: string;
  image_url: string | null;
  description: string;
  en_stock: boolean;
}

export default function CataloguePage() {
  useLenis();
  
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMotos() {
      try {
        const { data, error } = await supabase
          .from('motos')
          .select('*')
          .order('prix', { ascending: true });
          
        if (error) {
          console.error("Erreur lors de la récupération des motos:", error);
        } else if (data) {
          setMotos(data);
        }
      } catch (err) {
        console.error("Erreur inattendue:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMotos();
  }, []);

  usePageSEO({
    title: `Nos Motos — ${frenchConfig.siteConfig.siteTitle}`,
    description: `Découvrez notre gamme complète de motos électriques. Commandez en ligne, livraison en 72h.`,
    lang: 'fr',
    canonicalUrl: 'https://www.motovite.com/catalogue',
  });

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" style={{ backgroundColor: '#141414', minHeight: '100vh', paddingTop: '120px' }}>
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
              Notre Catalogue
            </h1>
            <p style={{ color: '#a0a0a0', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              Explorez nos modèles électriques conçus pour la performance. En direct de notre base de données.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', color: '#fff', padding: '100px 0' }}>
              Chargement des motos...
            </div>
          ) : motos.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#fff', padding: '100px 0' }}>
              Aucune moto disponible pour le moment.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {motos.map((moto) => (
                <motion.div 
                  key={moto.id}
                  whileHover={{ y: -5 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#222', borderRadius: '8px', marginBottom: '24px', overflow: 'hidden' }}>
                    {moto.image_url ? (
                      <img src={moto.image_url} alt={moto.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                        Image indisponible
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '24px', fontWeight: 700, color: '#fff' }}>
                      {moto.nom}
                    </h3>
                    <span style={{ color: 'var(--mv-gold, #c5a059)', fontWeight: 600, fontSize: '18px' }}>
                      {moto.prix} €
                    </span>
                  </div>
                  
                  <p style={{ color: '#a0a0a0', marginBottom: '16px', flexGrow: 1, fontSize: '14px' }}>
                    {moto.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#ccc' }}>Vmax: {moto.vitesse_max} km/h</span>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#ccc' }}>Auto: {moto.autonomie} km</span>
                  </div>

                  <Link 
                    to={`/motos/${moto.id}`}
                    style={{ 
                      display: 'block', 
                      textAlign: 'center', 
                      backgroundColor: 'var(--mv-gold, #c5a059)', 
                      color: '#000', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      fontWeight: 600, 
                      textDecoration: 'none' 
                    }}
                  >
                    Configurer
                  </Link>
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

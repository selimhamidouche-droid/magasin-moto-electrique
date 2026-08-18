import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { useCart } from '../context/CartContext';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig, staticProducts, brandsConfig } from '../config.ts';
import { motion } from 'framer-motion';

export default function ModelDetail() {
  useLenis();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = staticProducts.find(p => p.slug === id || p.id === id);
  const brand = product ? brandsConfig.find(b => b.slug === product.marque) : null;

  const [activeImage, setActiveImage] = useState<string>(product?.image_url || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name || '');

  // Reset active image if product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image_url);
      setSelectedColor(product.colors?.[0]?.name || '');
    }
  }, [product?.id]);

  usePageSEO({
    title: product
      ? `${product.nom} — ${product.prix.toLocaleString('fr-FR')} € | SurVolté`
      : 'Modèle non trouvé | SurVolté',
    description: product?.description || frenchConfig.siteConfig.siteDescription,
    lang: 'fr',
    canonicalUrl: `https://www.survolte.com/motos/${id}`,
  });

  if (!product) return <Navigate to="/catalogue" replace />;

  const accentColor = product.type_vehicule === 'scooter' ? '#64b4ff' : '#c5a059';
  const hubPath = product.type_vehicule === 'moto' ? '/catalogue/motos' : '/catalogue/scooters';
  const hubLabel = product.type_vehicule === 'moto' ? 'Motos Électriques' : 'Scooters Électriques';

  // Autres produits de la même marque
  const related = staticProducts.filter(p => p.marque === product.marque && p.id !== product.id).slice(0, 3);

  const galleryImages = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image_url];

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} dark />
      <main id="main-content" className="bg-[#0f0f0f] min-h-screen pt-24 md:pt-28">
        {/* Hero Fiche */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
            <ol className="flex flex-wrap items-center gap-2 m-0 p-0 list-none text-[10px] md:text-xs">
              <li><Link to="/" className="text-neutral-500 no-underline hover:text-white transition-colors">Accueil</Link></li>
              <li className="text-neutral-700">/</li>
              <li><Link to="/catalogue" className="text-neutral-500 no-underline hover:text-white transition-colors">Catalogue</Link></li>
              <li className="text-neutral-700">/</li>
              <li><Link to={hubPath} className="text-neutral-500 no-underline hover:text-white transition-colors">{hubLabel}</Link></li>
              {brand && (
                <>
                  <li className="text-neutral-700">/</li>
                  <li><Link to={`/marques/${brand.slug}`} className="text-neutral-500 no-underline hover:text-white transition-colors">{brand.name}</Link></li>
                </>
              )}
              <li className="text-neutral-700">/</li>
              <li className="font-semibold" style={{ color: accentColor }}>{product.nom}</li>
            </ol>
          </nav>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left — Image & Interactive Gallery */}
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div 
                className="rounded-3xl overflow-hidden relative aspect-square md:aspect-4/3 border border-white/10 flex items-center justify-center transition-all duration-300"
                style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}
              >
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={`${product.nom} ${selectedColor}`}
                  className="w-full h-full object-contain p-4 md:p-10 box-border transition-all duration-500 transform hover:scale-105"
                />
                {/* Stock badge */}
                <div 
                  className="absolute top-4 left-4 text-[10px] md:text-xs font-bold tracking-wider uppercase px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white shadow-lg"
                  style={{ background: product.en_stock ? 'rgba(80,200,120,0.9)' : 'rgba(255,80,80,0.85)' }}
                >
                  {product.en_stock ? '✓ En stock — Prêt à livrer' : 'Sur commande'}
                </div>

                {/* Badge 100% Electrique */}
                <div className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-white/90 backdrop-blur-md">
                  ⚡ 100% Électrique
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {galleryImages.map((img, idx) => {
                    const isSelected = activeImage === img;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative rounded-xl overflow-hidden w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border transition-all duration-200 cursor-pointer p-1.5 ${
                          isSelected 
                            ? 'border-[#c5a059] ring-2 ring-[#c5a059]/40 bg-white/10 scale-105' 
                            : 'border-white/10 hover:border-white/30 bg-white/5 opacity-70 hover:opacity-100'
                        }`}
                        title={`Vue ${idx + 1}`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.nom} thumbnail ${idx + 1}`} 
                          className="w-full h-full object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Right — Infos & Customization */}
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accentColor }}>
                {product.marque.toUpperCase()} — {product.categorie}
              </p>
              <h1 className="font-extrabold text-white leading-tight mb-4 text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: '"Montserrat", system-ui, sans-serif' }}>
                {product.nom}
              </h1>

              {/* Prix */}
              <div className="mb-6 flex items-baseline flex-wrap gap-x-4 gap-y-2">
                <span className="font-extrabold text-3xl md:text-4xl" style={{ color: accentColor, fontFamily: '"Montserrat", system-ui, sans-serif' }}>
                  {product.prix.toLocaleString('fr-FR')} €
                </span>
                <span className="text-xs md:text-sm text-neutral-400">Bonus écologique & immatriculation offerts</span>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Coloris disponibles :
                    </span>
                    <span className="text-xs font-extrabold text-white">
                      {selectedColor || product.colors[0].name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {product.colors.map((c) => {
                      const isColorActive = (selectedColor === c.name) || (!selectedColor && activeImage === c.image);
                      return (
                        <button
                          key={c.name}
                          onClick={() => {
                            setSelectedColor(c.name);
                            setActiveImage(c.image);
                          }}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                            isColorActive
                              ? 'border-[#c5a059] bg-[#c5a059]/10 text-white ring-1 ring-[#c5a059]'
                              : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-white/30 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
                {[
                  { label: 'Puissance', value: `${product.puissance_kw} kW` },
                  { label: 'Autonomie', value: `${product.autonomie} km` },
                  { label: 'Vitesse max', value: `${product.vitesse_max} km/h` },
                  { label: 'Permis requis', value: product.permis_requis },
                  ...(product.specs ? Object.entries(product.specs).map(([label, value]) => ({ label, value })) : []),
                ].map(({ label, value }) => (
                  <div key={label} className="p-3.5 md:p-4 rounded-xl border border-white/5 flex flex-col justify-center bg-white/[0.03]">
                    <p className="text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-neutral-500 mb-1 md:mb-1.5">{label}</p>
                    <p className="text-sm md:text-base font-bold text-white leading-tight">{value}</p>
                  </div>
                ))}
              </div>

              {/* Inclus avec votre commande (Service Badges) */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-8 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex flex-col items-center text-center p-2">
                  <img src="/images/Carte-grise-slide-1-300x300.png" alt="Carte Grise" className="w-10 h-10 object-contain mb-1.5" />
                  <span className="text-[10px] font-bold text-white">Carte Grise</span>
                  <span className="text-[9px] text-neutral-400">Démarche offerte</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 border-x border-white/5">
                  <img src="/images/plaqueimmat-300x300.png" alt="Plaque Immatriculation" className="w-10 h-10 object-contain mb-1.5" />
                  <span className="text-[10px] font-bold text-white">Plaque Posée</span>
                  <span className="text-[9px] text-neutral-400">Homologuée plexi</span>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <img src="/images/atelier-300x300.png" alt="Contrôle Atelier" className="w-10 h-10 object-contain mb-1.5" />
                  <span className="text-[10px] font-bold text-white">Atelier 100 Pts</span>
                  <span className="text-[9px] text-neutral-400">Montée & testée</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  id="btn-commander"
                  className="btn-base btn-primary w-full sm:flex-1 justify-center py-4 text-sm font-bold tracking-wider uppercase"
                  onClick={() => {
                    addToCart(product);
                    navigate('/panier');
                  }}
                >
                  Commander Maintenant
                </button>
                <button
                  id="btn-essai"
                  className="btn-base w-full sm:flex-1 justify-center py-4 text-sm font-bold tracking-wider uppercase"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
                  onClick={() => alert(`Demande d'essai pour ${product.nom} enregistrée ! Un conseiller va vous recontacter.`)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                >
                  Demander un essai
                </button>
              </div>

              {/* Livraison mention */}
              <p className="text-neutral-400 text-[11px] md:text-xs mt-6 flex items-center gap-2">
                🚚 Livraison à domicile sous 72h prête à rouler — Garantie constructeur 2 ans
              </p>
            </motion.div>
          </div>
        </section>

        {/* Séparateur */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 my-4 md:my-8">
          <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
        </div>

        {/* Produits similaires */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-6 md:mb-10" style={{ fontFamily: '"Montserrat", system-ui, sans-serif' }}>
              Autres modèles {brand?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/motos/${p.slug}`} className="no-underline block group">
                  <div className="rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="aspect-video md:aspect-4/3 overflow-hidden flex items-center justify-center p-4">
                      <img src={p.image_url} alt={p.nom} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-5 md:p-6 bg-black/20">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1 md:mb-2" style={{ color: accentColor }}>{p.categorie}</p>
                      <p className="text-base md:text-lg font-extrabold text-white mb-2 leading-tight">{p.nom}</p>
                      <p className="text-lg md:text-xl font-extrabold" style={{ color: accentColor }}>{p.prix.toLocaleString('fr-FR')} €</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Maillage interne bas */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16 border-t border-white/5 pt-8 md:pt-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap">
            <Link to={hubPath} className="text-sm font-semibold hover:underline" style={{ color: accentColor }}>→ Tous les {hubLabel}</Link>
            {brand && <Link to={`/marques/${brand.slug}`} className="text-neutral-400 text-sm font-semibold hover:text-white transition-colors">→ Tous les {brand.name}</Link>}
            <Link to="/catalogue" className="text-neutral-500 text-sm font-semibold hover:text-white transition-colors">→ Catalogue complet</Link>
          </div>
        </section>

        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

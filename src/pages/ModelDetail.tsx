import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { useCart } from '../context/CartContext';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig, staticProducts, brandsConfig } from '../config.ts';

export default function ModelDetail() {
  useLenis();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
            {/* Left — Image */}
            <div className="rounded-3xl overflow-hidden relative aspect-square md:aspect-4/3 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <img
                src={product.image_url}
                alt={product.nom}
                className="w-full h-full object-contain p-6 md:p-12 box-border"
              />
              {/* Stock badge */}
              <div 
                className="absolute top-4 left-4 text-[10px] md:text-xs font-bold tracking-wider uppercase px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white shadow-lg"
                style={{ background: product.en_stock ? 'rgba(80,200,120,0.9)' : 'rgba(255,80,80,0.85)' }}
              >
                {product.en_stock ? '✓ En stock' : 'Sur commande'}
              </div>
            </div>

            {/* Right — Infos */}
            <div className="flex flex-col">
              <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accentColor }}>
                {product.marque.toUpperCase()} — {product.categorie}
              </p>
              <h1 className="font-extrabold text-white leading-tight mb-4 text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: '"Montserrat", system-ui, sans-serif' }}>
                {product.nom}
              </h1>

              {/* Prix */}
              <div className="mb-6 md:mb-8 flex items-baseline flex-wrap gap-x-4 gap-y-2">
                <span className="font-extrabold text-3xl md:text-4xl" style={{ color: accentColor, fontFamily: '"Montserrat", system-ui, sans-serif' }}>
                  {product.prix.toLocaleString('fr-FR')} €
                </span>
                <span className="text-xs md:text-sm text-neutral-500">ou financement disponible</span>
              </div>

              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
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
                  <div key={label} className="p-3 md:p-4 rounded-xl border border-white/5 flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <p className="text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-neutral-500 mb-1 md:mb-2">{label}</p>
                    <p className="text-sm md:text-base font-bold text-white leading-tight">{value}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  id="btn-commander"
                  className="btn-base btn-primary w-full sm:flex-1 justify-center"
                  onClick={() => {
                    addToCart(product);
                    navigate('/panier');
                  }}
                >
                  Commander
                </button>
                <button
                  id="btn-essai"
                  className="btn-base w-full sm:flex-1 justify-center"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                  onClick={() => alert(`Demande d'essai pour ${product.nom} enregistrée ! Un conseiller va vous recontacter.`)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                >
                  Demander un essai
                </button>
              </div>

              {/* Livraison mention */}
              <p className="text-neutral-500 text-[11px] md:text-xs mt-6 flex items-center gap-2">
                🚚 Livraison à domicile sous 72h — Retour satisfait ou remboursé 14 jours
              </p>
            </div>
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

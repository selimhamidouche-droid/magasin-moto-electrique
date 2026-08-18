import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig } from '../config.ts';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function CartPage() {
  const { user } = useAuth();
  const { items, totalItems, totalPrice, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  usePageSEO({
    title: 'Mon Panier — SurVolté',
    description: 'Votre panier SurVolté. Vérifiez vos sélections et finalisez votre commande.',
    lang: 'fr',
    canonicalUrl: 'https://www.survolte.com/panier',
  });

  const handleOrder = async () => {
    if (!user) { navigate('/login'); return; }
    setCheckoutLoading(true);
    setCheckoutError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          items,
          successUrl: `${window.location.origin}/commande-confirmee`,
          cancelUrl: `${window.location.origin}/panier`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Erreur de création de session de paiement.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err.message || 'Une erreur est survenue lors de la redirection vers le paiement.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} />
      <main id="main-content" style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c5a059', marginBottom: '12px' }}>
              Récapitulatif
            </p>
            <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff' }}>
              Mon Panier
              {totalItems > 0 && (
                <span style={{ fontSize: '16px', fontWeight: 500, color: '#888', marginLeft: '16px' }}>
                  ({totalItems} article{totalItems > 1 ? 's' : ''})
                </span>
              )}
            </h1>
          </div>

          {items.length === 0 ? (
            <div className="liquid-glass border border-white/10" style={{ borderRadius: '24px', padding: '80px 40px', textAlign: 'center' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</p>
              <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                Votre panier est vide
              </h2>
              <p style={{ color: '#888', fontSize: '15px', marginBottom: '32px' }}>
                Parcourez notre catalogue et ajoutez vos motos préférées.
              </p>
              <Link to="/catalogue" className="btn-base btn-primary">
                Voir le catalogue →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {/* Items */}
              <motion.div 
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="liquid-glass border border-white/10"
                    style={{ borderRadius: '20px', padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    {/* Image */}
                    <div style={{ width: '100px', height: '70px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#1a1a1a' }}>
                      {product.image_url && (
                        <img src={product.image_url} alt={product.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <p style={{ fontSize: '11px', color: '#c5a059', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        {product.marque}
                      </p>
                      <p style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                        {product.nom}
                      </p>
                      <p style={{ fontSize: '13px', color: '#888' }}>{product.categorie}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >−</button>
                      <span style={{ color: '#fff', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >+</button>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <p style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '18px', fontWeight: 800, color: '#c5a059' }}>
                        {(product.prix * quantity).toLocaleString('fr-FR')} €
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        style={{ fontSize: '12px', color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px' }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                className="lg:col-span-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="liquid-glass border border-white/10" style={{ borderRadius: '20px', padding: '32px' }}>
                  <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
                    Résumé
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#888', fontSize: '14px' }}>Sous-total</span>
                      <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{totalPrice.toLocaleString('fr-FR')} €</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#888', fontSize: '14px' }}>Livraison</span>
                      <span style={{ color: '#6bffb8', fontSize: '14px', fontWeight: 600 }}>Gratuite</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>Total</span>
                      <span style={{ color: '#c5a059', fontSize: '20px', fontWeight: 800 }}>{totalPrice.toLocaleString('fr-FR')} €</span>
                    </div>
                  </div>

                  {!user && (
                    <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', textAlign: 'center' }}>
                      Vous devez être{' '}
                      <Link to="/login" style={{ color: '#c5a059', fontWeight: 700 }}>connecté</Link>
                      {' '}pour commander.
                    </p>
                  )}

                  {checkoutError && (
                    <p style={{ color: '#ff6b6b', fontSize: '13px', background: 'rgba(255,100,100,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '12px', textAlign: 'center' }}>
                      {checkoutError}
                    </p>
                  )}

                  <button
                    onClick={handleOrder}
                    disabled={checkoutLoading}
                    className="btn-base btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', opacity: checkoutLoading ? 0.6 : 1 }}
                  >
                    {checkoutLoading ? 'Redirection...' : user ? 'Commander →' : 'Se connecter pour commander'}
                  </button>
                  <button
                    onClick={clearCart}
                    style={{ width: '100%', padding: '10px', background: 'transparent', border: 'none', color: '#555', fontSize: '12px', cursor: 'pointer', fontFamily: '"Montserrat", system-ui, sans-serif' }}
                  >
                    Vider le panier
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer config={frenchConfig.footerConfig} dark />
    </>
  );
}

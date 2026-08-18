import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig } from '../config.ts';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function OrderConfirmationPage() {
  const { clearCart } = useCart();

  usePageSEO({
    title: 'Commande confirmée — SurVolté',
    description: 'Votre commande a bien été reçue. Merci pour votre achat chez SurVolté.',
    lang: 'fr',
    canonicalUrl: 'https://www.survolte.com/commande-confirmee',
  });

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} />
      <main id="main-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
        <div
          className="liquid-glass border border-white/10"
          style={{ maxWidth: '560px', width: '100%', padding: '60px 48px', borderRadius: '24px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c5a059', marginBottom: '16px' }}>
            Paiement accepté
          </p>
          <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Commande confirmée !
          </h1>
          <p style={{ color: '#888', fontSize: '15px', lineHeight: 1.7, marginBottom: '40px' }}>
            Merci pour votre achat. Vous allez recevoir un email de confirmation. Votre moto sera livrée sous <strong style={{ color: '#fff' }}>72h</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <Link to="/compte" className="btn-base btn-primary">
              Mon espace client →
            </Link>
            <Link to="/catalogue" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>
              Continuer mes achats
            </Link>
          </div>
        </div>
      </main>
      <Footer config={frenchConfig.footerConfig} dark />
    </>
  );
}

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Footer from '../sections/Footer.tsx';
import { frenchConfig } from '../config.ts';

export default function ComptePage() {
  const { user, signOut, loading } = useAuth();
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  usePageSEO({
    title: 'Mon Compte — MotoVite',
    description: 'Gérez votre compte MotoVite : informations personnelles et panier.',
    lang: 'fr',
  });

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} />
      <main id="main-content" style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c5a059', marginBottom: '12px' }}>
              Mon Espace
            </p>
            <h1 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Bonjour 👋
            </h1>
            <p style={{ color: '#888', fontSize: '14px' }}>{user.email}</p>
          </div>

          {/* Info card */}
          <div className="liquid-glass border border-white/10" style={{ borderRadius: '20px', padding: '32px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Informations du compte
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#888', fontSize: '13px' }}>Email</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{user.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#888', fontSize: '13px' }}>Membre depuis</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>
                  {new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: '#888', fontSize: '13px' }}>Statut</span>
                <span style={{ color: '#6bffb8', fontSize: '13px', fontWeight: 700 }}>✓ Vérifié</span>
              </div>
            </div>
          </div>

          {/* Panier résumé */}
          <div className="liquid-glass border border-white/10" style={{ borderRadius: '20px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Mon Panier
              </h2>
              <Link to="/panier" className="btn-base btn-primary btn-sm">Voir →</Link>
            </div>
            {items.length === 0 ? (
              <p style={{ color: '#555', fontSize: '14px' }}>Votre panier est vide.</p>
            ) : (
              <div>
                <p style={{ color: '#888', fontSize: '14px', marginBottom: '12px' }}>{items.length} article{items.length > 1 ? 's' : ''} dans le panier</p>
                <p style={{ color: '#c5a059', fontSize: '20px', fontWeight: 800 }}>
                  {totalPrice.toLocaleString('fr-FR')} €
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/catalogue" className="btn-base btn-primary">
              Parcourir le catalogue
            </Link>
            <button
              onClick={handleSignOut}
              style={{
                padding: '12px 28px', borderRadius: '12px',
                border: '1px solid rgba(255,100,100,0.3)',
                background: 'rgba(255,100,100,0.08)',
                color: '#ff6b6b', fontSize: '13px', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: '"Montserrat", system-ui, sans-serif',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,100,100,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,100,100,0.08)')}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </main>
      <Footer config={frenchConfig.footerConfig} dark />
    </>
  );
}

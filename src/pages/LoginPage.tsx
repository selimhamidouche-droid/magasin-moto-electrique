import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import { frenchConfig } from '../config.ts';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  usePageSEO({
    title: 'Connexion — MotoVite',
    description: 'Connectez-vous à votre compte MotoVite pour gérer vos commandes.',
    lang: 'fr',
    canonicalUrl: 'https://www.motovite.com/login',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) { setError(error); setLoading(false); return; }
      navigate('/compte');
    } else {
      const { error } = await signUp(email, password);
      if (error) { setError(error); setLoading(false); return; }
      setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation config={frenchConfig.navigationConfig} />
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 60px',
          position: 'relative',
        }}
      >
        {/* BG decoration */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(197,160,89,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div
          className="liquid-glass border border-white/10"
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: '48px 40px',
            borderRadius: '24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: '20px', fontWeight: 500, letterSpacing: '2px',
              textTransform: 'uppercase', color: '#c5a059', marginBottom: '32px',
              textAlign: 'center',
            }}>
              MotoVite
            </p>
          </Link>

          {/* Toggle */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px', marginBottom: '32px' }}>
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setSuccess(null); }}
                style={{
                  flex: 1, padding: '10px', borderRadius: '9px', border: 'none',
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: mode === m ? 'rgba(197,160,89,0.9)' : 'transparent',
                  color: mode === m ? '#000' : '#888',
                }}
              >
                {m === 'login' ? 'Connexion' : 'Inscription'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.com"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff', fontSize: '14px',
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff', fontSize: '14px',
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <p style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center', background: 'rgba(255,100,100,0.1)', padding: '10px', borderRadius: '8px' }}>
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: '#6bffb8', fontSize: '13px', textAlign: 'center', background: 'rgba(100,255,184,0.1)', padding: '10px', borderRadius: '8px' }}>
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px', padding: '14px',
                background: loading ? 'rgba(197,160,89,0.4)' : 'rgba(197,160,89,0.9)',
                color: '#000', border: 'none', borderRadius: '12px',
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '13px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? '...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

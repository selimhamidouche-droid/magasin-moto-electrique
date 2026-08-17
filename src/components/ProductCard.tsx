import { Link } from 'react-router-dom';
import type { ProductConfig } from '../config';

interface ProductCardProps {
  product: ProductConfig;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/motos/${product.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      aria-label={`Voir ${product.nom}`}
    >
      <article
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,160,89,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.nom}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '13px' }}>
              Image indisponible
            </div>
          )}
          {/* Badges */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: '20px',
              background: product.type_vehicule === 'moto' ? 'rgba(197,160,89,0.9)' : 'rgba(100,180,255,0.9)',
              color: '#000',
            }}>
              {product.type_vehicule === 'moto' ? 'Moto' : 'Scooter'}
            </span>
            {!product.en_stock && (
              <span style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: '20px',
                background: 'rgba(255,80,80,0.85)', color: '#fff',
              }}>
                Sur commande
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#c5a059', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {product.marque.toUpperCase()} — {product.categorie}
            </span>
          </div>
          <h3 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            {product.nom}
          </h3>
          <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>

          {/* Specs pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', color: '#bbb' }}>
              ⚡ {product.puissance_kw} kW
            </span>
            <span style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', color: '#bbb' }}>
              🔋 {product.autonomie} km
            </span>
            <span style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', color: '#bbb' }}>
              🏎 {product.vitesse_max} km/h
            </span>
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '22px', fontWeight: 800, color: '#c5a059' }}>
              {product.prix.toLocaleString('fr-FR')} €
            </span>
            <span style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '8px 16px', borderRadius: '8px',
              border: '1px solid rgba(197,160,89,0.5)', color: '#c5a059',
              transition: 'background 0.3s ease',
            }}>
              Voir →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { ProductConfig } from '../config';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: ProductConfig;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { addToCart } = useCart();
  const [currentImg, setCurrentImg] = useState<string>(product.image_url);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: cardRef });

  return (
    <Link
      ref={cardRef}
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
        <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: 'transparent', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentImg ? (
            <img
              key={currentImg}
              src={currentImg}
              alt={product.nom}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.2)', transition: 'transform 0.5s ease', boxSizing: 'border-box' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)'; }}
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

          {/* Color preview dots */}
          {product.colors && product.colors.length > 1 && (
            <div 
              style={{ 
                position: 'absolute', 
                bottom: '8px', 
                right: '12px', 
                display: 'flex', 
                gap: '6px', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                background: 'rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(6px)' 
              }}
              onClick={e => e.preventDefault()}
            >
              {product.colors.map(c => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImg(c.image);
                  }}
                  onMouseEnter={() => setCurrentImg(c.image)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: currentImg === c.image ? '2px solid #c5a059' : '1px solid rgba(255,255,255,0.4)',
                    padding: 0,
                    cursor: 'pointer',
                    transform: currentImg === c.image ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#c5a059', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {product.nom}
            </span>
          </div>
          <h3 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px', textTransform: 'uppercase' }}>
            {product.categorie}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: '22px', fontWeight: 800, color: '#c5a059' }}>
              {product.prix.toLocaleString('fr-FR')} €
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                style={{
                  padding: '8px 12px', borderRadius: '10px',
                  border: '1px solid rgba(197,160,89,0.4)',
                  background: 'rgba(197,160,89,0.1)',
                  color: '#c5a059', fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: '"Montserrat", system-ui, sans-serif',
                  textTransform: 'uppercase', letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.1)'; }}
                title="Ajouter au panier"
              >
                🛒
              </button>
              <span className="btn-base btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Voir →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

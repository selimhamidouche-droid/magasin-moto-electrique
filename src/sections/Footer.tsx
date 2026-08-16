import { footerConfig as defaultFooterConfig } from '../config';
import type { FooterConfig } from '../config';

interface FooterProps {
  config?: FooterConfig;
  dark?: boolean;
}

export default function Footer({ config = defaultFooterConfig, dark = false }: FooterProps) {
  const footerConfig = config;
  const hasFooterContent =
    footerConfig.ageGateText ||
    footerConfig.brandName ||
    footerConfig.brandTaglineLines.length > 0 ||
    footerConfig.columns.length > 0 ||
    footerConfig.copyright;

  if (!hasFooterContent) {
    return null;
  }

  const bgColor = dark ? '#141414' : '#f0ecd7';
  const mainTextColor = dark ? '#ffffff' : '#0F0F0F';
  const subTextColor = dark ? '#a0a0a0' : '#696969';
  const hoverTextColor = dark ? '#ffffff' : '#0F0F0F';
  const borderColor = dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(24, 12, 4, 0.1)';
  const subBorderColor = dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 12, 4, 0.08)';

  return (
    <footer
      id="footer"
      role="contentinfo"
      style={{
        backgroundColor: bgColor,
        position: 'relative',
        zIndex: 2,
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      {/* Legal Disclaimer / Sales Terms */}
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px 60px',
        }}
      >
        {footerConfig.ageGateText && (
          <p
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: 'clamp(14px, 2.2vw, 26px)',
              fontWeight: 800,
              fontStyle: 'italic',
              color: mainTextColor,
              lineHeight: 1.3,
              maxWidth: '1200px',
              margin: '0 auto',
              whiteSpace: 'nowrap',
            }}
          >
            {footerConfig.ageGateText}
          </p>
        )}
      </div>

      {/* Footer Columns */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
        }}
      >
        {/* Brand Column */}
        <div>
          {footerConfig.brandName && (
            <p
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                color: mainTextColor,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              {footerConfig.brandName}
            </p>
          )}
          {footerConfig.brandTaglineLines.length > 0 && (
            <p
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 800,
                lineHeight: 1.6,
                color: subTextColor,
              }}
            >
              {footerConfig.brandTaglineLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < footerConfig.brandTaglineLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          )}
        </div>

        {footerConfig.columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h3
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4AF37',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              {column.heading}
            </h3>
            {column.links.map((item) => (
              <a
                key={`${column.heading}-${item.label}`}
                href={item.href}
                onClick={(e) => {
                  if (!item.href || item.href === '#') e.preventDefault();
                }}
                style={{
                  display: 'block',
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: subTextColor,
                  textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.4s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = hoverTextColor; }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = subTextColor; }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: `1px solid ${subBorderColor}`,
          padding: '24px',
          textAlign: 'center',
        }}
      >
        {footerConfig.copyright && (
          <p
            style={{
              fontFamily: '"Montserrat", system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 800,
              color: subTextColor,
              letterSpacing: '0.5px',
            }}
          >
            {footerConfig.copyright}
          </p>
        )}
      </div>
    </footer>
  );
}

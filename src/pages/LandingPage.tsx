import { useLenis } from '../hooks/useLenis';
import { usePageSEO } from '../hooks/usePageSEO';
import Navigation from '../sections/Navigation.tsx';
import Hero from '../sections/Hero.tsx';
import Manifesto from '../sections/Manifesto.tsx';
import Anatomy from '../sections/Anatomy.tsx';
import Tiers from '../sections/Tiers.tsx';
import Footer from '../sections/Footer.tsx';
import ParchmentUnroll from '../effects/ParchmentUnroll.tsx';
import { frenchConfig } from '../config.ts';

export default function LandingPage() {
  useLenis();

  usePageSEO({
    title: `Motos — ${frenchConfig.siteConfig.siteTitle}`,
    description: `Découvrez les différents modèles de motos chez MotoVite pour prendre la route.`,
    lang: 'fr',
    canonicalUrl: 'https://www.motovite.com/catalogue',
  });

  return (
    <>
      <Navigation
        config={{
          brandName: "MotoVite",
          links: [
            { label: "Accueil", target: "/" },
            { label: "Philosophie", target: "#manifesto" },
            { label: "Motos", target: "#tiers" },
          ],
        }}
        dark
      />
      <ParchmentUnroll />
      <main id="main-content">
        <Hero config={frenchConfig.heroConfig} />
        <Manifesto config={frenchConfig.manifestoConfig} />
        <Anatomy config={frenchConfig.anatomyConfig} />
        <Tiers config={frenchConfig.tiersConfig} />
        <Footer config={frenchConfig.footerConfig} dark />
      </main>
    </>
  );
}

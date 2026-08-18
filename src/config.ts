export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  target: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  videoPath: string
  videoPoster?: string
  eyebrow: string
  titleLine: string
  titleEmphasis: string
  subtitleLine1: string
  subtitleLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface ManifestoConfig {
  sectionLabel: string
  text: string
}

export interface AnatomyPillar {
  label: string
  title: string
  body: string
}

export interface AnatomyConfig {
  sectionLabel: string
  title: string
  pillars: AnatomyPillar[]
}

export interface TierConfig {
  name: string
  price: string
  frequency: string
  journeys: string
  image: string
  description: string
  amenities: string[]
  ctaText: string
  ctaHref: string
}

export interface TiersConfig {
  sectionLabel: string
  title: string
  tiers: TierConfig[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: FooterLink[]
}

export interface FooterConfig {
  ageGateText: string
  brandName: string
  brandTaglineLines: string[]
  columns: FooterColumn[]
  copyright: string
}

// ─── Cocon Sémantique — Marques & Catégories ───
export type VehicleType = 'moto' | 'scooter'

export interface BrandConfig {
  slug: string
  name: string
  tagline: string
  description: string
  logo?: string
  heroImage: string
  country: string
  founded: string
  vehicleTypes: VehicleType[]
}

export interface ProductConfig {
  id: string
  slug: string
  nom: string
  marque: string // slug de la marque
  type_vehicule: VehicleType
  categorie: string
  prix: number
  vitesse_max: number
  autonomie: number
  puissance_kw: number
  permis_requis: string
  image_url: string
  description: string
  en_stock: boolean
  specs?: Record<string, string>
}

// ─── Types pour la Nouvelle MainPage ───
export interface DestinationItem {
  id: string
  title: string
  route: string
  description: string
  image: string
  mapImage: string
  duration: string
  price: string
  video?: string
}

export interface CarriageItem {
  title: string
  description: string
  image: string
  feature: string
}

export interface MainPageConfig {
  heroTitle: string
  heroSubtitle: string
  bookingTitle: string
  bookingCta: string
  destinationsTitle: string
  destinationsSubtitle: string
  destinations: DestinationItem[]
  fleetTitle: string
  fleetSubtitle: string
  fleet: CarriageItem[]
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

// ─── French Config (MotoVite) ───
export const frenchConfig = {
  siteConfig: {
    language: "fr",
    siteTitle: "MotoVite — Achète ta moto en ligne",
    siteDescription:
      "Ton concessionnaire 100% en ligne. Achète ta moto neuve ou d'occasion avec une livraison à domicile en 72h. Qualité certifiée.",
  },
  navigationConfig: {
    brandName: "MotoVite",
    links: [
      { label: "Notre Approche", target: "/#destinations" },
      { label: "Comment ça marche", target: "/#fleet" },
      { label: "Motos", target: "/catalogue/motos" },
      { label: "Scooters", target: "/catalogue/scooters" },
      { label: "Catalogue", target: "/catalogue" },
    ],
  },
  heroConfig: {
    videoPath: "/videos/lightbee.mp4",
    videoPoster: "/images/lb-1-1024x683.jpeg",
    eyebrow: "Concessionnaire Moto 100% en Ligne",
    titleLine: "Ta Prochaine Moto",
    titleEmphasis: "Livrée en 72h",
    subtitleLine1:
      "Choisis, commande et roule. L'expérience d'achat la plus rapide.",
    subtitleLine2:
      "100% en ligne. Motos révisées et garanties. Livrées directement chez toi.",
    ctaText: "Voir le catalogue",
    ctaTargetId: "/catalogue",
  },
  manifestoConfig: {
    sectionLabel: "Notre Philosophie",
    text: "Nous croyons que l'achat d'une moto ne devrait pas rimer avec des vendeurs insistants et des frais cachés. Avec MotoVite, nous réinventons la concession. Un achat 100% en ligne, des prix transparents et une qualité certifiée. Nous ne vendons pas juste des deux-roues ; nous livrons la liberté et l'adrénaline directement dans ton garage.",
  },
  anatomyConfig: {
    sectionLabel: "Le Concept",
    title: "Trois étapes avant de rouler",
    pillars: [
      {
        label: "01 — Sélection",
        title: "Parcours le Catalogue",
        body: "Choisis parmi notre large sélection de sportives, roadsters et customs. Chaque moto est inspectée, photographiée sous tous les angles et détaillée en ligne.",
      },
      {
        label: "02 — Commande",
        title: "Achat 100% en Ligne",
        body: "Règle ta commande de façon sécurisée en ligne. Ajoute ton assurance ou tes accessoires directement dans ton panier. Zéro paperasse inutile.",
      },
      {
        label: "03 — Livraison",
        title: "Livraison sous 72h",
        body: "Nous transportons ta nouvelle moto directement chez toi en moins de 72 heures. Prête à rouler, avec les pleins faits.",
      },
    ],
  },
  tiersConfig: {
    sectionLabel: "Nos Motos",
    title: "Choisis ta monture",
    tiers: [
      {
        name: "Roadsters Urbains",
        price: "Dès 4 990 €",
        frequency: "ou 99 €/mois",
        journeys: "Agilité & polyvalence",
        image: "/images/surron-light-bee-noir.png",
        description:
          "Idéal pour la ville et les balades du week-end. Des motos légères, coupleuses et racées, parfaites pour tous les niveaux d'expérience.",
        amenities: [
          "Modèles compatibles permis A2",
          "ABS & Contrôle de traction",
          "Garantie jusqu'à 2 ans",
          "Inspection sur 100 points",
          "Livraison à domicile incluse",
          "Essai 14 jours satisfait ou remboursé",
        ],
        ctaText: "Voir les Roadsters",
        ctaHref: "#",
      },
      {
        name: "Sportives",
        price: "Dès 8 490 €",
        frequency: "ou 169 €/mois",
        journeys: "Circuit & performances",
        image: "/images/surron-ultra-bee.png",
        description:
          "Les machines ultimes pour la vitesse et la précision. Des moteurs rageurs et des carénages aérodynamiques pour les vrais passionnés.",
        amenities: [
          "Performances prêtes pour la piste",
          "Shifter & Auto-Blipper",
          "Suspensions réglables",
          "Inspection sur 100 points",
          "Livraison à domicile incluse",
          "Essai 14 jours satisfait ou remboursé",
        ],
        ctaText: "Voir les Sportives",
        ctaHref: "#",
      },
      {
        name: "Trails & Customs",
        price: "Dès 10 990 €",
        frequency: "ou 219 €/mois",
        journeys: "Longues distances & confort",
        image: "/images/surron-light-bee-vert.png",
        description:
          "Taillées pour la route. Que ce soit pour traverser le pays ou cruiser tranquillement, ces motos offrent un confort et une capacité de chargement inégalés.",
        amenities: [
          "Options bagagerie incluses",
          "Régulateur & poignées chauffantes",
          "Capacités tout-terrain (Trails)",
          "Inspection sur 100 points",
          "Livraison à domicile incluse",
          "Essai 14 jours satisfait ou remboursé",
        ],
        ctaText: "Voir les Customs",
        ctaHref: "#",
      },
    ],
  },
  footerConfig: {
    ageGateText: "Toutes nos ventes sont soumises à nos conditions générales de vente.",
    brandName: "MotoVite",
    brandTaglineLines: [
      "Concessionnaire moto & scooter électrique 100% en ligne.",
      "Qualité certifiée. Livraison sous 72h.",
    ],
    columns: [
      {
        heading: "Catégories",
        links: [
          { label: "Motos Électriques", href: "/catalogue/motos" },
          { label: "Scooters Électriques", href: "/catalogue/scooters" },
          { label: "Tout le Catalogue", href: "/catalogue" },
        ],
      },
      {
        heading: "Nos Marques",
        links: [
          { label: "Surron", href: "/marques/surron" },
          { label: "Niu", href: "/marques/niu" },
        ],
      },
      {
        heading: "Nos Services",
        links: [
          { label: "Solutions de Financement", href: "#" },
          { label: "Entretien & SAV", href: "#" },
          { label: "Comment ça marche", href: "#comment-ca-marche" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: "Réserver un Essai", href: "#" },
          { label: "Service Client", href: "#" },
          { label: "FAQ", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 MotoVite. Tous droits réservés.",
  },
}

// ─── Configuration spécifique à la MainPage en français ───
export const frenchMainPageConfig: MainPageConfig = {
  heroTitle: "MotoVite",
  heroSubtitle: "Ton concessionnaire 100% en ligne. Des motos révisées et garanties.",
  bookingTitle: "Trouver ta Moto",
  bookingCta: "Voir le Catalogue",
  destinationsTitle: "Nos Catégories Phares",
  destinationsSubtitle: "Des motos soigneusement sélectionnées, prêtes à prendre la route et adaptées à ton style de pilotage.",
  destinations: [
    {
      id: "roadsters",
      title: "Roadsters",
      route: "Urbains & Agressifs",
      description: "Le choix parfait pour la ville et les départementales. Un maximum de sensations avec un moteur à nu et une position de conduite droite et joueuse.",
      image: "/images/surron-light-bee-noir.png",
      mapImage: "/images/surron-light-bee-bleu.png",
      duration: "En stock",
      price: "Dès 4 990 €",
      video: "/videos/roadster.mp4"
    },
    {
      id: "sportives",
      title: "Sportives",
      route: "Circuit & Adrénaline",
      description: "Des carénages profilés et des moteurs surpuissants. Taillées pour le chronomètre et pour les motards exigeants à la recherche de performances pures.",
      image: "/images/surron-ultra-bee.png",
      mapImage: "/images/surron-ultra-bee.png",
      duration: "En stock",
      price: "Dès 8 490 €",
      video: "/videos/sportive.mp4"
    },
    {
      id: "customs-trails",
      title: "Trails & Customs",
      route: "Voyage & Évasion",
      description: "Conçues pour avaler les kilomètres dans un confort absolu. Une position de conduite relaxante et des capacités de chargement pour tes road trips.",
      image: "/images/surron-light-bee-vert.png",
      mapImage: "/images/surron-light-bee-violet.png",
      duration: "En stock",
      price: "Dès 10 990 €"
    }
  ],
  fleetTitle: "Notre Méthode",
  fleetSubtitle: "Une expérience d'achat modernisée, rapide et 100% transparente pour que tu puisses rouler l'esprit libre.",
  fleet: [
    {
      title: "Inspection Rigoureuse",
      description: "Chaque moto passe entre les mains de nos mécaniciens certifiés. Plus de 100 points de contrôle : freins, moteur, partie cycle et électronique.",
      image: "/images/surron-action-1.jpg",
      feature: "Zéro mauvaise surprise"
    },
    {
      title: "Paiement 100% Sécurisé",
      description: "Acheter une moto n'a jamais été aussi simple. Un paiement en ligne sécurisé, avec des options de financement adaptées à ton budget.",
      image: "/images/surron-action-2.jpg",
      feature: "Crédit rapide et simple"
    },
    {
      title: "Livraison à Domicile",
      description: "On s'occupe de tout. Ta moto est chargée avec soin et livrée directement devant chez toi sous 72h. Tu n'as plus qu'à tourner la clé.",
      image: "/images/surron-action-3.jpg",
      feature: "Prête à rouler à l'arrivée"
    }
  ],
  ctaTitle: "Prêt à prendre la route ?",
  ctaSubtitle: "Rejoins les milliers de motards qui ont déjà fait confiance à MotoVite pour l'achat de leur nouveau deux-roues.",
  ctaButton: "Parcourir les Motos"
}

export const siteConfig = frenchConfig.siteConfig;
export const navigationConfig = frenchConfig.navigationConfig;
export const heroConfig = frenchConfig.heroConfig;
export const manifestoConfig = frenchConfig.manifestoConfig;
export const anatomyConfig = frenchConfig.anatomyConfig;
export const tiersConfig = frenchConfig.tiersConfig;
export const footerConfig = frenchConfig.footerConfig;

// ─── Données Marques ───
export const brandsConfig: BrandConfig[] = [
  {
    slug: 'surron',
    name: 'Surron',
    tagline: 'La Référence du Trial Électrique',
    description: 'Fondée en 2014 en Chine, Surron est la marque leader mondial des motos électriques légères et du trial électrique. Leurs machines combinent légèreté extrême, performances pures et fiabilité pour une expérience hors du commun sur et hors des sentiers battus.',
    heroImage: '/images/light-bee-seven-img8-1920x1280-1-1024x683-1.jpg',
    country: 'Chine',
    founded: '2014',
    vehicleTypes: ['moto'],
  },
  {
    slug: 'niu',
    name: 'Niu',
    tagline: 'Le Scooter Urbain Réinventé',
    description: 'Niu Technologies (NYSE: NIU) est le leader mondial du scooter électrique connecté. Fondée à Pékin en 2014, la marque a révolutionné la mobilité urbaine avec des scooters intelligents, connectés via application mobile et dotés d\'une autonomie record.',
    heroImage: '/images/lb-6-1024x683.jpeg',
    country: 'Chine',
    founded: '2014',
    vehicleTypes: ['scooter'],
  },
];

// ─── Produits fictifs (remplacés par Supabase en production) ───
export const staticProducts: ProductConfig[] = [
  {
    id: 'surron-light-bee-x',
    slug: 'surron-light-bee-x',
    nom: 'Surron Light Bee X',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Trial & Enduro',
    prix: 3490,
    vitesse_max: 75,
    autonomie: 100,
    puissance_kw: 6,
    permis_requis: 'AM / A1',
    image_url: '/images/Sur-Ron-light-bee-L1E-vert-2025-All4RIDE-3.png',
    description: 'La Light Bee X est la référence absolue du trial électrique. Ultra-légère (47 kg), maniable et puissante, elle est homologuée route et taillée pour les single-tracks.',
    en_stock: true,
    specs: { Poids: '47 kg', Batterie: '3 024 Wh', Charge: '4h', Freins: 'Disques hydrauliques' },
  },
  {
    id: 'surron-light-bee-x-action',
    slug: 'surron-light-bee-x-action',
    nom: 'Surron Light Bee X — Edition Trail',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Trial & Enduro',
    prix: 3690,
    vitesse_max: 75,
    autonomie: 100,
    puissance_kw: 6,
    permis_requis: 'AM / A1',
    image_url: '/images/Sur-Ron-light-bee-L1E-vert-2025-All4RIDE-3.png',
    description: 'Version Trail de la Light Bee X avec équipements hors-piste. Légère, agile et homologuée route pour une polyvalence maximale sur et hors des sentiers.',
    en_stock: true,
    specs: { Poids: '47 kg', Batterie: '3 024 Wh', Charge: '4h', Freins: 'Disques hydrauliques' },
  },
  {
    id: 'surron-ultra-bee',
    slug: 'surron-ultra-bee',
    nom: 'Surron Ultra Bee',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Cross & Enduro',
    prix: 5990,
    vitesse_max: 100,
    autonomie: 130,
    puissance_kw: 12.5,
    permis_requis: 'A1 / A',
    image_url: '/images/Sur-Ron-Ultra-Bee-HP-9.png',
    description: 'L\'Ultra Bee pousse les limites du possible. Puissance moteur portée à 12.5 kW, cadre renforcé, fourche à grand débattement. La bête des hors-pistes électriques.',
    en_stock: true,
    specs: { Poids: '80 kg', Batterie: '4 680 Wh', Charge: '5h', Freins: 'Disques hydrauliques 4 pistons' },
  },
  {
    id: 'surron-storm-bee',
    slug: 'surron-storm-bee',
    nom: 'Surron Storm Bee',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Enduro Haute Performance',
    prix: 11990,
    vitesse_max: 130,
    autonomie: 150,
    puissance_kw: 22.5,
    permis_requis: 'A',
    image_url: '/images/sur-ron-hyper-bee-bleu-profil-gauche-un-quart.png',
    description: 'La Storm Bee est un monstre de puissance. 22.5 kW, 0 à 100 km/h en moins de 4 secondes. Pour les riders les plus exigeants qui veulent dominer n\'importe quel terrain.',
    en_stock: false,
    specs: { Poids: '118 kg', Batterie: '6 480 Wh', Charge: '6h', Freins: 'Brembo hydrauliques' },
  },
  {
    id: 'niu-nqi-gt-pro',
    slug: 'niu-nqi-gt-pro',
    nom: 'Niu NQi GT Pro',
    marque: 'niu',
    type_vehicule: 'scooter',
    categorie: 'Scooter Urbain Premium',
    prix: 2990,
    vitesse_max: 70,
    autonomie: 120,
    puissance_kw: 3,
    permis_requis: 'AM / A1',
    image_url: '/images/lb-2-1024x683.jpeg',
    description: 'Le NQi GT Pro est le scooter connecté par excellence. Application mobile intégrée, géolocalisation GPS, double batterie amovible et design haut de gamme pour la ville.',
    en_stock: true,
    specs: { Poids: '98 kg', Batterie: '2× 35 Ah', Charge: '6h', Connectivité: 'Bluetooth & 4G' },
  },
  {
    id: 'niu-uqi-gt-pro',
    slug: 'niu-uqi-gt-pro',
    nom: 'Niu UQi GT Pro',
    marque: 'niu',
    type_vehicule: 'scooter',
    categorie: 'Scooter Urbain Compact',
    prix: 1990,
    vitesse_max: 45,
    autonomie: 80,
    puissance_kw: 1.5,
    permis_requis: 'AM (BSR)',
    image_url: '/images/lb-4-1024x683.jpeg',
    description: 'Léger, compact et connecté. L\'UQi GT Pro est le compagnon idéal des city-riders. Accessible dès le BSR, batterie amovible et design moderne.',
    en_stock: true,
    specs: { Poids: '68 kg', Batterie: '1× 35 Ah amovible', Charge: '4h', Connectivité: 'Bluetooth' },
  },
];

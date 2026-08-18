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

export interface ProductColor {
  name: string
  hex: string
  image: string
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
  colors?: ProductColor[]
  gallery?: string[]
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

// ─── French Config (SurVolté) ───
export const frenchConfig = {
  siteConfig: {
    language: "fr",
    siteTitle: "SurVolté — Achète ta moto en ligne",
    siteDescription:
      "Ton concessionnaire 100% en ligne. Achète ta moto neuve ou d'occasion avec une livraison à domicile en 72h. Qualité certifiée.",
  },
  navigationConfig: {
    brandName: "SurVolté",
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
    text: "Nous croyons que l'achat d'une moto ne devrait pas rimer avec des vendeurs insistants et des frais cachés. Avec SurVolté, nous réinventons la concession. Un achat 100% en ligne, des prix transparents et une qualité certifiée. Nous ne vendons pas juste des deux-roues ; nous livrons la liberté et l'adrénaline directement dans ton garage.",
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
    brandName: "SurVolté",
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
    copyright: "© 2026 SurVolté. Tous droits réservés.",
  },
}

// ─── Configuration spécifique à la MainPage en français ───
export const frenchMainPageConfig: MainPageConfig = {
  heroTitle: "SurVolté",
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
  ctaSubtitle: "Rejoins les milliers de motards qui ont déjà fait confiance à SurVolté pour l'achat de leur nouveau deux-roues.",
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

// ─── Produits du catalogue SurVolté (Sur-Ron & Niu) ───
export const staticProducts: ProductConfig[] = [
  {
    id: 'surron-light-bee-x',
    slug: 'surron-light-bee-x',
    nom: 'Surron Light Bee X (Homologuée L1e)',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Trial & Enduro Homologué',
    prix: 4690,
    vitesse_max: 75,
    autonomie: 100,
    puissance_kw: 6,
    permis_requis: 'AM / BSR dès 14 ans ou Permis B',
    image_url: '/images/sur-ron-light-bee-x-noir-l1e-profil-gauche-un-quart.png',
    description: 'La Light Bee X L1e est la référence absolue du trial électrique homologué route. Légère (47 kg), nerveuse et ultra maniable, elle permet de rouler au quotidien en ville comme sur les sentiers techniques.',
    en_stock: true,
    colors: [
      { name: 'Noir Carbone', hex: '#181818', image: '/images/sur-ron-light-bee-x-noir-l1e-profil-gauche-un-quart.png' },
      { name: 'Bleu Électrique', hex: '#1b4d89', image: '/images/sur-ron-light-bee-bleu-l1e-profil-gauche-un-quart.png' },
      { name: 'Vert Acid 2025', hex: '#38b000', image: '/images/Sur-Ron-light-bee-L1E-vert-2025-All4RIDE-3.png' },
      { name: 'Violet Midnight 2025', hex: '#5e2a84', image: '/images/Sur-Ron-light-bee-L1E-violet-2025-All4RIDE-6-1.png' },
      { name: 'Édition Studio Fluo', hex: '#7928ca', image: '/images/DSC08008copy2-1024x1024.png' },
    ],
    gallery: [
      '/images/sur-ron-light-bee-x-noir-l1e-profil-gauche-un-quart.png',
      '/images/Sur-Ron-light-bee-L1E-vert-2025-All4RIDE-3.png',
      '/images/Sur-Ron-light-bee-L1E-violet-2025-All4RIDE-6-1.png',
      '/images/sur-ron-light-bee-bleu-l1e-profil-gauche-un-quart.png',
      '/images/DSC08008copy2-1024x1024.png',
      '/images/SUR-RON_Light_Bee_L1e_black_2024-1024x1024.png',
      '/images/photo_5778539808988184662_y.jpg',
      '/images/lb-1-1024x683.jpeg',
      '/images/lb-2-1024x683.jpeg',
      '/images/lb-4-1024x683.jpeg',
    ],
    specs: {
      Poids: '47 kg (batterie incluse)',
      Batterie: '60V 38.5Ah (2 310 Wh) amovible',
      Charge: '3h30 à 4h (prise standard 220V)',
      Freins: 'Disques hydrauliques 4 pistons 203 mm',
      Homologation: 'L1e (équivalent 50cc, bonus éco)',
    },
  },
  {
    id: 'surron-light-bee-x-offroad',
    slug: 'surron-light-bee-x-offroad',
    nom: 'Surron Light Bee X — Off-Road',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Cross & Trial Pur',
    prix: 4390,
    vitesse_max: 80,
    autonomie: 100,
    puissance_kw: 6,
    permis_requis: 'Sans permis (Terrain privé / Circuit)',
    image_url: '/images/sur-ron-light-bee-x-noir-offroad-profil-gauche-un-quart.png',
    description: 'Version Off-Road allégée dédiée exclusivement à la compétition, au franchissement et aux single-tracks. Sans plaque ni rétroviseur pour un pilotage 100% instinctif.',
    en_stock: true,
    colors: [
      { name: 'Noir Offroad', hex: '#181818', image: '/images/sur-ron-light-bee-x-noir-offroad-profil-gauche-un-quart.png' },
      { name: 'Bleu Offroad', hex: '#1b4d89', image: '/images/sur-ron-light-bee-x-bleu-offroad-profil-gauche-un-quart.png' },
      { name: 'Vert Offroad', hex: '#38b000', image: '/images/sur-ron-light-bee-x-vert-offroad-profil-gauche-un-quart.png' },
      { name: 'Violet Offroad', hex: '#5e2a84', image: '/images/sur-ron-light-bee-x-violet-offroad-profil-gauche-un-quart.png' },
      { name: 'Custom Camo Rose', hex: '#d11568', image: '/images/photo_5789412411323827370_x.jpg' },
    ],
    gallery: [
      '/images/sur-ron-light-bee-x-noir-offroad-profil-gauche-un-quart.png',
      '/images/sur-ron-light-bee-x-bleu-offroad-profil-gauche-un-quart.png',
      '/images/sur-ron-light-bee-x-vert-offroad-profil-gauche-un-quart.png',
      '/images/sur-ron-light-bee-x-violet-offroad-profil-gauche-un-quart.png',
      '/images/photo_5789412411323827370_x.jpg',
      '/images/lb-3-1024x683.jpeg',
      '/images/lb-5-1024x683.jpeg',
      '/images/lb-6-1024x683.jpeg',
      '/images/light-bee-seven-img11-1920x1280-1-1024x683-1.jpg',
      '/images/light-bee-seven-img8-1920x1280-1-1024x683-1.jpg',
    ],
    specs: {
      Poids: '45 kg',
      Batterie: '60V 38.5Ah amovible',
      Charge: '3h30',
      Suspensions: 'Fourche inversée réglable KKE / FastAce',
      Transmission: 'Courroie primaire + Chaîne renforcée',
    },
  },
  {
    id: 'surron-ultra-bee',
    slug: 'surron-ultra-bee',
    nom: 'Surron Ultra Bee T (Homologuée L3e)',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Enduro & Cross 125cc',
    prix: 7490,
    vitesse_max: 95,
    autonomie: 140,
    puissance_kw: 12.5,
    permis_requis: 'Permis A1 ou Permis B + Formation 7h',
    image_url: '/images/Ultra-Bee-T-HP-Carbon-Black-road-legal-1-1-1024x1024.png',
    description: 'L\'Ultra Bee redéfinit l\'enduro électrique. Cadre en aluminium forgé, puissance de 12.5 kW, 440 Nm de couple instantané et homologation L3e 2 places pour la route.',
    en_stock: true,
    colors: [
      { name: 'Carbon Black (Homologuée)', hex: '#181818', image: '/images/Ultra-Bee-T-HP-Carbon-Black-road-legal-1-1-1024x1024.png' },
      { name: 'Bronze & Or HP Edition', hex: '#9c7c38', image: '/images/Sur-Ron-Ultra-Bee-HP-9.png' },
    ],
    gallery: [
      '/images/Ultra-Bee-T-HP-Carbon-Black-road-legal-1-1-1024x1024.png',
      '/images/Sur-Ron-Ultra-Bee-HP-9.png',
      '/images/21263-Carbon-Black-300x300.jpg',
      '/images/light-bee-six-img3-1920x1280-1-1024x683-1.jpg',
    ],
    specs: {
      Poids: '85 kg',
      Batterie: '74V 55Ah (4 070 Wh)',
      Charge: '4h (chargeur embarqué)',
      Couple: '440 Nm à la roue',
      Modes: 'Eco, Daily, Sport, Marche Arrière, Traction Control (TC)',
    },
  },
  {
    id: 'surron-storm-bee',
    slug: 'surron-storm-bee',
    nom: 'Surron Storm Bee (Enduro & Cross)',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Enduro Haute Performance',
    prix: 12990,
    vitesse_max: 110,
    autonomie: 120,
    puissance_kw: 22.5,
    permis_requis: 'Permis A2 / A',
    image_url: '/images/sur-ron-storm-bee-front_ed9eb2bd-4934-4cc1-b910-6e988b7ab856.png',
    description: 'La Storm Bee est un monstre de puissance pure. Moteur 22.5 kW refroidi par liquide, 0 à 50 km/h en 1.8s, suspensions professionnelles et cadre renforcé taillé pour la compétition.',
    en_stock: true,
    colors: [
      { name: 'Jaune & Blanc Racing', hex: '#eab308', image: '/images/sur-ron-storm-bee-front_ed9eb2bd-4934-4cc1-b910-6e988b7ab856.png' },
    ],
    gallery: [
      '/images/sur-ron-storm-bee-front_ed9eb2bd-4934-4cc1-b910-6e988b7ab856.png',
      '/images/sur-ron-storm-bee-front_ed9eb2bd-4934-4cc1-b910-6e988b7ab856-1024x1024.png',
    ],
    specs: {
      Poids: '127 kg',
      Batterie: '104V 55Ah (5 720 Wh)',
      Charge: '4h (chargeur rapide 10A)',
      Couple: '520 Nm à la roue',
      Accélération: '0-50 km/h en 1.8s',
    },
  },
  {
    id: 'surron-hyper-bee',
    slug: 'surron-hyper-bee',
    nom: 'Surron Hyper Bee (Mini Cross 2025)',
    marque: 'surron',
    type_vehicule: 'moto',
    categorie: 'Mini Cross Enfant & Débutant',
    prix: 2490,
    vitesse_max: 50,
    autonomie: 60,
    puissance_kw: 3,
    permis_requis: 'Sans permis (Terrain privé / Circuit fermé)',
    image_url: '/images/sur-ron-hyper-bee-bleu-profil-gauche-un-quart.png',
    description: 'La toute nouvelle Hyper Bee est la mini moto cross électrique conçue pour les jeunes pilotes et débutants. Ultra légère (32 kg), sécurisante et explosive.',
    en_stock: true,
    colors: [
      { name: 'Cyan & Rose Fluo', hex: '#06b6d4', image: '/images/sur-ron-hyper-bee-bleu-profil-gauche-un-quart.png' },
    ],
    gallery: [
      '/images/sur-ron-hyper-bee-bleu-profil-gauche-un-quart.png',
      '/images/sur-ron-hyper-bee-bleu-profil-gauche-un-quart-300x300.png',
    ],
    specs: {
      Poids: '32 kg',
      Batterie: '48V amovible sécurisée',
      Charge: '2h30',
      Sécurité: 'Coupe-circuit de sécurité et limiteur de vitesse parental',
    },
  },
  {
    id: 'niu-nqi-gt-pro',
    slug: 'niu-nqi-gt-pro',
    nom: 'Niu NQi GT Pro',
    marque: 'niu',
    type_vehicule: 'scooter',
    categorie: 'Scooter Urbain Connecté 125cc',
    prix: 3990,
    vitesse_max: 70,
    autonomie: 120,
    puissance_kw: 3,
    permis_requis: 'AM / A1 ou Permis B + 7h',
    image_url: '/images/lb-2-1024x683.jpeg',
    description: 'Le NQi GT Pro est le scooter connecté par excellence. Double batterie amovible, application mobile 4G/GPS intégrée et autonomie record pour les déplacements urbains.',
    en_stock: true,
    gallery: [
      '/images/lb-2-1024x683.jpeg',
      '/images/lb-6-1024x683.jpeg',
    ],
    specs: {
      Poids: '98 kg',
      Batterie: '2× 35 Ah amovibles',
      Charge: '6h',
      Connectivité: 'App mobile, GPS & Alarme 4G',
    },
  },
  {
    id: 'niu-uqi-gt-pro',
    slug: 'niu-uqi-gt-pro',
    nom: 'Niu UQi GT Pro',
    marque: 'niu',
    type_vehicule: 'scooter',
    categorie: 'Scooter Urbain Compact 50cc',
    prix: 2290,
    vitesse_max: 45,
    autonomie: 80,
    puissance_kw: 1.5,
    permis_requis: 'AM (BSR) dès 14 ans',
    image_url: '/images/lb-4-1024x683.jpeg',
    description: 'Léger, compact et agile. L\'UQi GT Pro est le compagnon idéal pour se faufiler en ville. Accessible dès 14 ans avec le BSR.',
    en_stock: true,
    gallery: [
      '/images/lb-4-1024x683.jpeg',
      '/images/lb-1-1024x683.jpeg',
    ],
    specs: {
      Poids: '68 kg',
      Batterie: '1× 31 Ah amovible',
      Charge: '4h',
      Connectivité: 'Démarrage sans clé & Bluetooth',
    },
  },
];

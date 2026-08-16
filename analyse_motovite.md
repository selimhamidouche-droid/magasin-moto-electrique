# Analyse de la page d'accueil MOTOVITE

## Couleurs
- **Fond principal (Hero, Catégories, CTA)** : Noir / Gris très foncé (ex: `#0F0F0F`)
- **Fond secondaire (Méthode, Footer)** : Beige / Crème clair (ex: `#FDFBF7`)
- **Texte sur fond sombre** : Blanc (`#FFFFFF`) et Gris clair (`#A0A0A0` pour les descriptions)
- **Texte sur fond clair** : Noir / Gris très foncé (`#111111`)
- **Couleur d'accentuation** : Doré / Jaune (ex: `#D4AF37`) utilisé pour les petits surtitres et icônes.

## Typographie
- **Titres principaux (Hero, Catégories)** : `Montserrat`. Taille estimée : 48px - 64px.
- **Titres secondaires (Méthode, Footer)** : `Playfair Display`. Taille estimée : 32px - 40px.
- **Texte de corps** : `Montserrat`. Taille estimée : 14px - 16px.

## Éléments UI (Composants)

### Boutons
1. **Bouton Primaire (ex: "CONFIGURER MA MOTO")**
   - Fond : Blanc
   - Texte : Noir (Sans-serif, Bold, majuscules)
   - Rayon de bordure (Border-radius) : Léger (~4px)
   - Padding généreux
2. **Bouton Secondaire (ex: "VOIR TOUS")**
   - Fond : Transparent
   - Bordure : 1px solide (Blanc ou Gris)
   - Texte : Blanc (Sans-serif, majuscules)

### Cartes (Cards)
1. **Cartes Statistiques (Hero)**
   - Effet "Glassmorphism" : Fond sombre semi-transparent (ex: `rgba(255,255,255,0.05)`), bordure fine et translucide, flou (backdrop-filter).
   - Grand pourcentage en gras, libellé en dessous.
2. **Cartes Produits (Catégories)**
   - Image de moto détourée.
   - Surtitre doré, Titre principal blanc, description grise, prix.
   - Bouton secondaire en bas de carte.

### Structure (Layout)
- **Hero Section** : Fond image pleine largeur assombrie, contenu aligné à gauche.
- **Grille de produits** : Layout en 3 colonnes pour les catégories.
- **Blocs Méthode** : Disposition alternée en Z (Image à gauche / Texte à droite, puis l'inverse) sur fond clair.
- **Footer** : Grande phrase centrale en police Serif italique, suivie de colonnes de liens discrètes en bas.

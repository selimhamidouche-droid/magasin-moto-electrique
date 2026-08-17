# Règles de Design MotoVite

## Le Système de Bouton Unique (Off-White)

1. **Bouton Unique (Primary) :**
   - **Usage :** TOUS les boutons du site (Call-to-action, liens vers les hubs, filtres, etc.).
   - **Style :** Fond plein clair (blanc/off-white), texte sombre (noir), sans bordure.
   - **Classe CSS :** `.btn-primary` (ou `bg-white text-black hover:bg-white/90`).
   - **Interdiction Formelle :** Ne **JAMAIS** utiliser d'autres styles de boutons (pas de boutons dorés, pas de boutons transparents avec bordures, pas de boutons gris, etc.). Tous les clics (hors liens texte simples) doivent être standardisés sur le style Off-White.

## Cartes Spéciales (Liquid Glass)

1. **Cartes Spéciales (Liquid Glass) :**
   - **Usage :** Uniquement pour la mise en évidence de statistiques, d'indicateurs de confiance (ex: "98% Clients satisfaits"), de barres de navigation, ou de cartes interactives très premium. NE PAS utiliser pour de simples boutons ou filtres.
   - **Style :** Effet "Liquid Glass" (glassmorphism profond avec flou, gradient radial et reflet de lumière supérieur sur les bordures).
   - **Classe CSS :** `.liquid-glass`.
   - **Règle :** Ne jamais recréer cet effet en ligne (inline styles). Toujours utiliser la classe CSS `.liquid-glass` définie dans `index.css` (et ses pseudo-éléments `::before` et `::after`).

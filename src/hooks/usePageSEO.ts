import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  lang: string;
  canonicalUrl: string;
}

export function usePageSEO({ title, description, lang, canonicalUrl }: SEOProps) {
  useEffect(() => {
    // Language
    document.documentElement.lang = lang;

    // Title
    document.title = title;

    // Meta description
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Canonical Link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Open Graph Title
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;

    // Open Graph Description
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    // Open Graph URL
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonicalUrl;

    // Open Graph Locale
    const ogLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale"]');
    if (ogLocale) ogLocale.content = lang === 'fr' ? 'fr_FR' : 'en_GB';

  }, [title, description, lang, canonicalUrl]);
}

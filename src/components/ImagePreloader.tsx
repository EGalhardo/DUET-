import React, { useEffect } from 'react';
import { MATCH_DATA, CATEGORIES, CATEGORY_DATA, COMPETITION_LOGOS, GIRABOLA_CLUBS, BUNDESLIGA_CLUBS, LALIGA_CLUBS, LIGUE1_CLUBS, EREDIVISIE_CLUBS, PREMIERLEAGUE_CLUBS, SERIEA_CLUBS, LIGANOS_CLUBS, NBA_CLUBS } from '../constants';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const urls = new Set<string>();

    // Collect all URLs from constants
    MATCH_DATA.forEach(m => {
      if (m.teamA.logo) urls.add(m.teamA.logo);
      if (m.teamB.logo) urls.add(m.teamB.logo);
    });

    CATEGORIES.forEach(c => {
      if (c.image) urls.add(c.image);
    });

    Object.values(CATEGORY_DATA).forEach(cat => {
      if (cat.image) urls.add(cat.image);
      Object.values(cat.cards).forEach(cards => {
        cards.forEach(card => {
          if (card.image) urls.add(card.image);
          if (card.driver1) urls.add(card.driver1);
          if (card.driver2) urls.add(card.driver2);
        });
      });
    });

    Object.values(COMPETITION_LOGOS).forEach(url => urls.add(url));
    GIRABOLA_CLUBS.forEach(c => urls.add(c.logo));
    BUNDESLIGA_CLUBS.forEach(c => urls.add(c.logo));
    LALIGA_CLUBS.forEach(c => urls.add(c.logo));
    LIGUE1_CLUBS.forEach(c => urls.add(c.logo));
    EREDIVISIE_CLUBS.forEach(c => urls.add(c.logo));
    PREMIERLEAGUE_CLUBS.forEach(c => urls.add(c.logo));
    SERIEA_CLUBS.forEach(c => urls.add(c.logo));
    LIGANOS_CLUBS.forEach(c => urls.add(c.logo));
    NBA_CLUBS.forEach(c => urls.add(c.logo));

    // Preload each image and trigger PWA caching
    urls.forEach(url => {
      if (url && url.startsWith('http')) {
        // We use fetch to ensure the PWA runtimeCaching intercepts it
        fetch(url, { mode: 'no-cors' }).catch(() => {
          // If fetch fails, fallback to simple Image preloading
          const img = new Image();
          img.src = url;
        });
      }
    });

    console.log(`[Preloader] ${urls.size} images scheduled for preloading.`);
  }, []);

  return null; // This component doesn't render anything
};

export default ImagePreloader;

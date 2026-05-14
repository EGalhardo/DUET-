import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, CircleDot as Football, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

import { CATEGORY_DATA } from '../constants';
import { LeagueOption } from '../types';
import { storageService } from '../services/storageService';

const LeagueCard = React.memo(({ card, category, fallbackImage }: { card: LeagueOption, category: string, fallbackImage: string }) => (
  <Link 
    id={`league-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
    to={`/aposta/${category}?topic=${card.title}`}
    className="group block transition-transform active:scale-95"
  >
    <div className={cn(
      "aspect-[1.6/1] rounded-3xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center p-4 group-hover:border-[#FFB10A] transition-all shadow-sm",
      category === 'f1' && "aspect-video"
    )}>
      <img 
        src={card.image || fallbackImage} 
        alt={card.title}
        loading="lazy"
        className={cn(
          "object-contain group-hover:scale-105 transition-transform",
          category === 'f1' ? "w-32 h-32 md:w-56 md:h-56" : "w-20 h-20 md:w-32 md:h-32"
        )}
      />
    </div>
    <p className="mt-3 text-center text-[11px] md:text-sm font-black text-[#091747] uppercase tracking-widest group-hover:text-[#FFB10A] transition-colors line-clamp-1 px-2 italic">
      {card.title}
    </p>
  </Link>
));

LeagueCard.displayName = 'LeagueCard';

export default function Liga() {
  const { category = 'futebol' } = useParams();
  const [activeTab, setActiveTab] = useState<'practice' | 'private' | 'community'>('practice');
  const [isFavorited, setIsFavorited] = useState(false);
  const cardsRef = React.useRef<HTMLHeadingElement>(null);

  const currentCategory = CATEGORY_DATA[category] || CATEGORY_DATA.futebol;
  const favoriteId = `liga-${category}`;

  const scrollToCards = () => {
    setTimeout(() => {
      if (cardsRef.current) {
        const yOffset = -80;
        const element = cardsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  useEffect(() => {
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some(f => f.id === favoriteId));
    };
    updateFavStatus();
    
    // Ensure activeTab is valid for the category
    if (!currentCategory.labels[activeTab]) {
      setActiveTab('practice');
    }

    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, [category, favoriteId, currentCategory, activeTab]);

  const toggleFavorite = () => {
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      storageService.saveFavorite({
        id: favoriteId,
        title: currentCategory.title,
        sub: 'Abrir liga',
        type: 'league',
        path: `/liga/${category}`
      });
      setIsFavorited(true);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] lg:h-[52px] bg-white border-b border-[#9CA3AF] px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center truncate px-4">
            {currentCategory.title}
          </h2>
          <button 
            onClick={toggleFavorite}
            className={cn("transition-colors duration-300", isFavorited ? "text-[#FFB10A]" : "text-black hover:text-[#FFB10A]")}
          >
            <Heart className={cn("w-5 h-5 lg:w-6 lg:h-6", isFavorited && "fill-current")} />
          </button>
        </div>
      </div>

      {/* TABBAR */}
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-4">
        <div className={cn(
          "flex items-center border-b border-gray-100",
          Object.keys(currentCategory.labels).length < 3 ? "justify-center gap-8 md:gap-16" : "justify-between"
        )}>
          {(['practice', 'private', 'community'] as const).map((tab) => (
            currentCategory.labels[tab] && (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  scrollToCards();
                }}
                className={cn(
                  "py-3 text-center text-lg md:text-xl lg:text-2xl font-dancing font-bold transition-all border-b-2 px-6",
                  Object.keys(currentCategory.labels).length >= 3 && "flex-1",
                  activeTab === tab 
                    ? "text-[#FFB10A] border-[#FFB10A]" 
                    : "text-[#364153] border-transparent hover:text-[#FFB10A]"
                )}
              >
                {currentCategory.labels[tab]}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Hero Logo */}
      <div className="pt-6 pb-8 lg:pt-8 lg:pb-10 px-4">
        <motion.div 
          key={category}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "relative aspect-square mx-auto overflow-hidden rounded-xl bg-white",
            category === 'basket' || category === 'f1'
                ? "max-w-[320px] md:max-w-[400px] lg:max-w-[480px]"
                : "max-w-[280px] md:max-w-[340px] lg:max-w-[400px]"
          )}
        >
          <img 
            src={currentCategory.image} 
            alt={currentCategory.title}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* SECTION TITLE */}
      <h1 ref={cardsRef} className="font-dancing text-2xl md:text-3xl lg:text-3xl font-bold text-[#FFB10A] text-center border-t border-gray-100 py-8 lg:py-10">
        {currentCategory.labels[activeTab]}
      </h1>

      {/* GRID OF CARDS */}
      <div className="px-4 md:px-8 pb-10 lg:pb-14 w-full">
        <div className={cn(
          "grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 mx-auto",
          category === 'f1' ? "max-w-7xl" : "max-w-5xl"
        )}>
          {currentCategory.cards[activeTab]?.map((card, idx) => (
            <LeagueCard 
              key={idx} 
              card={card} 
              category={category} 
              fallbackImage={currentCategory.image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

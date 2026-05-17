import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LeagueOption } from '../../types';

interface LeagueCardProps {
  card: LeagueOption;
  category: string;
  fallbackImage: string;
  sessionType?: string;
}

const LeagueCard: React.FC<LeagueCardProps> = React.memo(({ card, category, fallbackImage, sessionType }) => (
  <Link 
    id={`league-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
    to={`/aposta/${category}?topic=${card.title}${sessionType ? `&session=${sessionType}` : ''}`}
    className="group block transition-transform active:scale-95"
  >
    <div className={cn(
      "aspect-[1.6/1] rounded-xl md:rounded-3xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center p-4 group-hover:border-[#FFB10A] transition-all shadow-sm",
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

export default LeagueCard;

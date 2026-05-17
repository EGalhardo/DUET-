import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LeagueOption } from '../../types';

interface F1TeamCardProps {
  card: LeagueOption;
  sessionType?: string;
}

const F1TeamCard: React.FC<F1TeamCardProps> = React.memo(({ card, sessionType }) => (
  <Link 
    id={`f1-team-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
    to={`/aposta/f1?topic=${card.title}${sessionType ? `&session=${sessionType}` : ''}`}
    className="group block relative transition-all active:scale-95 text-decoration-none"
  >
    <div className="aspect-video rounded-xl md:rounded-3xl border border-gray-200 bg-white overflow-hidden relative group-hover:border-[#FFB10A] transition-all">
      {/* Drivers Container Background */}
      <div className="absolute inset-0 flex items-end justify-between px-1 sm:px-4">
        {/* Driver 1 - Left */}
        {card.driver1 && (
          <div className="w-[45%] h-[80%] flex items-end">
            <motion.img 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              src={card.driver1} 
              alt="Driver 1" 
              className="w-full h-full object-contain object-bottom transition-transform group-hover:scale-105 group-hover:translate-x-1 origin-bottom" 
            />
          </div>
        )}
        {/* Driver 2 - Right */}
        {card.driver2 && (
          <div className="w-[45%] h-[80%] flex items-end">
            <motion.img 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              src={card.driver2} 
              alt="Driver 2" 
              className="w-full h-full object-contain object-bottom transition-transform group-hover:scale-105 group-hover:-translate-x-1 origin-bottom" 
            />
          </div>
        )}
      </div>

      {/* Center Logo - Floats above drivers */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-14 h-14 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 transition-transform">
        <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
      </div>
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <p className="mt-3 text-center text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest group-hover:text-[#FFB10A] transition-colors italic">
      {card.title}
    </p>
  </Link>
));

F1TeamCard.displayName = 'F1TeamCard';

export default F1TeamCard;

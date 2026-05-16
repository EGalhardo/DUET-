import React from 'react';
import { motion } from 'framer-motion';
import { CircleDot as Football, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Match } from '../../types';

interface MatchCardProps {
  match: Match;
  onClick: (m: Match) => void;
  category?: string;
}

const MatchCard: React.FC<MatchCardProps> = React.memo(({ match, onClick, category }) => {
  const isBasketball = category === 'basket' || match.league === 'NBA' || match.league === 'Unitel Basket' || match.league === 'Liga ACB' || match.league === 'VTB United League' || match.league === 'Basket League' || match.league === 'Serie A Basket' || match.league === 'Jeep Elite' || match.league === 'BBL Alemanha';

  if (isBasketball) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onClick(match)}
        className="bg-white rounded-lg border-2 border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
      >
        {/* TOP: LEAGUE, DATE AND TIME */}
        <div className="flex flex-col items-center gap-1 mb-6">
          <div className="px-3 py-1 bg-[#091747]/5 border border-[#091747]/10 rounded-full">
            <span className="text-[10px] font-black text-[#091747] uppercase tracking-widest italic">
              {match.league}
            </span>
          </div>
          <div className="text-gray-900 font-black text-sm md:text-base italic uppercase tracking-tighter text-center mt-1">
            {(() => {
              const [day, month, year] = match.date.split('/').map(Number);
              const dateObj = new Date(year, month - 1, day);
              const weekday = dateObj.toLocaleDateString('pt-PT', { weekday: 'short' }).replace('.', '');
              const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
              const hour = match.time.split(':')[0];
              return `${capitalizedWeekday}. ${match.date}, ${hour}h`;
            })()}
          </div>
        </div>

        {/* CENTER: TEAMS SECTION */}
        <div className="flex items-start justify-center relative min-h-[120px]">
          {/* Vertical Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2" />

          {/* Left Team (Home) */}
          <div className="flex-1 flex flex-col items-center pr-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={match.teamA.logo} alt={match.teamA.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              {match.teamA.record && (
                <span className="text-gray-700 text-[11px] md:text-xs font-black italic uppercase tracking-widest">
                  {match.teamA.record}
                </span>
              )}
            </div>
            <span className="font-black text-[#091747] text-center text-xs md:text-sm leading-tight uppercase italic whitespace-nowrap truncate w-full">
              {match.teamA.name}
            </span>
          </div>

          {/* Right Team (Away) */}
          <div className="flex-1 flex flex-col items-center pl-4">
            <div className="flex items-center gap-3 mb-4">
              {match.teamB.record && (
                <span className="text-gray-700 text-[11px] md:text-xs font-black italic uppercase tracking-widest">
                  {match.teamB.record}
                </span>
              )}
              <img src={match.teamB.logo} alt={match.teamB.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
            <span className="font-black text-[#091747] text-center text-xs md:text-sm leading-tight uppercase italic whitespace-nowrap truncate w-full">
              {match.teamB.name}
            </span>
          </div>
        </div>

        {/* FOOTER: ENTRAR BUTTON */}
        <div className="mt-6 -mx-[19px] px-[5px]">
          <button 
            id={`match-entrar-${match.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onClick(match);
            }}
            className="w-full py-3 bg-[#FFB10A] text-white rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#e69f09] transition-colors shadow-lg shadow-orange-200"
          >
            Entrar
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => onClick(match)}
      className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 cursor-pointer hover:border-[#FFB10A] transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#364153]">
          <Football className="w-4 h-4 text-[#FFB10A]" />
          <span>{match.league}</span>
        </div>
        {match.status === 'ao_vivo' && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            AO VIVO
          </span>
        )}
        {match.status === 'terminou' && (
          <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            TERMINOU
          </span>
        )}
        {match.status === 'breve' && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            BREVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-col items-center flex-1 overflow-hidden">
          <img src={match.teamA.logo} alt={match.teamA.name} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2" />
          <span className="font-bold text-gray-800 text-center text-xs md:text-sm whitespace-nowrap truncate w-full">{match.teamA.name}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mt-2 text-[10px] md:text-xs text-center text-[#364153] font-bold bg-white border border-gray-200 px-2 py-1 rounded whitespace-nowrap">
            <Calendar className="w-3 h-3 inline mr-1 text-[#FFB10A]" />
            {match.date} • {match.time}
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 overflow-hidden">
          <img src={match.teamB.logo} alt={match.teamB.name} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2" />
          <span className="font-bold text-gray-800 text-center text-xs md:text-sm whitespace-nowrap truncate w-full">{match.teamB.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {[
          { label: match.scoreA !== undefined ? match.scoreA.toString() : '', odd: match.odds.winA },
          { label: '-', odd: match.odds.draw },
          { label: match.scoreB !== undefined ? match.scoreB.toString() : '', odd: match.odds.winB }
        ].map((option, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl border border-gray-200 bg-white min-h-[4.5rem]">
            <span className={cn(
              "text-center line-clamp-1 h-full flex items-center justify-center",
              option.label !== '' ? "text-2xl font-black text-[#091747]" : "text-[10px] font-bold text-[#364153]"
            )}>
              {option.label}
            </span>
            {option.label !== ':' && <span className="font-bold text-gray-800"></span>}
          </div>
        ))}
      </div>

      <button 
        id={`match-entrar-${match.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick(match);
        }}
        className="w-full bg-[#FFB10A] hover:bg-[#FFC000] text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
      >
        Entrar
      </button>
    </motion.div>
  );
});

MatchCard.displayName = 'MatchCard';

export default MatchCard;

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface RankingPlayer {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

interface PodiumPositionProps {
  position: number;
  player: RankingPlayer;
}

const PodiumPosition: React.FC<PodiumPositionProps> = ({ position, player }) => {
  const isFirst = position === 1;
  return (
    <div className={cn("flex flex-col items-center", isFirst ? "mb-4" : "")}>
      <img 
        src={player.avatar} 
        className={cn(
          "rounded-full border-4 mb-2", 
          isFirst ? "w-20 h-20 border-yellow-400" : "w-16 h-16 border-gray-200"
        )} 
      />
      <span className="text-[10px] font-bold text-[#091747] truncate w-20 text-center">{player.name}</span>
      <span className="text-[10px] font-bold text-[#FFB10A]">{player.score.toLocaleString()}</span>
      <div className={cn(
        "w-12 mt-2 rounded-t-xl flex items-center justify-center font-black text-white",
        isFirst ? "h-16 bg-yellow-400" : position === 2 ? "h-12 bg-gray-300" : "h-10 bg-amber-600"
      )}>
        {position}
      </div>
    </div>
  );
};

export default PodiumPosition;

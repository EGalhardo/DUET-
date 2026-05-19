import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Flag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { storageService } from '../services/storageService';
import PodiumPosition from '../components/ranking/PodiumPosition';

interface RankingPlayer {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

export default function Ranking() {
  const [activeTab, setActiveTab] = useState<'Recente' | 'Semanal' | 'Geral'>('Recente');
  const [isFavorited, setIsFavorited] = useState(false);
  const favoriteId = 'page-ranking';

  const rankingData = {
    Recente: [
      { id: 1, name: 'Edlasio', score: 9850, avatar: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png' },
      { id: 2, name: 'Carlos Mendes', score: 9420, avatar: 'https://i.pravatar.cc/150?u=2' },
      { id: 3, name: 'Sofia Lopes', score: 8990, avatar: 'https://i.pravatar.cc/150?u=3' },
      { id: 4, name: 'Rui Santos', score: 8540, avatar: 'https://i.pravatar.cc/150?u=4' },
      { id: 5, name: 'Marta Costa', score: 8100, avatar: 'https://i.pravatar.cc/150?u=5' },
      { id: 6, name: 'Hugo Brás', score: 7800, avatar: 'https://i.pravatar.cc/150?u=6' },
      { id: 7, name: 'Inês Caldeira', score: 7600, avatar: 'https://i.pravatar.cc/150?u=7' },
      { id: 8, name: 'David Lucas', score: 7400, avatar: 'https://i.pravatar.cc/150?u=8' },
      { id: 9, name: 'Soraia Lima', score: 7200, avatar: 'https://i.pravatar.cc/150?u=9' },
      { id: 10, name: 'Bruno Alves', score: 7000, avatar: 'https://i.pravatar.cc/150?u=10' },
    ],
    Semanal: [
      { id: 11, name: 'Pedro Silva', score: 15600, avatar: 'https://i.pravatar.cc/150?u=11' },
      { id: 12, name: 'Maria Joana', score: 14200, avatar: 'https://i.pravatar.cc/150?u=12' },
      { id: 13, name: 'Luís Gomes', score: 13800, avatar: 'https://i.pravatar.cc/150?u=13' },
      { id: 14, name: 'Isabel Rocha', score: 12500, avatar: 'https://i.pravatar.cc/150?u=14' },
      { id: 15, name: 'Jorge Lima', score: 11900, avatar: 'https://i.pravatar.cc/150?u=15' },
      { id: 16, name: 'Filipa Melo', score: 11500, avatar: 'https://i.pravatar.cc/150?u=16' },
      { id: 17, name: 'Vítor Paiva', score: 11100, avatar: 'https://i.pravatar.cc/150?u=17' },
      { id: 18, name: 'Lia Duarte', score: 10800, avatar: 'https://i.pravatar.cc/150?u=18' },
      { id: 19, name: 'Samuel Neto', score: 10500, avatar: 'https://i.pravatar.cc/150?u=19' },
      { id: 20, name: 'Cláudia Reis', score: 10200, avatar: 'https://i.pravatar.cc/150?u=20' },
    ],
    Geral: [
      { id: 21, name: 'Ricardo Dias', score: 150400, avatar: 'https://i.pravatar.cc/150?u=21' },
      { id: 22, name: 'Tiago Santos', score: 142300, avatar: 'https://i.pravatar.cc/150?u=22' },
      { id: 23, name: 'Andreia Cruz', score: 139100, avatar: 'https://i.pravatar.cc/150?u=23' },
      { id: 24, name: 'Nuno Alves', score: 128500, avatar: 'https://i.pravatar.cc/150?u=24' },
      { id: 25, name: 'Beatriz Vaz', score: 125000, avatar: 'https://i.pravatar.cc/150?u=25' },
      { id: 26, name: 'Gonçalo Pinheiro', score: 122000, avatar: 'https://i.pravatar.cc/150?u=26' },
      { id: 27, name: 'Leonor Guerra', score: 119000, avatar: 'https://i.pravatar.cc/150?u=27' },
      { id: 28, name: 'Miguel Faria', score: 115000, avatar: 'https://i.pravatar.cc/150?u=28' },
      { id: 29, name: 'Raquel Sobral', score: 112000, avatar: 'https://i.pravatar.cc/150?u=29' },
      { id: 30, name: 'Tomás Veiga', score: 109000, avatar: 'https://i.pravatar.cc/150?u=30' },
    ]
  };

  const currentRankings = rankingData[activeTab];

  useEffect(() => {
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some(f => f.id === favoriteId));
    };
    updateFavStatus();
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      storageService.saveFavorite({
        id: favoriteId,
        title: 'Ranking',
        sub: 'Ver melhores jogadores',
        type: 'league',
        path: '/ranking'
      });
      setIsFavorited(true);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Ranking</h2>
          <button 
            onClick={toggleFavorite}
            className={cn("transition-colors duration-300", isFavorited ? "text-[#FFB10A]" : "text-black hover:text-[#FFB10A]")}
          >
            <Heart className={cn("w-6 h-6 md:w-7 md:h-7", isFavorited && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-16 pb-12">
        <div className="text-center mb-16">
          <img 
            src="https://i.postimg.cc/DZRRQ8NF/Taca-58.gif" 
            alt="Taça" 
            className="mx-auto w-80 md:w-[480px] h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <h1 className="mt-10 text-2xl md:text-3xl font-bold text-[#091747] tracking-tight">Ranking DUET</h1>
          <p className="mt-4 text-[#364153] font-bold">Top 10 Classificados</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="period-tabbar flex bg-gray-200 p-1 rounded-2xl w-full max-w-xs">
            {['Recente', 'Semanal', 'Geral'].map((period) => (
              <button 
                key={period} 
                onClick={() => setActiveTab(period as any)}
                className={cn(
                  "flex-1 py-2 text-xs font-black rounded-xl transition-all",
                  activeTab === period ? "bg-[#FFB10A] text-white shadow-sm" : "text-[#364153] hover:text-[#091747]"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Section label="Competição Nacional" icon={Flag} />
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
             <div className="bg-[#FFB10A] p-4 text-white font-bold flex items-center gap-3">
               <Trophy className="w-5 h-5" />
               <span>Torneio de Futebol</span>
             </div>
             
             {/* Podium */}
             <motion.div 
               key={`podium-${activeTab}`}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4 }}
               className="flex items-end justify-center gap-2 p-6 bg-gray-50/50 border-b border-gray-100"
             >
                <PodiumPosition position={2} player={currentRankings[1]} />
                <PodiumPosition position={1} player={currentRankings[0]} />
                <PodiumPosition position={3} player={currentRankings[2]} />
             </motion.div>

             <motion.div 
               key={activeTab}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="divide-y divide-gray-200"
             >
               {currentRankings.map((player, i) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                   key={player.id} 
                   className="flex items-center gap-4 p-4 hover:bg-orange-50/50 transition-colors"
                 >
                   <div className={cn(
                     "w-8 h-8 rounded-full flex items-center justify-center font-black text-xs",
                     i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-400 text-white" : i === 2 ? "bg-amber-600 text-white" : "bg-gray-200 text-[#364153]"
                   )}>
                     {i + 1}º
                   </div>
                   <img src={player.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
                   <span className="flex-1 font-bold text-[#091747]">{player.name}</span>
                   <span className="bg-gray-200 px-3 py-1 rounded-full text-[10px] font-black text-[#364153]">
                     {player.score.toLocaleString()} pts
                   </span>
                 </motion.div>
               ))}
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, icon: Icon }: { label: string, icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-[#FFB10A]" />
      <h3 className="font-bold text-[#091747]">{label}</h3>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
    </div>
  );
}


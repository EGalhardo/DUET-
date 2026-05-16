import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES, CATEGORY_DATA } from '../constants';
import { Category, CategoryDetail } from '../types';
import { X, Trophy, Globe, Flag } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const CategoryCard = React.memo(({ category, onInfoClick }: { 
  category: Category, 
  onInfoClick: (category: Category) => void 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full max-w-xs md:max-w-sm group"
  >
    <div className="relative">
      <Link to={category.path} className="flex flex-col items-center">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-3 transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center bg-white">
          <img 
            src={category.image} 
            alt={category.title} 
            loading="lazy"
            className={cn(
              "w-full h-full object-contain transition-transform duration-300 group-hover:scale-105",
              category.id !== 'futebol' && "scale-[1.38]"
            )}
          />
        </div>
        <div className="flex items-center justify-between w-full px-2">
          <span className="font-black text-xl md:text-2xl text-[#091747] uppercase tracking-tight group-hover:text-[#F0B100] transition-colors">{category.title}</span>
        </div>
      </Link>
      <button 
        id={`info-btn-${category.id}`}
        type="button" 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onInfoClick(category);
        }}
        className="absolute bottom-[2px] right-2 text-[#364153] hover:text-[#FFB10A] transition-all p-2 bg-white/80 backdrop-blur-sm rounded-full active:scale-95 z-10"
      >
        <Info className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  </motion.div>
));

const InfoModal = React.memo(({ 
  isOpen, 
  onClose, 
  category,
  onEntrar
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  category: Category | null,
  onEntrar: (path: string) => void
}) => {
  if (!category) return null;
  const detail = CATEGORY_DATA[category.id];
  if (!detail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header - Now Yellow and Centered */}
            <div className="bg-[#FFB10A] p-8 text-white relative flex flex-col items-center text-center">
              <h3 className="text-2xl font-black uppercase tracking-[0.2em] mb-1">{category.title}</h3>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Ligas e Competições Disponíveis</p>
            </div>

            {/* Content Swiper Style */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {Object.entries(detail.cards).map(([type, items]) => (
                <div key={type} className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                    {type === 'practice' && <Flag className="w-5 h-5 text-blue-600" />}
                    {type === 'private' && <Trophy className="w-5 h-5 text-orange-500" />}
                    {type === 'community' && <Globe className="w-5 h-5 text-green-600" />}
                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400">
                      {detail.labels[type as keyof typeof detail.labels]}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {items.map((item, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item.title} 
                        className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#FFB10A]/30 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                          <img src={item.image} alt="" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-[#091747] uppercase leading-tight group-hover:text-[#FFB10A] transition-colors">{item.title}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - Two Buttons Side by Side (Swapped Pos) */}
            <div className="p-5 bg-white border-t border-gray-100 grid grid-cols-2 gap-3">
               <button 
                id="modal-entrar-btn"
                onClick={() => onEntrar(category.path)}
                className="w-full py-4 bg-[#FFB10A] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#e69f09] transition-all shadow-lg shadow-orange-100 active:scale-95"
               >
                 Entrar Agora
               </button>
               <button 
                id="modal-sair-btn"
                onClick={onClose}
                className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
               >
                 Sair
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default function Home() {
  const { auth } = useAppContext();
  const navigate = useNavigate();
  const [infoCategory, setInfoCategory] = React.useState<Category | null>(null);

  React.useEffect(() => {
    const onboardingSeen = localStorage.getItem('onboarding:seen');
    if (!onboardingSeen) {
      navigate('/onboarding');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col flex-1">
      <InfoModal 
        isOpen={!!infoCategory} 
        onClose={() => setInfoCategory(null)} 
        category={infoCategory} 
        onEntrar={(path) => {
          setInfoCategory(null);
          navigate(path);
        }}
      />
      <div className="p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-4 text-center"
        >
          <img 
            src="https://i.postimg.cc/9XT19dr9/l-OGOMARCA-OFICIAL-2.gif" 
            alt="DUET Logo" 
            className="object-contain mx-auto w-[21rem] h-[21rem] md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem]"
          />
        </motion.div>

        <div className="w-[90%] h-px bg-gray-300 my-6 mx-auto" />

        <h1 className="font-dancing font-bold text-[#ffae00] text-center mb-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tighter">
          CATEGORIAS
        </h1>

        <div className="w-full max-w-4xl mx-auto px-4 mb-16">
          <div className="flex flex-col items-center gap-10 lg:gap-14">
            {CATEGORIES.map((cat) => (
              <CategoryCard 
                key={cat.id} 
                category={cat} 
                onInfoClick={(category) => setInfoCategory(category)}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-auto bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-black text-[#091747] uppercase tracking-wider mb-4">Plataforma</h3>
              <ul className="space-y-2">
                <li><Link to="/tutorial" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Como funciona</Link></li>
                <li><Link to="/ranking" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Ranking Global</Link></li>
                <li><Link to="/opinioes-sugestoes" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Opinião & Sugestões</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#091747] uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/info/politica-privacidade" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Privacidade</Link></li>
                <li><Link to="/info/termos-condicoes" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Termos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#091747] uppercase tracking-wider mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><Link to="/info/ajuda" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Ajuda</Link></li>
                <li><Link to="/contacto" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Contacto</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
               <img src="https://i.postimg.cc/Pr21PzHM/DUET-LOGO.png" alt="DUET" className="h-8 mb-4" />
               <p className="text-xs font-bold text-[#364153]">© 2026 DUET</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

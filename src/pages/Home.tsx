import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES } from '../constants';
import { Category } from '../types';

const CategoryCard = React.memo(({ category }: { category: Category }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full max-w-xs md:max-w-sm group"
  >
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
      <div className="flex items-center justify-between w-full px-2 transition-colors group-hover:text-[#F0B100]">
        <span className="font-bold text-xl md:text-2xl text-[#091747]">{category.title}</span>
        <button type="button" className="text-[#364153] hover:text-[#FFB10A] transition-colors p-1">
          <Info className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </Link>
  </motion.div>
));

CategoryCard.displayName = 'CategoryCard';

export default function Home() {
  const { auth } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    const onboardingSeen = localStorage.getItem('onboarding:seen');
    if (!onboardingSeen) {
      navigate('/onboarding');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col flex-1">
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

        <h1 className="font-dancing font-bold text-[#ffae00] text-center mb-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          CATEGORIAS
        </h1>

        <div className="w-full max-w-4xl mx-auto px-4 mb-16">
          <div className="flex flex-col items-center gap-10 lg:gap-14">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
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

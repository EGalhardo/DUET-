import React, { useEffect, useState } from 'react';
import { ArrowLeft, Wallet, RotateCw, Coins, CreditCard, HandCoins, Users, Clock, Info, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storageService } from '../services/storageService';
import { cn } from '../lib/utils';

export default function Carteira() {
  const [wallet, setWallet] = useState(storageService.getWallet());
  const [isFavorited, setIsFavorited] = useState(false);
  const favoriteId = 'page-carteira';

  useEffect(() => {
    const handleUpdate = () => {
      setWallet(storageService.getWallet());
    };

    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some(f => f.id === favoriteId));
    };

    handleUpdate();
    updateFavStatus();

    window.addEventListener('walletUpdated', handleUpdate);
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => {
      window.removeEventListener('walletUpdated', handleUpdate);
      window.removeEventListener('favoritesUpdated', updateFavStatus);
    };
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      storageService.saveFavorite({
        id: favoriteId,
        title: 'Carteira',
        sub: 'Gere o teu saldo',
        type: 'practice',
        path: '/carteira'
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
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Carteira</h2>
          <button 
            onClick={toggleFavorite}
            className={cn("transition-colors duration-300", isFavorited ? "text-[#FFB10A]" : "text-black hover:text-[#FFB10A]")}
          >
            <Heart className={cn("w-6 h-6 md:w-7 md:h-7", isFavorited && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-20 pb-16">
        <div className="text-center mb-20">
          <img 
            src="https://i.postimg.cc/cCCXVsSp/Wallet.gif" 
            alt="Carteira" 
            className="mx-auto w-[330px] md:w-[506px] h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <h1 className="mt-12 text-2xl md:text-3xl font-bold text-[#091747] tracking-tight">A Tua Carteira</h1>
          <p className="mt-4 text-gray-500 font-medium">Gere o teu saldo, faz depósitos e levantamentos.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-6">
          <div className="bg-[#FFB10A] p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-lg">Minha Carteira</h3>
                <p className="text-xs text-white/80">Gestão do teu saldo</p>
              </div>
            </div>
            <button 
              onClick={() => setWallet(storageService.getWallet())}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saldo Atual</p>
                <p className="text-3xl font-extrabold text-[#091747] mt-1">Kz {wallet.balance.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100/50 flex items-center justify-center">
                <Coins className="w-8 h-8 text-[#FFC000]" />
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-[#091747] mb-4">Ações Rápidas</p>
              <div className="grid grid-cols-3 gap-3">
                <Link to="/depositar" className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-[#FFB10A] hover:bg-orange-50 transition-all font-bold group">
                  <CreditCard className="w-6 h-6 text-gray-400 group-hover:text-[#FFB10A]" />
                  <span className="text-[10px]">Depositar</span>
                </Link>
                <Link to="/levantar" className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-[#FFB10A] hover:bg-orange-50 transition-all font-bold group">
                  <HandCoins className="w-6 h-6 text-gray-400 group-hover:text-[#FFB10A]" />
                  <span className="text-[10px]">Levantar</span>
                </Link>
                <Link to="/transferir" className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-[#FFB10A] hover:bg-orange-50 transition-all font-bold group">
                  <Users className="w-6 h-6 text-gray-400 group-hover:text-[#FFB10A]" />
                  <span className="text-[10px]">Transferir</span>
                </Link>
              </div>
            </div>

            <Link to="/historico" className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFB10A]/5 border border-[#FFB10A]/20 hover:bg-[#FFB10A]/10 transition-colors">
              <Clock className="w-6 h-6 text-[#FFB10A]" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#091747]">Histórico de Transações</p>
                <p className="text-[10px] text-gray-500">Consulta as tuas transações</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-[#FFB10A] rounded-2xl p-4 flex gap-3 items-start border border-white/20">
          <Info className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div className="text-white">
            <p className="text-xs font-bold">Saldo ilustrativo</p>
            <p className="text-[10px] text-white/80 leading-relaxed mt-1">
              Nesta versão, o saldo é apenas ilustrativo e não representa valores reais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

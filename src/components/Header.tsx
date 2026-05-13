import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Globe, UserPlus, Key, Users, Link as LinkIcon, PlayCircle, LogOut, Bell, IdCard, History, Wallet, Heart, Settings, Shield, Moon, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

export default function Header() {
  const { auth, logout, login } = useAppContext();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowPopover(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-300 w-full">
      <div className="w-full h-16 flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center transition-opacity duration-300 hover:opacity-80">
          <img 
            src="https://i.postimg.cc/Pr21PzHM/DUET-LOGO.png" 
            alt="DUET Logo" 
            className="h-8 md:h-10 lg:h-11 w-auto object-contain"
          />
        </Link>

        <div className="relative flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2.5 md:gap-3.5 mr-1 border-r border-gray-200 pr-3 md:pr-4">
            <div className="flex items-center gap-1 cursor-pointer group">
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] md:text-[10px] font-black text-[#091747] uppercase tracking-wider">AO</span>
              <ChevronDown className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400" />
            </div>
            
            <button className="flex items-center justify-center text-[#364153] hover:text-[#FFB10A] transition-colors p-1">
              <Moon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {auth.isLoggedIn && (
            <div className="hidden md:flex flex-col items-end mr-1">
              <span className="text-xs font-black text-[#091747]">{auth.user?.name}</span>
              <span className="text-[10px] text-[#364153] font-bold">{auth.user?.email}</span>
            </div>
          )}
          <button 
            ref={buttonRef}
            onClick={() => setShowPopover(!showPopover)}
            className="relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-gray-200 hover:border-[#FFB10A] transition-all duration-300 overflow-hidden bg-white"
          >
            <User className="w-5 h-5 md:w-6 md:h-6 text-[#364153]" />
          </button>

          {showPopover && (
            <div 
              ref={popoverRef}
              className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl p-2 animate-pop-in z-50"
            >
              <div className="absolute top-[-8px] right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
              
              {!auth.isLoggedIn ? (
                <>
                  <Link to="/login" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <LogIn className="w-5 h-5 text-[#FFB10A]" />
                    <span>Login</span>
                  </Link>
                  <Link to="/login" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Globe className="w-5 h-5 text-[#FFB10A]" />
                    <span>Login Social</span>
                  </Link>
                  <Link to="/signup" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <UserPlus className="w-5 h-5 text-[#FFB10A]" />
                    <span>SignUp</span>
                  </Link>
                  <Link to="/reset-password" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Key className="w-5 h-5 text-[#FFB10A]" />
                    <span>Redefinir Senha</span>
                  </Link>
                  <div className="h-px bg-gray-300 my-2" />
                  <Link to="/opinioes-sugestoes" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Users className="w-5 h-5 text-[#FFB10A]" />
                    <span>Opinião & Sugestões</span>
                  </Link>
                  <Link to="/afiliado" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <LinkIcon className="w-5 h-5 text-[#FFB10A]" />
                    <span>Afiliado</span>
                  </Link>
                  <Link to="/tutorial" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <PlayCircle className="w-5 h-5 text-[#FFB10A]" />
                    <span>Video-Tutorial</span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-black text-[#364153] uppercase tracking-wider">Minha Conta</p>
                  </div>
                  <Link to="/perfil" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <User className="w-5 h-5 text-[#FFB10A]" />
                    <span>Perfil</span>
                  </Link>
                  <Link to="/dados-pessoais" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <IdCard className="w-5 h-5 text-[#FFB10A]" />
                    <span>Dados Pessoais</span>
                  </Link>
                  <Link to="/historico" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <History className="w-5 h-5 text-[#FFB10A]" />
                    <span>Histórico</span>
                  </Link>
                  <Link to="/carteira" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Wallet className="w-5 h-5 text-[#FFB10A]" />
                    <span>Carteira</span>
                  </Link>
                  <Link to="/favoritos" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Heart className="w-5 h-5 text-[#FFB10A]" />
                    <span>Favoritos</span>
                  </Link>
                  <Link to="/definicoes" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Settings className="w-5 h-5 text-[#FFB10A]" />
                    <span>Definições</span>
                  </Link>
                  <Link to="/seguranca" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                    <Shield className="w-5 h-5 text-[#FFB10A]" />
                    <span>Segurança</span>
                  </Link>

                  <div className="lg:hidden border-t border-gray-300 mt-2 pt-2">
                    <Link to="/opinioes-sugestoes" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                      <Users className="w-5 h-5 text-[#FFB10A]" />
                      <span>Opinião & Sugestões</span>
                    </Link>
                    <Link to="/tutorial" className="w-full flex items-center gap-3 p-3 rounded-xl font-black text-[#091747] hover:bg-orange-50 transition-colors">
                      <PlayCircle className="w-5 h-5 text-[#FFB10A]" />
                      <span>Video-Tutorial</span>
                    </Link>
                  </div>

                  <div className="h-px bg-gray-300 my-2" />
                  <Link to="/logout" className="w-full flex items-center gap-3 p-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span>Terminar Sessão</span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

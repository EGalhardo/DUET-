import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Globe, UserPlus, Key, Users, Link as LinkIcon, PlayCircle, LogOut, Bell, IdCard, History, Wallet, Heart, Settings, Shield, Moon, ChevronDown, Check, Trash2, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { storageService } from '../services/storageService';
import { Notification } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { auth, logout, login } = useAppContext();
  const [showPopover, setShowPopover] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const loadWallet = () => {
      setBalance(storageService.getWallet().balance);
    };
    loadWallet();
    window.addEventListener('walletUpdated', loadWallet);
    return () => {
      window.removeEventListener('walletUpdated', loadWallet);
    };
  }, []);

  useEffect(() => {
    const loadNotifications = () => {
      setNotifications(storageService.getNotifications());
    };
    loadNotifications();
    window.addEventListener('notificationsUpdated', loadNotifications);
    window.addEventListener('tauntsUpdated', loadNotifications);
    return () => {
      window.removeEventListener('notificationsUpdated', loadNotifications);
      window.removeEventListener('tauntsUpdated', loadNotifications);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node) && 
          bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id: string) => {
    storageService.markNotificationAsRead(id);
  };

  const handleClearNotifications = () => {
    notifications.forEach(n => storageService.markNotificationAsRead(n.id));
  };

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
            className="h-12 md:h-10 lg:h-11 w-auto object-contain"
          />
        </Link>

        <div className="relative flex items-center gap-3 md:gap-4">
          {auth.isLoggedIn && (
            <div className="relative">
              <button 
                ref={bellRef}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-gray-200 hover:border-[#FFB10A] transition-all duration-300 bg-white"
              >
                <Bell className="w-5 h-5 text-[#364153]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    ref={notificationsRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden z-[60]"
                  >
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                       <h4 className="text-xs font-black text-[#091747] uppercase tracking-widest italic flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#FFB10A]" />
                          Notificações
                       </h4>
                       {unreadCount > 0 && (
                         <button 
                           onClick={handleClearNotifications}
                           className="text-[9px] font-black text-[#FFB10A] uppercase tracking-widest hover:underline"
                         >
                           Ler Todas
                         </button>
                       )}
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                       {notifications.length === 0 ? (
                         <div className="p-12 flex flex-col items-center justify-center text-center opacity-40">
                            <Bell className="w-12 h-12 mb-4 text-gray-300" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Sem novas notificações</p>
                         </div>
                       ) : (
                         <div className="flex flex-col">
                            {notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((n) => (
                              <div 
                                key={n.id}
                                onClick={() => handleMarkAsRead(n.id)}
                                className={cn(
                                  "p-4 border-b border-gray-50 transition-colors cursor-pointer group flex items-start gap-4",
                                  !n.isRead ? "bg-orange-50/30" : "hover:bg-gray-50"
                                )}
                              >
                                 <div className={cn(
                                   "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm",
                                   n.type === 'Performance' ? "bg-blue-50" : "bg-red-50"
                                 )}>
                                    {n.emoji}
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                       <span className={cn(
                                         "text-[10px] font-black uppercase tracking-tight",
                                         n.type === 'Performance' ? "text-blue-600" : "text-red-600"
                                       )}>
                                          {n.title}
                                       </span>
                                       <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                       </span>
                                    </div>
                                    <p className="text-[10px] text-gray-700 font-black leading-relaxed uppercase tracking-tight">
                                      {n.message}
                                    </p>
                                    {!n.isRead && (
                                      <div className="w-1.5 h-1.5 bg-[#FFB10A] rounded-full mt-2" />
                                    )}
                                 </div>
                              </div>
                            ))}
                         </div>
                       )}
                    </div>
                    
                    <div className="p-4 bg-gray-50 text-center">
                       <Link 
                        to="/historico" 
                        onClick={() => setShowNotifications(false)}
                        className="text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-[#FFB10A] transition-colors"
                       >
                          Ver Histórico Completo
                       </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {auth.isLoggedIn && (
            <div className="hidden md:flex flex-col items-end mr-1">
              <span className="text-xs font-black text-[#091747]">{auth.user?.name}</span>
              <span className="text-[10px] text-[#364153] font-bold">{auth.user?.email}</span>
            </div>
          )}

          <Link 
            id="header-user-wallet"
            to="/carteira"
            className="flex items-center gap-1 hover:text-[#FFB10A] transition-colors shrink-0 select-none active:scale-95 mr-1"
          >
            <Wallet className="w-3.5 h-3.5 text-[#FFB10A]" />
            <span className="text-xs md:text-sm font-black text-[#091747] tracking-tight whitespace-nowrap">
              {balance.toLocaleString()} <span className="text-[#FFB10A] text-[10px] font-bold ml-0.5">KZ</span>
            </span>
          </Link>

          <button 
            ref={buttonRef}
            onClick={() => setShowPopover(!showPopover)}
            className="relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-gray-200 hover:border-[#FFB10A] transition-all duration-300 overflow-hidden bg-white shrink-0"
          >
            {auth.isLoggedIn && auth.user?.avatar ? (
              <img src={auth.user.avatar} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <User className="w-5 h-5 md:w-6 md:h-6 text-[#364153]" />
            )}
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

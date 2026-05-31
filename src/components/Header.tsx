import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Globe, UserPlus, Key, Users, PlayCircle, LogOut, Wallet, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { storageService } from '../services/storageService';
import NotificationsModal from './home/NotificationsModal';
import AuthModal from './home/AuthModal';

export default function Header() {
  const { auth, logout, login } = useAppContext();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const [balance, setBalance] = useState<number>(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'social' | 'signup' | 'reset'>('login');

  const openAuthModal = (tab: 'login' | 'social' | 'signup' | 'reset') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
    setShowPopover(false);
  };

  useEffect(() => {
    // Seed initial notifications if empty to trigger red indicator on profile picture
    try {
      const currentNotifications = storageService.getNotifications();
      if (currentNotifications.length === 0) {
        storageService.addNotification({
          id: 'welcome_notification',
          type: 'Performance',
          title: 'Bem-vindo!',
          message: 'Sê bem-vindo à nossa plataforma de duelos. Boa sorte!',
          emoji: '📢',
          challengeId: '',
          createdAt: new Date().toISOString(),
          isRead: false
        });
        storageService.addNotification({
          id: 'first_friend_taunt',
          type: 'Taunt',
          title: 'Novo Desafio!',
          message: 'Foste desafiado por um amigo para um duelo no Girabola.',
          emoji: '📢',
          challengeId: 'girabola_challenge_1',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: false
        });
      }

      // Add user specified 1 Vs 1 results notification if not exists
      if (!currentNotifications.some(n => n.id === 'petro_v_agosto_result')) {
        storageService.addNotification({
          id: 'petro_v_agosto_result',
          type: 'Performance',
          title: 'Resultado',
          message: '1 Vs 1\n30/05/2026\nPetro Vs 1- Agosto',
          emoji: '📢',
          challengeId: 'petro_v_agosto',
          createdAt: new Date().toISOString(),
          isRead: false
        });
      }
    } catch (e) {
      console.error('Error seeding notifications:', e);
    }

    const loadNotifications = () => {
      try {
        const all = storageService.getNotifications();
        const unread = all.filter(n => !n.isRead).length;
        setUnreadNotificationsCount(unread);
      } catch (err) {
        console.error(err);
      }
    };
    loadNotifications();
    window.addEventListener('notificationsUpdated', loadNotifications);
    return () => {
      window.removeEventListener('notificationsUpdated', loadNotifications);
    };
  }, []);

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
            className="h-12 md:h-10 lg:h-11 w-auto object-contain"
          />
        </Link>

        <div className="relative flex items-center gap-3 md:gap-4">
          <Link 
            id="header-user-wallet"
            to="/carteira"
            className="flex items-center gap-1 hover:text-[#FFB10A] transition-colors shrink-0 select-none active:scale-95 mr-1"
          >
            <Wallet className="w-3.5 h-3.5 text-[#FFB10A]" />
            <span className="text-[12px] font-black text-[#091747] tracking-tight whitespace-nowrap">
              {balance.toLocaleString()} <span className="text-[#FFB10A] text-[9px] font-bold ml-0.5">KZ</span>
            </span>
          </Link>

          <button 
            ref={buttonRef}
            onClick={() => setShowPopover(!showPopover)}
            className="relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-gray-200 hover:border-[#FFB10A] transition-all duration-300 bg-white shrink-0"
          >
            {auth.isLoggedIn && auth.user?.avatar ? (
              <img src={auth.user.avatar} alt="User Avatar" className="w-full h-full object-cover rounded-full overflow-hidden" referrerPolicy="no-referrer" />
            ) : (
              <User className="w-5 h-5 md:w-6 md:h-6 text-[#364153]" />
            )}
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {showPopover && (
            <div 
              ref={popoverRef}
              className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-[2rem] p-3 animate-pop-in z-50 shadow-xl"
            >
              <div className="absolute top-[-8px] right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
              
              {/* SECTION: ACESSO & AUTENTICAÇÃO */}
              <div className="px-3 pt-1.5 pb-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Acesso</p>
              </div>

              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-orange-50 transition-colors"
              >
                <LogIn className="w-4 h-4 text-[#FFB10A]" />
                <span className="text-[11px] font-black text-[#0c1e56]">Login</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('social')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-orange-50 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#FFB10A]" />
                <span className="text-[11px] font-black text-[#0c1e56]">Login Social</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-orange-50 transition-colors"
              >
                <UserPlus className="w-4 h-4 text-[#FFB10A]" />
                <span className="text-[11px] font-black text-[#0c1e56]">SignUp</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('reset')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-orange-50 transition-colors"
              >
                <Key className="w-4 h-4 text-[#FFB10A]" />
                <span className="text-[11px] font-black text-[#0c1e56]">Redefinir Senha</span>
              </button>

              <button
                type="button"
                onClick={() => { setIsNotificationsOpen(true); setShowPopover(false); }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-orange-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-[#FFB10A]" />
                  <span className="text-[11px] font-black text-[#0c1e56]">Notificações</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-red-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px] h-5">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <div className="h-px bg-gray-100 my-2" />

              {/* SECTION: OUTROS */}
              <div className="px-3 pt-1.5 pb-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Mais Opções</p>
              </div>

              <Link to="/opinioes-sugestoes" className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 transition-colors" onClick={() => setShowPopover(false)}>
                <Users className="w-4 h-4 text-[#FFB10A]" />
                <span className="text-[11px] font-black text-[#0c1e56]">Opinião & Sugestões</span>
              </Link>

              <Link to="/tutorial" className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 transition-colors" onClick={() => setShowPopover(false)}>
                <PlayCircle className="w-4 h-4 text-[#FFB10A]" />
                <span className="text-[11px] font-black text-[#0c1e56]">Video-Tutorial</span>
              </Link>

              {auth.isLoggedIn && (
                <>
                  <div className="h-px bg-gray-100 my-2" />
                  <Link to="/logout" className="w-full flex items-center gap-3 p-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-[11px] font-bold">Terminar Sessão</span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        initialTab={authModalTab}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}

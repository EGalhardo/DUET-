import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Trash2, Zap, AlertCircle, X, CheckSquare, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { Notification } from '../../types';
import { cn } from '../../lib/utils';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const loadNotifications = React.useCallback(() => {
    try {
      const all = storageService.getNotifications();
      setNotifications(all);
    } catch (e) {
      console.error(e);
    }
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, loadNotifications]);

  React.useEffect(() => {
    window.addEventListener('notificationsUpdated', loadNotifications);
    return () => window.removeEventListener('notificationsUpdated', loadNotifications);
  }, [loadNotifications]);

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      storageService.markNotificationAsRead(id);
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = () => {
    try {
      notifications.forEach(n => {
        if (!n.isRead) {
          storageService.markNotificationAsRead(n.id);
        }
      });
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const current = storageService.getNotifications();
      const updated = current.filter(n => n.id !== id);
      localStorage.setItem('duet_notifications', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = () => {
    try {
      localStorage.setItem('duet_notifications', JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTestNotification = () => {
    try {
      const titles = [
        'Nova Provocação!',
        'Vitória no Girabola!',
        'Desafio Criado!',
        'Bónus Ativo!',
      ];
      const messages = [
        'Um amigo enviou-te uma provocação sobre o teu palpite.',
        'Parabéns! Ganhaste Kz 5.000 no duelo anterior.',
        'A tua sala privada "DUET77" foi criada.',
        'Recebeste Kz 1.000 de bónus de depósito.',
      ];
      const types: ('Performance' | 'Taunt')[] = ['Performance', 'Taunt'];

      const randomIndex = Math.floor(Math.random() * titles.length);

      const testNotif: Notification = {
        id: `test_notif_${Date.now()}`,
        type: types[Math.floor(Math.random() * types.length)],
        title: titles[randomIndex],
        message: messages[randomIndex],
        emoji: '📢',
        challengeId: 'test_challenge',
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      storageService.addNotification(testNotif);
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return 'Agora';
      if (diffMins < 60) return `Há ${diffMins}m`;
      if (diffHours < 24) return `Há ${diffHours}h`;
      return date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'short' });
    } catch (e) {
      return '';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="notifications-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            id="notifications-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-lg bg-[#FAFBFD] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header - Styled EXACTLY like the attached mockup */}
            <div className="bg-[#FFB10A] pt-10 pb-8 px-6 text-white relative flex flex-col items-center text-center rounded-t-[2.5rem] shadow-sm">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/25 rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h3 className="text-2xl font-black uppercase tracking-[0.2em] italic text-white leading-none">
                NOTIFICAÇÕES
              </h3>
              <p className="text-white/95 text-[10px] md:text-xs font-black uppercase tracking-widest mt-2 leading-none">
                MANTÉM-TE ATUALIZADO SOBRE OS TEUS DUELOS
              </p>
            </div>

            {/* Scrollable Content inside mockup layout */}
            <div className="max-h-[50vh] overflow-y-auto p-6 space-y-8 scrollbar-hide bg-[#F8FAFC]">
              
              {/* Unread Section */}
              {unreadNotifications.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-[#FFB10A]" />
                      <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500">
                        NÃO LIDAS
                      </h4>
                    </div>
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-[9px] font-black uppercase tracking-widest text-[#FFB10A] hover:text-[#d39200] transition-colors bg-orange-100/40 px-2 py-1 rounded-md"
                    >
                      Lidas todas
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <AnimatePresence initial={false}>
                      {unreadNotifications.map((item) => {
                        const isResultNotif = item.challengeId === 'petro_v_agosto' || item.message.includes('Petro Vs 1- Agosto') || item.title === 'Resultado';
                        if (isResultNotif) {
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-gradient-to-br from-white to-orange-50/20 rounded-2xl p-4 border border-orange-100 shadow-sm transition-all flex items-start gap-4 relative ring-2 ring-[#FFB10A]/10"
                            >
                              <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-orange-100/60 flex items-center justify-center animate-pulse" style={{ transition: 'all 0.3s ease' }}>
                                <Trophy className="w-5 h-5 text-[#FFB10A]" />
                              </div>
                              
                              <div className="flex-1 min-w-0 pr-6">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black bg-[#FFB10A] text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                    Duelo 1 Vs 1
                                  </span>
                                  <span className="text-[9px] font-black text-slate-400">
                                    {formatTime(item.createdAt)}
                                  </span>
                                </div>
                                
                                <h5 className="text-[12px] font-black text-[#091747] uppercase leading-tight mt-1.5">
                                  <span>{item.title}</span>
                                </h5>
                                
                                {/* Scoreboard style container */}
                                <div className="mt-2.5 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-xs">
                                  <div className="flex flex-col items-center justify-center text-center flex-1">
                                    <img 
                                      src="https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png" 
                                      alt="Petro Luanda" 
                                      className="w-10 h-10 object-contain hover:scale-105 transition-transform"
                                      referrerPolicy="no-referrer"
                                    />
                                    <p className="text-[11px] font-extrabold text-[#0c1e56] mt-1 leading-none">Petro</p>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 leading-none">LUANDA</span>
                                  </div>
                                  <div className="flex flex-col items-center justify-center px-3 py-1 bg-white border border-slate-200 rounded-lg min-w-[55px] shadow-2xs">
                                    <span className="text-[13px] font-black text-[#091747]">2 - 1</span>
                                    <span className="text-[7px] text-slate-450 uppercase font-black tracking-widest mt-0.5">FINAL</span>
                                  </div>
                                  <div className="flex flex-col items-center justify-center text-center flex-1">
                                    <img 
                                      src="https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png" 
                                      alt="1º de Agosto" 
                                      className="w-10 h-10 object-contain hover:scale-105 transition-transform"
                                      referrerPolicy="no-referrer"
                                    />
                                    <p className="text-[11px] font-extrabold text-[#0c1e56] mt-1 leading-none">1- Agosto</p>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 leading-none">PRI</span>
                                  </div>
                                </div>
                                
                                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-2.5 italic">
                                  Resultado do clássico nacional.
                                </p>
                                
                                <div className="flex gap-4 mt-3 pt-1 border-t border-gray-100">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMarkAsRead(item.id, e);
                                    }}
                                    className="text-[8.5px] font-black uppercase tracking-widest text-[#FFB10A] hover:underline"
                                  >
                                    Marcar lida
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteNotification(item.id, e);
                                    }}
                                    className="text-[8.5px] font-black uppercase tracking-widest text-red-500 hover:underline"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }

                        // Default unread layout
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow transition-all flex items-start gap-4 relative"
                          >
                            <div className="w-9 h-9 rounded-xl flex-shrink-0 bg-orange-50 flex items-center justify-center">
                              <Bell className="w-4 h-4 text-[#FFB10A]" />
                            </div>
                            
                            <div className="flex-1 min-w-0 pr-6">
                              <h5 className="text-[11px] font-black text-[#091747] uppercase leading-tight tracking-tight">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-gray-700 font-bold leading-relaxed mt-1 whitespace-pre-line">
                                {item.message}
                              </p>
                              
                              <div className="flex gap-3 mt-3">
                                <button
                                  onClick={(e) => handleMarkAsRead(item.id, e)}
                                  className="text-[8px] font-black uppercase tracking-widest text-[#FFB10A] hover:underline"
                                >
                                  Marcar lida
                                </button>
                                <button
                                  onClick={(e) => handleDeleteNotification(item.id, e)}
                                  className="text-[8px] font-black uppercase tracking-widest text-red-500 hover:underline"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                            
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter absolute top-4 right-4">
                              {formatTime(item.createdAt)}
                            </span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Read Section */}
              {readNotifications.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                      <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500">
                        ANTERIORES
                      </h4>
                    </div>
                    <button
                      onClick={handleClearAll}
                      className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors bg-red-50/40 px-2 py-1 rounded-md"
                    >
                      Limpar todas
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <AnimatePresence initial={false}>
                      {readNotifications.map((item) => {
                        const isResultNotif = item.challengeId === 'petro_v_agosto' || item.message.includes('Petro Vs 1- Agosto') || item.title === 'Resultado';
                        if (isResultNotif) {
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-sm transition-all flex items-start gap-4 relative opacity-90"
                            >
                              <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-slate-100 flex items-center justify-center animate-pulse" style={{ transition: 'all 0.3s ease' }}>
                                <Trophy className="w-5 h-5 text-slate-450" />
                              </div>
                              
                              <div className="flex-1 min-w-0 pr-6">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                    Duelo Lido
                                  </span>
                                  <span className="text-[9px] font-black text-slate-400">
                                    {formatTime(item.createdAt)}
                                  </span>
                                </div>
                                
                                <h5 className="text-[12px] font-black text-[#091747] uppercase leading-tight mt-1.5">
                                  <span>{item.title}</span>
                                </h5>
                                
                                {/* Scoreboard style container */}
                                <div className="mt-2.5 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                                  <div className="flex flex-col items-center justify-center text-center flex-1">
                                    <img 
                                      src="https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png" 
                                      alt="Petro Luanda" 
                                      className="w-10 h-10 object-contain hover:scale-105 transition-transform"
                                      referrerPolicy="no-referrer"
                                    />
                                    <p className="text-[11px] font-extrabold text-[#0c1e56] mt-1 leading-none">Petro</p>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 leading-none">LUANDA</span>
                                  </div>
                                  <div className="flex flex-col items-center justify-center px-3 py-1 bg-white border border-slate-150 rounded-lg min-w-[55px]">
                                    <span className="text-[13px] font-black text-slate-405">2 - 1</span>
                                    <span className="text-[7px] text-slate-405 uppercase font-black tracking-widest mt-0.5">FINAL</span>
                                  </div>
                                  <div className="flex flex-col items-center justify-center text-center flex-1">
                                    <img 
                                      src="https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png" 
                                      alt="1º de Agosto" 
                                      className="w-10 h-10 object-contain hover:scale-105 transition-transform"
                                      referrerPolicy="no-referrer"
                                    />
                                    <p className="text-[11px] font-extrabold text-[#0c1e56] mt-1 leading-none">1- Agosto</p>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 leading-none">PRI</span>
                                  </div>
                                </div>
                                
                                <p className="text-[10px] text-slate-450 font-semibold leading-relaxed mt-2 italic">
                                  Resultado Oficial: Petro Vs 1- Agosto.
                                </p>
                                
                                <div className="flex gap-3 mt-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteNotification(item.id, e);
                                    }}
                                    className="text-[8px] font-black uppercase tracking-widest text-red-500 hover:underline"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }

                        // Default read layout
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow transition-all flex items-start gap-4 relative opacity-75"
                          >
                            <div className="w-9 h-9 rounded-xl flex-shrink-0 bg-slate-100 flex items-center justify-center">
                              <Bell className="w-4 h-4 text-slate-400" />
                            </div>
                            
                            <div className="flex-1 min-w-0 pr-6">
                              <h5 className="text-[11px] font-black text-[#091747] uppercase leading-tight tracking-tight">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-gray-750 font-bold leading-relaxed mt-1 whitespace-pre-line">
                                {item.message}
                              </p>
                              
                              <div className="flex gap-3 mt-3">
                                <button
                                  onClick={(e) => handleDeleteNotification(item.id, e)}
                                  className="text-[8px] font-black uppercase tracking-widest text-red-500 hover:underline"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                            
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter absolute top-4 right-4">
                              {formatTime(item.createdAt)}
                            </span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Empty state when there are absolutely no notifications */}
              {notifications.length === 0 && (
                <div className="py-14 px-8 text-center text-gray-500 font-bold italic text-xs flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm space-y-2">
                  <AlertCircle className="w-8 h-8 text-gray-300" />
                  <span>Não tens nenhuma notificação de momento.</span>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest not-italic font-black">
                    Usa o botão de simular abaixo para experimentar
                  </p>
                </div>
              )}

            </div>

            {/* Footer containing the Exact layout of Mockup Buttons */}
            <div className="p-6 bg-white border-t border-gray-100 grid grid-cols-2 gap-4 rounded-b-[2.5rem]">
              <button 
                id="btn-close-notif"
                onClick={onClose}
                className="w-full py-4 bg-white border-2 border-gray-200 text-[#091747] rounded-[1.5rem] font-extrabold text-[11px] uppercase tracking-widest hover:bg-gray-50 active:scale-95 transition-all text-center"
              >
                SAIR
              </button>
              <button 
                id="btn-simulate-notif"
                onClick={handleCreateTestNotification}
                className="w-full py-4 bg-[#FFB10A] text-white rounded-[1.5rem] font-extrabold text-[11px] uppercase tracking-widest hover:bg-[#FFB10A]/90 active:scale-95 transition-all shadow-md text-center"
              >
                Ok
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

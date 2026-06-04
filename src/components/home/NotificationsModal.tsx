import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, Trash2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { storageService } from '../../services/storageService';
import { Notification } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'performance' | 'taunt'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    try {
      let all = storageService.getNotifications();
      if (all.length === 0) {
        // Seed initial notifications to make sure it is not empty
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
        storageService.addNotification({
          id: 'petro_v_agosto_result',
          type: 'Performance',
          title: 'Resultado de Clássico',
          message: 'Duelo 1 Vs 1: Petro de Luanda 2 - 1 1º de Agosto.',
          emoji: '🏆',
          challengeId: 'petro_v_agosto',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          isRead: false
        });
        all = storageService.getNotifications();
      }
      setNotifications(all);
    } catch (e) {
      console.error('Error loading notifications:', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('notificationsUpdated', loadNotifications);
    return () => {
      window.removeEventListener('notificationsUpdated', loadNotifications);
    };
  }, []);

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.markNotificationAsRead(id);
    loadNotifications();
  };

  const handleClearAll = () => {
    try {
      localStorage.setItem('duet_notifications', JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      setNotifications([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'performance') return item.type === 'Performance';
    if (activeTab === 'taunt') return item.type === 'Taunt';
    return true;
  });

  // Clone of the beautiful "Criar 1 vs 1" (BettingModal) visual layout and spring animation
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] md:rounded-[3rem] p-4 md:p-8 flex flex-col h-[85vh] md:h-[65vh] md:max-h-[85vh] overflow-hidden border border-gray-200 shadow-xl"
          >
            {/* Drag Handle for Mobile */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full md:hidden" />

            {/* Header style clone */}
            <div className="flex items-center justify-between mb-5 mt-2 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100/60 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#FFB10A]" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#091747] uppercase tracking-tighter leading-none italic">
                    Notificações
                  </h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    Centro de Alertas & Mensagens
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs / Separadores (Highly visible tabs with grey background rounded container) */}
            <div className="flex bg-[#f1f3f9] p-1.5 rounded-[20px] mb-5 gap-1 shrink-0 border border-slate-200/60 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-black uppercase transition-all duration-300 border-none cursor-pointer select-none",
                  activeTab === "all"
                    ? "bg-[#0c1e56] text-white shadow-[0_4px_10px_rgba(12,30,86,0.15)]"
                    : "text-slate-500 bg-transparent hover:text-[#0c1e56] hover:bg-slate-200/40"
                )}
              >
                Todas ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("performance")}
                className={cn(
                  "flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-black uppercase transition-all duration-300 border-none cursor-pointer select-none",
                  activeTab === "performance"
                    ? "bg-[#0c1e56] text-white shadow-[0_4px_10px_rgba(12,30,86,0.15)]"
                    : "text-slate-500 bg-transparent hover:text-[#0c1e56] hover:bg-slate-200/40"
                )}
              >
                Duelos ({notifications.filter(n => n.type === 'Performance').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("taunt")}
                className={cn(
                  "flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-black uppercase transition-all duration-300 border-none cursor-pointer select-none",
                  activeTab === "taunt"
                    ? "bg-[#0c1e56] text-white shadow-[0_4px_10px_rgba(12,30,86,0.15)]"
                    : "text-slate-500 bg-transparent hover:text-[#0c1e56] hover:bg-slate-200/40"
                )}
              >
                Provocações ({notifications.filter(n => n.type === 'Taunt').length})
              </button>
            </div>

            {/* List scrollable section with simple elegant text-based list items */}
            <div ref={scrollRef} className="overflow-y-auto flex-1 -mr-2 pr-2 custom-scrollbar">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border-2 border-slate-100">
                    <Bell className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-tighter italic">Nenhuma Notificação</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">Estás totalmente em dia!</p>
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "py-3.5 border-b border-slate-100 flex items-start gap-3 transition-colors",
                      !item.isRead ? "text-slate-900" : "text-slate-550"
                    )}
                  >
                    <span className="text-base shrink-0 select-none mt-0.5">{item.emoji || '📢'}</span>
                    <div className="flex-1 min-w-0 pr-1">
                      <p className={cn(
                        "text-xs leading-relaxed break-words",
                        !item.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-500"
                      )}>
                        <span className="font-extrabold uppercase text-[#0c1e56] mr-1.5">
                          {item.title}:
                        </span>
                        {item.message}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[8px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                          {item.type || 'Geral'}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1 select-none">
                          <Clock className="w-2.5 h-2.5 text-slate-400 stroke-[2.5]" />
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {!item.isRead && (
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>

                    {!item.isRead && (
                      <button
                        onClick={(e) => handleMarkAsRead(item.id, e)}
                        className="text-[9px] font-black uppercase tracking-wider text-[#ffb10a] hover:text-amber-500 bg-transparent border-none py-1 px-2 cursor-pointer self-center shrink-0 active:scale-90 transition-all font-sans"
                        title="Marcar como lida"
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Bottom confirmation/information button bar styled identically to betting actions */}
            <div className="mt-6 shrink-0">
              <button
                onClick={handleClose}
                className="w-full bg-[#091747] hover:bg-[#0c1e56] text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg shadow-blue-950/20 active:scale-[0.98] transition-all"
              >
                Voltar ao Jogo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

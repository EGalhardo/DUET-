
import { Bet, UserProfile, Wallet, FavoriteItem, Notification, Taunt } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'duet_user_profile',
  WALLET: 'duet_wallet',
  BETS: 'duet_bets',
  FAVORITES: 'duet_favorites',
  NOTIFICATIONS: 'duet_notifications',
  TAUNTS: 'duet_taunts',
};

const DEFAULT_USER: UserProfile = {
  id: 'user_1', // Agregando ID para o sistema de provocações
  name: 'Edlasio Galhardo',
  photo: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
  ranking: 'Bronze',
  stats: {
    winRate: 0,
    totalWon: 0,
    totalLost: 0,
  }
};

const DEFAULT_WALLET: Wallet = {
  balance: 10000, // Saldo inicial para teste
  blocked_balance: 0,
};

export const storageService = {
  getUserProfile: (): UserProfile => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch (e) {
      console.error('Error parsing user profile:', e);
      return DEFAULT_USER;
    }
  },

  updateUserProfile: (profile: Partial<UserProfile>): UserProfile => {
    const current = storageService.getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('userProfileUpdated'));
    return updated;
  },

  getWallet: (): Wallet => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WALLET);
      return data ? JSON.parse(data) : DEFAULT_WALLET;
    } catch (e) {
      console.error('Error parsing wallet:', e);
      return DEFAULT_WALLET;
    }
  },

  updateWallet: (data: Partial<Wallet>) => {
    const current = storageService.getWallet();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(updated));
    try {
      window.dispatchEvent(new CustomEvent('walletUpdated'));
    } catch (e) {
      const event = document.createEvent('Event');
      event.initEvent('walletUpdated', true, true);
      window.dispatchEvent(event);
    }
    return updated;
  },

  getBets: (): Bet[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BETS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error parsing bets:', e);
      return [];
    }
  },

  saveBet: (bet: Bet) => {
    const bets = storageService.getBets();
    const updated = [bet, ...bets];
    localStorage.setItem(STORAGE_KEYS.BETS, JSON.stringify(updated));
    return updated;
  },

  deleteBet: (id: string, refund: boolean = false) => {
    const bets = storageService.getBets();
    const betToDelete = bets.find(b => b.id === id);
    const updated = bets.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BETS, JSON.stringify(updated));

    if (refund && betToDelete && betToDelete.status === 'Open') {
      const wallet = storageService.getWallet();
      storageService.updateWallet({
        blocked_balance: Math.max(0, wallet.blocked_balance - betToDelete.amount),
        balance: wallet.balance + betToDelete.amount
      });
    }

    return updated;
  },

  getFavorites: (): FavoriteItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [
        { id: 'liga-futebol', title: 'Futebol', sub: 'Abrir liga', type: 'league', path: '/liga/futebol' },
        { id: 'fav-girabola', title: 'Girabola', sub: 'Duelos 1 vs 1', type: 'league', path: '/aposta/futebol?topic=Girabola' },
      ];
    } catch (e) {
      console.error('Error parsing favorites:', e);
      return [];
    }
  },

  saveFavorite: (favorite: FavoriteItem) => {
    const favorites = storageService.getFavorites();
    const updated = [favorite, ...favorites.filter(f => f.id !== favorite.id)];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    try {
      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    } catch (e) {
      const event = document.createEvent('Event');
      event.initEvent('favoritesUpdated', true, true);
      window.dispatchEvent(event);
    }
    return updated;
  },

  updateFavorites: (favorites: FavoriteItem[]) => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    try {
      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    } catch (e) {
      const event = document.createEvent('Event');
      event.initEvent('favoritesUpdated', true, true);
      window.dispatchEvent(event);
    }
    return favorites;
  },

  deleteFavorite: (id: string | number) => {
    const favorites = storageService.getFavorites();
    const updated = favorites.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    try {
      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    } catch (e) {
      const event = document.createEvent('Event');
      event.initEvent('favoritesUpdated', true, true);
      window.dispatchEvent(event);
    }
    return updated;
  },

  getNotifications: (): Notification[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error parsing notifications:', e);
      return [];
    }
  },

  addNotification: (notification: Notification) => {
    const notifications = storageService.getNotifications();
    const updated = [notification, ...notifications];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('notificationsUpdated'));
    return updated;
  },

  markNotificationAsRead: (id: string) => {
    const notifications = storageService.getNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('notificationsUpdated'));
    return updated;
  },

  getTaunts: (): Taunt[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TAUNTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error parsing taunts:', e);
      return [];
    }
  },

  sendTaunt: (taunt: Omit<Taunt, 'id' | 'createdAt'>) => {
    const taunts = storageService.getTaunts();
    const newTaunt: Taunt = {
      ...taunt,
      id: `taunt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newTaunt, ...taunts];
    localStorage.setItem(STORAGE_KEYS.TAUNTS, JSON.stringify(updated));
    
    window.dispatchEvent(new CustomEvent('tauntsUpdated'));
    return updated;
  },

  updateBetStatus: (id: string, status: Bet['status']) => {
    const bets = storageService.getBets();
    const updated = bets.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEYS.BETS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('betsUpdated'));
    return updated;
  }
};

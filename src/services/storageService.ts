
import { Bet, UserProfile, Wallet, FavoriteItem } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'duet_user_profile',
  WALLET: 'duet_wallet',
  BETS: 'duet_bets',
  FAVORITES: 'duet_favorites',
};

const DEFAULT_USER: UserProfile = {
  name: 'Utilizador',
  photo: 'https://i.postimg.cc/mD7Pr65C/Avatar.png',
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
        { id: 2, title: 'Prática de Pronomes', sub: 'Iniciar prática', type: 'practice', path: '/aposta/futebol?topic=Pronomes' },
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
  }
};

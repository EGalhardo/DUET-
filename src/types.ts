export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Match {
  id: number;
  league: string;
  teamA: { name: string; logo: string };
  teamB: { name: string; logo: string };
  date: string;
  time: string;
  odds: { winA: number; draw: number; winB: number };
  isLive?: boolean;
  status?: 'ao_vivo' | 'terminou' | 'breve';
  scoreA?: number;
  scoreB?: number;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  path: string;
}

export interface LeagueOption {
  title: string;
  image?: string;
}

export interface UserProfile {
  name: string;
  photo: string;
  ranking: 'Bronze' | 'Prata' | 'Ouro' | 'Elite' | 'Lenda';
  stats: {
    winRate: number;
    totalWon: number;
    totalLost: number;
  };
}

export interface Wallet {
  balance: number;
  blocked_balance: number;
}

export interface Bet {
  id: string;
  matchId: number;
  category: '1 vs 1' | 'Privado' | 'Nacional';
  market: string;
  amount: number;
  status: 'Open' | 'Live' | 'Won' | 'Lost' | 'Canceled';
  roomCode?: string;
  password?: string;
  roomName?: string;
  selectedMarkets?: (string | null)[];
  autoConfirmThreshold?: number;
  createdAt: string;
}

export interface FavoriteItem {
  id: string | number;
  title: string;
  sub: string;
  type: string;
  path: string;
}

export interface CategoryDetail {
  title: string;
  image: string;
  labels: { 
    practice: string; 
    private: string; 
    community?: string; 
  };
  cards: {
    practice: LeagueOption[];
    private: LeagueOption[];
    community?: LeagueOption[];
  };
}

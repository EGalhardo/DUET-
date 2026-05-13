import { Match, Category, CategoryDetail } from './types';

export const MATCH_DATA: Match[] = [
  {
    id: 1,
    league: "Premier League",
    teamA: { name: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    teamB: { name: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
    date: "12/05/2026",
    time: "20:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 2,
    league: "La Liga",
    teamA: { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    teamB: { name: "Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
    date: "13/05/2026",
    time: "21:30",
    odds: { winA: 2.50, draw: 3.20, winB: 2.80 },
    isLive: true,
    status: 'ao_vivo',
    scoreA: 2,
    scoreB: 1
  },
  {
    id: 3,
    league: "Serie A",
    teamA: { name: "Juventus", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/Juventus_FC_crest.svg" },
    teamB: { name: "Inter Milan", logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Inter_Milan.svg" },
    date: "14/05/2026",
    time: "19:45",
    odds: { winA: 2.30, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'terminou',
    scoreA: 1,
    scoreB: 1
  },
  {
    id: 4,
    league: "Bundesliga",
    teamA: { name: "Bayern Munchen", logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
    teamB: { name: "B. Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
    date: "15/05/2026",
    time: "17:30",
    odds: { winA: 1.80, draw: 3.80, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 5,
    league: "Ligue 1",
    teamA: { name: "PSG", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
    teamB: { name: "Marseille", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Olympique_de_Marseille_logo.svg" },
    date: "16/05/2026",
    time: "20:00",
    odds: { winA: 1.65, draw: 4.00, winB: 5.50 },
    isLive: false,
    status: 'ao_vivo',
    scoreA: 3,
    scoreB: 0
  },
  {
    id: 6,
    league: "Girabola",
    teamA: { name: "Petro Luanda", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d4/Petr%C3%B3leo_Atl%C3%A9tico_de_Luanda.png" },
    teamB: { name: "1º de Agosto", logo: "https://upload.wikimedia.org/wikipedia/pt/8/87/1%C2%BA_de_Agosto.png" },
    date: "17/05/2026",
    time: "16:00",
    odds: { winA: 2.10, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'futebol',
    title: 'Futebol',
    image: 'https://i.postimg.cc/T3HnF1K8/Futebol-29.gif',
    path: '/liga/futebol',
  },
  {
    id: 'basket',
    title: 'Basket',
    image: 'https://i.postimg.cc/vZ8rvDQZ/Logo-Animado-Basket.gif',
    path: '/liga/basket',
  },
  {
    id: 'f1',
    title: 'F1',
    image: 'https://i.postimg.cc/xd95kgZj/F1.gif',
    path: '/liga/f1',
  },
];

export const CATEGORY_DATA: Record<string, CategoryDetail> = {
  futebol: {
    title: 'Futebol',
    image: 'https://i.postimg.cc/T3HnF1K8/Futebol-29.gif',
    labels: { practice: 'Nacional', private: 'Taça', community: 'Internacional' },
    cards: {
      practice: [
        { title: 'Girabola', image: 'https://i.postimg.cc/SXW0Y3YY/1-Gira-Bola-Hd.png' },
        { title: 'Bundesliga', image: 'https://i.postimg.cc/rdS6R3R4/2-Bundes-Liga-hd.png' },
        { title: 'La Liga', image: 'https://i.postimg.cc/KKnX3w3Q/3-La-Liga-hd.png' },
        { title: 'Ligue 1', image: 'https://i.postimg.cc/7CgvJdJ7/4-ligue-1-logo.png' },
        { title: 'Eredivisie', image: 'https://i.postimg.cc/Z9rkv2vp/5-Eredivisie.png' },
        { title: 'Premier League', image: 'https://i.postimg.cc/LqzdgwgB/6-Premier-League.png' },
        { title: 'Serie A', image: 'https://i.postimg.cc/gwv9LQLg/7-Serie-A.png' },
        { title: 'Liga Nos', image: 'https://i.postimg.cc/WDMRqCq9/8-Liga-Nos.jpg' },
      ],
      private: [
        { title: 'Taça de Angola', image: 'https://i.postimg.cc/BXWWSJz9/1-Taca-de-Angola.png' },
        { title: 'DFB Pokal', image: 'https://i.postimg.cc/6yCkTDs5/2-Taca-da-Alemanha.png' },
        { title: 'Copa del Rey', image: 'https://i.postimg.cc/mt7vh0xW/3-Taca-de-Espanha-hd.png' },
        { title: 'Copa da França', image: 'https://i.postimg.cc/w7DC3nCS/4-Copa-da-Franca.jpg' },
        { title: 'KNVB Beker', image: 'https://i.postimg.cc/Xp9RXTMv/5-KNVB-Cup-logo.png' },
        { title: 'FA Cup', image: 'https://i.postimg.cc/6yCkTDs3/6-Taca-de-Inglaterra.png' },
        { title: 'TIM Cup', image: 'https://i.postimg.cc/PP1gNBGC/7-Taca-da-Italia.png' },
        { title: 'Taça de Portugal', image: 'https://i.postimg.cc/sMytWwyV/8-Taca-de-Portugal.png' },
      ],
      community: [
        { title: 'CAF Champions League', image: 'https://i.postimg.cc/ygqhJrC6/1-Liga-do-campeoes-Africa.png' },
        { title: 'CAF Confederation Cup', image: 'https://i.postimg.cc/zbnCTSq8/2-Taca-das-confederacoes-Africa.png' },
        { title: 'UEFA Champions League', image: 'https://i.postimg.cc/ZBkP9Dzn/3-Liga-dos-campeoes-Europa.jpg' },
        { title: 'UEFA Europa League', image: 'https://i.postimg.cc/8JhRLBTT/4-Liga-Europa.png' },
      ]
    }
  },
  basket: {
    title: 'Basket',
    image: 'https://i.postimg.cc/vZ8rvDQZ/Logo-Animado-Basket.gif',
    labels: { practice: 'Nacional', private: 'Taça', community: 'Internacional' },
    cards: {
      practice: [{ title: 'Tabuada 1' }, { title: 'Tabuada 2' }, { title: 'Tabuada 3' }],
      private: [{ title: 'Criar Torneio' }, { title: 'Participar' }],
      community: [{ title: 'CAF Champions' }]
    }
  },
  f1: {
    title: 'F1',
    image: 'https://i.postimg.cc/xd95kgZj/F1.gif',
    labels: { practice: 'Classificacao', private: 'G.P', community: 'G.P' },
    cards: {
      practice: [{ title: 'História de Angola' }],
      private: [{ title: 'Criar Torneio' }],
      community: []
    }
  }
};

export const COMPETITION_LOGOS: Record<string, string> = {
  'Girabola': 'https://i.postimg.cc/qRvHdhGG/Angola-Girabola-54.gif',
  'Taça de Angola': 'https://i.postimg.cc/RZ7k6QsQ/Angola-Taca-de-Angola.gif',
  'Bundesliga': 'https://i.postimg.cc/qgfFgz2S/Alemanha-Bundes-Liga.gif',
  'BundesLiga': 'https://i.postimg.cc/qgfFgz2S/Alemanha-Bundes-Liga.gif',
  'Taça da Alemanha': 'https://i.postimg.cc/W4bssHNh/Alemanha-Taca-da-Alemanha.gif',
  'La Liga': 'https://i.postimg.cc/2SCDxKBM/Espanha-La-Liga.gif',
  'Taça de Espanha': 'https://i.postimg.cc/Yqs66JVr/Espanha-Taca-de-Espanha.gif',
  'Ligue 1': 'https://i.postimg.cc/5N6v2st7/Franca-Ligue-1.gif',
  'Taça de França': 'https://i.postimg.cc/nL0c7tRC/Franca-Taca-de-Franca.gif',
  'Eredivisie': 'https://i.postimg.cc/63F72XTN/Holanda-Eredivisie.gif',
  'Taça da Holanda': 'https://i.postimg.cc/Gmb4sz3R/Holanda-Taca-de-Holanda.gif',
  'Premier League': 'https://i.postimg.cc/VvjNJ03r/Inglaterra-Premier-League.gif',
  'Taça de Inglaterra': 'https://i.postimg.cc/jjgc1L3q/Inglaterra-Taca-de-Inglaterra.gif',
  'Serie A': 'https://i.postimg.cc/6pBh5dDC/Italia-Serie-A.gif',
  'Série A': 'https://i.postimg.cc/6pBh5dDC/Italia-Serie-A.gif',
  'Taça de Itália': 'https://i.postimg.cc/D0VrVsr3/Italia-Taca-da-Italia.gif',
  'Liga Nos': 'https://i.postimg.cc/J0WkY88P/Portugal-Liga-NOS.gif',
  'Liga NOS': 'https://i.postimg.cc/J0WkY88P/Portugal-Liga-NOS.gif',
  'Taça de Portugal': 'https://i.postimg.cc/4NP9PjSy/Portugal-Taca-de-Portugal.gif',
  'CAF Champions League': 'https://i.postimg.cc/VkSktTyg/Africa-Liga-dos-campeoes-Africa.gif',
  'CAF Confederation Cup': 'https://i.postimg.cc/rsF8wZNk/Africa-Confederacoes-Africanas.gif',
  'UEFA Champions League': 'https://i.postimg.cc/kXHn7cVS/Europa-Liga-dos-Campeoes-Europa.gif',
  'UEFA Europa League': 'https://i.postimg.cc/Y9t7dDVS/Europa-Liga-Europa.gif'
};

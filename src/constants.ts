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
      practice: [
        { title: 'Unitel Basket', image: 'https://i.postimg.cc/jS3Zp15B/Unitel-Basket.jpg' },
        { title: 'Liga ACB', image: 'https://i.postimg.cc/8zcbmb48/Liga-ACB.jpg' },
        { title: 'Liga VTB', image: 'https://i.postimg.cc/d3J2kR3S/Liga-VTB-RUSSIA.png' },
        { title: 'Basket League', image: 'https://i.postimg.cc/sD6Yxhzz/Basket-League-GRECIA.png' },
        { title: 'Serie A Basket', image: 'https://i.postimg.cc/PJfDrtFX/Serie-A-Baske-T-ITALIA.png' },
        { title: 'Jeep Elite', image: 'https://i.postimg.cc/0yKwNXZg/Jeep-Elite-FRANCA.png' },
        { title: 'BBL Alemanha', image: 'https://i.postimg.cc/9MLMbyJV/BBL-ALEMANHA.png' }
      ],
      private: [
        { title: 'Taça de Angola Basket', image: 'https://i.postimg.cc/mkrSpN4r/Taca-de-Angola.png' },
        { title: 'Taça do Rei Basket', image: 'https://i.postimg.cc/pX4BkF6T/Taca-do-Rei.png' },
        { title: 'Taça da Rússia Basket', image: 'https://i.postimg.cc/5Nhw8MX4/Taca-da-Russia.png' },
        { title: 'Taça da Grécia Basket', image: 'https://i.postimg.cc/3NPDjgJz/Taca-da-Grecia.png' },
        { title: 'Taça da Itália Basket', image: 'https://i.postimg.cc/8cr7CjBb/Taca-da-Italia.png' },
        { title: 'Taça de França Basket', image: 'https://i.postimg.cc/K8bDd2mx/Taca-de-Franca.png' },
        { title: 'NBA EUA Leste', image: 'https://i.postimg.cc/mZF3kDDP/NBA-EUA-LESTE.png' },
        { title: 'Taça da Alemanha Basket', image: 'https://i.postimg.cc/J7JJm26z/Taca-da-Alemanha.png' }
      ],
      community: [
        { title: 'BAL', image: 'https://i.postimg.cc/9XR3fGZd/BAL.png' },
        { title: 'Afrobasket 2021', image: 'https://i.postimg.cc/XqFDkkkm/Afrobasket-2021.png' },
        { title: 'EUROPA', image: 'https://i.postimg.cc/KvD0czqB/EUROPA.jpg' },
        { title: 'EuroBasket 2021', image: 'https://i.postimg.cc/fTDvPszw/Euro-Basket-2021-logo.png' }
      ]
    }
  },
  f1: {
    title: 'F1',
    image: 'https://i.postimg.cc/xd95kgZj/F1.gif',
    labels: { practice: 'Classificacao', private: 'G.P' },
    cards: {
      practice: [
        { title: 'Abu Dhabi', image: 'https://i.postimg.cc/hG3BynHh/ABU-DHABI-YAS-MARINA-CIRCUIT.jpg' },
        { title: 'Arábia Saudita', image: 'https://i.postimg.cc/wjfZHVF2/ARABIA-SAUDITA-JEDDAH-STREET-CIRCUIT.jpg' },
        { title: 'Austrália', image: 'https://i.postimg.cc/Y9gs6w7T/AUSTRALIA-MELBOURNE-GRAND-PRIX-CIRCUIT.png' },
        { title: 'Áustria', image: 'https://i.postimg.cc/mgDpd9Rt/AUSTRIA-RED-BULL-RING.png' },
        { title: 'Azerbaijão', image: 'https://i.postimg.cc/XJwsZcc7/AZERBAIJAO-BAKU-CITY-CIRCUIT.png' },
        { title: 'Bélgica', image: 'https://i.postimg.cc/zXDxBhLm/BELGICA-CIRCUIT-DE-SPA-FRANCORCHAMPS.png' },
        { title: 'Brasil', image: 'https://i.postimg.cc/VLHWkVQ4/BRASIL-AUTODROMO-JOSE-CARLOS-PACE.png' },
        { title: 'Canadá', image: 'https://i.postimg.cc/d3VGq85z/CANADA-CIRCUIT-GILLES-VILLENEUVE.png' },
        { title: 'Espanha', image: 'https://i.postimg.cc/Bv5FHhyD/ESPANHA-CIRCUIT-DE-BARCELONA-CATALUNYA.png' },
        { title: 'EUA', image: 'https://i.postimg.cc/QCzKhv9V/EUA-CIRCUIT-OF-THE-AMERICAS.png' },
        { title: 'França', image: 'https://i.postimg.cc/g28LbSYG/FRANCA-CIRCUIT-PAUL-RICARD.png' },
        { title: 'Grã-Bretanha', image: 'https://i.postimg.cc/0jzrWZtW/GRA-BRITANHA-SILVESTONE-CIRCUIT.png' },
        { title: 'Holanda', image: 'https://i.postimg.cc/FKhz5hWc/HOLANDA-CIRCUIT-ZANDVOORT.png' },
        { title: 'Hungria', image: 'https://i.postimg.cc/hhF4CnQr/HUNGRIA-HUNGARORING.png' },
        { title: 'Itália (Imola)', image: 'https://i.postimg.cc/Hk957ZFQ/ITALIA-AUTODROMO-ENZO-E-DINO-FERRARI.png' },
        { title: 'Itália (Monza)', image: 'https://i.postimg.cc/GtDT3qkK/ITALIA-NAZIONALE-E-MONZA.png' },
        { title: 'Japão', image: 'https://i.postimg.cc/43FYzrP4/JAPAO-SUZUKA-INTERNATIONAL-RACING-COURSE.png' },
        { title: 'México', image: 'https://i.postimg.cc/66Z8vbvR/MEXICO-AUTODEOMO-HERMANOS-RODRIGUEZ.png' },
        { title: 'Mónaco', image: 'https://i.postimg.cc/cCG4hZnK/MONACO-CIRCUIT-DE-MONACO.png' },
        { title: 'Portugal', image: 'https://i.postimg.cc/vHzHrJHR/PORTUGAL-AUTODROMO-INTERNACIONAL-DO-ALGARVE.png' },
        { title: 'Rússia', image: 'https://i.postimg.cc/MGhWZxtg/RUSSIA-SOCHI-AUTODROM.png' },
        { title: 'Singapura', image: 'https://i.postimg.cc/X7VnYscV/SINGAPURA-MARINA-BAY-STREET-CIRCUIT.png' }
      ],
      private: [
        { title: 'Abu Dhabi', image: 'https://i.postimg.cc/hG3BynHh/ABU-DHABI-YAS-MARINA-CIRCUIT.jpg' },
        { title: 'Arábia Saudita', image: 'https://i.postimg.cc/wjfZHVF2/ARABIA-SAUDITA-JEDDAH-STREET-CIRCUIT.jpg' },
        { title: 'Austrália', image: 'https://i.postimg.cc/Y9gs6w7T/AUSTRALIA-MELBOURNE-GRAND-PRIX-CIRCUIT.png' },
        { title: 'Áustria', image: 'https://i.postimg.cc/mgDpd9Rt/AUSTRIA-RED-BULL-RING.png' },
        { title: 'Azerbaijão', image: 'https://i.postimg.cc/XJwsZcc7/AZERBAIJAO-BAKU-CITY-CIRCUIT.png' },
        { title: 'Bélgica', image: 'https://i.postimg.cc/zXDxBhLm/BELGICA-CIRCUIT-DE-SPA-FRANCORCHAMPS.png' },
        { title: 'Brasil', image: 'https://i.postimg.cc/VLHWkVQ4/BRASIL-AUTODROMO-JOSE-CARLOS-PACE.png' },
        { title: 'Canadá', image: 'https://i.postimg.cc/d3VGq85z/CANADA-CIRCUIT-GILLES-VILLENEUVE.png' },
        { title: 'Espanha', image: 'https://i.postimg.cc/Bv5FHhyD/ESPANHA-CIRCUIT-DE-BARCELONA-CATALUNYA.png' },
        { title: 'EUA', image: 'https://i.postimg.cc/QCzKhv9V/EUA-CIRCUIT-OF-THE-AMERICAS.png' },
        { title: 'França', image: 'https://i.postimg.cc/g28LbSYG/FRANCA-CIRCUIT-PAUL-RICARD.png' },
        { title: 'Grã-Bretanha', image: 'https://i.postimg.cc/0jzrWZtW/GRA-BRITANHA-SILVESTONE-CIRCUIT.png' },
        { title: 'Holanda', image: 'https://i.postimg.cc/FKhz5hWc/HOLANDA-CIRCUIT-ZANDVOORT.png' },
        { title: 'Hungria', image: 'https://i.postimg.cc/hhF4CnQr/HUNGRIA-HUNGARORING.png' },
        { title: 'Itália (Imola)', image: 'https://i.postimg.cc/Hk957ZFQ/ITALIA-AUTODROMO-ENZO-E-DINO-FERRARI.png' },
        { title: 'Itália (Monza)', image: 'https://i.postimg.cc/GtDT3qkK/ITALIA-NAZIONALE-E-MONZA.png' },
        { title: 'Japão', image: 'https://i.postimg.cc/43FYzrP4/JAPAO-SUZUKA-INTERNATIONAL-RACING-COURSE.png' },
        { title: 'México', image: 'https://i.postimg.cc/66Z8vbvR/MEXICO-AUTODEOMO-HERMANOS-RODRIGUEZ.png' },
        { title: 'Mónaco', image: 'https://i.postimg.cc/cCG4hZnK/MONACO-CIRCUIT-DE-MONACO.png' },
        { title: 'Portugal', image: 'https://i.postimg.cc/vHzHrJHR/PORTUGAL-AUTODROMO-INTERNACIONAL-DO-ALGARVE.png' },
        { title: 'Rússia', image: 'https://i.postimg.cc/MGhWZxtg/RUSSIA-SOCHI-AUTODROM.png' },
        { title: 'Singapura', image: 'https://i.postimg.cc/X7VnYscV/SINGAPURA-MARINA-BAY-STREET-CIRCUIT.png' }
      ]
    }
  }
};

export const COMPETITION_LOGOS: Record<string, string> = {
  'Girabola': 'https://i.postimg.cc/qRvHdhGG/Angola-Girabola-54.gif',
  'Taça de Angola': 'https://i.postimg.cc/RZ7k6QsQ/Angola-Taca-de-Angola.gif',
  'Bundesliga': 'https://i.postimg.cc/qgfFgz2S/Alemanha-Bundes-Liga.gif',
  'BundesLiga': 'https://i.postimg.cc/qgfFgz2S/Alemanha-Bundes-Liga.gif',
  'Taça da Alemanha': 'https://i.postimg.cc/W4bssHNh/Alemanha-Taca-da-Alemanha.gif',
  'DFB Pokal': 'https://i.postimg.cc/W4bssHNh/Alemanha-Taca-da-Alemanha.gif',
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
  'UEFA Europa League': 'https://i.postimg.cc/Y9t7dDVS/Europa-Liga-Europa.gif',
  
  // BASKETBALL LOGOS
  'Unitel Basket': 'https://i.postimg.cc/G3WP6SYp/Angola-Unitel-Basket.gif',
  'Liga ACB': 'https://i.postimg.cc/W4xttxs1/Espanha-Liga-Endesa.gif',
  'NBA': 'https://i.postimg.cc/rm6FqW9m/EUA-NBA.gif',
  'Jeep Elite': 'https://i.postimg.cc/vZcQ9XqV/Franca-Jeep.gif',
  'Basket League': 'https://i.postimg.cc/PJSjv81m/Grecia-Basket-League.gif',
  'Serie A Basket': 'https://i.postimg.cc/Gtm0Rh6p/Italia-LBA-Italia.gif',
  'Liga VTB': 'https://i.postimg.cc/qMNYxYrz/Russia-VTB-Russia.gif',
  'BBL Alemanha': 'https://i.postimg.cc/SQv1RrMZ/Alemanha-BBL.gif',

  // BASKETBALL CUP LOGOS
  'Taça de Angola Basket': 'https://i.postimg.cc/CL6Wk0n3/Angola-Taca-Angola-Basket.gif',
  'Taça do Rei Basket': 'https://i.postimg.cc/KzNWzh2j/Espanha-Taca-de-Espanha-Basket.gif',
  'Taça da Rússia Basket': 'https://i.postimg.cc/HxxwQqMH/Russia-Taca-da-Russia.gif',
  'Taça da Grécia Basket': 'https://i.postimg.cc/Pxr4SLBV/Grecia-Taca-da-Grecia.gif',
  'Taça da Itália Basket': 'https://i.postimg.cc/FH5V2CM7/Italia-Taca-da-Italia.gif',
  'Taça de França Basket': 'https://i.postimg.cc/gkwM9ZrB/Franca-Taca-de-Franca.gif',
  'Taça da Alemanha Basket': 'https://i.postimg.cc/cLvGbCNC/Alemanha-Taca-da-Alemanha.gif',

  // F1 GRAND PRIX LOGOS
  'Abu Dhabi GP': 'https://i.postimg.cc/FRk01jcJ/ABU-DHABI.gif',
  'Arábia Saudita GP': 'https://i.postimg.cc/cLD3mDB2/ARABIA-SAUDITA-JEDDAH-STREET-CIRCUIT.gif',
  'Austrália GP': 'https://i.postimg.cc/X74y0M2G/AUSTRALIA-MELBOURNE-GRAND-PRIX-CIRCUIT.gif',
  'Áustria GP': 'https://i.postimg.cc/hGzX0KG6/AUSTRIA-RED-BULL-RING.gif',
  'Azerbaijão GP': 'https://i.postimg.cc/6q0qQ3Hm/AZERBAIJAO-BAKU-CITY-CIRCUIT.gif',
  'Bélgica GP': 'https://i.postimg.cc/X7sXSrBv/BELGICA-CIRCUIT-DE-SPA-FRANCORCHAMPS-63.gif',
  'Brasil GP': 'https://i.postimg.cc/ydC8X9tn/BRASIL-AUTODROMO-JOSE-CARLOS-PACE.gif',
  'Canadá GP': 'https://i.postimg.cc/9XpQZDpJ/CANADA-CIRCUIT-GILLES-VILLENEUVE-68.gif',
  'Espanha GP': 'https://i.postimg.cc/3Rh3Dh0G/ESPANHA-CIRCUIT-DE-BARCELONA-CATALUNYA.gif',
  'EUA GP': 'https://i.postimg.cc/jd2tfZCb/EUA-CIRCUIT-OF-THE-AMERICAS.gif',
  'França GP': 'https://i.postimg.cc/QMQ3DzYk/FRANCA-CIRCUIT-PAUL-RICARD.gif',
  'Grã-Bretanha GP': 'https://i.postimg.cc/brBXLfrB/GRA-BRITANHA-SILVESTONE-CIRCUIT.gif',
  'Holanda GP': 'https://i.postimg.cc/VkMy9T8Z/HOLANDA-CIRCUIT-ZANDVOORT-75.gif',
  'Hungria GP': 'https://i.postimg.cc/W35xbcGq/HUNGRIA-HUNGARORING.gif',
  'Itália (Imola) GP': 'https://i.postimg.cc/KcsC6FcQ/ITALIA-AUTODROMO-ENZO-E-DINO-FERRARI-80.gif',
  'Itália (Monza) GP': 'https://i.postimg.cc/MGxL7pty/ITALIA-NAZIONALE-E-MONZA.gif',
  'Japão GP': 'https://i.postimg.cc/D0WpvJyh/JAPAO-SUZUKA-INTERNATIONAL-RACING-COURSE.gif',
  'México GP': 'https://i.postimg.cc/2yBTpsTP/MEXICO-AUTODEOMO-HERMANOS-RODRIGUEZ.gif',
  'Mónaco GP': 'https://i.postimg.cc/Cx4368RZ/MONACO-CIRCUIT-DE-MONACO.gif',
  'Portugal GP': 'https://i.postimg.cc/LXGwZBWJ/PORTUGAL-AUTODROMO-INTERNACIONAL-DO-ALGARVE-89.gif',
  'Rússia GP': 'https://i.postimg.cc/Jh2d95MP/RUSSIA-SOCHI-AUTODROM-93.gif',
  'Singapura GP': 'https://i.postimg.cc/wTQ46p9y/SINGAPURA-MARINA-BAY-STREET-CIRCUIT.gif'
};

export const getCompetitionLogo = (t: string | null) => {
  if (!t) return COMPETITION_LOGOS['Girabola'];
  // Normalização para casos de nomes com variações
  const name = t.trim();
  if (name === 'PremierLeague' || name === 'Premier League') return COMPETITION_LOGOS['Premier League'];
  if (name === 'BundesLiga' || name === 'Bundesliga') return COMPETITION_LOGOS['Bundesliga'];
  if (name === 'Liga Nos' || name === 'Liga NOS') return COMPETITION_LOGOS['Liga NOS'];
  if (name === 'Serie A' || name === 'Série A') return COMPETITION_LOGOS['Série A'];
  if (name === 'Eredivisie' || name === 'Holanda Eredivisie') return COMPETITION_LOGOS['Eredivisie'];
  if (name === 'Taça da Alemanha' || name === 'DFB Pokal') return COMPETITION_LOGOS['DFB Pokal'];
  if (name === 'Copa del Rey' || name === 'Taça de Espanha') return COMPETITION_LOGOS['Taça de Espanha'];
  if (name === 'Copa da França' || name === 'Taça de França') return COMPETITION_LOGOS['Taça de França'];
  if (name === 'KNVB Beker' || name === 'Taça da Holanda') return COMPETITION_LOGOS['Taça da Holanda'];
  if (name === 'FA Cup' || name === 'Taça de Inglaterra') return COMPETITION_LOGOS['Taça de Inglaterra'];
  if (name === 'TIM Cup' || name === 'Taça de Itália') return COMPETITION_LOGOS['Taça de Itália'];
  
  // BASKETBALL NORMALIZATION
  if (name === 'Unitel Basket' || name === 'Unitel-Basket') return COMPETITION_LOGOS['Unitel Basket'];
  if (name === 'Liga ACB' || name === 'Liga-ACB') return COMPETITION_LOGOS['Liga ACB'];
  if (name === 'NBA' || name === 'NBA EUA Leste') return COMPETITION_LOGOS['NBA'];
  if (name === 'Jeep Elite') return COMPETITION_LOGOS['Jeep Elite'];
  if (name === 'Basket League') return COMPETITION_LOGOS['Basket League'];
  if (name === 'Serie A Basket') return COMPETITION_LOGOS['Serie A Basket'];
  if (name === 'Liga VTB') return COMPETITION_LOGOS['Liga VTB'];
  if (name === 'BBL Alemanha') return COMPETITION_LOGOS['BBL Alemanha'];
  
  // BASKETBALL CUP NORMALIZATION
  if (name === 'Taça de Angola Basket') return COMPETITION_LOGOS['Taça de Angola Basket'];
  if (name === 'Taça do Rei Basket') return COMPETITION_LOGOS['Taça do Rei Basket'];
  if (name === 'Taça da Rússia Basket') return COMPETITION_LOGOS['Taça da Rússia Basket'];
  if (name === 'Taça da Grécia Basket') return COMPETITION_LOGOS['Taça da Grécia Basket'];
  if (name === 'Taça da Itália Basket') return COMPETITION_LOGOS['Taça da Itália Basket'];
  if (name === 'Taça de França Basket') return COMPETITION_LOGOS['Taça de França Basket'];
  if (name === 'Taça da Alemanha Basket') return COMPETITION_LOGOS['Taça da Alemanha Basket'];
  
  // F1 NORMALIZATION
  if (name === 'Abu Dhabi') return COMPETITION_LOGOS['Abu Dhabi GP'];
  if (name === 'Arábia Saudita') return COMPETITION_LOGOS['Arábia Saudita GP'];
  if (name === 'Austrália') return COMPETITION_LOGOS['Austrália GP'];
  if (name === 'Áustria') return COMPETITION_LOGOS['Áustria GP'];
  if (name === 'Azerbaijão') return COMPETITION_LOGOS['Azerbaijão GP'];
  if (name === 'Bélgica') return COMPETITION_LOGOS['Bélgica GP'];
  if (name === 'Brasil') return COMPETITION_LOGOS['Brasil GP'];
  if (name === 'Canadá') return COMPETITION_LOGOS['Canadá GP'];
  if (name === 'Espanha') return COMPETITION_LOGOS['Espanha GP'];
  if (name === 'EUA') return COMPETITION_LOGOS['EUA GP'];
  if (name === 'França') return COMPETITION_LOGOS['França GP'];
  if (name === 'Grã-Bretanha') return COMPETITION_LOGOS['Grã-Bretanha GP'];
  if (name === 'Holanda') return COMPETITION_LOGOS['Holanda GP'];
  if (name === 'Hungria') return COMPETITION_LOGOS['Hungria GP'];
  if (name === 'Itália (Imola)') return COMPETITION_LOGOS['Itália (Imola) GP'];
  if (name === 'Itália (Monza)') return COMPETITION_LOGOS['Itália (Monza) GP'];
  if (name === 'Japão') return COMPETITION_LOGOS['Japão GP'];
  if (name === 'México') return COMPETITION_LOGOS['México GP'];
  if (name === 'Mónaco') return COMPETITION_LOGOS['Mónaco GP'];
  if (name === 'Portugal') return COMPETITION_LOGOS['Portugal GP'];
  if (name === 'Rússia') return COMPETITION_LOGOS['Rússia GP'];
  if (name === 'Singapura') return COMPETITION_LOGOS['Singapura GP'];
  
  return COMPETITION_LOGOS[name] || COMPETITION_LOGOS['Girabola'];
};

export const GIRABOLA_CLUBS = [
  { name: 'Académica do Lobito', logo: 'https://i.postimg.cc/cHHjmmtP/Academica-do-Lobito.png' },
  { name: 'Baixa de Kassange', logo: 'https://i.postimg.cc/05655GXd/baixa-de-kassange.jpg' },
  { name: 'Bravos do Maquis', logo: 'https://i.postimg.cc/15w9wmQw/Bravos-Maquis.png' },
  { name: '1º de Agosto', logo: 'https://i.postimg.cc/Cx4Srcd8/CD-Primeiro-de-Agosto-(logo).png' },
  { name: 'CR Caála', logo: 'https://i.postimg.cc/XqF0f8TG/CR-Caala.png' },
  { name: 'Cuando Cubango FC', logo: 'https://i.postimg.cc/kXQmDTQV/Cuando-Cubango-FC-Logo.png' },
  { name: 'Desportivo da Huíla', logo: 'https://i.postimg.cc/t49H6FkM/Desportivo-da-Huila.png' },
  { name: 'Ferroviário do Huambo', logo: 'https://i.postimg.cc/HLxDZHft/Ferroviario-do-Huambo.jpg' },
  { name: 'Sagrada Esperança', logo: 'https://i.postimg.cc/FsgMh7vq/GD-Sagrada-Esperanca.png' },
  { name: 'Interclube', logo: 'https://i.postimg.cc/fR810pJr/Interclube.png' },
  { name: 'Progresso do Sambizanga', logo: 'https://i.postimg.cc/xd776mGM/PA-Sambizanga.png' },
  { name: 'Petro de Luanda', logo: 'https://i.postimg.cc/sxPNf0kv/Petro-Luanda.png' },
  { name: 'Santa Rita de Cássia', logo: 'https://i.postimg.cc/wTVGSZcB/Santa-Rita-de-Cassia-FC-Logo.jpg' },
  { name: 'Sporting de Cabinda', logo: 'https://i.postimg.cc/zG2Pfhcx/Sporting-de-Cabinda.png' },
  { name: 'Wiliete de Benguela', logo: 'https://i.postimg.cc/mDCdV52N/wiliete-esport-clube.png' }
];

export const GIRABOLA_MATCHES: Match[] = [
  {
    id: 101,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[11], // Petro Luanda
    teamB: GIRABOLA_CLUBS[3], // 1º de Agosto
    date: "14/05/2026",
    time: "16:00",
    odds: { winA: 2.10, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 102,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[8], // Sagrada Esperança
    teamB: GIRABOLA_CLUBS[9], // Interclube
    date: "14/05/2026",
    time: "16:00",
    odds: { winA: 1.95, draw: 3.20, winB: 3.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 103,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[14], // Wiliete
    teamB: GIRABOLA_CLUBS[0], // Académica do Lobito
    date: "15/05/2026",
    time: "15:30",
    odds: { winA: 1.80, draw: 3.40, winB: 4.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 104,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[2], // Bravos do Maquis
    teamB: GIRABOLA_CLUBS[6], // Desportivo da Huíla
    date: "15/05/2026",
    time: "15:30",
    odds: { winA: 2.20, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const BUNDESLIGA_CLUBS = [
  { name: 'Arminia Bielefeld', logo: 'https://i.postimg.cc/6pSJmFt9/ARMINIA-BIELEFELD.png' },
  { name: 'Augsburg', logo: 'https://i.postimg.cc/PJdBDjzw/AUGSBURG.png' },
  { name: 'Bayer Leverkusen', logo: 'https://i.postimg.cc/sgMb7K7y/BAYER-LEVERKUSEN.png' },
  { name: 'Bayern Munchen', logo: 'https://i.postimg.cc/hv45j0cL/Bayer-Munchen.png' },
  { name: 'Borussia Dortmund', logo: 'https://i.postimg.cc/rygHH7N9/BORUSSIA-DORTMUND.png' },
  { name: 'Borussia M.Gladbach', logo: 'https://i.postimg.cc/rFPPVWb1/BORUSSIA-M-GLADBACH.png' },
  { name: 'Eintracht Frankfurt', logo: 'https://i.postimg.cc/8cntCQyP/EINTRACHT-FRANKFURT.png' },
  { name: 'Freiburg', logo: 'https://i.postimg.cc/g0P4jKKM/FREIBURG.png' },
  { name: 'Hertha BSC', logo: 'https://i.postimg.cc/ydLTfCCR/HERTHA-BSC.png' },
  { name: 'Hoffenheim', logo: 'https://i.postimg.cc/DfYgLhgn/HOFFENHEIM.png' },
  { name: 'FC Köln', logo: 'https://i.postimg.cc/wv4hX5Dr/KOLN.png' },
  { name: 'RB Leipzig', logo: 'https://i.postimg.cc/h4wLhrDd/Leipzig.png' },
  { name: 'Mainz 05', logo: 'https://i.postimg.cc/MpJ1mpjx/MAINZ-05.png' },
  { name: 'Schalke 04', logo: 'https://i.postimg.cc/d0qdgNB9/SCHALKE-04.png' },
  { name: 'Stuttgart', logo: 'https://i.postimg.cc/1tdqnmQR/STUTTGART.png' },
  { name: 'Union Berlin', logo: 'https://i.postimg.cc/7b8J9KhB/UNION-BERLIN.png' },
  { name: 'Werder Bremen', logo: 'https://i.postimg.cc/BZdmRs1N/WERDER-BREMEN.png' },
  { name: 'Wolfsburg', logo: 'https://i.postimg.cc/qvGQt3Zd/Wolfs-Burg.png' }
];

export const BUNDESLIGA_MATCHES: Match[] = [
  {
    id: 201,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[3], // Bayern
    teamB: BUNDESLIGA_CLUBS[4], // Dortmund
    date: "16/05/2026",
    time: "17:30",
    odds: { winA: 1.75, draw: 3.90, winB: 4.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 202,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[11], // Leipzig
    teamB: BUNDESLIGA_CLUBS[2], // Leverkusen
    date: "16/05/2026",
    time: "14:30",
    odds: { winA: 2.10, draw: 3.40, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 203,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[6], // Frankfurt
    teamB: BUNDESLIGA_CLUBS[5], // Gladbach
    date: "17/05/2026",
    time: "16:30",
    odds: { winA: 2.00, draw: 3.30, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 204,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[17], // Wolfsburg
    teamB: BUNDESLIGA_CLUBS[16], // Werder Bremen
    date: "17/05/2026",
    time: "14:30",
    odds: { winA: 1.85, draw: 3.50, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const LALIGA_CLUBS = [
  { name: 'Athletic Club', logo: 'https://i.postimg.cc/Czyyzfv5/ATHLETIC-CLUB.png' },
  { name: 'Atlético Madrid', logo: 'https://i.postimg.cc/0bggbJtz/ATLETICO-MADRID.png' },
  { name: 'Barcelona', logo: 'https://i.postimg.cc/MvkkvjsM/BARCELONA.png' },
  { name: 'Cádiz', logo: 'https://i.postimg.cc/nC88CQdQ/CADIZ.png' },
  { name: 'Celta de Vigo', logo: 'https://i.postimg.cc/HVGGV7SJ/CELTA-DE-VIGO.png' },
  { name: 'Deportivo Alavés', logo: 'https://i.postimg.cc/zVmmVRdW/DEPORTIVO-ALAVES.png' },
  { name: 'Eibar', logo: 'https://i.postimg.cc/mtxxtFd7/EIBAR.png' },
  { name: 'Elche', logo: 'https://i.postimg.cc/jLVVLJ8H/ELCHE.png' },
  { name: 'Getafe', logo: 'https://i.postimg.cc/D8VV8bCQ/GETAFE.png' },
  { name: 'Granada', logo: 'https://i.postimg.cc/rK66KthN/GRANADA.png' },
  { name: 'Huesca', logo: 'https://i.postimg.cc/XpMMpy2g/HUESCA.png' },
  { name: 'Levante', logo: 'https://i.postimg.cc/dLGbdtXy/LEVANTE.png' },
  { name: 'Osasuna', logo: 'https://i.postimg.cc/yk0M9Y59/OSASUNA.png' },
  { name: 'Real Betis', logo: 'https://i.postimg.cc/JGjfJ4gj/REAL-BETIS.png' },
  { name: 'Real Madrid', logo: 'https://i.postimg.cc/6yCkR5Sd/REAL-MADRID.png' },
  { name: 'Real Sociedad', logo: 'https://i.postimg.cc/BX2rDQyC/REAL-SOCIEDAD.png' },
  { name: 'Real Valladolid', logo: 'https://i.postimg.cc/gn3CRk5N/REAL-VALLADOLID.png' },
  { name: 'Sevilha', logo: 'https://i.postimg.cc/BX2rDQyh/SEVILHA.png' },
  { name: 'Valencia', logo: 'https://i.postimg.cc/SJcB8N5T/VALENCIA.png' },
  { name: 'Villarreal', logo: 'https://i.postimg.cc/hfVkxPwZ/VILLARREAL.png' }
];

export const LALIGA_MATCHES: Match[] = [
  {
    id: 301,
    league: "La Liga",
    teamA: LALIGA_CLUBS[14], // Real Madrid
    teamB: LALIGA_CLUBS[2], // Barcelona
    date: "18/05/2026",
    time: "20:00",
    odds: { winA: 2.15, draw: 3.50, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 302,
    league: "La Liga",
    teamA: LALIGA_CLUBS[1], // Atletico Madrid
    teamB: LALIGA_CLUBS[17], // Sevilha
    date: "18/05/2026",
    time: "18:00",
    odds: { winA: 1.80, draw: 3.40, winB: 4.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 303,
    league: "La Liga",
    teamA: LALIGA_CLUBS[15], // Real Sociedad
    teamB: LALIGA_CLUBS[0], // Athletic Club
    date: "19/05/2026",
    time: "19:00",
    odds: { winA: 2.10, draw: 3.20, winB: 3.60 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 304,
    league: "La Liga",
    teamA: LALIGA_CLUBS[19], // Villarreal
    teamB: LALIGA_CLUBS[18], // Valencia
    date: "19/05/2026",
    time: "17:00",
    odds: { winA: 1.95, draw: 3.30, winB: 3.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const LIGUE1_CLUBS = [
  { name: 'Angers', logo: 'https://i.postimg.cc/Xrd94trv/ANGERS.png' },
  { name: 'Bordeaux', logo: 'https://i.postimg.cc/CRkbS9RZ/BORDEAUX.png' },
  { name: 'Brest', logo: 'https://i.postimg.cc/QF1chvF5/BREST.png' },
  { name: 'Dijon', logo: 'https://i.postimg.cc/Wdg0TxdG/DIJON.png' },
  { name: 'Lens', logo: 'https://i.postimg.cc/9DZyCsDw/LENS.png' },
  { name: 'Lille', logo: 'https://i.postimg.cc/JsZjMSsq/LILLE.png' },
  { name: 'Lorient', logo: 'https://i.postimg.cc/Ffv3RGSJ/LORIENT.png' },
  { name: 'Metz', logo: 'https://i.postimg.cc/1gSwtMFq/METZ.png' },
  { name: 'Monaco', logo: 'https://i.postimg.cc/B83H6NFD/MONACO.png' },
  { name: 'Montpellier', logo: 'https://i.postimg.cc/mc4CDV9Q/MONTPELLIER.png' },
  { name: 'Nantes', logo: 'https://i.postimg.cc/HJmXx3MX/NANTES.png' },
  { name: 'Nice', logo: 'https://i.postimg.cc/SX4CsV9f/NICE.png' },
  { name: 'Nimes', logo: 'https://i.postimg.cc/yJKcdnRP/NIMES.png' },
  { name: 'Lyon', logo: 'https://i.postimg.cc/QBD1tS7S/OLYMPIQUE-LYONNAIS.png' },
  { name: 'Marseille', logo: 'https://i.postimg.cc/wtzLvFN0/OLYMPIQUE-MARSEILLE.png' },
  { name: 'PSG', logo: 'https://i.postimg.cc/942ZM19L/PSG.png' },
  { name: 'Reims', logo: 'https://i.postimg.cc/mc4CDV9d/REIMS.png' },
  { name: 'Rennes', logo: 'https://i.postimg.cc/WDVg3SZW/RENNES.png' },
  { name: 'Saint-Étienne', logo: 'https://i.postimg.cc/KKbBzQTp/SAINT-ETIENNE.png' },
  { name: 'Strasbourg', logo: 'https://i.postimg.cc/xkQMCgmF/STRASBOURG.png' }
];

export const LIGUE1_MATCHES: Match[] = [
  {
    id: 401,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[15], // PSG
    teamB: LIGUE1_CLUBS[13], // Lyon
    date: "20/05/2026",
    time: "20:00",
    odds: { winA: 1.45, draw: 4.50, winB: 6.00 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 402,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[14], // Marseille
    teamB: LIGUE1_CLUBS[8], // Monaco
    date: "20/05/2026",
    time: "18:00",
    odds: { winA: 2.30, draw: 3.40, winB: 2.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 403,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[5], // Lille
    teamB: LIGUE1_CLUBS[17], // Rennes
    date: "21/05/2026",
    time: "19:00",
    odds: { winA: 2.10, draw: 3.20, winB: 3.60 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 404,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[11], // Nice
    teamB: LIGUE1_CLUBS[4], // Lens
    date: "21/05/2026",
    time: "17:00",
    odds: { winA: 2.20, draw: 3.10, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const EREDIVISIE_CLUBS = [
  { name: 'ADO Den Haag', logo: 'https://i.postimg.cc/xJhdkT7D/ADO.png' },
  { name: 'Ajax', logo: 'https://i.postimg.cc/N9S0yfVQ/AJAX.png' },
  { name: 'AZ Alkmaar', logo: 'https://i.postimg.cc/ftpb3TFT/AZ.png' },
  { name: 'Emmen', logo: 'https://i.postimg.cc/tZwg1Cfs/EMMEN.png' },
  { name: 'Feyenoord', logo: 'https://i.postimg.cc/cg2JK4j6/FEYENOORD.png' },
  { name: 'Fortuna Sittard', logo: 'https://i.postimg.cc/RJtZwx5C/FORTUNA.png' },
  { name: 'Groningen', logo: 'https://i.postimg.cc/wRNjDY8j/GRONINGEN.png' },
  { name: 'Heerenveen', logo: 'https://i.postimg.cc/q6Kv2HVq/HEERENVEEN.png' },
  { name: 'Heracles Almelo', logo: 'https://i.postimg.cc/7JzZSr85/HERACLES.png' },
  { name: 'PSV Eindhoven', logo: 'https://i.postimg.cc/q6Kv2HV6/PSV.png' },
  { name: 'Sparta Rotterdam', logo: 'https://i.postimg.cc/zHhGTYZR/SPARTA.png' },
  { name: 'Twente', logo: 'https://i.postimg.cc/p5jLKMbz/TWENTE.png' },
  { name: 'Utrecht', logo: 'https://i.postimg.cc/4HcxpRkz/UTRECHT.png' },
  { name: 'VVV-Venlo', logo: 'https://i.postimg.cc/y3R80C4X/VENLO.png' },
  { name: 'Vitesse', logo: 'https://i.postimg.cc/y3R80C4y/VITESSE.png' },
  { name: 'RKC Waalwijk', logo: 'https://i.postimg.cc/FkSH0X5p/WAALWIJK.png' },
  { name: 'Willem II', logo: 'https://i.postimg.cc/0KSy71Rc/WILLEM-II.png' },
  { name: 'PEC Zwolle', logo: 'https://i.postimg.cc/zHhGTYZx/ZWOLLE.png' }
];

export const EREDIVISIE_MATCHES: Match[] = [
  {
    id: 501,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[1], // Ajax
    teamB: EREDIVISIE_CLUBS[9], // PSV
    date: "22/05/2026",
    time: "20:00",
    odds: { winA: 1.90, draw: 3.60, winB: 3.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 502,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[4], // Feyenoord
    teamB: EREDIVISIE_CLUBS[2], // AZ
    date: "22/05/2026",
    time: "18:30",
    odds: { winA: 2.10, draw: 3.40, winB: 3.30 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 503,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[11], // Twente
    teamB: EREDIVISIE_CLUBS[12], // Utrecht
    date: "23/05/2026",
    time: "19:00",
    odds: { winA: 2.20, draw: 3.20, winB: 3.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 504,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[14], // Vitesse
    teamB: EREDIVISIE_CLUBS[7], // Heerenveen
    date: "23/05/2026",
    time: "17:00",
    odds: { winA: 2.05, draw: 3.30, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const PREMIERLEAGUE_CLUBS = [
  { name: 'Arsenal', logo: 'https://i.postimg.cc/sG4bkT5P/ARSENAL.png' },
  { name: 'Aston Villa', logo: 'https://i.postimg.cc/gLH1Cgv9/ASTON-VILLA.png' },
  { name: 'Brighton', logo: 'https://i.postimg.cc/dZjgb5G9/BRIGHTON-HOVE-ALBION.png' },
  { name: 'Burnley', logo: 'https://i.postimg.cc/y3y2ML05/BURNLEY.png' },
  { name: 'Chelsea', logo: 'https://i.postimg.cc/0K0hTV7W/CHELSEA.png' },
  { name: 'Crystal Palace', logo: 'https://i.postimg.cc/RJL2kgc9/CRYSTAL-PALACE.png' },
  { name: 'Everton', logo: 'https://i.postimg.cc/ctBPpFQd/EVERTON.png' },
  { name: 'Fulham', logo: 'https://i.postimg.cc/WqwxB5M2/FULHAM.png' },
  { name: 'Leeds United', logo: 'https://i.postimg.cc/5QSDhsw9/LEEDS-UNITED.png' },
  { name: 'Leicester City', logo: 'https://i.postimg.cc/gry9L21X/LEICESTER-CITY.png' },
  { name: 'Liverpool', logo: 'https://i.postimg.cc/0rGgKyhK/LIVERPOOL.png' },
  { name: 'Manchester City', logo: 'https://i.postimg.cc/V59y0k2b/MANCHESTER-CITY.png' },
  { name: 'Manchester United', logo: 'https://i.postimg.cc/Thj853Bb/MANCHESTER-UNITED.png' },
  { name: 'Newcastle United', logo: 'https://i.postimg.cc/6TVs4pFR/NEWCASTLE-UNITED.png' },
  { name: 'Sheffield United', logo: 'https://i.postimg.cc/Thj853Bg/SHEFFIELD-UNITED.png' },
  { name: 'Southampton', logo: 'https://i.postimg.cc/NL8h2jZ8/SOUTHAMPTON.png' },
  { name: 'Tottenham Hotspur', logo: 'https://i.postimg.cc/Jt3wHzSc/TOTTENHAM-HOTSPUR.png' },
  { name: 'West Bromwich', logo: 'https://i.postimg.cc/w35KRjnF/WEST-BROMWICH-ALBION.png' },
  { name: 'West Ham United', logo: 'https://i.postimg.cc/Thj853Bt/WEST-HAM-UNITED.png' },
  { name: 'Wolverhampton', logo: 'https://i.postimg.cc/Rq1rJZ2P/WOLVERHAMPTON-WANDERERS.png' }
];

export const PREMIERLEAGUE_MATCHES: Match[] = [
  {
    id: 601,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[12], // Man Utd
    teamB: PREMIERLEAGUE_CLUBS[10], // Liverpool
    date: "24/05/2026",
    time: "16:30",
    odds: { winA: 2.80, draw: 3.50, winB: 2.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 602,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[11], // Man City
    teamB: PREMIERLEAGUE_CLUBS[4], // Chelsea
    date: "24/05/2026",
    time: "19:00",
    odds: { winA: 1.65, draw: 4.20, winB: 5.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 603,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[0], // Arsenal
    teamB: PREMIERLEAGUE_CLUBS[16], // Tottenham
    date: "25/05/2026",
    time: "14:00",
    odds: { winA: 1.95, draw: 3.60, winB: 3.70 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 604,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[18], // West Ham
    teamB: PREMIERLEAGUE_CLUBS[13], // Newcastle
    date: "25/05/2026",
    time: "20:00",
    odds: { winA: 2.45, draw: 3.30, winB: 2.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const SERIEA_CLUBS = [
  { name: 'Atalanta', logo: 'https://i.postimg.cc/B85yLhVJ/ATALANTA.png' },
  { name: 'Benevento', logo: 'https://i.postimg.cc/qtcYhm5M/BENEVENTO.png' },
  { name: 'Bologna', logo: 'https://i.postimg.cc/Jy3gDT20/BOLOGNA.png' },
  { name: 'Cagliari', logo: 'https://i.postimg.cc/06G3MtBQ/CAGLIARI.png' },
  { name: 'Crotone', logo: 'https://i.postimg.cc/4KvM78Sn/CROTONE.png' },
  { name: 'Fiorentina', logo: 'https://i.postimg.cc/B85yLhVX/FIORENTINA.png' },
  { name: 'Genoa', logo: 'https://i.postimg.cc/xkG7Js4X/GENOA.png' },
  { name: 'Inter Milan', logo: 'https://i.postimg.cc/3yj64Lcy/INTERNAZIONALE.png' },
  { name: 'Juventus', logo: 'https://i.postimg.cc/HJ0KcSh8/JUVENTUS.png' },
  { name: 'Lazio', logo: 'https://i.postimg.cc/v17jgPN6/LAZIO.png' },
  { name: 'Milan', logo: 'https://i.postimg.cc/sBP8QnNW/MILAN.png' },
  { name: 'Napoli', logo: 'https://i.postimg.cc/p9Q7h06Q/NAPOLI.png' },
  { name: 'Parma', logo: 'https://i.postimg.cc/06G3MtBD/PARMA.png' },
  { name: 'Roma', logo: 'https://i.postimg.cc/ftwPxxGJ/ROMA.png' },
  { name: 'Sampdoria', logo: 'https://i.postimg.cc/ph2SDDwm/SAMPDORIA.png' },
  { name: 'Sassuolo', logo: 'https://i.postimg.cc/N9gn113y/SASSUOLO.png' },
  { name: 'Spezia', logo: 'https://i.postimg.cc/bDz5QQ7D/SPEZIA.png' },
  { name: 'Torino', logo: 'https://i.postimg.cc/S2yPWWBY/TORINO.png' },
  { name: 'Udinese', logo: 'https://i.postimg.cc/gXY7vvCh/UDINESE.png' },
  { name: 'Verona', logo: 'https://i.postimg.cc/cgszQQpY/VERONA.png' }
];

export const SERIEA_MATCHES: Match[] = [
  {
    id: 701,
    league: "Série A",
    teamA: SERIEA_CLUBS[8], // Juventus
    teamB: SERIEA_CLUBS[7], // Inter
    date: "26/05/2026",
    time: "19:45",
    odds: { winA: 2.40, draw: 3.20, winB: 3.00 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 702,
    league: "Série A",
    teamA: SERIEA_CLUBS[10], // Milan
    teamB: SERIEA_CLUBS[11], // Napoli
    date: "26/05/2026",
    time: "17:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 703,
    league: "Série A",
    teamA: SERIEA_CLUBS[13], // Roma
    teamB: SERIEA_CLUBS[9], // Lazio
    date: "27/05/2026",
    time: "19:45",
    odds: { winA: 2.25, draw: 3.15, winB: 3.30 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 704,
    league: "Série A",
    teamA: SERIEA_CLUBS[0], // Atalanta
    teamB: SERIEA_CLUBS[5], // Fiorentina
    date: "27/05/2026",
    time: "14:00",
    odds: { winA: 1.85, draw: 3.50, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const LIGANOS_CLUBS = [
  { name: 'Belenenses', logo: 'https://i.postimg.cc/Mcs7FVcC/BELENENSES.png' },
  { name: 'Benfica', logo: 'https://i.postimg.cc/9Rrd50Tg/BENFICA.png' },
  { name: 'Boavista', logo: 'https://i.postimg.cc/njC4br7d/BOAVISTA.png' },
  { name: 'Braga', logo: 'https://i.postimg.cc/k6BQ3G8z/BRAGA.png' },
  { name: 'Famalicão', logo: 'https://i.postimg.cc/wy7X8MJG/FAMALICAO.png' },
  { name: 'Farense', logo: 'https://i.postimg.cc/sQvYdxSb/FARENSE.png' },
  { name: 'FC Porto', logo: 'https://i.postimg.cc/r0K1XsWB/FC-PORTO.png' },
  { name: 'Gil Vicente', logo: 'https://i.postimg.cc/9Rrd50Z3/GIL-VICENTE.png' },
  { name: 'Marítimo', logo: 'https://i.postimg.cc/S2J6FRCh/MARITIMO.png' },
  { name: 'Moreirense', logo: 'https://i.postimg.cc/LYntK5LM/MOREIRENSE.png' },
  { name: 'Nacional', logo: 'https://i.postimg.cc/CBzGT5kS/NACIONAL.png' },
  { name: 'Paços de Ferreira', logo: 'https://i.postimg.cc/TLpVM1gT/PACOS-FERREIRA.png' },
  { name: 'Portimonense', logo: 'https://i.postimg.cc/YGh6K0Yr/PORTIMONENSE.png' },
  { name: 'Rio Ave', logo: 'https://i.postimg.cc/wy7X8MLT/RIO-AVE.png' },
  { name: 'Santa Clara', logo: 'https://i.postimg.cc/9Rrd50Zf/SANTA-CLARA.png' },
  { name: 'Sporting CP', logo: 'https://i.postimg.cc/47m6kyVd/SPORTING.png' },
  { name: 'Tondela', logo: 'https://i.postimg.cc/PpPWsJYJ/TONDELA.png' },
  { name: 'Vitória SC', logo: 'https://i.postimg.cc/phpfbrzp/V-GUIMARAES.png' }
];

export const LIGANOS_MATCHES: Match[] = [
  {
    id: 801,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[1], // Benfica
    teamB: LIGANOS_CLUBS[6], // Porto
    date: "28/05/2026",
    time: "20:30",
    odds: { winA: 2.15, draw: 3.30, winB: 3.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 802,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[15], // Sporting
    teamB: LIGANOS_CLUBS[3], // Braga
    date: "28/05/2026",
    time: "18:00",
    odds: { winA: 1.95, draw: 3.40, winB: 3.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 803,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[17], // Vitoria
    teamB: LIGANOS_CLUBS[2], // Boavista
    date: "29/05/2026",
    time: "19:00",
    odds: { winA: 1.85, draw: 3.50, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 804,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[13], // Rio Ave
    teamB: LIGANOS_CLUBS[4], // Famalicao
    date: "29/05/2026",
    time: "17:00",
    odds: { winA: 2.20, draw: 3.10, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const TACADEANGOLA_MATCHES: Match[] = [
  {
    id: 901,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[3], // 1º de Agosto
    teamB: GIRABOLA_CLUBS[11], // Petro Luanda
    date: "30/05/2026",
    time: "16:00",
    odds: { winA: 2.50, draw: 3.10, winB: 2.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 902,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[8], // Sagrada Esperança
    teamB: GIRABOLA_CLUBS[2], // Bravos do Maquis
    date: "30/05/2026",
    time: "15:00",
    odds: { winA: 1.90, draw: 3.20, winB: 4.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 903,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[14], // Wiliete
    teamB: GIRABOLA_CLUBS[9], // Interclube
    date: "31/05/2026",
    time: "15:30",
    odds: { winA: 2.10, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 904,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[0], // Académica do Lobito
    teamB: GIRABOLA_CLUBS[6], // Desportivo da Huíla
    date: "31/05/2026",
    time: "15:30",
    odds: { winA: 2.30, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const TACADAALEMANHA_MATCHES: Match[] = [
  {
    id: 1001,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[3], // Bayern
    teamB: BUNDESLIGA_CLUBS[4], // Dortmund
    date: "01/06/2026",
    time: "20:00",
    odds: { winA: 1.85, draw: 3.70, winB: 3.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 1002,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[11], // Leipzig
    teamB: BUNDESLIGA_CLUBS[6], // Frankfurt
    date: "01/06/2026",
    time: "18:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 1003,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[2], // Leverkusen
    teamB: BUNDESLIGA_CLUBS[5], // Gladbach
    date: "02/06/2026",
    time: "19:00",
    odds: { winA: 1.70, draw: 4.10, winB: 4.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 1004,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[17], // Wolfsburg
    teamB: BUNDESLIGA_CLUBS[15], // Union Berlin
    date: "02/06/2026",
    time: "17:00",
    odds: { winA: 2.20, draw: 3.20, winB: 3.30 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

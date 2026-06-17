import { storageService } from './storageService';

const SIMULATION_MESSAGES = [
  {
    type: 'Taunt',
    title: 'Provocação em Duelo! ⚔️🔥',
    message: 'O utilizador @GelsonDala enviou uma provocação no teu duelo 1 vs 1 Petro vs 1º de Agosto!',
    emoji: '⚔️',
    walletBonus: 0,
  },
  {
    type: 'Performance',
    title: 'Aposta Resolvida! 🏆💰',
    message: 'Ganhaste 4,500 Kz na aposta múltipla do Girabola!',
    emoji: '💰',
    walletBonus: 4500,
  },
  {
    type: 'Performance',
    title: 'Transferência Recebida! 🤝💸',
    message: 'O teu amigo @CarlosMendes transferiu 1,200 Kz para ti.',
    emoji: '🤝',
    walletBonus: 1200,
  },
  {
    type: 'Taunt',
    title: 'Meteu Nojo! ⚽🔊',
    message: 'O utilizador @SofiaLopes enviou o som de futebol [GOLO] para ti na sala do duelo ativo.',
    emoji: '⚽',
    walletBonus: 0,
  },
  {
    type: 'Performance',
    title: 'Duelo Aceite! 🛡️👊',
    message: 'Marta Costa aceitou o teu desafio para Petro de Luanda vs Sagrada Esperança.',
    emoji: '🛡️',
    walletBonus: 0,
  },
];

let simulatorInterval: any = null;
let betResolverInterval: any = null;

// Verifica apostas em aberto que tenham mais de 45 segundos e as resolve
const checkAndResolveBets = () => {
  const bets = storageService.getBets();
  const now = new Date();

  bets.forEach((bet) => {
    if (bet.status === 'Open') {
      const createdTime = new Date(bet.createdAt).getTime();
      const elapsedSeconds = (now.getTime() - createdTime) / 1000;

      // Desportivas abertas são resolvidas após 45 segundos
      if (elapsedSeconds >= 45) {
        const won = Math.random() < 0.6; // 60% chance de vitória
        const finalStatus = won ? 'Won' : 'Lost';

        // Modifica o status da aposta para Won/Lost de forma reativa
        storageService.updateBetStatus(bet.id, finalStatus);

        const wallet = storageService.getWallet();

        if (won) {
          const odds = bet.odds || (1.85 + Math.random() * 0.75);
          const wonAmount = Math.round(bet.amount * odds);

          // Atualizar carteira
          storageService.updateWallet({
            blocked_balance: Math.max(0, wallet.blocked_balance - bet.amount),
            balance: wallet.balance + wonAmount,
          });

          // Adicionar notificação reativa no sistema
          storageService.addNotification({
            id: `notif_match_won_${bet.id}_${Date.now()}`,
            type: 'Performance',
            title: 'Aposta Ganha! 🎉💰',
            message: `A tua aposta na categoria '${bet.category}' (${bet.market}) foi vencida! Ganhaste Kz ${wonAmount.toLocaleString()} de prémio.`,
            emoji: '🎉',
            challengeId: bet.id,
            createdAt: now.toISOString(),
            isRead: false,
          });
        } else {
          // Atualizar carteira deduzindo saldo bloqueado
          storageService.updateWallet({
            blocked_balance: Math.max(0, wallet.blocked_balance - bet.amount),
          });

          // Notificação de perda
          storageService.addNotification({
            id: `notif_match_lost_${bet.id}_${Date.now()}`,
            type: 'Performance',
            title: 'Aposta Resolvida 📉⚽',
            message: `A tua aposta de Kz ${bet.amount.toLocaleString()} na categoria '${bet.category}' (${bet.market}) foi resolvida como Não Vencedora.`,
            emoji: '📉',
            challengeId: bet.id,
            createdAt: now.toISOString(),
            isRead: false,
          });
        }
      }
    }
  });
};

export const startNotificationSimulator = () => {
  if (simulatorInterval) return;

  // Iniciar varredura dinâmica de apostas a cada 5 segundos
  betResolverInterval = setInterval(checkAndResolveBets, 5000);

  // Iniciar um ciclo recorrente a cada 45 a 70 segundos para simular atividade viva
  const triggerNext = () => {
    const delay = 45000 + Math.random() * 25000; // Entre 45s e 70s
    
    simulatorInterval = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SIMULATION_MESSAGES.length);
      const template = SIMULATION_MESSAGES[randomIndex];
      
      const now = new Date();
      
      storageService.addNotification({
        id: `sim_notif_${now.getTime()}`,
        type: template.type as any,
        title: template.title,
        message: template.message,
        emoji: template.emoji,
        challengeId: `chall_${now.getTime()}`,
        createdAt: now.toISOString(),
        isRead: false,
      });

      if (template.walletBonus > 0) {
        const wallet = storageService.getWallet();
        storageService.updateWallet({
          balance: wallet.balance + template.walletBonus,
        });
      }

      triggerNext();
    }, delay);
  };

  triggerNext();
};

export const stopNotificationSimulator = () => {
  if (simulatorInterval) {
    clearTimeout(simulatorInterval);
    simulatorInterval = null;
  }
  if (betResolverInterval) {
    clearInterval(betResolverInterval);
    betResolverInterval = null;
  }
};

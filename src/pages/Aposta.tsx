import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, CircleDot as Football, Calendar, Trophy, Copy, CheckCircle2, AlertCircle, X, Loader2, Plus, Users, Shield, Check, ChevronDown, Trash2, List, Share2, Mail, MessageSquare, Heart, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

import { MATCH_DATA, COMPETITION_LOGOS, getCompetitionLogo, GIRABOLA_MATCHES, BUNDESLIGA_MATCHES, LALIGA_MATCHES, LIGUE1_MATCHES, EREDIVISIE_MATCHES, PREMIERLEAGUE_MATCHES, SERIEA_MATCHES, LIGANOS_MATCHES, TACADEANGOLA_MATCHES, TACADAALEMANHA_MATCHES } from '../constants';
import { Match, Wallet as WalletType, UserProfile, Bet, FavoriteItem } from '../types';
import { storageService } from '../services/storageService';

const ClassificationTable = ({ 
  league, 
  homeTeam, 
  awayTeam, 
  onBack 
}: { 
  league: string, 
  homeTeam: string, 
  awayTeam: string, 
  onBack: () => void 
}) => {
  const mockTable = [
    { pos: 1, team: 'Petro Luanda', p: 12, w: 4, d: 0, l: 0, pts: 12 },
    { pos: 2, team: '1º de Agosto', p: 12, w: 3, d: 1, l: 0, pts: 10 },
    { pos: 3, team: 'Sagrada Esperança', p: 12, w: 3, d: 0, l: 1, pts: 9 },
    { pos: 4, team: 'Wiliete SC', p: 12, w: 2, d: 1, l: 1, pts: 7 },
    { pos: 5, team: 'FC Bravos do Maquis', p: 12, w: 2, d: 0, l: 2, pts: 6 },
    { pos: 6, team: 'Interclube', p: 12, w: 1, d: 2, l: 1, pts: 5 },
    { pos: 7, team: 'Desportivo Lunda Sul', p: 12, w: 1, d: 1, l: 2, pts: 4 },
    { pos: 8, team: 'Académica Lobito', p: 12, w: 1, d: 0, l: 3, pts: 3 },
  ];

  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="bg-[#091747] text-white p-5 rounded-[2rem] flex items-center justify-between shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#FFB10A]/10 rounded-full blur-2xl" />
        <h4 className="text-[11px] font-black uppercase tracking-widest italic flex items-center gap-2 relative z-10">
          <Trophy className="w-4 h-4 text-[#FFB10A]" />
          Tabela: {league}
        </h4>
      </div>
      
      <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-gray-50/80 border-b-2 border-gray-100">
              <th className="px-4 py-4 text-left font-black text-gray-400 uppercase tracking-tighter">#</th>
              <th className="px-2 py-4 text-left font-black text-gray-400 uppercase tracking-tighter">Equipa</th>
              <th className="px-2 py-4 text-center font-black text-gray-400 uppercase tracking-tighter">Pts</th>
            </tr>
          </thead>
          <tbody>
            {mockTable.map((row, i) => {
              const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
              const rowTeam = normalize(row.team);
              const home = normalize(homeTeam);
              const away = normalize(awayTeam);
              
              const isMatchTeam = rowTeam.includes(home) || rowTeam.includes(away) || home.includes(rowTeam) || away.includes(rowTeam);
              
              return (
                <tr key={i} className={cn(
                  "border-b border-gray-50 transition-colors", 
                  isMatchTeam ? "bg-orange-50" : (i % 2 === 0 ? "bg-white" : "bg-gray-50/20")
                )}>
                  <td className="px-4 py-4 font-black text-[#091747] italic">{row.pos}º</td>
                  <td className="px-2 py-4 font-bold text-gray-900 uppercase tracking-tight">
                    <div className="flex items-center gap-2">
                      {row.team}
                      {isMatchTeam && <div className="w-1.5 h-1.5 rounded-full bg-[#FFB10A] animate-pulse" />}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-black text-[#091747]">{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <button 
          onClick={onBack}
          className="w-full bg-[#091747] text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-black transition-all uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Detalhes
        </button>
      </div>
    </div>
  );
};

const MatchCard = React.memo(({ match, onClick }: { match: Match, onClick: (m: Match) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => onClick(match)}
      className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 cursor-pointer hover:border-[#FFB10A] transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#364153]">
          <Football className="w-4 h-4 text-[#FFB10A]" />
          <span>{match.league}</span>
        </div>
        {match.status === 'ao_vivo' && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            AO VIVO
          </span>
        )}
        {match.status === 'terminou' && (
          <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            TERMINOU
          </span>
        )}
        {match.status === 'breve' && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            BREVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-col items-center flex-1">
          <img src={match.teamA.logo} alt={match.teamA.name} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2" />
          <span className="font-bold text-gray-800 text-center text-sm md:text-base">{match.teamA.name}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mt-2 text-[10px] md:text-xs text-center text-[#364153] font-bold bg-white border border-gray-200 px-2 py-1 rounded">
            <Calendar className="w-3 h-3 inline mr-1 text-[#FFB10A]" />
            {match.date} • {match.time}
          </div>
        </div>

        <div className="flex flex-col items-center flex-1">
          <img src={match.teamB.logo} alt={match.teamB.name} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2" />
          <span className="font-bold text-gray-800 text-center text-sm md:text-base">{match.teamB.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {[
          { label: match.scoreA !== undefined ? match.scoreA.toString() : '', odd: match.odds.winA },
          { label: '-', odd: match.odds.draw },
          { label: match.scoreB !== undefined ? match.scoreB.toString() : '', odd: match.odds.winB }
        ].map((option, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl border border-gray-200 bg-white min-h-[4.5rem]">
            <span className={cn(
              "text-center line-clamp-1 h-full flex items-center justify-center",
              option.label !== '' ? "text-2xl font-black text-[#091747]" : "text-[10px] font-bold text-[#364153]"
            )}>
              {option.label}
            </span>
            {option.label !== ':' && <span className="font-bold text-gray-800"></span>}
          </div>
        ))}
      </div>

      <button 
        id={`match-entrar-${match.id}`}
        className="w-full bg-[#FFB10A] hover:bg-[#FFC000] text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
      >
        Entrar
      </button>
    </motion.div>
  );
});

MatchCard.displayName = 'MatchCard';

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  activeTab: string;
}

const BettingModal = ({ isOpen, onClose, match, activeTab }: BettingModalProps) => {
  const [betAction, setBetAction] = React.useState<'create' | 'join' | 'my_bets' | 'bet_details' | null>(null);
  const [selectedBetId, setSelectedBetId] = React.useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState<string | null>(null);
  const [createStep, setCreateStep] = React.useState<'password' | 'selection' | 'details'>('selection');
  const [createPassword, setCreatePassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [selectedMarketsList, setSelectedMarketsList] = React.useState<(string | null)[]>(Array(10).fill(''));
  const [createdCode, setCreatedCode] = React.useState('');
  const [betValue, setBetValue] = React.useState('0');
  const [selectedMarket, setSelectedMarket] = React.useState('Vitória A');
  const [roomName, setRoomName] = React.useState('');
  const [maxParticipants, setMaxParticipants] = React.useState('2');
  const [roomCodeInput, setRoomCodeInput] = React.useState('');
  const [roomNameInput, setRoomNameInput] = React.useState('');
  const [joiningBet, setJoiningBet] = React.useState<Bet | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [autoConfirmNacional, setAutoConfirmNacional] = React.useState(false);
  const [showClassification, setShowClassification] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [error, setError] = React.useState('');
  const [selectedUserView, setSelectedUserView] = React.useState<string>('me');
  const inscribedUsers = React.useMemo(() => [
    { id: '1', name: 'João Silva', picks: ['A', 'X', 'B', 'A', 'X', 'B', 'A', 'X', 'B', 'A'] },
    { id: '2', name: 'Maria Santos', picks: ['B', 'B', 'A', 'X', 'A', 'B', 'X', 'A', 'B', 'X'] },
    { id: '3', name: 'Carlos Pereira', picks: ['X', 'A', 'X', 'B', 'B', 'A', 'A', 'X', 'B', 'B'] }
  ], []);

  const favoriteId = React.useMemo(() => match ? `match-${match.id}` : '', [match?.id]);

  React.useEffect(() => {
    if (!match) return;
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some((f: FavoriteItem) => f.id === favoriteId));
    };
    updateFavStatus();
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, [favoriteId, match]);

  const toggleFavorite = () => {
    if (!match) return;
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      // Find category from path or context if possible, otherwise use match.league
      const pathParts = window.location.pathname.split('/');
      const category = pathParts[pathParts.length - 1] || 'futebol';
      
      storageService.saveFavorite({
        id: favoriteId,
        title: `${match.teamA.name} vs ${match.teamB.name}`,
        sub: `Aposta: ${match.league}`,
        type: 'practice',
        path: `/aposta/${category}?matchId=${match.id}`
      });
      setIsFavorited(true);
    }
  };

  // Reset action when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setBetAction(activeTab === 'Nacional' ? 'create' : null);
      setCreateStep('selection');
      setSelectedMarketsList(activeTab === 'Nacional' ? Array(10).fill('') : Array(10).fill(''));
      setError('');
      setJoiningBet(null);
      setIsSuccess(false);
      setBetValue('1000');
      setRoomName('');
      setRoomNameInput('');
      setAutoConfirmNacional(false);
      setShowClassification(false);
    }
  }, [isOpen, activeTab]);

  if (!match) return null;

  const steps = activeTab === 'Privado' ? ['password', 'selection', 'details'] : (activeTab === '1 vs 1' ? ['password', 'details'] : ['details']);
  const currentStepIndex = steps.indexOf(createStep);

  const matchHeader = (
    <div className="flex flex-col gap-6 py-6 px-1 mb-2 shrink-0">
      {/* Competiton Logo Header */}
      <div className="flex justify-center mb-4">
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src={getCompetitionLogo(match.league)} 
          alt={match.league}
          className="h-24 w-24 md:h-28 md:w-28 object-contain"
        />
      </div>
      <div className="flex items-center justify-around gap-2">
        <div className="flex flex-col items-center flex-1 max-w-[120px]">
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-gray-50 rounded-2xl p-2 mb-3 shadow-inner">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={match.teamA.logo} 
              alt={match.teamA.name} 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="font-bold text-gray-900 text-center text-[10px] uppercase tracking-tight leading-tight line-clamp-2">{match.teamA.name}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="px-3 py-1 bg-orange-50 rounded-full border border-orange-100 mb-1">
            <span className="text-[10px] text-[#FFB10A] font-black uppercase tracking-[0.1em]">
              VS
            </span>
          </div>
          <div className="text-xs text-gray-500 font-bold bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            {match.time}
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 max-w-[120px]">
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-gray-50 rounded-2xl p-2 mb-3 shadow-inner">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={match.teamB.logo} 
              alt={match.teamB.name} 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="font-bold text-gray-900 text-center text-[10px] uppercase tracking-tight leading-tight line-clamp-2">{match.teamB.name}</span>
        </div>
      </div>
    </div>
  );

  const handleBet = () => {
    const wallet = storageService.getWallet();
    const amount = activeTab === 'Nacional' ? 1000 : parseInt(betValue);

    if (betAction === 'join') {
      if (!roomCodeInput || !roomNameInput) {
        setError('Preencha o nome da sala e a senha!');
        return;
      }

      // Se ainda não encontramos a aposta, procuramos
      if (!joiningBet) {
        const allBets = storageService.getBets();
        const existingBet = allBets.find(b => 
          b.password === roomCodeInput && 
          b.roomName?.toLowerCase() === roomNameInput.toLowerCase() &&
          b.matchId === match.id && 
          b.category === activeTab
        );

        if (!existingBet) {
          // Fallback para desenvolvimento: cria uma aposta fictícia se não encontrar
          const mockBet = {
            id: `mock-${Date.now()}`,
            matchId: match.id,
            category: activeTab as any,
            market: 'Vitória A',
            amount: parseInt(betValue) || 1000,
            status: 'Open',
            password: roomCodeInput,
            roomName: roomNameInput,
            selectedMarkets: activeTab === 'Privado' ? Array(10).fill('').map((_, i) => i < 3 ? 'A' : null) : undefined, // Mock some markets if Private
            createdAt: new Date().toISOString()
          };
          
          setJoiningBet(mockBet);
          setError('');
          setSelectedMarket('');
          
          if (activeTab === 'Privado' && mockBet.selectedMarkets) {
            const initialList = mockBet.selectedMarkets.map(m => m ? '' : null);
            setSelectedMarketsList(initialList);
          }
          return;
        }

        setError('');
        setJoiningBet(existingBet);
        // Reset selectedMarket when finding a bet to join
        setSelectedMarket('');
        
        if (activeTab === 'Privado' && existingBet.selectedMarkets) {
          // Initialize list with empty strings for indices that have markets in the original bet
          const initialList = existingBet.selectedMarkets.map(m => m ? '' : null);
          setSelectedMarketsList(initialList);
        }
        return;
      }

      // Se já temos a aposta, processamos a entrada (pagamento)
      if (activeTab === '1 vs 1') {
        if (!selectedMarket) {
          setError('Escolhe o teu prognóstico!');
          return;
        }
        if (selectedMarket === joiningBet.market) {
          setError('Deves escolher um resultado diferente do teu amigo!');
          return;
        }
      }

      if (activeTab === 'Privado') {
        const allMarketsFilled = selectedMarketsList.every((res, idx) => res === null || !!res);
        if (!allMarketsFilled) {
          setError('Por favor, preenche todos os prognósticos!');
          return;
        }
      }

      /* REMOVED FOR DEV MODE:
      if (joiningBet.amount > wallet.balance) {
        setError('Saldo insuficiente!');
        return;
      }
      */

      // Entrar na aposta encontrada
      // Removed wallet update for dev mode
      /*
      storageService.updateWallet({ 
        balance: wallet.balance - joiningBet.amount,
        blocked_balance: wallet.blocked_balance + joiningBet.amount
      });
      */

      storageService.saveBet({
        id: Date.now().toString(),
        matchId: match.id,
        category: activeTab as any,
        market: activeTab === '1 vs 1' ? selectedMarket : joiningBet.market,
        amount: joiningBet.amount,
        status: 'Open',
        password: roomCodeInput,
        roomName: roomNameInput,
        selectedMarkets: activeTab === 'Privado' ? selectedMarketsList : undefined,
        createdAt: new Date().toISOString()
      });

      setIsSuccess(true);
      return;
    }

    if (activeTab === 'Privado' && createStep === 'selection') {
      const selectedCount = selectedMarketsList.filter(s => !!s).length;
      if (selectedCount === 0) {
        setError('Seleciona pelo menos 1 mercado!');
        return;
      }
      
      const hasPending = selectedMarketsList.some(s => s === 'PENDING');
      if (hasPending) {
        setError('Por favor, escolhe o resultado (A, X ou B) para todos os mercados selecionados!');
        return;
      }
    }

    if (activeTab === 'Nacional') {
      const selectedCount = selectedMarketsList.filter(s => !!s).length;
      if (selectedCount < 10) {
        setError('Por favor, preenche todos os 10 prognósticos da Rodada!');
        return;
      }
    }

    /* REMOVED FOR DEV MODE:
    if (amount > wallet.balance) {
      setError('Saldo insuficiente!');
      return;
    }
    */

    // Processar Transação
    // Removed wallet update for dev mode
    /*
    storageService.updateWallet({ 
      balance: wallet.balance - amount,
      blocked_balance: wallet.blocked_balance + amount
    });
    */

    storageService.saveBet({
      id: Date.now().toString(),
      matchId: match.id,
      category: activeTab as any,
      market: activeTab === 'Nacional' ? 'Predição 10 Mercados' : selectedMarket,
      amount: amount,
      status: 'Open',
      autoConfirmThreshold: (activeTab === 'Nacional' && autoConfirmNacional) ? 100000 : undefined,
      password: (activeTab === '1 vs 1' || activeTab === 'Privado') ? createPassword : '',
      roomName: (activeTab === '1 vs 1' || activeTab === 'Privado') ? roomName : '',
      selectedMarkets: (activeTab === 'Privado' || activeTab === 'Nacional') ? selectedMarketsList : undefined,
      createdAt: new Date().toISOString()
    });

    setIsSuccess(true);
  };

  const getActionText = () => {
    if (betAction === 'join') {
      return joiningBet ? 'Confirmar e Apostar' : 'Entrar Agora';
    }
    if (activeTab === 'Nacional') return 'Submeter Rodada';
    return 'Finalizar Aposta';
  };

  const getActionClass = () => {
    if (betAction === 'join') {
      return joiningBet ? "bg-green-600" : "bg-blue-600";
    }
    return "bg-[#FFB10A]";
  };

  const renderContent = () => {
    if (showClassification) {
      return (
        <ClassificationTable 
          league={match.league} 
          homeTeam={match.teamA.name} 
          awayTeam={match.teamB.name}
          onBack={() => setShowClassification(false)}
        />
      );
    }

    if (isSuccess) {
      const shareText = `Vem jogar no Duet Académico!\nSala: ${roomName || '---'}\nSenha: ${createPassword || '---'}\nJogo: ${match.teamA.name} vs ${match.teamB.name}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      const mailUrl = `mailto:?subject=Convite para Desafio Duet&body=${encodeURIComponent(shareText)}`;

      return (
        <div className="flex flex-col items-center py-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-[2.5rem] bg-green-50 flex items-center justify-center border-4 border-white relative z-10 shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-green-500 stroke-[3px]" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-green-400 rounded-full blur-3xl -z-10"
              />
            </div>
          </motion.div>
          
          <h3 className="text-2xl font-black text-[#091747] text-center px-4 uppercase tracking-tighter italic leading-none">
            {betAction === 'join' ? 'Desafio Aceite!' : 'Rodada Lançada!'}
          </h3>
          <p className="text-[10px] text-gray-400 mt-4 font-bold text-center px-10 leading-relaxed uppercase tracking-widest">
            {activeTab === '1 vs 1' && betAction === 'create' 
              ? 'O teu duelo está ativo. Partilha os dados com o teu adversário para começar!'
              : 'Informação registada com sucesso. Acompanha o teu prémio no histórico.'}
          </p>

          {(activeTab === 'Privado' || activeTab === '1 vs 1') && betAction === 'create' && (
            <div className="mt-10 space-y-4 w-full">
              <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 shadow-inner relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-[#FFB10A]/5 rounded-full blur-2xl" />
                <p className="text-[9px] text-[#FFB10A] uppercase font-black tracking-[0.2em] text-center mb-6 italic">Acesso à Sala</p>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Sala</span>
                    <span className="text-xs font-black text-[#091747] uppercase">{roomName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Senha</span>
                    <span className="text-xl font-mono font-black text-[#091747] tracking-[0.2em]">{createPassword}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(shareText);
                    // Add some feedback here if needed
                  }}
                  className="w-full h-16 rounded-2xl bg-white flex items-center justify-center gap-4 text-[#091747] active:scale-95 transition-all font-black uppercase text-[10px] tracking-widest border border-gray-200 shadow-sm"
                >
                  <Copy className="w-5 h-5 text-[#FFB10A]" />
                  Copiar Dados
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </a>
                <a 
                  href={mailUrl}
                  className="flex items-center justify-center gap-2 bg-[#091747] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  E-mail
                </a>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col gap-3 mt-12">
            <Link 
              to="/historico" 
              className="w-full bg-[#FFB10A] text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-[#FFC000] transition-all uppercase tracking-widest text-xs shadow-lg shadow-[#FFB10A]/30"
            >
              <Trophy className="w-5 h-5 text-white" />
              Ver Histórico
            </Link>
            <button 
              onClick={onClose}
              className="w-full bg-white border-2 border-gray-100 text-gray-400 font-black py-5 rounded-[1.5rem] hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      );
    }

    // Initial action selection
    if (!betAction) {
      if (activeTab === 'Nacional') {
        setBetAction('create');
        return null;
      }
      const userBets = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);

      return (
        <div className="flex flex-col gap-4 py-4">
          <button 
            onClick={() => {
              setBetAction('create');
              if (activeTab === 'Privado' || activeTab === '1 vs 1') setCreateStep('password');
              else setCreateStep('details');
            }}
            className="group flex items-center gap-5 p-6 bg-white border border-gray-200 rounded-[2rem] hover:border-[#FFB10A] transition-all hover:bg-orange-50/50"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FFB10A] group-hover:bg-[#FFB10A] group-hover:text-white transition-all">
              <Plus className="w-8 h-8 stroke-[3px]" />
            </div>
            <div className="text-left">
              <h4 className="font-black text-[#091747] text-xl uppercase tracking-tighter italic">Criar {activeTab === '1 vs 1' ? 'Duelo' : 'Sala'}</h4>
              <p className="text-[10px] text-gray-800 font-black uppercase tracking-widest mt-1">Lança um desafio novo</p>
            </div>
          </button>
          <button 
            onClick={() => setBetAction('join')}
            className="group flex items-center gap-5 p-6 bg-white border border-gray-200 rounded-[2rem] hover:border-blue-500 transition-all hover:bg-blue-50/50"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Users className="w-8 h-8 stroke-[3px]" />
            </div>
            <div className="text-left">
              <h4 className="font-black text-[#091747] text-xl uppercase tracking-tighter italic">Entrar com Senha</h4>
              <p className="text-[10px] text-gray-800 font-black uppercase tracking-widest mt-1">Aceita um convite direto</p>
            </div>
          </button>

          {userBets.length > 0 && (
            <button 
              onClick={() => setBetAction('my_bets')}
              className="group flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-green-500 transition-all hover:bg-green-50"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                <Trophy className="w-8 h-8 stroke-[2px]" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-[#091747] text-xl uppercase tracking-tighter italic">Tuas Apostas</h4>
                  <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-xl">{userBets.length}</span>
                </div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Vê o estado dos teus duelos</p>
              </div>
            </button>
          )}
        </div>
      );
    }

    if (showDeleteConfirm) {
      const bet = storageService.getBets().find(b => b.id === showDeleteConfirm);
      
      const handleDelete = () => {
        if (showDeleteConfirm) {
          storageService.deleteBet(showDeleteConfirm, true);
          setShowDeleteConfirm(null);
          
          // If no more bets for this match/category, go back to main actions
          const remaining = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);
          if (remaining.length === 0) setBetAction(null);
        }
      };

      return (
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-gray-900 text-center mb-2 uppercase italic tracking-tighter">Eliminar Aposta?</h3>
          <p className="text-sm text-gray-900 text-center mb-8 px-6 font-bold uppercase tracking-tight leading-relaxed">
            Tens a certeza que pretendes eliminar este desafio? O valor de <span className="text-[#FFB10A]">{bet?.amount.toLocaleString()} KZ</span> será devolvido ao teu saldo.
          </p>
          
          <div className="w-full flex flex-col gap-3">
            <button 
              onClick={handleDelete}
              className="w-full bg-red-600 text-white font-black py-4 rounded-2xl active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Sim, Eliminar
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(null)}
              className="w-full bg-gray-200 text-gray-900 font-black py-4 rounded-2xl active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    if (betAction === 'my_bets') {
      const userBets = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);
      
      return (
        <div className="flex flex-col gap-4 py-2">
          <div className="bg-white border-2 border-green-500 p-4 rounded-2xl mb-2">
            <h4 className="text-xs font-black text-green-700 mb-1 uppercase italic">Tuas Apostas Ativas</h4>
            <p className="text-[10px] text-gray-900 font-black uppercase tracking-tight">Vê os teus desafios ou elimina os que não queres</p>
          </div>
          <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {userBets.map((bet) => {
              const betMatch = MATCH_DATA.find(m => m.id === bet.matchId) || match;
              
              return (
                <div
                  key={bet.id}
                  className="group flex flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-500 transition-all text-left"
                >
                  <div 
                    onClick={() => {
                      setSelectedBetId(bet.id);
                      setBetAction('bet_details');
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                        <Trophy className="w-5 h-5" strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{betMatch.teamA.name} vs {betMatch.teamB.name}</p>
                        <p className="text-xs font-black text-[#091747]">{bet.market}</p>
                        <p className="text-[10px] font-black text-gray-500 uppercase">{new Date(bet.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#FFB10A]">{bet.amount.toLocaleString()} KZ</p>
                      <p className="text-[10px] font-black text-green-600 uppercase italic">Ativo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {bet.autoConfirmThreshold && (
                      <span className="text-[8px] font-black bg-blue-100 text-blue-800 px-2 py-1 rounded-lg uppercase tracking-tight flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5" />
                        Conf. Prémio {bet.autoConfirmThreshold.toLocaleString()}
                      </span>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(bet.id);
                      }}
                      className="flex items-center gap-1 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (betAction === 'bet_details') {
      const bet = storageService.getBets().find(b => b.id === selectedBetId);
      if (!bet) return null;

      return (
        <div className="flex flex-col gap-6 py-2 pb-10">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFB10A]" strokeWidth={3} />
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest italic">Resumo do Desafio</span>
              </div>
              <span className="text-[10px] font-black text-[#091747] bg-white px-3 py-1 rounded-full uppercase tracking-widest border-2 border-gray-200">Aberto</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-tighter mb-1">A tua escolha</p>
                <p className="text-sm font-black text-[#091747]">{bet.market}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-tighter mb-1">Valor Apostado</p>
                <p className="text-sm font-black text-[#FFB10A]">{bet.amount.toLocaleString()} KZ</p>
              </div>
            </div>

            {bet.autoConfirmThreshold && (
              <div className="bg-orange-50 p-4 rounded-2xl border-2 border-[#FFB10A]/20 flex items-start gap-2 mb-6">
                <Shield className="w-4 h-4 text-[#FFB10A] shrink-0" strokeWidth={3} />
                <p className="text-[10px] text-orange-700 font-black uppercase tracking-tight leading-tight">
                  Aposta Inteligente: Só confirma se o prémio ultrapassar {bet.autoConfirmThreshold.toLocaleString()} KZ.
                </p>
              </div>
            )}

            <div className="bg-blue-50/50 p-6 rounded-[2rem] border-2 border-dashed border-blue-400">
              <p className="text-[10px] text-blue-700 uppercase font-black tracking-widest text-center mb-2 italic">Desafio: {bet.roomName || 'Sala Sem Nome'}</p>
              <p className="text-[10px] text-blue-700 uppercase font-black tracking-widest text-center mb-2 italic">Senha do Desafio</p>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-blue-200">
                <span className="text-2xl font-mono font-black text-[#091747] tracking-wider">{bet.password || '---'}</span>
                <button 
                  onClick={() => {
                    if (bet.password) navigator.clipboard.writeText(bet.password);
                  }}
                  className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white active:scale-95 transition-all"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-blue-800 mt-3 font-black text-center px-4 uppercase tracking-tighter">Envia esta senha ao teu colega para ele aceitar o desafio!</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                setBetAction('my_bets');
                setSelectedBetId(null);
              }}
              className="w-full bg-[#091747] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#0d2166] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à Lista
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-white border-2 border-gray-100 text-gray-700 font-bold py-4 rounded-2xl"
            >
              Fechar
            </button>
          </div>
        </div>
      );
    }

    // If joining, show code input first
    if (betAction === 'create' && createStep === 'password') {
      return (
        <div className="flex flex-col gap-6 py-4">
          <div className="bg-white border-2 border-orange-200 p-5 rounded-[2rem] flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#FFB10A] shrink-0 mt-1" strokeWidth={3} />
            <p className="text-[11px] text-gray-900 leading-relaxed font-black uppercase tracking-tight">
              Configura o acesso ao teu desafio. Cria um nome para a sala e uma senha de segurança.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Nome da Sala</label>
              <input 
                type="text" 
                placeholder="EX: DUELO DOS MESTRES"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-6 text-center text-lg font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all uppercase placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Senha de Segurança</label>
              <input 
                type="password" 
                placeholder="••••••"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-5 text-center text-2xl font-mono font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all tracking-[0.5em] placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Confirmar Senha</label>
              <input 
                type="password" 
                placeholder="••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-5 text-center text-2xl font-mono font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all tracking-[0.5em] placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      );
    }

    if (betAction === 'join') {
      if (joiningBet) {
        if (activeTab === '1 vs 1') {
          return (
            <div className="flex flex-col gap-6 py-2">
              {matchHeader}

            <div className="bg-white border-2 border-orange-500 p-4 rounded-2xl flex items-start gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-[#FFB10A] shrink-0 mt-0.5" strokeWidth={3} />
                <p className="text-[10px] text-gray-900 leading-relaxed font-black uppercase tracking-tight">
                  O teu adversário escolheu <span className="text-[#FFB10A] italic">{joiningBet.market}</span>. Escolhe um dos resultados restantes!
                </p>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-900 mb-4 block uppercase tracking-widest px-2 italic">O teu Prognóstico</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Vitória A', 'Empate', 'Vitória B'].map(m => {
                    const isOccupied = m === joiningBet.market;
                    return (
                      <button 
                        key={m}
                        disabled={isOccupied}
                        onClick={() => setSelectedMarket(m)}
                        className={cn(
                          "py-6 px-2 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-2 relative",
                          selectedMarket === m 
                            ? "bg-[#091747] border-[#091747] text-white" 
                            : isOccupied
                              ? "bg-gray-100 border-gray-200 opacity-40 cursor-not-allowed"
                              : "bg-white border-gray-200 text-gray-900 hover:border-[#FFB10A]"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                          selectedMarket === m ? "border-white" : "border-gray-300"
                        )}>
                          {selectedMarket === m && <div className="w-2 h-2 rounded-full bg-white" />}
                          {isOccupied && <X className="w-3 h-3 text-red-600" strokeWidth={3} />}
                        </div>
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-tight",
                          selectedMarket === m ? "text-white" : "text-gray-900"
                        )}>{m}</span>
                        {isOccupied && <span className="absolute -top-2 bg-red-600 text-white text-[7px] font-black px-2 py-0.5 rounded-full">OCUPADO</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Valor do Duelo (KZ)</label>
                <div className="relative">
                  <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-[1.5rem] py-5 px-6 text-2xl font-black text-[#091747] flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <span>{joiningBet.amount.toLocaleString()}</span>
                    </div>
                    <span className="text-[#FFB10A] italic">KZ</span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-500 mt-3 font-black px-2 uppercase tracking-tight text-center italic leading-relaxed">Este valor é fixo para este duelo direto definido pelo moderador.</p>
              </div>
            </div>
          );
        }

        const viewingUser = inscribedUsers.find(u => u.id === selectedUserView);
        const displayPicks = viewingUser ? viewingUser.picks : selectedMarketsList;

        return (
          <div className="flex flex-col gap-6 py-4">
            {matchHeader}

            <div className="bg-white border-2 border-orange-500 p-4 rounded-2xl flex items-start gap-4 mb-2">
              <AlertCircle className="w-5 h-5 text-[#FFB10A] shrink-0 mt-0.5" strokeWidth={3} />
              <p className="text-[10px] text-gray-900 leading-relaxed font-black uppercase tracking-tight">
                {viewingUser ? `Estás a ver o palpite de ${viewingUser.name}.` : "Faz as tuas previsões para os mercados selecionados nesta sala."}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-3xl border-2 border-gray-100 shadow-sm mb-2">
              <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest px-2 italic flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#FFB10A]" />
                Usuários Inscritos
              </label>
              <div className="relative">
                <select 
                  value={selectedUserView}
                  onChange={(e) => setSelectedUserView(e.target.value)}
                  className="w-full bg-white border-2 border-white rounded-2xl py-4 px-5 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none shadow-sm uppercase tracking-[0.1em]"
                >
                  <option value="">Selecionar Usuário...</option>
                  <option value="me">Teus Prognósticos (Tu)</option>
                  {inscribedUsers.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-900 mb-4 block uppercase tracking-widest px-2 italic">
                {viewingUser ? `Resultados de ${viewingUser.name}` : `Teus Prognósticos (${selectedMarketsList.filter(s => !!s).length}/${joiningBet?.selectedMarkets ? joiningBet.selectedMarkets.filter(m => m !== null).length : (joiningBet?.market ? 1 : 0)})`}
              </label>
              <div className="flex flex-col gap-4">
                {displayPicks.map((res, idx) => {
                  // Only show markets that were selected in the original bet
                  if (joiningBet?.selectedMarkets) {
                    if (idx >= joiningBet.selectedMarkets.length || joiningBet.selectedMarkets[idx] === null) return null;
                  } else if (idx > 0) {
                    return null;
                  }

                  return (
                    <div key={idx} className={cn(
                      "bg-white border-2 rounded-[2rem] p-5 flex flex-col gap-4 transition-all",
                      viewingUser ? "border-blue-100 bg-blue-50/10" : "border-gray-200"
                    )}>
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-black text-[#091747] uppercase tracking-widest italic">Mercado {idx + 1}</span>
                        {viewingUser && <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-widest">Inscrito</span>}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'A', label: 'Vence A' },
                          { id: 'X', label: 'Empate' },
                          { id: 'B', label: 'Vence B' }
                        ].map((opt) => {
                          const isSelected = viewingUser ? (viewingUser.picks[idx] === opt.id) : (res === opt.id);

                          return (
                            <button
                              key={opt.id}
                              disabled={!!viewingUser}
                              onClick={() => {
                                const newPreds = [...selectedMarketsList];
                                newPreds[idx] = opt.id;
                                setSelectedMarketsList(newPreds);
                              }}
                              className={cn(
                                "py-3 rounded-[1rem] text-[10px] font-black border-2 transition-all uppercase tracking-tight",
                                isSelected 
                                  ? (viewingUser ? "bg-blue-600 border-blue-600 text-white" : "bg-[#091747] border-[#091747] text-white")
                                  : "bg-white border-gray-100 text-gray-400 hover:border-[#FFB10A] opacity-60"
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t-2 border-gray-100">
              <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest px-2 italic">Valor da Entrada (KZ)</label>
              <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-[1.5rem] py-5 px-6 text-2xl font-black text-[#091747] flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span>{joiningBet.amount.toLocaleString()}</span>
                </div>
                <span className="text-[#FFB10A] italic">KZ</span>
              </div>
              <p className="text-[8px] text-gray-400 mt-3 font-bold text-center uppercase tracking-tight italic">Este valor foi definido pelo moderador da sala.</p>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-8 py-4">
          <div className="bg-white border-2 border-blue-500 p-5 rounded-[2rem] flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-1" strokeWidth={3} />
            <p className="text-[11px] text-gray-900 leading-relaxed font-black uppercase tracking-tight">
              Insere o nome da sala e a senha do desafio para acederes ao duelo direto.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Nome da Sala</label>
              <input 
                type="text" 
                placeholder="EX: DUELO DOS MESTRES"
                value={roomNameInput}
                onChange={(e) => setRoomNameInput(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-6 text-center text-lg font-black text-[#091747] outline-none focus:border-blue-600 transition-all uppercase placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Senha de Acesso</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="EX: 1234"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-6 px-4 text-center text-2xl font-mono font-black text-[#091747] outline-none focus:border-blue-600 transition-all tracking-[0.2em] placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case '1 vs 1':
        return (
          <div className="flex flex-col gap-6 py-2">
            {matchHeader}

            <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100 flex flex-col gap-5">
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest px-1 italic">Prognóstico</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Vitória A', 'Empate', 'Vitória B'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setSelectedMarket(m)}
                      className={cn(
                        "py-4 rounded-xl border-2 text-[10px] font-bold transition-all active:scale-95 flex flex-col items-center justify-center gap-2",
                        selectedMarket === m ? "bg-[#091747] border-[#091747] text-white shadow-lg" : "bg-white border-white text-gray-600 hover:border-[#FFB10A]"
                      )}
                    >
                      <Football className={cn("w-4 h-4", selectedMarket === m ? "text-white" : "text-[#FFB10A]")} strokeWidth={2.5} />
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest px-1 italic">Investimento</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    value={betValue}
                    onChange={(e) => setBetValue(e.target.value)}
                    className="w-full bg-white border-2 border-white rounded-2xl py-4 px-5 text-xl font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all shadow-sm"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-[1px] h-4 bg-gray-200" />
                    <span className="text-[#FFB10A] font-black italic text-sm">KZ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Taxa de Serviço</span>
              <span className="text-[10px] font-black text-gray-900 uppercase">50.00 KZ</span>
            </div>
          </div>
        );
      case 'Privado':
        if (createStep === 'selection') {
          return (
            <div className="flex flex-col gap-6 py-2">
              <div className="bg-[#091747] rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                <h4 className="text-[11px] font-black text-[#FFB10A] uppercase tracking-widest mb-1 italic relative z-10">Seleção de Mercados</h4>
                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-tight leading-relaxed relative z-10">Escolhe os mercados que estarão disponíveis para o desafio.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {Array(10).fill(0).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      const newPreds = [...selectedMarketsList];
                      if (newPreds[i]) newPreds[i] = '';
                      else newPreds[i] = 'PENDING'; 
                      setSelectedMarketsList(newPreds);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      selectedMarketsList[i] 
                        ? "bg-white border-[#FFB10A] shadow-md scale-[1.01]" 
                        : "bg-gray-50 border-gray-100 opacity-70 hover:opacity-100"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                      selectedMarketsList[i] 
                        ? "bg-[#FFB10A] border-[#FFB10A]" 
                        : "bg-white border-gray-300"
                    )}>
                      {selectedMarketsList[i] && <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[11px] font-black uppercase tracking-tight",
                        selectedMarketsList[i] ? "text-[#091747]" : "text-gray-500"
                      )}>
                        Mercado {i + 1}
                      </span>
                      <span className="text-[8px] text-gray-400 font-bold uppercase">Disponível para todos</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-6 py-2">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest text-center italic">Lotação da Sala</label>
              <div className="relative">
                <select 
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="w-full bg-white border-2 border-white rounded-xl py-3 px-5 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none text-center uppercase tracking-widest shadow-sm"
                >
                  <option value="2">2 Atletas</option>
                  <option value="5">5 Atletas</option>
                  <option value="10">10 Atletas</option>
                  <option value="20">20 Atletas</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={3} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black text-gray-400 mb-0 block uppercase tracking-widest px-2 italic">Configurar Resultados ({selectedMarketsList.filter(s => !!s).length})</label>
              <div className="flex flex-col gap-3">
                {selectedMarketsList.map((res, idx) => res && (
                  <div key={idx} className="bg-white border-2 border-gray-100 rounded-3xl p-5 flex flex-col gap-4 transition-all hover:border-[#FFB10A]/30">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-black text-[#091747] uppercase tracking-widest italic">Mercado {idx + 1}</span>
                      <button 
                        onClick={() => {
                          const newPreds = [...selectedMarketsList];
                          newPreds[idx] = '';
                          setSelectedMarketsList(newPreds);
                        }}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" strokeWidth={3} />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'A', label: 'Vence A' },
                        { id: 'X', label: 'Empate' },
                        { id: 'B', label: 'Vence B' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            const newPreds = [...selectedMarketsList];
                            newPreds[idx] = opt.id;
                            setSelectedMarketsList(newPreds);
                          }}
                          className={cn(
                            "py-2.5 rounded-xl text-[9px] font-black border-2 transition-all uppercase tracking-tight",
                            res === opt.id
                              ? "bg-[#091747] border-[#091747] text-white"
                              : "bg-gray-50 border-gray-50 text-gray-500 hover:border-[#FFB10A]"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50/50 p-5 rounded-3xl border border-orange-100">
              <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest px-2 italic">Entrada Individual (KZ)</label>
              <div className="relative">
                <div className="w-full bg-white border-2 border-orange-100 rounded-2xl py-4 px-5 text-xl font-black text-[#091747] flex items-center justify-between shadow-sm">
                   <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#FFB10A]" />
                      <span>1.000</span>
                   </div>
                   <span className="text-[#FFB10A] italic text-sm">KZ</span>
                </div>
              </div>
              <p className="text-[8px] text-gray-400 mt-3 font-bold text-center uppercase tracking-tight italic">Este valor está definido como padrão para grupos privados.</p>
            </div>
          </div>
        );
      case 'Nacional':
        return (
          <div className="flex flex-col gap-6 py-2">
            <div className="bg-[#091747] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -right-12 -top-12 w-44 h-44 bg-[#FFB10A]/10 rounded-full blur-3xl text-[#FFB10A]"
              >
                <Trophy className="w-full h-full opacity-10" />
              </motion.div>
              <div className="flex items-center justify-between relative z-10 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-base font-black text-[#FFB10A] uppercase tracking-widest italic leading-tight">Rodada Nacional</h4>
                  <span className="text-[9px] text-orange-200 font-bold uppercase tracking-widest">Desafio Oficial Duet</span>
                </div>
                {storageService.getBets().filter(b => b.matchId === match.id && b.category === 'Nacional').length > 0 && (
                  <button 
                    onClick={() => setBetAction('my_bets')}
                    className="text-[9px] font-black bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl uppercase tracking-tight backdrop-blur-md border border-white/10 transition-colors"
                  >
                    Tuas Rodadas
                  </button>
                )}
              </div>
              <p className="text-[11px] text-orange-50/70 leading-relaxed font-bold uppercase tracking-[0.05em] relative z-10 max-w-[80%]">
                Taxa: <span className="text-white font-black">1.000 KZ</span>. Prevê os <span className="text-[#FFB10A]">10 resultados</span> e sobe no ranking nacional!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black text-gray-400 mb-0 block uppercase tracking-widest px-2 italic">Teus Prognósticos</label>
              {[
                { title: 'Vencedor (1X2)', optA: 'CASA / EMPATE', optB: 'FORA / EMPATE' },
                { title: 'Golos Total', optA: '+ DE 2.5', optB: '- DE 2.5' },
                { title: 'Ambas Marcam', optA: 'SIM', optB: 'NÃO' },
                { title: 'Intervalo', optA: 'VENCE CASA', optB: 'EMPATE/FORA' },
                { title: 'Escanteios', optA: '+ DE 8.5', optB: '- DE 8.5' },
                { title: 'Primeiro Golo', optA: 'CASA', optB: 'FORA/SEM' },
                { title: 'Cartões', optA: '+ DE 3.5', optB: '- DE 3.5' },
                { title: 'Handicap (0:1)', optA: 'CASA (+1)', optB: 'FORA (-1)' },
                { title: 'Golos 1ª Parte', optA: 'SIM', optB: 'NÃO' },
                { title: 'Último Golo', optA: 'CASA', optB: 'FORA' }
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-4 p-5 bg-white border-2 border-gray-100 rounded-3xl hover:border-[#FFB10A]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-50 text-[#FFB10A] text-[10px] font-black flex items-center justify-center border border-orange-100">{i + 1}</span>
                    <span className="text-[10px] font-black text-[#091747] uppercase tracking-widest italic">{m.title}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => {
                        const newPreds = [...selectedMarketsList];
                        newPreds[i] = 'A';
                        setSelectedMarketsList(newPreds);
                      }}
                      className={cn(
                        "py-3.5 text-[9px] font-black rounded-xl border-2 transition-all active:scale-95 px-3 uppercase tracking-tighter", 
                        selectedMarketsList[i] === 'A' ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-lg" : "bg-gray-50 border-gray-50 text-gray-500 hover:border-[#FFB10A]"
                      )}
                    >
                      {m.optA}
                    </button>
                    <button 
                      onClick={() => {
                        const newPreds = [...selectedMarketsList];
                        newPreds[i] = 'B';
                        setSelectedMarketsList(newPreds);
                      }}
                      className={cn(
                        "py-3.5 text-[9px] font-black rounded-xl border-2 transition-all active:scale-95 px-3 uppercase tracking-tighter", 
                        selectedMarketsList[i] === 'B' ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-lg" : "bg-gray-50 border-gray-50 text-gray-500 hover:border-[#FFB10A]"
                      )}
                    >
                      {m.optB}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between bg-orange-50/50 p-5 rounded-3xl border border-orange-100 mb-6">
              <div className="flex-1 pr-6 text-left">
                <h5 className="text-[10px] font-black text-[#091747] uppercase tracking-widest mb-1 italic">Confirmação Inteligente</h5>
                <p className="text-[8px] text-gray-500 font-bold leading-tight uppercase">Confirmar apenas se o prémio total superar 100.000 KZ</p>
              </div>
              <button 
                onClick={() => setAutoConfirmNacional(!autoConfirmNacional)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative flex items-center px-1 shrink-0",
                  autoConfirmNacional ? "bg-[#FFB10A]" : "bg-gray-300"
                )}
              >
                <motion.div 
                  animate={{ x: autoConfirmNacional ? 24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col h-[80vh] md:h-auto md:max-h-[85vh] overflow-hidden border border-gray-200"
          >
            {/* DRAG HANDLE FOR MOBILE */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full md:hidden" />

            <div className="flex items-center justify-between mb-6 mt-2 shrink-0">
              <div className="flex items-center gap-3">
                {((betAction && !isSuccess) || showDeleteConfirm) && !showClassification && (
                  <button 
                    onClick={() => {
                      if (showDeleteConfirm) setShowDeleteConfirm(null);
                      else if (betAction === 'join' && joiningBet) setJoiningBet(null);
                      else if (betAction === 'bet_details') {
                        setBetAction('my_bets');
                        setSelectedBetId(null);
                      } else if (betAction === 'create' && createStep !== 'password' && activeTab !== 'Nacional') {
                        if (activeTab === 'Privado' && createStep === 'selection') setCreateStep('password');
                        else if (createStep === 'details') {
                          if (activeTab === 'Privado') setCreateStep('selection');
                          else setCreateStep('password');
                        }
                      } else {
                        if (activeTab === 'Nacional') {
                          if (betAction === 'my_bets') setBetAction('create');
                          else onClose();
                        }
                        else setBetAction(null);
                      }
                    }}
                    className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 stroke-[3px]" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-black text-[#091747] uppercase tracking-tighter leading-none italic">
                    {showDeleteConfirm ? 'Eliminar' : 
                     isSuccess ? 'Confirmado' :
                     betAction === 'join' ? 'Entrar' : 
                     betAction === 'my_bets' ? 'Minhas Apostas' :
                     betAction === 'bet_details' ? 'Detalhes' :
                     activeTab === 'Nacional' ? 'Nacional' : `Criar ${activeTab}`}
                  </h2>
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mt-1">
                    {match.league}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isSuccess && !showDeleteConfirm && (
                  <button 
                    onClick={() => setShowClassification(!showClassification)}
                    className={cn(
                      "w-10 h-10 rounded-2xl border-2 transition-all flex items-center justify-center shadow-sm",
                      showClassification 
                        ? "bg-[#091747] border-[#091747] text-white" 
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                    )}
                    title="Classificação"
                  >
                    <List className="w-5 h-5 stroke-[2.5px]" />
                  </button>
                )}

                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all font-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PROGRESS BAR FOR CREATE FLOW */}
            {betAction === 'create' && !isSuccess && steps.length > 1 && (
              <div className="flex gap-2 mb-6 px-1">
                {steps.map((s, idx) => (
                  <div 
                    key={s} 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      idx <= currentStepIndex ? "bg-[#FFB10A] flex-[2]" : "bg-gray-300 flex-1"
                    )}
                  />
                ))}
              </div>
            )}

            <div className="overflow-y-auto custom-scrollbar flex-1 -mr-2 pr-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${betAction}-${createStep}-${isSuccess}-${showDeleteConfirm}-${showClassification}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {betAction && (betAction === 'create' || betAction === 'join') && !isSuccess && !showClassification && (
              <div className="mt-6 flex flex-col gap-4 shrink-0">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-red-600 p-4 rounded-2xl flex items-center gap-2 text-[11px] font-black uppercase tracking-tight border-2 border-red-500"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={3} />
                    {error}
                  </motion.div>
                )}
                
                {betAction === 'create' && createStep !== 'details' && activeTab !== 'Nacional' ? (
                  <button 
                    onClick={() => {
                      setError('');
                      if (createStep === 'password') {
                        if (!createPassword || !confirmPassword) return setError('Preenche todos os campos!');
                        if (createPassword !== confirmPassword) return setError('As senhas não coincidem!');
                        if (createPassword.length < 4) return setError('Mínimo 4 caracteres!');
                        if (activeTab === 'Privado') setCreateStep('selection');
                        else setCreateStep('details');
                      } else if (createStep === 'selection') {
                        if (selectedMarketsList.filter(s => !!s).length < 1) return setError('Seleciona 1 mercado!');
                        setCreateStep('details');
                      }
                    }}
                    className="w-full bg-[#FFB10A] text-white font-black py-4 rounded-[1.5rem] transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    Próximo Passo
                  </button>
                ) : (
                  <button 
                    onClick={handleBet}
                    className={cn(
                      "w-full text-white font-black py-4 rounded-[1.5rem] transition-all active:scale-[0.98] uppercase tracking-widest text-xs",
                      getActionClass()
                    )}
                  >
                    {getActionText()}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Aposta() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const [activeTab, setActiveTab] = React.useState('1 vs 1');
  const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const matchesRef = React.useRef<HTMLDivElement>(null);

  // Handle matchId from URL to open modal on load
  React.useEffect(() => {
    const matchId = searchParams.get('matchId');
    if (matchId) {
      const allMatches = [...MATCH_DATA, ...GIRABOLA_MATCHES, ...BUNDESLIGA_MATCHES, ...LALIGA_MATCHES, ...LIGUE1_MATCHES, ...EREDIVISIE_MATCHES, ...PREMIERLEAGUE_MATCHES, ...SERIEA_MATCHES, ...LIGANOS_MATCHES, ...TACADEANGOLA_MATCHES, ...TACADAALEMANHA_MATCHES];
      const match = allMatches.find(m => m.id.toString() === matchId);
      if (match) {
        setSelectedMatch(match);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const [wallet, setWallet] = React.useState<WalletType>(storageService.getWallet());
  const [profile] = React.useState<UserProfile>(storageService.getUserProfile());

  const [isLeagueFavorited, setIsLeagueFavorited] = React.useState(false);
  const leagueFavoriteId = topic ? `aposta-topic-${category}-${topic}` : `aposta-league-${category}`;

  React.useEffect(() => {
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsLeagueFavorited(favorites.some(f => f.id === leagueFavoriteId));
    };
    updateFavStatus();
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, [leagueFavoriteId]);

  const toggleLeagueFavorite = () => {
    if (isLeagueFavorited) {
      storageService.deleteFavorite(leagueFavoriteId);
      setIsLeagueFavorited(false);
    } else {
      const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Aposta';
      storageService.saveFavorite({
        id: leagueFavoriteId,
        title: topic || categoryName,
        sub: topic ? `Aposta: ${categoryName}` : 'Torneio',
        type: 'league',
        path: `/aposta/${category}${topic ? `?topic=${topic}` : ''}`
      });
      setIsLeagueFavorited(true);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleUpdate = () => {
      setWallet(storageService.getWallet());
    };
    window.addEventListener('walletUpdated', handleUpdate);
    return () => window.removeEventListener('walletUpdated', handleUpdate);
  }, []);

  const handleOpenModal = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-[#FFB10A]" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 font-dancing text-xl font-bold text-[#FFB10A]"
            >
              A carregar...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIMPLE HEADER */}
      <div className="h-[46px] lg:h-[52px] bg-white border-b border-white px-4 md:px-8 sticky top-0 z-50">
        <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            id="aposta-back-button"
            to={`/liga/${category}`} 
            className="text-gray-400 hover:text-[#FFB10A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Link>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-center truncate px-4">
            {topic || 'Duet Aposta'}
          </h1>
          <button 
            id="aposta-favorite-button"
            onClick={toggleLeagueFavorite}
            className={cn("transition-colors duration-300 p-1 rounded-lg", isLeagueFavorited ? "text-[#FFB10A]" : "text-gray-400 hover:text-[#FFB10A]")}
          >
            <Heart className={cn("w-5 h-5 lg:w-6 lg:h-6", isLeagueFavorited && "fill-current")} />
          </button>
        </div>
      </div>

      {/* TABBAR */}
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-0">
        <div className="flex items-center justify-between border-b border-gray-100">
          {(['1 vs 1', 'Privado', 'Nacional'] as const).map((tab) => (
            <button
              id={`aposta-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setTimeout(() => {
                  if (matchesRef.current) {
                    const yOffset = -80;
                    const element = matchesRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 50);
              }}
              className={cn(
                "flex-1 py-3 text-center text-lg md:text-xl lg:text-2xl font-dancing font-bold transition-all border-b-2",
                activeTab === tab 
                  ? "text-[#FFB10A] border-[#FFB10A]" 
                  : "text-gray-600 border-transparent hover:text-[#FFB10A]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 pt-4 md:pt-8">
        <div className="flex justify-center my-10 lg:my-12">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={getCompetitionLogo(topic)} 
            alt={topic || 'Angola Girabola'} 
            className={cn(
              "h-auto object-contain",
              category === 'basket' || category === 'f1'
                ? "w-full max-w-[21rem] md:max-w-[25.5rem] lg:max-w-[29.5rem]"
                : "w-full max-w-[24rem] md:max-w-[28rem] lg:max-w-[32rem]"
            )}
          />
        </div>
      </div>

      <h1 ref={matchesRef} className="font-dancing text-2xl md:text-3xl lg:text-3xl font-bold text-[#FFB10A] text-center border-t border-gray-100 py-8 lg:py-10 tracking-tight">
        {activeTab === 'Nacional' ? 'Rodada Nacional' : activeTab === 'Privado' ? 'Grupos Privados' : 'Desafios 1 vs 1'}
      </h1>

      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
          {(
            topic === 'Girabola' || topic === 'Taça de Angola' ? GIRABOLA_MATCHES :
            topic === 'BundesLiga' || topic === 'Bundesliga' || topic === 'Taça da Alemanha' || topic === 'DFB Pokal' ? BUNDESLIGA_MATCHES :
            topic === 'La Liga' || topic === 'Taça de Espanha' || topic === 'Copa del Rey' ? LALIGA_MATCHES :
            topic === 'Ligue 1' || topic === 'Taça de França' || topic === 'Copa da França' ? LIGUE1_MATCHES :
            topic === 'Eredivisie' || topic === 'Evedivie' || topic === 'Taça da Holanda' || topic === 'KNVB Beker' ? EREDIVISIE_MATCHES :
            topic === 'Premier League' || topic === 'PremierLeague' || topic === 'Taça de Inglaterra' || topic === 'FA Cup' ? PREMIERLEAGUE_MATCHES :
            topic === 'Serie A' || topic === 'Série A' || topic === 'Taça de Itália' || topic === 'TIM Cup' ? SERIEA_MATCHES :
            topic === 'Liga Nos' || topic === 'Liga NOS' || topic === 'Taça de Portugal' ? LIGANOS_MATCHES :
            MATCH_DATA
          ).map((match) => (
            <MatchCard key={match.id} match={match} onClick={handleOpenModal} />
          ))}
        </div>
      </div>

      <BettingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        match={selectedMatch} 
        activeTab={activeTab} 
      />
    </div>
  );
}

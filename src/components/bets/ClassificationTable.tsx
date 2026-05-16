import React from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LEAGUE_CLASSIFICATIONS } from '../../constants';

interface ClassificationTableProps {
  league: string;
  homeTeam: string;
  awayTeam: string;
  onBack: () => void;
}

const ClassificationTable: React.FC<ClassificationTableProps> = ({ 
  league, 
  homeTeam, 
  awayTeam, 
  onBack 
}) => {
  const tableData = LEAGUE_CLASSIFICATIONS[league] || LEAGUE_CLASSIFICATIONS['Girabola'];

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
              <th className="px-3 py-4 text-left font-black text-gray-400 uppercase tracking-tighter">#</th>
              <th className="px-1 py-4 text-left font-black text-gray-400 uppercase tracking-tighter">Equipa</th>
              <th className="px-1 py-4 text-center font-black text-gray-400 uppercase tracking-tighter">J</th>
              <th className="px-1 py-4 text-center font-black text-gray-400 uppercase tracking-tighter">V</th>
              <th className="px-1 py-4 text-center font-black text-gray-400 uppercase tracking-tighter">E</th>
              <th className="px-1 py-4 text-center font-black text-gray-400 uppercase tracking-tighter">D</th>
              <th className="px-2 py-4 text-center font-black text-gray-400 uppercase tracking-tighter">Pts</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => {
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
                  <td className="px-3 py-4 font-black text-[#091747] italic text-[9px]">{row.pos}º</td>
                  <td className="px-1 py-4 font-bold text-gray-900 uppercase tracking-tight text-[9px]">
                    <div className="flex items-center gap-1">
                      <span className="truncate max-w-[120px] md:max-w-none">{row.team}</span>
                      {isMatchTeam && <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#FFB10A] animate-pulse" />}
                    </div>
                  </td>
                  <td className="px-1 py-4 text-center font-bold text-gray-500 text-[9px]">{row.p}</td>
                  <td className="px-1 py-4 text-center font-bold text-gray-400 text-[9px]">{row.w || 0}</td>
                  <td className="px-1 py-4 text-center font-bold text-gray-400 text-[9px]">{row.d || 0}</td>
                  <td className="px-1 py-4 text-center font-bold text-gray-400 text-[9px]">{row.l || 0}</td>
                  <td className="px-2 py-4 text-center font-black text-[#091747] text-[9px]">{row.pts}</td>
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

export default ClassificationTable;

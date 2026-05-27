import React from 'react';
import { ArrowLeft, Shield, KeyRound, LogIn, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Seguranca() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/perfil" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Segurança</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <KeyRound className="w-6 h-6 text-[#FFC000]" />
              <h3 className="text-[#091747] font-bold">Alterar Palavra-passe</h3>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Senha alterada!'); }}>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Palavra-passe atual</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FFB10A] outline-none font-semibold transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Nova palavra-passe</label>
                <input type="password" placeholder="Mínimo 6 caracteres" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FFB10A] outline-none font-semibold transition-all" />
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-orange-50 text-[#FFB10A] font-bold hover:bg-orange-100 transition-all">
                Salvar Nova Senha
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-6">
              <LogIn className="w-6 h-6 text-[#FFC000]" />
              <h3 className="text-[#091747] font-bold">Sessões</h3>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-transparent border-2 border-gray-200">
                  <div>
                    <p className="text-sm font-bold text-[#091747]">Este dispositivo</p>
                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Ativo agora</p>
                  </div>
                  <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors">Terminar</button>
               </div>
               
               <button className="w-full py-4 text-xs font-bold text-gray-650 uppercase tracking-widest hover:text-[#091747] transition-colors">
                 Terminar em todos os dispositivos
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

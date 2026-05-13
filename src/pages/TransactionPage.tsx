import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, HandCoins, Users, ShieldCheck, ChevronDown, Coins, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TransactionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('multicaixa');

  const [isSuccess, setIsSuccess] = useState(false);

  const type = location.pathname.split('/').pop() || 'depositar';

  const config = {
    depositar: { title: 'Depositar', icon: CreditCard, color: 'text-green-600' },
    levantar: { title: 'Levantar', icon: HandCoins, color: 'text-blue-600' },
    transferir: { title: 'Transferir', icon: Users, color: 'text-orange-600' },
  }[type as 'depositar' | 'levantar' | 'transferir'] || { title: 'Transação', icon: CreditCard, color: 'text-gray-600' };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-[#091747] mb-2 uppercase tracking-tighter italic text-center">
          Operação Registada!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-10 max-w-xs uppercase tracking-widest font-black leading-relaxed">
          O teu pedido de {config.title.toLowerCase()} foi submetido e está em processamento.
        </p>
        <button 
          onClick={() => navigate('/carteira')}
          className="w-full max-w-xs bg-[#FFB10A] text-white font-black py-5 rounded-[1.5rem] uppercase tracking-widest text-xs shadow-lg shadow-orange-100"
        >
          Voltar à Carteira
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="h-[46px] border-b border-gray-200 bg-white px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">{config.title}</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <config.icon className="w-5 h-5 text-[#FFC000]" />
              </div>
              <h3 className="text-[#091747] font-bold">{config.title}</h3>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Seguro
            </span>
          </div>

          <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }}>
            <div>
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest mb-2 px-1">Valor (Kz)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 font-black italic">Kz</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#FFB10A] outline-none font-bold text-lg transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest mb-2 px-1">Método</label>
              <div className="relative">
                <select 
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#FFB10A] outline-none font-bold text-sm transition-all appearance-none bg-white"
                >
                  <option value="multicaixa">Multicaixa Express</option>
                  <option value="referencia">Referência Bancária</option>
                  <option value="wallet">Carteira Digital</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100">
               <div className="flex items-center justify-between">
                 <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Total</span>
                 <span className="text-xl font-black text-[#091747]">Kz {amount ? Number(amount).toLocaleString() : '0'}</span>
               </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 rounded-[1.2rem] border-2 border-gray-100 font-black text-gray-700 hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px]"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 rounded-[1.2rem] bg-[#FFB10A] text-white font-black hover:bg-[#FFC000] transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-orange-50"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 flex gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
           <Info className="w-5 h-5 text-gray-400 shrink-0" />
           <p className="text-[10px] text-gray-500 leading-relaxed">
             As operações financeiras nesta versão são simuladas para fins de demonstração da interface.
           </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowLeft, SlidersHorizontal, Bell, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Definicoes() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/perfil" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Definições</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-[#FFC000]">
            <div className="flex items-center gap-2 text-white font-semibold">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Preferências e Notificações</span>
            </div>
          </div>

          <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Definições guardadas!'); navigate('/perfil'); }}>
            <div className="space-y-4">
              <h3 className="text-[#091747] font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#FFC000]" />
                Preferências
              </h3>
              
              <ToggleItem label="Sons" sub="Ativar sons da aplicação." defaultChecked />
              <ToggleItem label="Vibração" sub="Feedback tátil em interações." defaultChecked />
              <ToggleItem label="Modo Compacto" sub="Reduz espaçamentos para ver mais conteúdo." />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#091747]">Modo Offline</p>
                  <p className="text-[10px] text-[#FFB10A] font-bold">Ativado (Imagens Guardadas)</p>
                </div>
                <div className="w-11 h-6 rounded-full bg-[#FFC000] flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="space-y-4">
              <h3 className="text-[#091747] font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#FFC000]" />
                Notificações
              </h3>
              
              <ToggleItem label="Torneios" sub="Lembretes e atualizações de torneios." defaultChecked />
              <ToggleItem label="Resultados" sub="Avisos quando existirem novos resultados." defaultChecked />
              <ToggleItem label="Novidades" sub="Promoções e novidades do DUET." />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 rounded-2xl bg-[#FFB10A] text-white font-bold hover:bg-[#FFC000] transition-all"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, sub, defaultChecked = false }: { label: string, sub: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#091747]">{label}</p>
        <p className="text-[10px] text-gray-500">{sub}</p>
      </div>
      <button 
        type="button"
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 outline-none",
          checked ? "bg-[#FFC000]" : "bg-gray-200"
        )}
      >
        <div className={cn(
          "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )} />
      </button>
    </div>
  );
}

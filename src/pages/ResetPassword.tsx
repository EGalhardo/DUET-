import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://i.postimg.cc/qv29DrYP/l-OGOMARCA-OFICIAL-2.gif" 
            alt="DUET Logo" 
            className="w-48 h-48 object-contain"
          />
          <h1 className="text-3xl font-black text-[#091747] tracking-tight -mt-6">Recuperar</h1>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.25em]">Redefine a tua senha</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest px-1">Email de Recuperação</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Insira o seu email" 
                className="w-full bg-white border border-[#edf2ff] rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-[#091747] outline-none focus:ring-2 focus:ring-[#FFB10A] transition-all placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FFB10A] text-white font-black py-5 rounded-2xl hover:bg-[#FFC000] active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
          >
            Enviar Link
          </button>
        </form>

        <div className="text-center pt-4">
          <Link to="/login" name="back-to-login" className="inline-flex items-center gap-2 text-[10px] font-black text-[#FFB10A] uppercase tracking-widest hover:underline">
            <ArrowLeft className="w-3 h-3" />
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}

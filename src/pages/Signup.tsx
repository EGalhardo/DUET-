import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
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
          <h1 className="text-3xl font-black text-[#091747] tracking-tight -mt-6">Criar Conta</h1>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.25em]">Começa o teu percurso</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest px-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Insira o seu nome completo" 
                className="w-full bg-white border border-[#edf2ff] rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-[#091747] outline-none focus:ring-2 focus:ring-[#FFB10A] transition-all placeholder:text-gray-400" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest px-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Ex: joao@exemplo.com" 
                className="w-full bg-white border border-[#edf2ff] rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-[#091747] outline-none focus:ring-2 focus:ring-[#FFB10A] transition-all placeholder:text-gray-400" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest px-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Min. 8 caracteres" 
                className="w-full bg-white border border-[#edf2ff] rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-[#091747] outline-none focus:ring-2 focus:ring-[#FFB10A] transition-all placeholder:text-gray-400" 
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-[#FFB10A] text-white font-black py-5 rounded-2xl hover:bg-[#FFC000] active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
            >
              Criar Conta
            </button>
            <p className="text-center text-xs font-bold text-gray-500 mt-8">
              Já tens conta?{' '}
              <Link to="/login" name="login-link" className="text-[#FFB10A] font-black hover:underline uppercase tracking-tighter ml-1">
                Faz Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

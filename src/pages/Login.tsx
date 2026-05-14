import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Github, Facebook } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-sm space-y-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-black text-[#091747] tracking-tighter uppercase italic text-center">
            Login
          </h1>
          <p className="text-[11px] text-[#FFB10A] font-black uppercase tracking-[0.4em] text-center">
            O Teu Próximo Desafio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Ex: joao@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-[#091747] outline-none focus:bg-white focus:border-[#FFB10A] transition-all placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Senha</label>
              <Link to="/reset-password" name="reset-password-link" className="text-[10px] font-black text-[#FFB10A] uppercase tracking-widest hover:underline">
                Esqueci-me?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-12 pr-12 text-sm font-bold text-[#091747] outline-none focus:bg-white focus:border-[#FFB10A] transition-all placeholder:text-gray-400"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FFB10A] text-white font-black py-5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-sm mt-4 shadow-lg shadow-orange-100"
          >
            Entrar no Jogo
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
            <span className="bg-white px-8 text-gray-400">Entrar com</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[Github, Facebook, Github].map((Icon, i) => (
            <button key={i} className="py-4 rounded-2xl border border-gray-100 flex items-center justify-center text-[#091747] hover:bg-gray-50 hover:border-[#FFB10A] transition-all group">
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </div>

        <p className="text-center text-[11px] font-bold text-gray-400 pt-4 uppercase tracking-tighter">
          Ainda não tens conta?{' '}
          <Link to="/signup" name="signup-link" className="text-[#FFB10A] font-black hover:underline tracking-widest ml-1">
            Regista-te aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function DadosPessoais() {
  const { auth } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState(auth.user?.name || '');

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/perfil" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Dados Pessoais</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer">
              <img 
                src={auth.user?.avatar} 
                className="w-24 h-24 rounded-full border-4 border-orange-50 group-hover:brightness-90 transition-all" 
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFB10A] rounded-full flex items-center justify-center text-white border-4 border-white">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Alterar Foto</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Dados guardados!'); navigate('/perfil'); }}>
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Nome Completo</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><User className="w-5 h-5" /></span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#FFB10A] outline-none font-semibold text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-650"><Mail className="w-5 h-5" /></span>
                <input 
                  type="email" 
                  defaultValue={auth.user?.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-transparent text-gray-500 font-semibold text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Contacto</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><Phone className="w-5 h-5" /></span>
                <input 
                  type="tel" 
                  placeholder="9xx xxx xxx"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#FFB10A] outline-none font-semibold text-sm transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#FFB10A] text-white font-bold py-4 rounded-xl hover:bg-[#FFC000] active:scale-[0.98] transition-all">
                <Save className="w-5 h-5" />
                Guardar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

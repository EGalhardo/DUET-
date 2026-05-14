import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "Duelos 1 vs 1",
    description: "Desafie os seus amigos diretamente e prove quem é o verdadeiro mestre das Apostas desportivas",
    image: "https://i.postimg.cc/MZhBTPWS/1-vs-1.png",
    step: 1
  },
  {
    title: "Apostas Privadas",
    description: "Crie grupos de amigos e leve a competição para um nível emocionante.",
    image: "https://i.postimg.cc/xjbkWvKj/Privado.png",
    step: 2
  },
  {
    title: "Apostas Nacionais",
    description: "Aposta a nível nacional e mostre o seu talento no maior palco de apostas de Angola.",
    image: "https://i.postimg.cc/BvV6zbb2/Nacional.png",
    step: 3
  }
];

export default function Onboarding() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload images to avoid slow loading during transitions
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });

    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500);
            return 100;
          }
          return prev + 5; // Faster loading bar for better UX
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      localStorage.setItem('onboarding:seen', 'true');
      navigate('/login');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 z-[200]">
        <div className="flex flex-col items-center max-w-2xl w-full translate-y-[-5%]">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src="https://i.postimg.cc/qv29DrYP/l-OGOMARCA-OFICIAL-2.gif" 
                alt="DUET Logo" 
                className="w-full max-w-[512px] h-auto object-contain"
              />
            </div>
          </div>

          <div className="w-full px-12 md:px-24 mt-4">
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="h-full bg-[#FFB10A]"
              />
            </div>
            <p className="text-center text-[11px] font-black text-[#FFB10A] uppercase mt-4 tracking-[0.3em] animate-pulse">
              A carregar...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-white flex flex-col p-6 z-[200] overflow-y-auto">
      <div className="max-w-md mx-auto w-full flex flex-col min-h-full items-center justify-center py-10">
        {/* Step Counter Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-[#FFB10A]/10 text-[#FFB10A] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#FFB10A]/20"
        >
          Passo {slide.step} de {slides.length}
        </motion.div>

        {/* Image Section - No container, just the image */}
        <div className="w-full flex items-center justify-center flex-1 max-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full flex items-center justify-center"
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="max-w-full max-h-[380px] object-contain mx-auto drop-shadow-[0_20px_50px_rgba(255,177,10,0.15)]" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="w-full text-center mt-10 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4 space-y-3"
            >
              <h2 className="text-4xl font-black text-[#091747] uppercase tracking-tighter italic leading-none">
                {slide.title}
              </h2>
              <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[300px] mx-auto">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-full px-8 mt-4">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
              <motion.div 
                initial={false}
                animate={{ width: `${(slide.step / slides.length) * 100}%` }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="h-full bg-[#FFB10A]"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex items-center gap-4 px-4 mt-12">
          <button 
            onClick={handleBack}
            disabled={currentSlide === 0}
            className="flex-1 py-4 px-6 rounded-2xl bg-gray-50 border border-gray-200 text-[#091747] font-black text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
          >
            Anterior
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-4 px-6 rounded-2xl bg-[#FFB10A] text-white font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
          >
            {currentSlide === slides.length - 1 ? 'Começar Agora' : 'Próximo Passo'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

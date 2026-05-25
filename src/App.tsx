import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ImagePreloader from './components/ImagePreloader';
import Ranking from './pages/Ranking';
import Liga from './pages/Liga';

// Lazy load components for better performance and scalability
const Home = lazy(() => import('./pages/Home'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Aposta = lazy(() => import('./pages/Aposta'));
const Carteira = lazy(() => import('./pages/Carteira'));
const Historico = lazy(() => import('./pages/Historico'));
const Favoritos = lazy(() => import('./pages/Favoritos'));
const Perfil = lazy(() => import('./pages/Perfil'));
const OpiniaoSugestoes = lazy(() => import('./pages/OpiniaoSugestoes'));
const TransactionPage = lazy(() => import('./pages/TransactionPage'));
const DadosPessoais = lazy(() => import('./pages/DadosPessoais'));
const Seguranca = lazy(() => import('./pages/Seguranca'));
const Tutorial = lazy(() => import('./pages/Tutorial'));
const Afiliado = lazy(() => import('./pages/Afiliado'));
const Definicoes = lazy(() => import('./pages/Definicoes'));
const TerminarSessao = lazy(() => import('./pages/TerminarSessao'));
const InfoPage = lazy(() => import('./pages/InfoPage'));

// Loading component for Suspense
const PageLoader = ({ isOverlay = false }: { isOverlay?: boolean }) => (
  <div className={`flex flex-col items-center justify-center p-8 z-[500] ${isOverlay ? 'fixed inset-0 bg-white' : 'flex-1'}`}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#FFB10A] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-center text-[10px] font-black text-[#FFB10A] uppercase tracking-widest animate-pulse">
        A carregar...
      </p>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Show loader for 1 second on route change
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="route-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PageLoader isOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={<PageLoader isOverlay />}>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/carteira" element={<Carteira />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/opinioes-sugestoes" element={<OpiniaoSugestoes />} />
                <Route path="/dados-pessoais" element={<DadosPessoais />} />
                <Route path="/seguranca" element={<Seguranca />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/afiliado" element={<Afiliado />} />
                <Route path="/definicoes" element={<Definicoes />} />
                <Route path="/logout" element={<TerminarSessao />} />
                <Route path="/info/:slug" element={<InfoPage />} />
                <Route path="/contacto" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Contacto - Em desenvolvimento</h1></div>} />
                
                <Route path="/liga/:category" element={<Liga />} />
                <Route path="/aposta/:category" element={<Aposta />} />

                <Route path="/depositar" element={<TransactionPage />} />
                <Route path="/levantar" element={<TransactionPage />} />
                <Route path="/transferir" element={<TransactionPage />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ImagePreloader />
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import LandingPage from './pages/LandingPage'
import AgoraNoSCSPage from './pages/AgoraNoSCS'
import AgendaEventos from './pages/AgendaEventos'
import ComerciosAtivos from './pages/ComerciosAtivos'
import SegurancaComunitaria from './pages/SegurancaComunitaria'
import VacanciaReativacao from './pages/VacanciaReativacao'
import PainelGestao from './pages/PainelGestao'
import ComunicacaoIntegrada from './pages/ComunicacaoIntegrada'
import RotaInteligente from './pages/RotaInteligente'
import ComunidadeSCS from './pages/ComunidadeSCS'

function App() {
  return (
    <Routes>
      {/* Landing Page - SCS Conecta (com imagem de fundo) */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Página Agora no SCS - Revitalização Urbana Inteligente */}
      <Route path="/agora" element={<AgoraNoSCSPage />} />
      
      {/* Rotas principais com AppShell - SCS Conecta */}
      <Route path="/agenda" element={<AppShell><AgendaEventos /></AppShell>} />
      <Route path="/comercios" element={<AppShell><ComerciosAtivos /></AppShell>} />
      <Route path="/rota-inteligente" element={<AppShell><RotaInteligente /></AppShell>} />
      <Route path="/seguranca" element={<AppShell><SegurancaComunitaria /></AppShell>} />
      <Route path="/vacancia" element={<AppShell><VacanciaReativacao /></AppShell>} />
      <Route path="/gestao" element={<AppShell><PainelGestao /></AppShell>} />
      <Route path="/comunicacao" element={<AppShell><ComunicacaoIntegrada /></AppShell>} />
      <Route path="/comunidade" element={<AppShell><ComunidadeSCS /></AppShell>} />
      
      {/* Redirecionar rotas não encontradas para a landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

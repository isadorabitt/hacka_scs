// Serviços API para SCS Conecta
import axios from 'axios'
import { eventosMock } from '../data/scs-eventos-mock'
import { comerciosMock } from '../data/scs-comercios-mock'
import { alertasMock } from '../data/scs-alertas-mock'

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://api.scsconecta.df.gov.br',
  timeout: 10000,
}

/**
 * Busca eventos do SCS
 */
export const buscarEventos = async (filtros = {}) => {
  try {
    // Em produção, fazer requisição real
    // const response = await axios.get(`${API_CONFIG.baseURL}/eventos`, { params: filtros })
    // return response.data
    
    // Por enquanto, usar dados mockados com filtros
    let eventos = [...eventosMock]
    
    if (filtros.quadra) {
      eventos = eventos.filter(evt => evt.quadra === filtros.quadra)
    }
    
    if (filtros.horario === 'noturno') {
      eventos = eventos.filter(evt => parseInt(evt.horario.split(':')[0]) >= 18)
    }
    
    if (filtros.tipo) {
      eventos = eventos.filter(evt => evt.tipo === filtros.tipo)
    }
    
    return eventos
  } catch (error) {
    console.warn('Erro ao buscar eventos:', error.message)
    return eventosMock
  }
}

/**
 * Cria um novo evento
 */
export const criarEvento = async (evento) => {
  try {
    // Em produção
    // const response = await axios.post(`${API_CONFIG.baseURL}/eventos`, evento)
    // return response.data
    
    // Mock: retornar evento criado
    const novoEvento = {
      ...evento,
      id: `evt-${Date.now()}`,
      status: 'pendente',
      qrCode: `https://scsconecta.df.gov.br/evento/evt-${Date.now()}`,
      engajamento: {
        visualizacoes: 0,
        qrScans: 0,
        confirmacoes: 0
      }
    }
    return novoEvento
  } catch (error) {
    console.error('Erro ao criar evento:', error.message)
    throw error
  }
}

/**
 * Busca comércios do SCS
 */
export const buscarComercios = async (filtros = {}) => {
  try {
    let comercios = [...comerciosMock]
    
    if (filtros.quadra) {
      comercios = comercios.filter(c => c.quadra === filtros.quadra)
    }
    
    if (filtros.tipo) {
      comercios = comercios.filter(c => c.tipo === filtros.tipo)
    }
    
    if (filtros.abertoNoite) {
      comercios = comercios.filter(c => c.abertoNoite === true)
    }
    
    return comercios
  } catch (error) {
    console.warn('Erro ao buscar comércios:', error.message)
    return comerciosMock
  }
}

/**
 * Busca alertas de segurança
 */
export const buscarAlertas = async (filtros = {}) => {
  try {
    let alertas = [...alertasMock]
    
    if (filtros.tipo) {
      alertas = alertas.filter(a => a.tipo === filtros.tipo)
    }
    
    if (filtros.quadra) {
      alertas = alertas.filter(a => a.quadra === filtros.quadra)
    }
    
    return alertas
  } catch (error) {
    console.warn('Erro ao buscar alertas:', error.message)
    return alertasMock
  }
}

/**
 * Cria um novo alerta de segurança
 */
export const criarAlerta = async (alerta) => {
  try {
    // Em produção, enviar para API
    // const response = await axios.post(`${API_CONFIG.baseURL}/alertas`, alerta)
    // return response.data
    
    // Mock: retornar alerta criado
    const novoAlerta = {
      ...alerta,
      id: `alt-${Date.now()}`,
      data: new Date().toISOString(),
      status: 'reportado',
      anonimo: true
    }
    return novoAlerta
  } catch (error) {
    console.error('Erro ao criar alerta:', error.message)
    throw error
  }
}

/**
 * Busca estatísticas gerais do SCS
 */
export const buscarEstatisticas = async () => {
  try {
    // Em produção
    // const response = await axios.get(`${API_CONFIG.baseURL}/estatisticas`)
    // return response.data
    
    // Mock: calcular estatísticas dos dados mockados
    const comerciosAtivos = comerciosMock.filter(c => c.status === 'ativo').length
    const imoveisVazios = comerciosMock.filter(c => c.status === 'vazio').length
    const taxaOcupacao = ((comerciosAtivos / (comerciosAtivos + imoveisVazios)) * 100).toFixed(1)
    
    const engajamentoTotal = eventosMock.reduce((acc, evt) => {
      return acc + evt.engajamento.qrScans
    }, 0)
    
    return {
      eventos: eventosMock.length,
      comerciosAtivos,
      imoveisVazios,
      taxaOcupacao: parseFloat(taxaOcupacao),
      alertas: alertasMock.length,
      engajamentoTotal
    }
  } catch (error) {
    console.warn('Erro ao buscar estatísticas:', error.message)
    return {}
  }
}

/**
 * Gera QR Code para evento
 */
export const gerarQRCode = async (eventoId) => {
  try {
    // Em produção, gerar QR Code real
    // const response = await axios.post(`${API_CONFIG.baseURL}/eventos/${eventoId}/qrcode`)
    // return response.data
    
    // Mock: retornar URL do QR Code
    return {
      url: `https://scsconecta.df.gov.br/evento/${eventoId}`,
      qrCodeImage: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://scsconecta.df.gov.br/evento/${eventoId}`
    }
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error.message)
    throw error
  }
}

/**
 * Integração com Instagram (compartilhamento)
 */
export const compartilharInstagram = async (evento) => {
  // Instagram não permite compartilhamento direto via API
  // Retornar conteúdo formatado para o usuário copiar
  return {
    legenda: `🎉 ${evento.titulo}\n\n${evento.descricao}\n\n📍 ${evento.quadra.replace('scs-', 'SCS Quadra ')}\n📅 ${new Date(evento.data).toLocaleDateString('pt-BR')}\n⏰ ${evento.horario}\n\n🔗 ${evento.qrCode}\n\n#SCSConecta #SetorComercialSul #Brasilia #EventosDF`,
    hashtags: ['#SCSConecta', '#SetorComercialSul', '#Brasilia', '#EventosDF', '#CulturaDF']
  }
}

/**
 * Integração com WhatsApp (compartilhamento)
 */
export const compartilharWhatsApp = async (evento) => {
  const mensagem = `*${evento.titulo}*\n\n${evento.descricao}\n\n📍 ${evento.quadra.replace('scs-', 'SCS Quadra ')}\n📅 ${new Date(evento.data).toLocaleDateString('pt-BR')}\n⏰ ${evento.horario}\n\n🔗 ${evento.qrCode}`
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  return { url, mensagem }
}

/**
 * Integração com Telegram (compartilhamento)
 */
export const compartilharTelegram = async (evento) => {
  const mensagem = `${evento.titulo}\n\n${evento.descricao}\n\n📍 ${evento.quadra.replace('scs-', 'SCS Quadra ')}\n📅 ${new Date(evento.data).toLocaleDateString('pt-BR')}\n⏰ ${evento.horario}\n\n🔗 ${evento.qrCode}`
  const url = `https://t.me/share/url?url=${encodeURIComponent(evento.qrCode)}&text=${encodeURIComponent(mensagem)}`
  return { url, mensagem }
}

// ===== NOVOS SERVIÇOS DE IA =====

const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000'

/**
 * 🗺️ Mapa Vivo: O que está acontecendo AGORA no SCS
 */
export const agoraNoSCS = async (quadra = null, dadosReais = {}) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/api/v1/mapa/agora`,
      {
        quadra: quadra || null,
        timestamp: new Date().toISOString(),
      },
      {
        params: dadosReais,
      }
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar status atual:', error)
    // Se a API não estiver disponível, usar dados mock
    throw error
  }
}

/**
 * 📊 Predição de Movimento
 */
export const preverMovimento = async (quadra, dataHora, eventosAgendados = []) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/v1/movimento/prever`, {
      quadra,
      dataHora,
      eventosAgendados,
    })
    return response.data
  } catch (error) {
    console.warn('Erro ao prever movimento:', error)
    return null
  }
}

/**
 * 🤖 IA Multi-Agente: Orquestração inteligente
 */
export const orquestrarAgentes = async (quadra, contexto = {}) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/v1/agentes/orquestrar`, {
      quadra,
      contexto,
    })
    return response.data
  } catch (error) {
    console.warn('Erro ao orquestrar agentes:', error)
    return null
  }
}

/**
 * 🔮 Predição de Sucesso de Evento
 */
export const preverSucessoEvento = async (evento, historico = {}) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/v1/eventos/prever-sucesso`, {
      evento,
      historico,
    })
    return response.data
  } catch (error) {
    console.warn('Erro ao prever sucesso:', error)
    return null
  }
}


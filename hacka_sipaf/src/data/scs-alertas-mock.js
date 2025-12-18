// Dados mockados de alertas de segurança do SCS
export const alertasMock = [
  {
    id: 'alt-001',
    tipo: 'atividade-suspeita',
    quadra: 'scs-4',
    coordenadas: [-47.8835, -15.7925],
    data: '2025-12-18T18:30:00',
    descricao: 'Pessoa agindo de forma suspeita próximo ao bloco D',
    status: 'reportado',
    anonimo: true,
    correlacao: {
      eventosAtivos: 0,
      horario: '18:30',
      quadra: 'scs-4'
    }
  },
  {
    id: 'alt-002',
    tipo: 'ameaca',
    quadra: 'scs-1',
    coordenadas: [-47.8975, -15.7925],
    data: '2025-12-18T22:15:00',
    descricao: 'Situação de ameaça reportada durante evento',
    status: 'em-atendimento',
    anonimo: true,
    correlacao: {
      eventosAtivos: 1,
      horario: '22:15',
      quadra: 'scs-1'
    }
  },
  {
    id: 'alt-003',
    tipo: 'assalto',
    quadra: 'scs-3',
    coordenadas: [-47.8875, -15.7925],
    data: '2025-12-18T19:45:00',
    descricao: 'Tentativa de assalto reportada',
    status: 'resolvido',
    anonimo: true,
    correlacao: {
      eventosAtivos: 0,
      horario: '19:45',
      quadra: 'scs-3'
    }
  }
]

// Padrões históricos para análise de IA
export const padroesHistorico = {
  'scs-1': {
    riscoNoturno: 'alto',
    horariosCriticos: ['22:00-02:00'],
    correlacaoEventos: 0.75
  },
  'scs-2': {
    riscoNoturno: 'alto',
    horariosCriticos: ['22:00-02:00'],
    correlacaoEventos: 0.70
  },
  'scs-3': {
    riscoNoturno: 'medio',
    horariosCriticos: ['18:00-20:00'],
    correlacaoEventos: 0.30
  },
  'scs-4': {
    riscoNoturno: 'medio',
    horariosCriticos: ['18:00-20:00'],
    correlacaoEventos: 0.25
  },
  'scs-5': {
    riscoNoturno: 'baixo',
    horariosCriticos: [],
    correlacaoEventos: 0.10
  },
  'scs-6': {
    riscoNoturno: 'baixo',
    horariosCriticos: [],
    correlacaoEventos: 0.15
  }
}


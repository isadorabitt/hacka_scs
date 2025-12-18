// Dados mockados de alertas de segurança do SCS
export const alertasMock = [
  {
    id: 'alt-001',
    tipo: 'atividade-suspeita',
    quadra: 'scs-4',
    coordenadas: [-47.8835, -15.7925],
    data: new Date(Date.now() - 3600000).toISOString(), // há 1 hora
    descricao: 'Movimentação suspeita próximo a imóveis vazios',
    status: 'em-atendimento',
    anonimo: true,
    verificado: false,
    correlacao: {
      eventosAtivos: 0,
      horario: '18:30',
      quadra: 'scs-4'
    }
  },
  {
    id: 'alt-002',
    tipo: 'atividade-suspeita',
    quadra: 'scs-3',
    coordenadas: [-47.8875, -15.7925],
    data: new Date(Date.now() - 7200000).toISOString(), // há 2 horas
    descricao: 'Grupo suspeito na área após fechamento dos comércios',
    status: 'reportado',
    anonimo: false,
    verificado: true,
    correlacao: {
      eventosAtivos: 0,
      horario: '20:00',
      quadra: 'scs-3'
    }
  },
  {
    id: 'alt-003',
    tipo: 'ameaca',
    quadra: 'scs-1',
    coordenadas: [-47.8975, -15.7925],
    data: new Date(Date.now() - 86400000).toISOString(), // há 1 dia
    descricao: 'Situação de ameaça reportada durante evento',
    status: 'resolvido',
    anonimo: true,
    verificado: false,
    correlacao: {
      eventosAtivos: 1,
      horario: '22:15',
      quadra: 'scs-1'
    }
  },
  {
    id: 'alt-004',
    tipo: 'assalto',
    quadra: 'scs-3',
    coordenadas: [-47.8875, -15.7925],
    data: new Date(Date.now() - 172800000).toISOString(), // há 2 dias
    descricao: 'Tentativa de assalto reportada',
    status: 'resolvido',
    anonimo: true,
    verificado: false,
    correlacao: {
      eventosAtivos: 0,
      horario: '19:45',
      quadra: 'scs-3'
    }
  },
  {
    id: 'alt-005',
    tipo: 'outro',
    quadra: 'scs-2',
    coordenadas: [-47.8900, -15.7925],
    data: new Date(Date.now() - 259200000).toISOString(), // há 3 dias
    descricao: 'Iluminação pública com defeito na quadra 2',
    status: 'resolvido',
    anonimo: false,
    verificado: true,
    correlacao: {
      eventosAtivos: 0,
      horario: '18:00',
      quadra: 'scs-2'
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


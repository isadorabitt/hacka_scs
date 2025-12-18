// Dados mockados de eventos do SCS
export const eventosMock = [
  {
    id: 'evt-001',
    titulo: 'Festival de Música ao Vivo - SCS 1',
    descricao: 'Show com bandas locais e DJs. Evento noturno para ativar a quadra 1.',
    quadra: 'scs-1',
    data: '2025-12-20',
    horario: '20:00',
    horarioFim: '02:00',
    tipo: 'cultural',
    publico: 'jovens',
    impactoEsperado: 'alto',
    nivelDestaque: 'alto',
    necessidadeApoio: ['seguranca', 'iluminacao'],
    riscoOperacional: 'medio',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-001',
    status: 'aprovado',
    criadoPor: 'comerciante',
    engajamento: {
      visualizacoes: 1250,
      qrScans: 340,
      confirmacoes: 180
    }
  },
  {
    id: 'evt-002',
    titulo: 'Feira de Artesanato - SCS 5',
    descricao: 'Feira cultural com artesãos locais e apresentações artísticas.',
    quadra: 'scs-5',
    data: '2025-12-22',
    horario: '14:00',
    horarioFim: '20:00',
    tipo: 'cultural',
    publico: 'todas-idades',
    impactoEsperado: 'medio',
    nivelDestaque: 'medio',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-002',
    status: 'aprovado',
    criadoPor: 'prefeitura',
    engajamento: {
      visualizacoes: 890,
      qrScans: 210,
      confirmacoes: 95
    }
  },
  {
    id: 'evt-003',
    titulo: 'Happy Hour Especial - SCS 2',
    descricao: 'Promoção especial em vários bares da quadra 2.',
    quadra: 'scs-2',
    data: '2025-12-19',
    horario: '18:00',
    horarioFim: '23:00',
    tipo: 'comercial',
    publico: 'adultos',
    impactoEsperado: 'alto',
    nivelDestaque: 'alto',
    necessidadeApoio: ['seguranca'],
    riscoOperacional: 'medio',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-003',
    status: 'aprovado',
    criadoPor: 'comerciante',
    engajamento: {
      visualizacoes: 2100,
      qrScans: 580,
      confirmacoes: 320
    }
  },
  {
    id: 'evt-004',
    titulo: 'Exposição de Arte - Galeria SCS 6',
    descricao: 'Exposição de artistas locais na galeria da quadra 6.',
    quadra: 'scs-6',
    data: '2025-12-21',
    horario: '10:00',
    horarioFim: '18:00',
    tipo: 'cultural',
    publico: 'todas-idades',
    impactoEsperado: 'baixo',
    nivelDestaque: 'baixo',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-004',
    status: 'aprovado',
    criadoPor: 'prefeitura',
    engajamento: {
      visualizacoes: 450,
      qrScans: 120,
      confirmacoes: 45
    }
  }
]


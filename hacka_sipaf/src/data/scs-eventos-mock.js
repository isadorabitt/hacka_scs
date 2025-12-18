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
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', // Evento cultural no SCS - substitua por foto real do festival
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
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // Feira No Setor - substitua por foto real da feira no SCS
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
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', // Happy Hour SCS 2 - substitua por foto real dos bares do SCS
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
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', // Galeria SCS 6 - substitua por foto real da galeria
    engajamento: {
      visualizacoes: 450,
      qrScans: 120,
      confirmacoes: 45
    }
  }
]


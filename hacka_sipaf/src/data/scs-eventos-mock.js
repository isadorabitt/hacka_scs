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
    publicoAlvo: ['lgbt', 'feminino'], // Evento inclusivo para comunidade LGBT+ e público feminino
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
    publicoAlvo: ['idoso', 'acessivel', 'feminino'], // Evento acessível e inclusivo
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
    publicoAlvo: [], // Evento geral
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
    publicoAlvo: ['idoso', 'acessivel'], // Evento acessível para idosos
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
  },
  {
    id: 'evt-005',
    titulo: 'Festival Gastronômico SCS',
    descricao: 'Restaurantes da região com pratos especiais e degustações.',
    quadra: 'scs-1',
    data: new Date().toISOString().split('T')[0], // Hoje
    horario: '18:00',
    horarioFim: '23:00',
    tipo: 'gastronomico',
    publico: 'todas-idades',
    publicoAlvo: ['acessivel', 'idoso'], // Evento acessível
    impactoEsperado: 'alto',
    nivelDestaque: 'alto',
    necessidadeApoio: ['seguranca'],
    riscoOperacional: 'medio',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-005',
    status: 'aprovado',
    criadoPor: 'comunidade',
    imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    engajamento: {
      visualizacoes: 3200,
      qrScans: 890,
      confirmacoes: 450
    }
  },
  {
    id: 'evt-006',
    titulo: 'Exposição: Arte Urbana Brasiliense',
    descricao: 'Exposição de grafite e arte de rua com artistas locais.',
    quadra: 'scs-6',
    data: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Ontem
    horario: '14:00',
    horarioFim: '20:00',
    tipo: 'cultural',
    publico: 'todas-idades',
    publicoAlvo: ['lgbt', 'feminino', 'acessivel'], // Evento inclusivo
    impactoEsperado: 'medio',
    nivelDestaque: 'alto',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-006',
    status: 'aprovado',
    criadoPor: 'prefeitura',
    imagem: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    engajamento: {
      visualizacoes: 1800,
      qrScans: 420,
      confirmacoes: 210
    }
  },
  {
    id: 'evt-007',
    titulo: 'Show de Pagode - Quadra 2',
    descricao: 'Apresentação de grupo local de pagode com participações especiais.',
    quadra: 'scs-2',
    data: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], // Em 2 dias
    horario: '20:00',
    horarioFim: '02:00',
    tipo: 'show',
    publico: 'jovens',
    publicoAlvo: [], // Evento geral
    impactoEsperado: 'alto',
    nivelDestaque: 'medio',
    necessidadeApoio: ['seguranca', 'iluminacao'],
    riscoOperacional: 'medio',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-007',
    status: 'aprovado',
    criadoPor: 'comerciante',
    imagem: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    engajamento: {
      visualizacoes: 2800,
      qrScans: 750,
      confirmacoes: 200
    }
  },
  {
    id: 'evt-008',
    titulo: 'Feira de Artesanato Local',
    descricao: 'Feira com artesãos do DF expondo e vendendo produtos artesanais.',
    quadra: 'scs-5',
    data: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], // Em 3 dias
    horario: '09:00',
    horarioFim: '17:00',
    tipo: 'feira',
    publico: 'todas-idades',
    publicoAlvo: ['feminino', 'idoso', 'acessivel'], // Evento inclusivo
    impactoEsperado: 'medio',
    nivelDestaque: 'medio',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-008',
    status: 'aprovado',
    criadoPor: 'prefeitura',
    imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    engajamento: {
      visualizacoes: 1200,
      qrScans: 280,
      confirmacoes: 150
    }
  },
  {
    id: 'evt-009',
    titulo: 'Encontro de Mulheres Empreendedoras - SCS 3',
    descricao: 'Rede de networking e palestras para mulheres empreendedoras do SCS.',
    quadra: 'scs-3',
    data: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0], // Em 5 dias
    horario: '14:00',
    horarioFim: '18:00',
    tipo: 'cultural',
    publico: 'adultos',
    publicoAlvo: ['feminino'], // Evento exclusivo para mulheres
    impactoEsperado: 'alto',
    nivelDestaque: 'alto',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-009',
    status: 'aprovado',
    criadoPor: 'comunidade',
    imagem: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    engajamento: {
      visualizacoes: 2100,
      qrScans: 520,
      confirmacoes: 280
    }
  },
  {
    id: 'evt-010',
    titulo: 'Pride SCS - Festa da Diversidade',
    descricao: 'Celebração da diversidade com música, arte e cultura LGBTQIA+ no SCS.',
    quadra: 'scs-2',
    data: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], // Em 7 dias
    horario: '16:00',
    horarioFim: '23:00',
    tipo: 'show',
    publico: 'todas-idades',
    publicoAlvo: ['lgbt', 'feminino', 'acessivel'], // Evento inclusivo LGBTQIA+
    impactoEsperado: 'alto',
    nivelDestaque: 'alto',
    necessidadeApoio: ['seguranca'],
    riscoOperacional: 'medio',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-010',
    status: 'aprovado',
    criadoPor: 'comunidade',
    imagem: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    engajamento: {
      visualizacoes: 3500,
      qrScans: 980,
      confirmacoes: 520
    }
  },
  {
    id: 'evt-011',
    titulo: 'Café da Manhã para Idosos - SCS 4',
    descricao: 'Encontro matinal com atividades recreativas e café da manhã especial.',
    quadra: 'scs-4',
    data: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0], // Em 4 dias
    horario: '08:00',
    horarioFim: '11:00',
    tipo: 'cultural',
    publico: 'idosos',
    publicoAlvo: ['idoso', 'acessivel'], // Evento para idosos
    impactoEsperado: 'medio',
    nivelDestaque: 'medio',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-011',
    status: 'aprovado',
    criadoPor: 'prefeitura',
    imagem: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    engajamento: {
      visualizacoes: 680,
      qrScans: 150,
      confirmacoes: 95
    }
  },
  {
    id: 'evt-012',
    titulo: 'Festival Infantil - SCS 5',
    descricao: 'Dia de brincadeiras, contação de histórias e atividades para crianças.',
    quadra: 'scs-5',
    data: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0], // Em 6 dias
    horario: '09:00',
    horarioFim: '17:00',
    tipo: 'cultural',
    publico: 'criancas',
    publicoAlvo: ['infantil', 'acessivel'], // Evento para crianças
    impactoEsperado: 'alto',
    nivelDestaque: 'alto',
    necessidadeApoio: ['seguranca'],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-012',
    status: 'aprovado',
    criadoPor: 'prefeitura',
    imagem: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    engajamento: {
      visualizacoes: 2400,
      qrScans: 650,
      confirmacoes: 380
    }
  },
  {
    id: 'evt-013',
    titulo: 'Teatro de Fantoches - SCS 6',
    descricao: 'Apresentação de teatro de fantoches com histórias educativas para crianças.',
    quadra: 'scs-6',
    data: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0], // Em 8 dias
    horario: '15:00',
    horarioFim: '17:00',
    tipo: 'cultural',
    publico: 'criancas',
    publicoAlvo: ['infantil', 'acessivel'], // Evento para crianças
    impactoEsperado: 'medio',
    nivelDestaque: 'medio',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-013',
    status: 'aprovado',
    criadoPor: 'comunidade',
    imagem: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    engajamento: {
      visualizacoes: 1200,
      qrScans: 320,
      confirmacoes: 180
    }
  },
  {
    id: 'evt-014',
    titulo: 'Feira de Troca de Brinquedos - SCS 3',
    descricao: 'Evento sustentável onde crianças podem trocar brinquedos e aprender sobre consumo consciente.',
    quadra: 'scs-3',
    data: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0], // Em 10 dias
    horario: '10:00',
    horarioFim: '14:00',
    tipo: 'feira',
    publico: 'criancas',
    publicoAlvo: ['infantil', 'feminino', 'acessivel'], // Evento inclusivo para crianças
    impactoEsperado: 'medio',
    nivelDestaque: 'medio',
    necessidadeApoio: [],
    riscoOperacional: 'baixo',
    qrCode: 'https://scsconecta.df.gov.br/evento/evt-014',
    status: 'aprovado',
    criadoPor: 'comunidade',
    imagem: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    engajamento: {
      visualizacoes: 1800,
      qrScans: 450,
      confirmacoes: 250
    }
  }
]


// Dados mockados de imóveis vazios e espaços públicos do SCS
export const imoveisVaziosMock = [
  {
    id: 'vazio-001',
    nome: 'Loja Vazia - SCS 3',
    tipo: 'comercial',
    quadra: 'scs-3',
    endereco: 'SCS Quadra 3, Bloco D, Loja 12',
    coordenadas: [-47.8865, -15.7925],
    area: 45, // m²
    tempoVazio: '8 meses',
    dataVazia: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
    valorAluguel: 3500,
    valorAluguelM2: 77.78,
    potencialReativacao: 'alto',
    sugestoesUso: ['café', 'loja de conveniência', 'escritório compartilhado'],
    condicoes: {
      iluminacao: 'boa',
      ventilacao: 'boa',
      acessibilidade: 'boa',
      infraestrutura: 'completa'
    },
    proximidadeEventos: 2,
    proximidadeComercios: 5,
    riscoSeguranca: 'medio',
    descricao: 'Imóvel ocioso disponível para locação. Localização estratégica próxima a escritórios e comércios ativos.',
    imagem: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    contato: {
      proprietario: 'Imobiliária SCS',
      telefone: '(61) 3333-1111',
      email: 'locacao@imobiliariascs.com.br'
    },
    historico: [
      { data: '2024-04-15', evento: 'Último inquilino saiu', tipo: 'saida' },
      { data: '2023-12-01', evento: 'Loja de roupas fechou', tipo: 'saida' },
      { data: '2022-06-01', evento: 'Loja de roupas iniciou', tipo: 'entrada' }
    ]
  },
  {
    id: 'vazio-002',
    nome: 'Escritório Vazio - SCS 4',
    tipo: 'escritorio',
    quadra: 'scs-4',
    endereco: 'SCS Quadra 4, Bloco A, Sala 305',
    coordenadas: [-47.8815, -15.7925],
    area: 120,
    tempoVazio: '12 meses',
    dataVazia: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    valorAluguel: 8500,
    valorAluguelM2: 70.83,
    potencialReativacao: 'medio',
    sugestoesUso: ['escritório', 'coworking', 'consultório'],
    condicoes: {
      iluminacao: 'excelente',
      ventilacao: 'boa',
      acessibilidade: 'excelente',
      infraestrutura: 'completa'
    },
    proximidadeEventos: 1,
    proximidadeComercios: 3,
    riscoSeguranca: 'baixo',
    descricao: 'Escritório amplo e bem localizado. Ideal para empresas de serviços ou consultórios.',
    imagem: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    contato: {
      proprietario: 'Administração do Bloco',
      telefone: '(61) 3333-2222',
      email: 'admin@blocoa.com.br'
    },
    historico: [
      { data: '2023-12-01', evento: 'Empresa de contabilidade saiu', tipo: 'saida' },
      { data: '2021-01-15', evento: 'Empresa de contabilidade iniciou', tipo: 'entrada' }
    ]
  },
  {
    id: 'vazio-003',
    nome: 'Loja Vazia - SCS 2',
    tipo: 'comercial',
    quadra: 'scs-2',
    endereco: 'SCS Quadra 2, Bloco B, Loja 8',
    coordenadas: [-47.8915, -15.7925],
    area: 60,
    tempoVazio: '3 meses',
    dataVazia: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    valorAluguel: 4500,
    valorAluguelM2: 75.00,
    potencialReativacao: 'muito-alto',
    sugestoesUso: ['restaurante', 'bar', 'lanchonete'],
    condicoes: {
      iluminacao: 'boa',
      ventilacao: 'regular',
      acessibilidade: 'boa',
      infraestrutura: 'completa'
    },
    proximidadeEventos: 4,
    proximidadeComercios: 8,
    riscoSeguranca: 'baixo',
    descricao: 'Localização privilegiada na quadra 2, próxima a bares e restaurantes. Alto potencial para negócios gastronômicos.',
    imagem: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    contato: {
      proprietario: 'João Silva',
      telefone: '(61) 99999-1111',
      email: 'joao.silva@email.com'
    },
    historico: [
      { data: '2024-09-01', evento: 'Lanchonete fechou', tipo: 'saida' },
      { data: '2022-03-01', evento: 'Lanchonete iniciou', tipo: 'entrada' }
    ]
  }
]

export const espacosPublicosMock = [
  {
    id: 'publico-001',
    nome: 'Galerias SCS 5',
    tipo: 'galeria',
    quadra: 'scs-5',
    endereco: 'SCS Quadra 5, Galeria Central',
    coordenadas: [-47.8775, -15.7925],
    area: 500,
    capacidade: 200,
    disponivelParaEventos: true,
    tipoEventos: ['cultural', 'feira', 'exposição'],
    infraestrutura: ['iluminação', 'som', 'banheiros', 'estacionamento'],
    taxaUso: 0, // Gratuito para eventos culturais
    proximidadeEventos: 3,
    descricao: 'Espaço público para eventos culturais. Ideal para feiras, exposições e apresentações artísticas.',
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    contato: {
      responsavel: 'Administração Regional',
      telefone: '(61) 3333-4444',
      email: 'eventos@admregional.df.gov.br'
    },
    eventosRecentes: [
      { nome: 'Feira de Artesanato', data: '2024-11-15', participantes: 150 },
      { nome: 'Exposição de Arte', data: '2024-10-20', participantes: 80 }
    ]
  },
  {
    id: 'publico-002',
    nome: 'Anfiteatro SCS 6',
    tipo: 'anfiteatro',
    quadra: 'scs-6',
    endereco: 'SCS Quadra 6, Área Cultural',
    coordenadas: [-47.8725, -15.7925],
    area: 800,
    capacidade: 300,
    disponivelParaEventos: true,
    tipoEventos: ['show', 'teatro', 'apresentação'],
    infraestrutura: ['palco', 'iluminação', 'som', 'banheiros', 'estacionamento'],
    taxaUso: 0,
    proximidadeEventos: 2,
    descricao: 'Anfiteatro ao ar livre para apresentações. Espaço amplo com palco e infraestrutura completa.',
    imagem: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    contato: {
      responsavel: 'Secretaria de Cultura',
      telefone: '(61) 3333-5555',
      email: 'cultura@df.gov.br'
    },
    eventosRecentes: [
      { nome: 'Show de Música', data: '2024-11-10', participantes: 250 },
      { nome: 'Peça de Teatro', data: '2024-10-05', participantes: 180 }
    ]
  }
]

// Análise de mercado por quadra
export const analiseMercado = {
  'scs-1': {
    taxaVacancia: 8.5,
    valorMedioM2: 85.00,
    demanda: 'alta',
    tendencia: 'estavel',
    oportunidades: ['bares', 'restaurantes', 'entretenimento']
  },
  'scs-2': {
    taxaVacancia: 6.2,
    valorMedioM2: 80.00,
    demanda: 'alta',
    tendencia: 'crescimento',
    oportunidades: ['gastronomia', 'bares', 'serviços']
  },
  'scs-3': {
    taxaVacancia: 15.3,
    valorMedioM2: 70.00,
    demanda: 'media',
    tendencia: 'declinio',
    oportunidades: ['escritórios', 'serviços', 'coworking']
  },
  'scs-4': {
    taxaVacancia: 18.7,
    valorMedioM2: 65.00,
    demanda: 'baixa',
    tendencia: 'declinio',
    oportunidades: ['escritórios', 'consultórios', 'serviços']
  },
  'scs-5': {
    taxaVacancia: 5.1,
    valorMedioM2: 75.00,
    demanda: 'alta',
    tendencia: 'crescimento',
    oportunidades: ['cultura', 'eventos', 'galerias']
  },
  'scs-6': {
    taxaVacancia: 4.8,
    valorMedioM2: 72.00,
    demanda: 'alta',
    tendencia: 'crescimento',
    oportunidades: ['cultura', 'eventos', 'espaços públicos']
  }
}


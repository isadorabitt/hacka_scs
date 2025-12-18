// Dados mockados da comunidade SCS
export const postsMock = [
  {
    id: 'post-001',
    titulo: '[OFICIAL] Novas medidas de segurança implementadas',
    conteudo: 'A administração regional informa que foram instaladas 20 novas câmeras de segurança nas Quadras 3 e 4. Também aumentamos o patrulhamento noturno. Reportem qualquer atividade suspeita pelo app.',
    autor: {
      nome: 'Prefeitura SCS',
      avatar: 'https://ui-avatars.com/api/?name=Prefeitura+SCS&background=f97316&color=fff',
      verificado: true,
      tipo: 'oficial'
    },
    categoria: 'aviso',
    quadra: 'scs-3',
    fixado: true,
    upvotes: 195,
    downvotes: 2,
    comentarios: 67,
    data: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    imagem: null,
    tags: ['segurança', 'oficial', 'câmeras']
  },
  {
    id: 'post-002',
    titulo: 'Festival Gastronômico SCS - Programação Completa',
    conteudo: 'Pessoal, saiu a programação completa do Festival Gastronômico! Teremos 15 restaurantes participantes, food trucks, e shows ao vivo. Confira no site oficial: festivalSCS.com.br',
    autor: {
      nome: 'Carlos Eventos',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Eventos&background=3b82f6&color=fff',
      verificado: true,
      tipo: 'comerciante'
    },
    categoria: 'evento',
    quadra: 'scs-1',
    fixado: true,
    upvotes: 151,
    downvotes: 1,
    comentarios: 42,
    data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    tags: ['evento', 'gastronomia', 'festival']
  },
  {
    id: 'post-003',
    titulo: 'Proposta: Melhorar iluminação na Quadra 4',
    conteudo: 'Pessoal, tenho notado que a iluminação na Quadra 4 está muito fraca à noite. Isso pode estar contribuindo para os problemas de segurança. Que tal uma petição para a administração regional?',
    autor: {
      nome: 'Maria Silva',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Silva&background=8b5cf6&color=fff',
      verificado: false,
      tipo: 'cidadão'
    },
    categoria: 'sugestao',
    quadra: 'scs-4',
    fixado: true,
    upvotes: 39,
    downvotes: 0,
    comentarios: 12,
    data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    imagem: null,
    tags: ['iluminação', 'segurança', 'infraestrutura']
  },
  {
    id: 'post-004',
    titulo: 'Novo restaurante abrindo na Quadra 1!',
    conteudo: 'Boa notícia! Vamos abrir um restaurante de comida italiana na Quadra 1 mês que vem. Teremos música ao vivo às sextas e sábados. Todos estão convidados para a inauguração dia 25!',
    autor: {
      nome: 'João Comerciante',
      avatar: 'https://ui-avatars.com/api/?name=João+Comerciante&background=10b981&color=fff',
      verificado: true,
      tipo: 'comerciante'
    },
    categoria: 'comercio',
    quadra: 'scs-1',
    fixado: false,
    upvotes: 85,
    downvotes: 1,
    comentarios: 23,
    data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    tags: ['comércio', 'restaurante', 'inauguração']
  },
  {
    id: 'post-005',
    titulo: 'Exposição de arte urbana foi incrível!',
    conteudo: 'Fui na exposição de arte urbana na Quadra 6 e estava simplesmente espetacular! Recomendo muito, ainda dá tempo de ver. Fica até semana que vem.',
    autor: {
      nome: 'Pedro Artista',
      avatar: 'https://ui-avatars.com/api/?name=Pedro+Artista&background=ec4899&color=fff',
      verificado: false,
      tipo: 'cidadão'
    },
    categoria: 'discussao',
    quadra: 'scs-6',
    fixado: false,
    upvotes: 62,
    downvotes: 0,
    comentarios: 12,
    data: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    imagem: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    tags: ['cultura', 'arte', 'exposição']
  },
  {
    id: 'post-006',
    titulo: 'Alguém viu o grupo suspeito na Quadra 3?',
    conteudo: 'Ontem à noite por volta das 22h vi um grupo suspeito próximo aos escritórios vazios na Quadra 3. Já reportei no app mas queria saber se mais alguém viu algo.',
    autor: {
      nome: 'Ana Moradora',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Moradora&background=ef4444&color=fff',
      verificado: false,
      tipo: 'cidadão'
    },
    categoria: 'seguranca',
    quadra: 'scs-3',
    fixado: false,
    upvotes: 33,
    downvotes: 0,
    comentarios: 8,
    data: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    imagem: null,
    tags: ['segurança', 'alerta', 'comunidade']
  },
  {
    id: 'post-007',
    titulo: 'Workshop de empreendedorismo - Quadra 2',
    conteudo: 'Vamos realizar um workshop gratuito sobre empreendedorismo na Quadra 2. Será no próximo sábado às 14h. Inscrições pelo link: workshopSCS.com.br',
    autor: {
      nome: 'Instituto Empreender',
      avatar: 'https://ui-avatars.com/api/?name=Instituto+Empreender&background=6366f1&color=fff',
      verificado: true,
      tipo: 'organizacao'
    },
    categoria: 'evento',
    quadra: 'scs-2',
    fixado: false,
    upvotes: 28,
    downvotes: 0,
    comentarios: 5,
    data: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    imagem: null,
    tags: ['workshop', 'educação', 'empreendedorismo']
  }
]

export const comentariosMock = {
  'post-001': [
    {
      id: 'com-001',
      conteudo: 'Ótima notícia! Isso vai melhorar muito a segurança na região.',
      autor: {
        nome: 'João Silva',
        avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=3b82f6&color=fff',
        verificado: false
      },
      upvotes: 12,
      data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'com-002',
      conteudo: 'Finalmente! A quadra 3 estava precisando disso.',
      autor: {
        nome: 'Maria Santos',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=8b5cf6&color=fff',
        verificado: false
      },
      upvotes: 8,
      data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  'post-002': [
    {
      id: 'com-003',
      conteudo: 'Já marquei na agenda! Vai ser incrível!',
      autor: {
        nome: 'Pedro Costa',
        avatar: 'https://ui-avatars.com/api/?name=Pedro+Costa&background=10b981&color=fff',
        verificado: false
      },
      upvotes: 5,
      data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}

export const categorias = [
  { id: 'todas', label: 'Todas Categorias', cor: 'gray' },
  { id: 'aviso', label: 'Aviso', cor: 'orange' },
  { id: 'evento', label: 'Evento', cor: 'pink' },
  { id: 'comercio', label: 'Comércio', cor: 'green' },
  { id: 'seguranca', label: 'Segurança', cor: 'red' },
  { id: 'sugestao', label: 'Sugestão', cor: 'blue' },
  { id: 'discussao', label: 'Discussão', cor: 'purple' }
]


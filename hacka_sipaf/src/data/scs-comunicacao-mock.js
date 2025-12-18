// Dados mockados de comunicação e métricas
export const metricasCanais = {
  instagram: {
    seguidores: 12500,
    alcanceMedio: 8500,
    engajamentoMedio: 6.8,
    melhorHorario: '18:00-20:00',
    melhorDia: 'sexta',
    hashtagsSugeridas: ['#SCSConecta', '#SetorComercialSul', '#Brasilia', '#EventosDF', '#CulturaDF', '#BrasiliaDF']
  },
  whatsapp: {
    gruposAtivos: 8,
    membrosTotal: 1200,
    taxaResposta: 85,
    melhorHorario: '19:00-21:00',
    melhorDia: 'quinta'
  },
  telegram: {
    membros: 3500,
    visualizacoesMedias: 2800,
    taxaEngajamento: 12.5,
    melhorHorario: '08:00-09:00',
    melhorDia: 'segunda'
  }
}

export const historicoPublicacoes = [
  {
    id: 'pub-001',
    evento: 'evt-001',
    canal: 'instagram',
    data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    alcance: 9200,
    engajamento: 650,
    cliques: 320,
    status: 'publicado'
  },
  {
    id: 'pub-002',
    evento: 'evt-002',
    canal: 'whatsapp',
    data: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    alcance: 1100,
    engajamento: 95,
    cliques: 45,
    status: 'publicado'
  },
  {
    id: 'pub-003',
    evento: 'evt-001',
    canal: 'telegram',
    data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    alcance: 3100,
    engajamento: 420,
    cliques: 180,
    status: 'publicado'
  }
]

export const templatesPersonalizados = {
  instagram: {
    feed: {
      estrutura: 'emoji + título + descrição + localização + data/hora + link + hashtags',
      exemplo: '🎉 {titulo}\n\n{descricao}\n\n📍 {quadra}\n📅 {data}\n⏰ {horario}\n\n🔗 {link}\n\n{hashtags}'
    },
    story: {
      estrutura: 'título + data/hora + localização',
      exemplo: '{titulo}\n\n{data} às {horario}\n\n{quadra}'
    }
  },
  whatsapp: {
    estrutura: '*título* + descrição + localização + data/hora + link',
    exemplo: '*{titulo}*\n\n{descricao}\n\n📍 {quadra}\n📅 {data}\n⏰ {horario}\n\n🔗 {link}'
  },
  telegram: {
    estrutura: 'título + descrição + localização + data/hora + link',
    exemplo: '{titulo}\n\n{descricao}\n\n📍 {quadra}\n📅 {data}\n⏰ {horario}\n\n🔗 {link}'
  }
}


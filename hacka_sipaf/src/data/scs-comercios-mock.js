// Dados mockados de comércios do SCS
export const comerciosMock = [
  {
    id: 'com-001',
    nome: 'Bar do João',
    tipo: 'bar',
    quadra: 'scs-1',
    endereco: 'SCS Quadra 1, Bloco A, Loja 15',
    coordenadas: [-47.8975, -15.7925],
    abertoNoite: true,
    horarioFuncionamento: {
      segunda: '18:00-02:00',
      terca: '18:00-02:00',
      quarta: '18:00-02:00',
      quinta: '18:00-02:00',
      sexta: '18:00-03:00',
      sabado: '18:00-03:00',
      domingo: '18:00-01:00'
    },
    descricao: 'Bar tradicional com música ao vivo e petiscos',
    telefone: '(61) 99999-0001',
    status: 'ativo',
    badgeAbertoNoite: true,
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' // Bar do João SCS 1 - substitua por foto real do estabelecimento
  },
  {
    id: 'com-002',
    nome: 'Restaurante Sabor do Cerrado',
    tipo: 'restaurante',
    quadra: 'scs-1',
    endereco: 'SCS Quadra 1, Bloco B, Loja 8',
    coordenadas: [-47.8965, -15.7925],
    abertoNoite: true,
    horarioFuncionamento: {
      segunda: '11:00-23:00',
      terca: '11:00-23:00',
      quarta: '11:00-23:00',
      quinta: '11:00-23:00',
      sexta: '11:00-00:00',
      sabado: '11:00-00:00',
      domingo: '11:00-22:00'
    },
    descricao: 'Culinária regional com pratos típicos',
    telefone: '(61) 99999-0002',
    status: 'ativo',
    badgeAbertoNoite: true,
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80' // Restaurante Sabor do Cerrado SCS 1 - substitua por foto real
  },
  {
    id: 'com-003',
    nome: 'Escritório Contábil Silva',
    tipo: 'servico',
    quadra: 'scs-3',
    endereco: 'SCS Quadra 3, Bloco C, Sala 205',
    coordenadas: [-47.8875, -15.7925],
    abertoNoite: false,
    horarioFuncionamento: {
      segunda: '08:00-18:00',
      terca: '08:00-18:00',
      quarta: '08:00-18:00',
      quinta: '08:00-18:00',
      sexta: '08:00-18:00',
      sabado: 'fechado',
      domingo: 'fechado'
    },
    descricao: 'Serviços contábeis e consultoria',
    telefone: '(61) 99999-0003',
    status: 'ativo',
    badgeAbertoNoite: false,
    imagem: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' // Escritório
  },
  {
    id: 'com-004',
    nome: 'Loja Vazia - SCS 3',
    tipo: 'vazio',
    quadra: 'scs-3',
    endereco: 'SCS Quadra 3, Bloco D, Loja 12',
    coordenadas: [-47.8865, -15.7925],
    abertoNoite: false,
    horarioFuncionamento: null,
    descricao: 'Imóvel ocioso disponível para locação',
    telefone: null,
    status: 'vazio',
    badgeAbertoNoite: false,
    tempoVazio: '8 meses',
    imagem: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80' // Loja vazia SCS 3 - substitua por foto real do imóvel
  },
  {
    id: 'com-005',
    nome: 'Galerias SCS 5',
    tipo: 'espaco-publico',
    quadra: 'scs-5',
    endereco: 'SCS Quadra 5, Galeria Central',
    coordenadas: [-47.8775, -15.7925],
    abertoNoite: false,
    horarioFuncionamento: {
      segunda: '08:00-20:00',
      terca: '08:00-20:00',
      quarta: '08:00-20:00',
      quinta: '08:00-20:00',
      sexta: '08:00-20:00',
      sabado: '08:00-18:00',
      domingo: 'fechado'
    },
    descricao: 'Espaço público para eventos culturais',
    telefone: '(61) 3333-4444',
    status: 'ativo',
    badgeAbertoNoite: false,
    disponivelParaEventos: true,
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' // Galerias SCS 5 - substitua por foto real das galerias do SCS
  },
  {
    id: 'com-006',
    nome: 'Anfiteatro SCS 6',
    tipo: 'espaco-publico',
    quadra: 'scs-6',
    endereco: 'SCS Quadra 6, Área Cultural',
    coordenadas: [-47.8725, -15.7925],
    abertoNoite: true,
    horarioFuncionamento: {
      segunda: '08:00-22:00',
      terca: '08:00-22:00',
      quarta: '08:00-22:00',
      quinta: '08:00-22:00',
      sexta: '08:00-22:00',
      sabado: '08:00-22:00',
      domingo: '08:00-20:00'
    },
    descricao: 'Anfiteatro ao ar livre para apresentações',
    telefone: '(61) 3333-5555',
    status: 'ativo',
    badgeAbertoNoite: true,
    disponivelParaEventos: true,
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' // Anfiteatro SCS 6 - substitua por foto real do anfiteatro
  }
]


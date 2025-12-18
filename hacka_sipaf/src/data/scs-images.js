/**
 * Imagens Reais do Setor Comercial Sul (SCS)
 * Fotos autênticas do local para uso no app
 */

// Importar imagens reais do SCS
import mercadoPassagem1 from '../assets/images/scs/PHOTO-2025-12-16-13-53-43.jpg'
import mercadoPassagem2 from '../assets/images/scs/PHOTO-2025-12-16-13-53-44.jpg'
import mercadoPassagem3 from '../assets/images/scs/PHOTO-2025-12-16-13-53-43 2.jpg'
import mercadoPassagem4 from '../assets/images/scs/PHOTO-2025-12-16-13-53-44 2.jpg'
import feiraLivre1 from '../assets/images/scs/PHOTO-2025-12-16-14-02-00.jpg'
import feiraLivre2 from '../assets/images/scs/PHOTO-2025-12-16-14-02-01.jpg'
import lojaManequins1 from '../assets/images/scs/PHOTO-2025-12-16-14-16-55.jpg'
import lojaManequins2 from '../assets/images/scs/PHOTO-2025-12-16-14-16-55 2.jpg'
import feiraArte from '../assets/images/scs/PHOTO-2025-12-16-14-17-08.jpg'
import pracaArvores from '../assets/images/scs/PHOTO-2025-12-16-14-36-38.jpg'
import ruaPrincipal from '../assets/images/scs/PHOTO-2025-12-16-14-38-30.jpg'

export const scsImages = {
  // Imagens de mercado/feira livre (passagem coberta com pilares)
  mercado: {
    principal: mercadoPassagem1, // Passagem coberta com feira livre
    feiraLivre: feiraLivre1, // Feira com guarda-sóis coloridos
    comercios: mercadoPassagem2, // Comércios na passagem
    passagem: mercadoPassagem3, // Vista da passagem coberta
    interior: mercadoPassagem4, // Interior da passagem com barracas
  },
  
  // Imagens de arquitetura
  arquitetura: {
    edificio: mercadoPassagem1, // Edifício Armando Pereira
    edificioDumont: lojaManequins1, // Condomínio Arnaldo Dumont
    quadras: mercadoPassagem2, // Vista das quadras
    passagemCoberta: mercadoPassagem3, // Passagem com pilares de concreto
  },
  
  // Imagens de eventos/cultura
  eventos: {
    feiraArte: feiraArte, // Feira de arte e artesanato
    apresentacao: feiraLivre2, // Evento cultural
    cultura: feiraLivre1, // Feira cultural
  },
  
  // Imagens de praça/espaço público
  espacoPublico: {
    praca: pracaArvores, // Praça com árvores e bancos
    arvores: pracaArvores, // Área verde do SCS
    caminhada: pracaArvores, // Espaço público para caminhada
  },
  
  // Imagens de comércios
  comercios: {
    lojas: lojaManequins1, // Lojas de roupas e acessórios
    restaurantes: feiraLivre1, // Restaurante self-service
    servicos: mercadoPassagem2, // Comércios e serviços
    manequins: lojaManequins2, // Loja com manequins
  },
  
  // Imagens de rua/trânsito
  rua: {
    ruaPrincipal: ruaPrincipal, // Rua principal do SCS
    movimento: ruaPrincipal, // Movimento na rua
    veiculos: ruaPrincipal, // Rua com veículos estacionados
  },
}

// URLs específicas para uso em componentes
export const getSCSImage = (categoria, tipo = 'principal') => {
  return scsImages[categoria]?.[tipo] || scsImages.mercado.principal
}

// Array de todas as imagens para carrossel/galeria (ordem de exibição)
export const todasImagensSCS = [
  { url: scsImages.mercado.principal, categoria: 'Mercado', descricao: 'Feira livre na passagem coberta do SCS' },
  { url: scsImages.mercado.feiraLivre, categoria: 'Mercado', descricao: 'Feira com guarda-sóis coloridos' },
  { url: scsImages.comercios.manequins, categoria: 'Comércios', descricao: 'Lojas com manequins exibindo roupas' },
  { url: scsImages.eventos.feiraArte, categoria: 'Eventos', descricao: 'Feira de arte e artesanato' },
  { url: scsImages.espacoPublico.praca, categoria: 'Espaço Público', descricao: 'Praça com árvores e bancos' },
  { url: scsImages.rua.ruaPrincipal, categoria: 'Rua', descricao: 'Rua principal do SCS' },
  { url: scsImages.mercado.comercios, categoria: 'Mercado', descricao: 'Comércios na passagem coberta' },
  { url: scsImages.comercios.lojas, categoria: 'Comércios', descricao: 'Lojas de roupas e acessórios' },
]

// Fallback para quando imagens não estiverem disponíveis
export const getImageWithFallback = (imagePath, fallback = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80') => {
  return imagePath || fallback
}

export default scsImages



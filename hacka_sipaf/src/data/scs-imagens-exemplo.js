// Exemplo de como usar imagens reais do SCS
// Substitua as URLs abaixo pelas URLs reais das imagens do Setor Comercial Sul

export const imagensSCS = {
  eventos: {
    // Feira No Setor (evento real aos domingos)
    feiraNoSetor: 'https://exemplo.com/feira-no-setor-scs.jpg',
    
    // Ocupação Cultural No Setor (evento real)
    ocupacaoCultural: 'https://exemplo.com/ocupacao-cultural-scs.jpg',
    
    // Festival de música (substitua por foto real)
    festivalMusica: 'https://exemplo.com/festival-musica-scs1.jpg',
  },
  
  comercios: {
    // Bares e restaurantes SCS 1 e 2 (use Google Maps para encontrar)
    barSCS1: 'https://exemplo.com/bar-scs-quadra1.jpg',
    restauranteSCS1: 'https://exemplo.com/restaurante-scs-quadra1.jpg',
    
    // Escritórios SCS 3 e 4
    escritorioSCS3: 'https://exemplo.com/escritorio-scs-quadra3.jpg',
    
    // Espaços públicos SCS 5 e 6
    galeriaSCS5: 'https://exemplo.com/galeria-scs-quadra5.jpg',
    anfiteatroSCS6: 'https://exemplo.com/anfiteatro-scs-quadra6.jpg',
  },
  
  vacancia: {
    // Lojas vazias (use Google Street View)
    lojaVaziaSCS3: 'https://exemplo.com/loja-vazia-scs-quadra3.jpg',
  }
}

// Como usar:
// import { imagensSCS } from './scs-imagens-exemplo'
// imagem: imagensSCS.eventos.feiraNoSetor

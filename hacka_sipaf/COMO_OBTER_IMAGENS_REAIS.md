# 🎯 Como Obter Imagens Reais do Setor Comercial Sul

## Método Rápido: Google Maps + Street View

### Passo 1: Encontrar Estabelecimentos Reais

1. **Acesse Google Maps**: https://www.google.com/maps
2. **Busque**: "SCS Quadra 1, Brasília" ou "Setor Comercial Sul, Brasília"
3. **Navegue pelas quadras**: Use o Street View para ver os estabelecimentos

### Passo 2: Capturar Imagens

**Para Bares e Restaurantes (SCS 1 e 2):**
- No Google Maps, clique em estabelecimentos
- Veja as fotos enviadas por usuários
- Clique com botão direito → "Salvar imagem como"
- Salve em: `src/assets/images/scs/comercios/`

**Para Eventos:**
- Acesse os sites mencionados no guia
- Baixe fotos dos eventos reais
- Salve em: `src/assets/images/scs/eventos/`

### Passo 3: Atualizar os Dados

Após salvar as imagens, atualize os arquivos:

**`src/data/scs-eventos-mock.js`:**
```javascript
import feiraNoSetor from '../assets/images/scs/eventos/feira-no-setor.jpg'

{
  id: 'evt-002',
  // ...
  imagem: feiraNoSetor, // Imagem real da Feira No Setor
}
```

**`src/data/scs-comercios-mock.js`:**
```javascript
import barReal from '../assets/images/scs/comercios/bar-scs1.jpg'

{
  id: 'com-001',
  // ...
  imagem: barReal, // Foto real do estabelecimento
}
```

## 📍 Links Diretos para Pesquisa

### Google Maps - SCS Quadra 1
https://www.google.com/maps/search/SCS+Quadra+1,+Brasília

### Google Maps - SCS Quadra 2  
https://www.google.com/maps/search/SCS+Quadra+2,+Brasília

### Feira No Setor (Evento Real)
https://visitebrasilia.com.br/noticias/lazer-e-cultura-cultura-no-df-galeria-dos-estados-recebera-a-feira-no-setor-aos-domingos

### Ocupação Cultural (Evento Real)
https://www.brasildefato.com.br/2024/12/13/ocupacao-cultural-no-setor-comercial-sul-de-brasilia-une-samba-debates-e-gastronomia

## 🖼️ Exemplo de URLs de Imagens Públicas

Se encontrar URLs de imagens públicas, você pode usar diretamente:

```javascript
// Exemplo de URL de imagem pública
imagem: 'https://exemplo.com/imagem-scs-real.jpg'
```

## ⚡ Dica Rápida

1. Abra Google Maps
2. Digite "Setor Comercial Sul Brasília"
3. Ative o Street View
4. Navegue pelas ruas
5. Capture screenshots dos estabelecimentos
6. Salve as imagens localmente
7. Atualize os arquivos mockados


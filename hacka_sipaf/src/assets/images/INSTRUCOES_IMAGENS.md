# Instruções para Adicionar Imagens Reais

## 📸 Onde adicionar imagens

### 1. Eventos (Agenda de Eventos)
- Diretório: `src/assets/images/scs/eventos/`
- Nomes sugeridos:
  - `festival-musica-scs1.jpg`
  - `feira-artesanato-scs5.jpg`
  - `happy-hour-scs2.jpg`
  - `exposicao-arte-scs6.jpg`

### 2. Comércios (Comércios Ativos)
- Diretório: `src/assets/images/scs/comercios/`
- Nomes sugeridos:
  - `bar-joao-scs1.jpg`
  - `restaurante-cerrado-scs1.jpg`
  - `escritorio-silva-scs3.jpg`
  - `galerias-scs5.jpg`
  - `anfiteatro-scs6.jpg`

### 3. Vacância (Vacância e Reativação)
- Diretório: `src/assets/images/scs/vacancia/`
- Nomes sugeridos:
  - `loja-vazia-scs3.jpg`
  - `espaco-publico-scs5.jpg`
  - `espaco-publico-scs6.jpg`

## 🔧 Como usar

### Opção 1: Importar imagens locais

1. Coloque as imagens nos diretórios acima
2. Atualize os arquivos de dados mockados:

**Para eventos** (`src/data/scs-eventos-mock.js`):
```javascript
import eventoImg1 from '../assets/images/scs/eventos/festival-musica-scs1.jpg'

// No objeto do evento:
imagem: eventoImg1
```

**Para comércios** (`src/data/scs-comercios-mock.js`):
```javascript
import comercioImg1 from '../assets/images/scs/comercios/bar-joao-scs1.jpg'

// No objeto do comércio:
imagem: comercioImg1
```

### Opção 2: Usar URLs externas

Mantenha as URLs nas propriedades `imagem` dos objetos mockados. As URLs atuais são placeholders do Unsplash que podem ser substituídas por URLs reais das fotos do SCS.

## 📝 Notas

- **Formato recomendado**: JPG ou PNG
- **Tamanho recomendado**: 800x600px ou maior (mantém qualidade)
- **Aspect ratio**: 4:3 ou 16:9 funciona bem nos cards
- As imagens têm fallback automático caso não carreguem


# Imagem de Fundo do SCS

Para adicionar a imagem de fundo do Setor Comercial Sul:

1. Coloque sua imagem neste diretório com o nome `scs-background.jpg` (ou `.png`)
2. Descomente a linha de importação no arquivo `src/pages/LandingPage.jsx`:
   ```javascript
   import scsBackground from '../assets/images/scs/scs-background.jpg'
   ```
3. Atualize a propriedade `backgroundImage` para usar a importação:
   ```javascript
   backgroundImage: `url(${scsBackground})`
   ```

**Formatos suportados:** JPG, PNG, WebP
**Tamanho recomendado:** 1920x1080px ou maior (para melhor qualidade)


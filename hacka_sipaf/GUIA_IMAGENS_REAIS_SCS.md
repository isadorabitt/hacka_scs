# 📸 Guia para Adicionar Imagens Reais do Setor Comercial Sul

## 🎯 Fontes de Imagens Reais do SCS

### 1. Eventos Reais no SCS

#### Feira No Setor (Domingos)
- **Local**: Galeria dos Estados (entre SCS e SBS)
- **Fonte**: https://visitebrasilia.com.br/noticias/lazer-e-cultura-cultura-no-df-galeria-dos-estados-recebera-a-feira-no-setor-aos-domingos
- **Hashtags**: #FeiraNoSetor #SCSBrasilia
- **Como obter**: Acesse o site e salve as fotos do evento

#### Ocupação Cultural No Setor
- **Organizador**: Instituto Cultural e Social No Setor
- **Fonte**: https://www.brasildefato.com.br/2024/12/13/ocupacao-cultural-no-setor-comercial-sul-de-brasilia-une-samba-debates-e-gastronomia
- **Eventos**: Rodas de samba, debates, gastronomia
- **Como obter**: Reportagens com fotos dos eventos

#### Projeto Banco de Talentos
- **Local**: SCS
- **Fonte**: https://jornaldebrasilia.com.br/brasilia/projeto-banco-de-talentos-inaugura-feira-nesta-terca-11-no-setor-comercial-sul/
- **Como obter**: Matérias com fotos do evento

### 2. Estabelecimentos Comerciais Reais

#### Bares e Restaurantes (SCS Quadras 1 e 2)
- **Google Maps**: 
  - Busque "SCS Quadra 1, Brasília" ou "SCS Quadra 2, Brasília"
  - Veja fotos dos estabelecimentos reais
  - Use Google Street View para capturar screenshots
- **Instagram**: 
  - Busque #SCSBrasilia #SetorComercialSul
  - Veja posts de estabelecimentos locais
- **Como usar**: 
  1. Abra Google Maps
  2. Navegue até o SCS
  3. Clique em estabelecimentos
  4. Veja fotos enviadas por usuários
  5. Salve as imagens (com permissão)

#### Escritórios e Serviços (SCS Quadras 3 e 4)
- **Google Street View**: 
  - Navegue pelas quadras 3 e 4
  - Capture screenshots dos prédios comerciais
- **Google Maps**: 
  - Veja fotos dos escritórios listados

#### Galerias e Espaços Públicos (SCS Quadras 5 e 6)
- **Galeria dos Estados**: Próxima ao SCS
- **Flickr**: Busque "Setor Comercial Sul Brasília"
- **Google Maps**: Veja fotos dos espaços públicos

### 3. Imóveis Vazios

- **Google Street View**: 
  - Navegue pelas quadras 3 e 4
  - Identifique lojas vazias
  - Capture screenshots
- **Reportagens**: 
  - Site: https://curtamais.com.br/brasilia/2017/03/13/a-revitalizacao-do-setor-comercial-sul-de-brasilia/
  - Matérias sobre revitalização com fotos

## 🔧 Como Adicionar as Imagens

### Passo 1: Baixar as Imagens

1. Acesse as fontes mencionadas acima
2. Baixe as imagens (respeitando direitos autorais)
3. Salve em:
   ```
   src/assets/images/scs/eventos/        - Para eventos
   src/assets/images/scs/comercios/      - Para comércios
   src/assets/images/scs/vacancia/       - Para imóveis vazios
   ```

### Passo 2: Atualizar os Dados Mockados

**Para Eventos** (`src/data/scs-eventos-mock.js`):

```javascript
// Importar imagem local
import festivalMusica from '../assets/images/scs/eventos/festival-musica-scs1.jpg'

// No objeto do evento:
{
  id: 'evt-001',
  // ... outros campos
  imagem: festivalMusica, // ou URL direta
}
```

**Para Comércios** (`src/data/scs-comercios-mock.js`):

```javascript
// Importar imagem local
import barJoao from '../assets/images/scs/comercios/bar-joao-scs1.jpg'

// No objeto do comércio:
{
  id: 'com-001',
  // ... outros campos
  imagem: barJoao, // ou URL direta
}
```

### Passo 3: Usar URLs Diretas (Alternativa)

Se preferir usar URLs de imagens públicas:

```javascript
imagem: 'https://exemplo.com/imagem-scs.jpg'
```

## 📱 Ferramentas Úteis

1. **Google Maps**: Para ver estabelecimentos reais
2. **Google Street View**: Para capturar imagens dos locais
3. **Instagram**: Para ver fotos compartilhadas (#SCSBrasilia)
4. **Flickr**: Para imagens Creative Commons
5. **Sites de notícias**: Para fotos de eventos

## ⚠️ Direitos Autorais

- Sempre verifique os direitos de uso
- Dê crédito quando necessário
- Prefira imagens Creative Commons
- Entre em contato com fotógrafos para permissão
- Use imagens de domínio público quando possível

## 🎨 Tamanhos Recomendados

- **Cards de eventos**: 800x600px (4:3) ou 1200x675px (16:9)
- **Cards de comércios**: 800x600px
- **Formato**: JPG (melhor compressão) ou PNG (transparência)
- **Peso**: Máximo 500KB por imagem (para performance)

## 📝 Checklist

- [ ] Baixar imagens dos eventos reais do SCS
- [ ] Capturar fotos dos estabelecimentos via Google Maps/Street View
- [ ] Salvar imagens nos diretórios corretos
- [ ] Atualizar arquivos mockados com imports ou URLs
- [ ] Testar se as imagens carregam corretamente
- [ ] Verificar direitos de uso
- [ ] Adicionar créditos se necessário


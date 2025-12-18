# SCS Conecta

Super App para revitalização urbana do Setor Comercial Sul (SCS) em Brasília.

## 🎯 Objetivo

Quebrar o ciclo de esvaziamento noturno → sensação de insegurança → queda de movimento → mais imóveis vazios através de eventos, comércios ativos e segurança comunitária.

## 🧩 Módulos

### Módulo 1 - Agenda Inteligente de Eventos
Ativa o território do SCS, quadra por quadra, usando eventos como ferramenta de ocupação urbana segura. Inclui:
- Cadastro de eventos por comerciantes e prefeitura
- Classificação por quadra (SCS 1 a 6)
- Filtros por horário noturno, tipo de público e impacto esperado
- Integração com QR Codes oficiais
- IA de curadoria para análise de eventos

### Módulo 2 - Comércios Ativos por Quadra
Combate a ideia de "zona morta" destacando comércios abertos, especialmente à noite:
- Mapa de comércios por quadra
- Badge "Aberto à noite"
- Destaque para serviços essenciais

### Módulo 3 - Segurança Comunitária Inteligente
Transforma o cidadão em sensor urbano anônimo e confiável:
- Botões rápidos: atividade suspeita, ameaça, assalto
- Geolocalização automática por quadra
- Mapa preditivo de risco com análise de padrões históricos

### Módulo 4 - Vacância e Reativação de Espaços
Reduz imóveis ociosos e estimula ocupação temporária e permanente:
- Mapeamento de lojas vazias por quadra
- Identificação de espaços públicos (anfiteatros, galerias)
- Integração com agenda de eventos

### Módulo 5 - Painel de Gestão com IA
Apoia decisões baseadas em dados reais do território:
- Dashboards com estatísticas por quadra
- Recomendações de IA (segurança, ocupação, eventos)
- Integrações estratégicas com GDF

### Módulo 6 - Comunicação Integrada
Amplia o alcance através de canais digitais consolidados:
- Integração Instagram (feed e stories)
- Integração WhatsApp (compartilhamento direto)
- Integração Telegram (canal institucional)
- Geração automática de conteúdo por IA

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

O servidor estará disponível em `http://localhost:3007`

## 📦 Tecnologias

- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Leaflet / React-Leaflet (mapas)
- Recharts (gráficos)
- React Hot Toast (notificações)
- Zustand (gerenciamento de estado)
- React Icons

## 🏗️ Estrutura do Projeto

```
src/
├── pages/              # Páginas principais (módulos)
├── components/         # Componentes reutilizáveis
├── data/              # Dados mockados do SCS
├── services/          # Serviços API
├── contexts/          # Contextos React
├── styles/            # Estilos globais
└── utils/             # Utilitários
```

## 📊 Dados

O projeto utiliza dados mockados das 6 quadras do SCS:
- **SCS Quadras 1 e 2**: Alto fluxo noturno, bares e restaurantes
- **SCS Quadras 3 e 4**: Serviços, escritórios, imóveis ociosos
- **SCS Quadras 5 e 6**: Equipamentos públicos, galerias, espaços culturais

## 🔗 Integrações

- Agenda Oficial do GDF (quando disponível)
- Administração Regional do Plano Piloto
- Dados Abertos do GDF
- SEI/GDF (nível conceitual)

## 📝 Licença

Este projeto foi desenvolvido para o Hackathon SCS.

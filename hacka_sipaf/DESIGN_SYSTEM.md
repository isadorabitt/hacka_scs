# Design System - SCS Conecta

## 🎨 Paleta de Cores

### Primárias
- **Laranja → Vermelho**: `from-orange-500 to-red-500`
  - Uso: Botões principais, destaques, CTAs
  - Hex: `#f97316` → `#ef4444`

### Secundárias
- **Azul → Ciano**: `from-blue-500 to-cyan-500`
  - Uso: Informações, links secundários
  - Hex: `#3b82f6` → `#06b6d4`

### Neutros
- **Claro**: `neutral-50` a `neutral-900`
- **Escuro**: `neutral-900` a `neutral-50`
- Uso: Textos, backgrounds, bordas

### Status
- **Sucesso**: `green-500` (#10b981)
- **Aviso**: `yellow-500` (#f59e0b)
- **Erro**: `red-500` (#ef4444)
- **Info**: `blue-500` (#3b82f6)

## 📐 Componentes Padronizados

### PageHeader
```jsx
<PageHeader
  icon={FiCalendar}
  title="Título da Página"
  subtitle="Descrição opcional"
  action={<Button>Ação</Button>}
/>
```

### FilterBar
```jsx
<FilterBar>
  <Select label="Filtro 1" />
  <Select label="Filtro 2" />
</FilterBar>
```

### EventCard
```jsx
<EventCard
  evento={evento}
  onShare={handleShare}
  onQRCode={handleQRCode}
/>
```

### Button
- Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`
- Tamanhos: `sm`, `md`, `lg`, `xl`

### Badge
- Variantes: `default`, `primary`, `success`, `warning`, `error`, `info`, `outline`
- Tamanhos: `sm`, `md`, `lg`

### Card
- Variantes: `default`, `glass`, `elevated`, `gradient`
- Props: `hover`, `glow`

## 🎭 Estilos Aplicados

### Backgrounds
- Páginas: `bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30`
- Cards: `bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl`
- Glassmorphism: `backdrop-blur-xl` com transparência

### Bordas
- Padrão: `border-neutral-200 dark:border-neutral-700`
- Hover: `hover:border-orange-500/50`
- Radius: `rounded-xl` (12px) ou `rounded-2xl` (16px)

### Sombras
- Cards: `shadow-lg`
- Hover: `hover:shadow-xl`
- Glow: `shadow-[0_0_30px_rgba(255,140,0,0.3)]`

### Animações
- Hover Scale: `hover:scale-[1.02]`
- Transitions: `transition-all duration-300`
- Pulse: `animate-pulse` para indicadores

## 📱 Responsividade

- Mobile: `grid-cols-1`
- Tablet: `md:grid-cols-2`
- Desktop: `lg:grid-cols-3` ou `lg:grid-cols-4`

## 🎯 Princípios de Design

1. **Consistência**: Mesmos componentes, mesmos estilos
2. **Hierarquia Visual**: Tamanhos de fonte claros (4xl → sm)
3. **Espaçamento**: Sistema de 4px (gap-2, gap-4, gap-6)
4. **Contraste**: Texto legível em todos os backgrounds
5. **Feedback Visual**: Hover states em todos elementos interativos


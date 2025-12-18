import L from 'leaflet'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Criar marcadores customizados com ícones SVG
export const createCustomIcon = (options) => {
  const {
    color = '#3b82f6',
    icon: IconComponent,
    size = [32, 40],
    className = '',
    pulse = false
  } = options

  // Criar o SVG do marcador
  const markerSvg = `
    <svg width="${size[0]}" height="${size[1]}" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.163 24.837 0 16 0z" 
            fill="${color}" stroke="#fff" stroke-width="2"/>
    </svg>
  `

  // Criar o ícone interno se fornecido
  let iconSvg = ''
  if (IconComponent) {
    // Para ícones simples, vamos usar um SVG genérico
    iconSvg = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" 
           style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `
  }

  const pulseHtml = pulse ? `
    <div class="marker-pulse" style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${size[0] * 2}px;
      height: ${size[0] * 2}px;
      border-radius: 50%;
      background-color: ${color};
      opacity: 0.3;
      z-index: 0;
    "></div>
  ` : ''

  const iconHtml = `
    <div class="custom-marker ${className}" style="
      position: relative;
      width: ${size[0]}px;
      height: ${size[1]}px;
    ">
      ${pulseHtml}
      <div style="position: relative; z-index: 1;">
        ${markerSvg}
      </div>
      ${iconSvg}
    </div>
  `

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-container',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  })
}

// Marcadores pré-configurados com cores específicas
export const markerIcons = {
  // Vacância
  imovelVazio: (color = '#3b82f6') => createCustomIcon({
    color,
    size: [32, 40],
  }),

  espacoPublico: (color = '#10b981') => createCustomIcon({
    color,
    size: [32, 40],
  }),

  // Segurança
  alertaAtivo: (color = '#ef4444', pulse = true) => createCustomIcon({
    color,
    pulse,
    size: [36, 44],
  }),

  alertaResolvido: (color = '#10b981') => createCustomIcon({
    color,
    size: [32, 40],
  }),

  // Comércios
  comercioAtivo: (color = '#f59e0b', abertoNoite = false) => createCustomIcon({
    color: abertoNoite ? '#f97316' : color,
    pulse: abertoNoite,
    size: [32, 40],
  }),

  // Eventos
  evento: (color = '#a855f7') => createCustomIcon({
    color,
    size: [32, 40],
  }),

  // Padrão
  default: (color = '#6b7280') => createCustomIcon({
    color,
    size: [32, 40],
  }),
}

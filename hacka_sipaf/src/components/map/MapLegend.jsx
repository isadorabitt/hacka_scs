import { useState } from 'react'
import { FiMapPin, FiLayers, FiEye, FiEyeOff } from 'react-icons/fi'

function MapLegend({ items, title = 'Legenda', onToggleItem }) {
  const [expanded, setExpanded] = useState(true)
  const [visibleItems, setVisibleItems] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.visible !== false }), {})
  )

  const handleToggle = (itemId) => {
    const newVisibility = { ...visibleItems, [itemId]: !visibleItems[itemId] }
    setVisibleItems(newVisibility)
    if (onToggleItem) {
      onToggleItem(itemId, !visibleItems[itemId])
    }
  }

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-command-surface rounded-xl border border-command-border shadow-2xl max-w-xs">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer border-b border-command-border"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <FiLayers className="w-5 h-5 text-command-accent" />
          <h3 className="font-bold text-command-text">{title}</h3>
        </div>
        <div className="text-xs text-command-text-muted">
          {items.filter(item => visibleItems[item.id] !== false).length}/{items.length}
        </div>
      </div>

      {expanded && (
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Ícone/Marcador */}
                <div className="flex-shrink-0">
                  {item.icon ? (
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: item.color + '20', color: item.color }}
                    >
                      {item.icon}
                    </div>
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full border-2 border-command-border"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-command-text truncate">
                    {item.label}
                  </div>
                  {item.count !== undefined && (
                    <div className="text-xs text-command-text-muted">
                      {item.count} {item.count === 1 ? 'item' : 'itens'}
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle Button */}
              {onToggleItem && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggle(item.id)
                  }}
                  className="p-1.5 rounded-lg hover:bg-command-surface-alt transition-colors flex-shrink-0"
                  title={visibleItems[item.id] !== false ? 'Ocultar' : 'Mostrar'}
                >
                  {visibleItems[item.id] !== false ? (
                    <FiEye className="w-4 h-4 text-command-text-muted" />
                  ) : (
                    <FiEyeOff className="w-4 h-4 text-command-text-muted opacity-50" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MapLegend


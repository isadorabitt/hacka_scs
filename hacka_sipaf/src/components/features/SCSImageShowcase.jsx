import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { todasImagensSCS } from '../../data/scs-images'
import { cn } from '../../utils/cn'

export default function SCSImageShowcase({ className }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % todasImagensSCS.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + todasImagensSCS.length) % todasImagensSCS.length)
  }

  return (
    <>
      {/* Grid de Thumbnails */}
      <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-3', className)}>
        {todasImagensSCS.slice(0, 8).map((img, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => {
              setCurrentIndex(index)
              setIsOpen(true)
            }}
          >
            <img
              src={img.url}
              alt={img.descricao}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-medium truncate">{img.descricao}</p>
            </div>
            {todasImagensSCS.length > 8 && index === 7 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{todasImagensSCS.length - 8}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Fullscreen */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 backdrop-blur"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={todasImagensSCS[currentIndex].url}
              alt={todasImagensSCS[currentIndex].descricao}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur text-white text-center">
              <p className="font-semibold mb-1">{todasImagensSCS[currentIndex].descricao}</p>
              <p className="text-sm opacity-80">
                {currentIndex + 1} / {todasImagensSCS.length}
              </p>
            </div>

            {todasImagensSCS.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}


import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { cn } from '../../utils/cn'

export default function ImageGallery({ images, className }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-2', className)}>
        {images.slice(0, 4).map((img, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => {
              setCurrentIndex(index)
              setIsOpen(true)
            }}
          >
            <img
              src={typeof img === 'string' ? img : img.url}
              alt={typeof img === 'string' ? `Imagem ${index + 1}` : img.descricao}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {images.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Fullscreen */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex].url}
              alt={typeof images[currentIndex] === 'string' ? `Imagem ${currentIndex + 1}` : images[currentIndex].descricao}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}


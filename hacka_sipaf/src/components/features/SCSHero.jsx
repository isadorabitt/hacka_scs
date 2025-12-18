import { useState, useEffect } from 'react'
import { scsImages, todasImagensSCS, getImageWithFallback } from '../../data/scs-images'

export default function SCSHero({ variant = 'landing' }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    if (variant === 'landing') {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % todasImagensSCS.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [variant])

  const images = variant === 'landing' 
    ? todasImagensSCS.map(img => img.url)
    : [scsImages.mercado.principal, scsImages.arquitetura.edificio, scsImages.espacoPublico.praca]

  const handleImageError = (index, img) => {
    if (!imageErrors[index]) {
      setImageErrors(prev => ({ ...prev, [index]: true }))
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={imageErrors[index] ? getImageWithFallback(img) : img}
              alt={todasImagensSCS[index]?.descricao || `SCS ${index + 1}`}
              className="w-full h-full object-cover"
              onError={() => handleImageError(index, img)}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      {variant === 'landing' && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage
                  ? 'bg-orange-500 w-6'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}


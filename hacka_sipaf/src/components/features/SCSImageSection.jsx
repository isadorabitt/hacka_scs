import { scsImages, todasImagensSCS } from '../../data/scs-images'
import ImageGallery from '../ui/ImageGallery'

export default function SCSImageSection({ categoria = 'todas' }) {
  let imagens = []

  if (categoria === 'todas') {
    imagens = todasImagensSCS.map(img => img.url)
  } else if (scsImages[categoria]) {
    imagens = Object.values(scsImages[categoria])
  }

  if (imagens.length === 0) return null

  return (
    <div className="rounded-2xl p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
        Imagens do SCS
      </h3>
      <ImageGallery images={imagens} />
    </div>
  )
}


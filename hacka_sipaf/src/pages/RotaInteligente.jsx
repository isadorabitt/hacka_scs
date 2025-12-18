import { useState } from 'react'
import { FiNavigation } from 'react-icons/fi'
import RouteBuilder from '../components/ui/RouteBuilder'
import PageHeader from '../components/ui/PageHeader'

function RotaInteligente() {
  const [showBuilder, setShowBuilder] = useState(true)

  return (
    <div className="min-h-full p-6 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 overflow-auto">
      <PageHeader
        title="Rota Inteligente com IA"
        subtitle="Crie rotas personalizadas baseadas em seus interesses"
        icon={FiNavigation}
      />

      <div className="max-w-4xl mx-auto mt-8">
        <RouteBuilder />
      </div>
    </div>
  )
}

export default RotaInteligente


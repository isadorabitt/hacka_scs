import { useState, useEffect, useRef } from 'react'
import { FiX, FiHeart, FiMessageCircle, FiShare2, FiMapPin, FiCalendar, FiClock, FiUsers, FiSend, FiMoreVertical } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { cn } from '../../utils/cn'
import Button from './Button'
import Badge from './Badge'
import { scsImages, getImageWithFallback } from '../../data/scs-images'

export default function DetailModal({ isOpen, onClose, item, type = 'evento' }) {
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const modalRef = useRef(null)
  const commentInputRef = useRef(null)

  useEffect(() => {
    if (isOpen && item) {
      // Carregar comentários do localStorage ou API
      const savedComments = localStorage.getItem(`comments-${type}-${item.id}`)
      if (savedComments) {
        setComments(JSON.parse(savedComments))
      }
      
      // Focar no input de comentário
      setTimeout(() => {
        commentInputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, item, type])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleLike = () => {
    setLiked(!liked)
    toast.success(liked ? 'Curtida removida' : 'Curtido!')
  }

  const handleComment = async () => {
    if (!newComment.trim()) return

    setLoading(true)
    const comment = {
      id: `comment-${Date.now()}`,
      text: newComment.trim(),
      author: 'Você',
      avatar: '👤',
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    const updatedComments = [comment, ...comments]
    setComments(updatedComments)
    localStorage.setItem(`comments-${type}-${item.id}`, JSON.stringify(updatedComments))
    
    setNewComment('')
    setLoading(false)
    toast.success('Comentário adicionado!')
    commentInputRef.current?.focus()
  }

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    )
    setComments(updatedComments)
    localStorage.setItem(`comments-${type}-${item.id}`, JSON.stringify(updatedComments))
  }

  const getQuadraNome = (quadraId) => {
    const quadras = {
      'scs-1': 'SCS Quadra 1',
      'scs-2': 'SCS Quadra 2',
      'scs-3': 'SCS Quadra 3',
      'scs-4': 'SCS Quadra 4',
      'scs-5': 'SCS Quadra 5',
      'scs-6': 'SCS Quadra 6'
    }
    return quadras[quadraId] || quadraId
  }

  if (!isOpen || !item) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-4xl max-h-[90vh]',
          'bg-white dark:bg-neutral-900',
          'rounded-2xl shadow-2xl',
          'overflow-hidden flex flex-col',
          'animate-in fade-in zoom-in-95 duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com imagem */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={getImageWithFallback(
              item.imagem,
              type === 'evento' ? scsImages.eventos.feiraArte : scsImages.comercios.lojas
            )}
            alt={item.titulo || item.nome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Badge de destaque */}
          {item.nivelDestaque === 'alto' && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary" size="sm">
                ⭐ Destaque
              </Badge>
            </div>
          )}

          {/* Título sobre a imagem */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
              {item.titulo || item.nome}
            </h2>
            <p className="text-white/90 text-lg drop-shadow-md line-clamp-2">
              {item.descricao}
            </p>
          </div>
        </div>

        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto">
          {/* Informações principais */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.quadra && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <FiMapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Localização</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {getQuadraNome(item.quadra)}
                    </p>
                  </div>
                </div>
              )}

              {item.data && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FiCalendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Data</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {new Date(item.data).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}

              {item.horario && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <FiClock className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Horário</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {item.horario} {item.horarioFim && `- ${item.horarioFim}`}
                    </p>
                  </div>
                </div>
              )}

              {item.engajamento && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <FiUsers className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Confirmados</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {item.engajamento.confirmacoes || 0} pessoas
                    </p>
                  </div>
                </div>
              )}
            </div>

            {item.necessidadeApoio && item.necessidadeApoio.length > 0 && (
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Apoio necessário:
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.necessidadeApoio.map(apoio => (
                    <Badge key={apoio} variant="outline" size="sm">
                      {apoio === 'seguranca' ? '🛡️ Segurança' : '💡 Iluminação'}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ações (Like, Share) */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl transition-all',
                liked
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-red-500/10 hover:text-red-500'
              )}
            >
              <FiHeart className={cn('w-5 h-5', liked && 'fill-current')} />
              <span className="font-medium">{liked ? 'Curtido' : 'Curtir'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: item.titulo || item.nome,
                    text: item.descricao,
                    url: item.qrCode || window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(item.qrCode || window.location.href)
                  toast.success('Link copiado!')
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <FiShare2 className="w-5 h-5" />
              <span className="font-medium">Compartilhar</span>
            </button>
          </div>

          {/* Comentários */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiMessageCircle className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Comentários ({comments.length})
              </h3>
            </div>

            {/* Input de comentário */}
            <div className="mb-6 flex gap-3">
              <div className="flex-1">
                <input
                  ref={commentInputRef}
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  placeholder="Adicione um comentário..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <Button
                onClick={handleComment}
                disabled={!newComment.trim() || loading}
                leftIcon={<FiSend />}
              >
                Enviar
              </Button>
            </div>

            {/* Lista de comentários */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                  <FiMessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Seja o primeiro a comentar!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-lg font-bold">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            {comment.author}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {new Date(comment.timestamp).toLocaleString('pt-BR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <button className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
                          <FiMoreVertical className="w-4 h-4 text-neutral-400" />
                        </button>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                        {comment.text}
                      </p>
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                      >
                        <FiHeart className="w-3 h-3" />
                        <span>{comment.likes > 0 && comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState, useMemo } from 'react'
import { 
  FiUsers, FiPlus, FiArrowUp, FiArrowDown, FiMessageCircle, FiShare2, 
  FiCheckCircle, FiBookmark, FiSearch, FiFilter, FiTrendingUp, FiClock,
  FiMapPin, FiImage, FiX, FiSend, FiMoreVertical, FiCamera, FiMessageSquare
} from 'react-icons/fi'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { postsMock, comentariosMock, categorias } from '../data/scs-comunidade-mock'
import { toast } from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'

function ComunidadeSCS() {
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [ordenacao, setOrdenacao] = useState('popular') // popular, recente
  const [busca, setBusca] = useState('')
  const [mostrarCriarPost, setMostrarCriarPost] = useState(false)
  const [postExpandido, setPostExpandido] = useState(null)
  const [novoComentario, setNovoComentario] = useState({})
  const [votos, setVotos] = useState({}) // { postId: 'up' | 'down' | null }
  
  // Estado do formulário de criar post
  const [formPost, setFormPost] = useState({
    categoria: '',
    quadra: 'todas',
    titulo: '',
    conteudo: '',
    imagem: null,
    aceitaDiretrizes: false
  })

  // Filtrar e ordenar posts
  const postsFiltrados = useMemo(() => {
    let posts = [...postsMock]

    // Filtrar por categoria
    if (filtroCategoria !== 'todas') {
      posts = posts.filter(p => p.categoria === filtroCategoria)
    }

    // Filtrar por busca
    if (busca.trim()) {
      const buscaLower = busca.toLowerCase()
      posts = posts.filter(p => 
        p.titulo.toLowerCase().includes(buscaLower) ||
        p.conteudo.toLowerCase().includes(buscaLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(buscaLower))
      )
    }

    // Ordenar
    if (ordenacao === 'popular') {
      posts.sort((a, b) => {
        const scoreA = a.upvotes - a.downvotes + (a.fixado ? 1000 : 0)
        const scoreB = b.upvotes - b.downvotes + (b.fixado ? 1000 : 0)
        return scoreB - scoreA
      })
    } else {
      posts.sort((a, b) => new Date(b.data) - new Date(a.data))
    }

    // Separar fixados
    const fixados = posts.filter(p => p.fixado)
    const naoFixados = posts.filter(p => !p.fixado)

    return [...fixados, ...naoFixados]
  }, [filtroCategoria, ordenacao, busca])

  // Estatísticas da comunidade
  const estatisticas = useMemo(() => {
    const totalPosts = postsMock.length
    const totalComentarios = Object.values(comentariosMock).reduce((acc, coms) => acc + coms.length, 0)
    const totalUpvotes = postsMock.reduce((acc, p) => acc + p.upvotes, 0)
    const membrosAtivos = new Set(postsMock.map(p => p.autor.nome)).size

    return {
      totalPosts,
      totalComentarios,
      totalUpvotes,
      membrosAtivos
    }
  }, [])

  const getCategoriaInfo = (categoria) => {
    const cat = categorias.find(c => c.id === categoria)
    if (!cat) return { label: categoria, cor: 'gray' }
    return cat
  }

  const getCategoriaColor = (categoria) => {
    const cores = {
      'aviso': 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      'evento': 'bg-pink-500/20 text-pink-500 border-pink-500/30',
      'comercio': 'bg-green-500/20 text-green-500 border-green-500/30',
      'seguranca': 'bg-red-500/20 text-red-500 border-red-500/30',
      'sugestao': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      'discussao': 'bg-purple-500/20 text-purple-500 border-purple-500/30'
    }
    return cores[categoria] || 'bg-gray-500/20 text-gray-500 border-gray-500/30'
  }

  const handleVoto = (postId, tipo) => {
    const votoAtual = votos[postId]
    if (votoAtual === tipo) {
      // Desfazer voto
      setVotos(prev => ({ ...prev, [postId]: null }))
    } else {
      // Novo voto ou trocar voto
      setVotos(prev => ({ ...prev, [postId]: tipo }))
    }
  }

  const handleComentar = (postId) => {
    const comentario = novoComentario[postId]?.trim()
    if (!comentario) {
      toast.error('Digite um comentário')
      return
    }

    // Simular adição de comentário
    toast.success('Comentário adicionado!')
    setNovoComentario(prev => ({ ...prev, [postId]: '' }))
  }

  const handleCompartilhar = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.titulo,
        text: post.conteudo,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${post.titulo}\n\n${post.conteudo}`)
      toast.success('Post copiado!')
    }
  }

  const getScore = (post) => {
    const voto = votos[post.id]
    let score = post.upvotes - post.downvotes
    
    if (voto === 'up') score += 1
    if (voto === 'down') score -= 1
    
    return score
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <PageHeader
          icon={FiUsers}
          title="Comunidade SCS"
          subtitle="Conecte-se com comerciantes, moradores e visitantes do Setor Comercial Sul"
        />

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-command-surface rounded-xl p-4 border border-command-border">
            <div className="text-2xl font-black text-command-text">{estatisticas.totalPosts}</div>
            <div className="text-xs text-command-text-muted">Posts</div>
          </div>
          <div className="bg-command-surface rounded-xl p-4 border border-command-border">
            <div className="text-2xl font-black text-command-text">{estatisticas.totalComentarios}</div>
            <div className="text-xs text-command-text-muted">Comentários</div>
          </div>
          <div className="bg-command-surface rounded-xl p-4 border border-command-border">
            <div className="text-2xl font-black text-command-text">{estatisticas.totalUpvotes}</div>
            <div className="text-xs text-command-text-muted">Upvotes</div>
          </div>
          <div className="bg-command-surface rounded-xl p-4 border border-command-border">
            <div className="text-2xl font-black text-command-text">{estatisticas.membrosAtivos}</div>
            <div className="text-xs text-command-text-muted">Membros</div>
          </div>
        </div>

        {/* Barra de Ações */}
        <div className="bg-command-surface rounded-xl p-4 border border-command-border mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Botão Criar Post */}
            <button
              onClick={() => setMostrarCriarPost(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <FiPlus className="w-4 h-4" />
              <span>Criar Post</span>
            </button>

            {/* Busca */}
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-command-text-muted" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-command-surface-alt border border-command-border text-command-text placeholder-command-text-muted focus:outline-none focus:ring-2 focus:ring-command-accent"
              />
            </div>

            {/* Filtros de Ordenação */}
            <div className="flex gap-2">
              <button
                onClick={() => setOrdenacao('popular')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  ordenacao === 'popular'
                    ? 'bg-command-accent text-white'
                    : 'bg-command-surface-alt text-command-text hover:bg-command-surface'
                }`}
              >
                <FiTrendingUp className="inline w-4 h-4 mr-1" />
                Popular
              </button>
              <button
                onClick={() => setOrdenacao('recente')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  ordenacao === 'recente'
                    ? 'bg-command-accent text-white'
                    : 'bg-command-surface-alt text-command-text hover:bg-command-surface'
                }`}
              >
                <FiClock className="inline w-4 h-4 mr-1" />
                Recentes
              </button>
            </div>

            {/* Filtro de Categoria */}
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="px-4 py-2 rounded-lg bg-command-surface-alt border border-command-border text-command-text font-semibold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-command-accent"
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="space-y-4">
          {postsFiltrados.map(post => {
            const score = getScore(post)
            const votoAtual = votos[post.id]
            const categoriaInfo = getCategoriaInfo(post.categoria)
            const comentarios = comentariosMock[post.id] || []
            const estaExpandido = postExpandido === post.id

            return (
              <div
                key={post.id}
                className="bg-command-surface rounded-xl border border-command-border overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header do Post */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Sistema de Votos */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleVoto(post.id, 'up')}
                        className={`p-2 rounded-lg transition-colors ${
                          votoAtual === 'up'
                            ? 'bg-command-accent text-white'
                            : 'text-command-text-muted hover:bg-command-surface-alt hover:text-command-accent'
                        }`}
                      >
                        <FiArrowUp className="w-5 h-5" />
                      </button>
                      <span className={`text-lg font-black ${
                        score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-command-text'
                      }`}>
                        {score}
                      </span>
                      <button
                        onClick={() => handleVoto(post.id, 'down')}
                        className={`p-2 rounded-lg transition-colors ${
                          votoAtual === 'down'
                            ? 'bg-red-500 text-white'
                            : 'text-command-text-muted hover:bg-command-surface-alt hover:text-red-500'
                        }`}
                      >
                        <FiArrowDown className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Conteúdo do Post */}
                    <div className="flex-1">
                      {/* Tags e Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {post.fixado && (
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-500 border border-teal-500/30 flex items-center gap-1">
                            <FiBookmark className="w-3 h-3" />
                            FIXADO
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getCategoriaColor(post.categoria)}`}>
                          {categoriaInfo.label.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-command-surface-alt text-command-text-muted border border-command-border">
                          {post.quadra.replace('scs-', 'Quadra ')}
                        </span>
                        {post.autor.verificado && (
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-500 border border-blue-500/30 flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" />
                            Verificado
                          </span>
                        )}
                      </div>

                      {/* Título */}
                      <h3 className="text-xl font-black text-command-text mb-2 hover:text-command-accent transition-colors cursor-pointer">
                        {post.titulo}
                      </h3>

                      {/* Conteúdo */}
                      <p className="text-command-text-muted mb-4 whitespace-pre-line">
                        {post.conteudo}
                      </p>

                      {/* Imagem */}
                      {post.imagem && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={post.imagem}
                            alt={post.titulo}
                            className="w-full h-auto max-h-96 object-cover"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-full text-xs bg-command-surface-alt text-command-text-muted border border-command-border"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer do Post */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-command-text-muted">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.autor.avatar}
                              alt={post.autor.nome}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-semibold text-command-text">{post.autor.nome}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(post.data), { addSuffix: true, locale: ptBR })}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setPostExpandido(estaExpandido ? null : post.id)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-command-surface-alt hover:bg-command-surface text-command-text-muted hover:text-command-accent transition-colors text-sm font-semibold"
                          >
                            <FiMessageCircle className="w-4 h-4" />
                            {post.comentarios} comentários
                          </button>
                          <button
                            onClick={() => handleCompartilhar(post)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-command-surface-alt hover:bg-command-surface text-command-text-muted hover:text-command-accent transition-colors text-sm font-semibold"
                          >
                            <FiShare2 className="w-4 h-4" />
                            Compartilhar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção de Comentários (Expandida) */}
                {estaExpandido && (
                  <div className="border-t border-command-border bg-command-surface-alt p-6">
                    <h4 className="font-bold text-command-text mb-4">Comentários ({comentarios.length})</h4>
                    
                    {/* Lista de Comentários */}
                    <div className="space-y-4 mb-4">
                      {comentarios.map(comentario => (
                        <div key={comentario.id} className="flex gap-3">
                          <img
                            src={comentario.autor.avatar}
                            alt={comentario.autor.nome}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-command-text text-sm">{comentario.autor.nome}</span>
                              <span className="text-xs text-command-text-muted">
                                {formatDistanceToNow(new Date(comentario.data), { addSuffix: true, locale: ptBR })}
                              </span>
                            </div>
                            <p className="text-sm text-command-text-muted mb-2">{comentario.conteudo}</p>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-xs text-command-text-muted hover:text-command-accent">
                                <FiArrowUp className="w-3 h-3" />
                                {comentario.upvotes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Formulário de Novo Comentário */}
                    <div className="flex gap-3">
                      <img
                        src="https://ui-avatars.com/api/?name=Você&background=f97316&color=fff"
                        alt="Você"
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          placeholder="Adicione um comentário..."
                          value={novoComentario[post.id] || ''}
                          onChange={(e) => setNovoComentario(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyPress={(e) => e.key === 'Enter' && handleComentar(post.id)}
                          className="flex-1 px-4 py-2 rounded-lg bg-command-surface border border-command-border text-command-text placeholder-command-text-muted focus:outline-none focus:ring-2 focus:ring-command-accent"
                        />
                        <button
                          onClick={() => handleComentar(post.id)}
                          className="px-4 py-2 bg-command-accent text-white rounded-lg hover:bg-command-accent-hover transition-colors"
                        >
                          <FiSend className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {postsFiltrados.length === 0 && (
          <div className="text-center py-12 bg-command-surface rounded-xl border border-command-border">
            <FiUsers className="w-16 h-16 text-command-text-muted mx-auto mb-4" />
            <p className="text-lg font-medium text-command-text-muted">
              Nenhum post encontrado.
            </p>
            <p className="text-sm text-command-text-muted mt-2">
              Tente ajustar os filtros ou criar um novo post!
            </p>
          </div>
        )}

        {/* Modal Criar Post */}
        {mostrarCriarPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-command-surface rounded-2xl border border-command-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-blue-700 flex items-center justify-center">
                      <FiMessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-command-text">Criar Post</h2>
                      <p className="text-sm text-command-text-muted">Compartilhe com a comunidade</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMostrarCriarPost(false)
                      setFormPost({
                        categoria: '',
                        quadra: 'todas',
                        titulo: '',
                        conteudo: '',
                        imagem: null,
                        aceitaDiretrizes: false
                      })
                    }}
                    className="p-2 hover:bg-command-surface-alt rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-command-text" />
                  </button>
                </div>

                <div className="space-y-6 mt-6">
                  {/* Categoria */}
                  <div>
                    <label className="block text-sm font-bold text-command-text mb-3">
                      # Categoria
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {categorias.filter(c => c.id !== 'todas').map(cat => {
                        const isSelected = formPost.categoria === cat.id
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormPost(prev => ({ ...prev, categoria: cat.id }))}
                            className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-teal-600 to-blue-700 text-white shadow-lg'
                                : 'bg-command-surface-alt text-command-text hover:bg-command-surface border border-command-border'
                            }`}
                          >
                            {cat.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quadra (opcional) */}
                  <div>
                    <label className="block text-sm font-bold text-command-text mb-3 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" />
                      Quadra (opcional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['todas', '1', '2', '3', '4', '5', '6'].map(quadra => {
                        const isSelected = formPost.quadra === quadra
                        return (
                          <button
                            key={quadra}
                            type="button"
                            onClick={() => setFormPost(prev => ({ ...prev, quadra }))}
                            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                : 'bg-command-surface-alt text-command-text hover:bg-command-surface border border-command-border'
                            }`}
                          >
                            {quadra === 'todas' ? 'Todas' : quadra}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Título */}
                  <div>
                    <label className="block text-sm font-bold text-command-text mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={formPost.titulo}
                      onChange={(e) => setFormPost(prev => ({ ...prev, titulo: e.target.value }))}
                      placeholder="Ex: Nova cafeteria abrindo na Quadra 2!"
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-xl bg-command-surface-alt border border-command-border text-command-text placeholder-command-text-muted focus:outline-none focus:ring-2 focus:ring-command-accent"
                    />
                    <div className="text-xs text-command-text-muted mt-1 text-right">
                      {formPost.titulo.length}/100 caracteres
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div>
                    <label className="block text-sm font-bold text-command-text mb-2">
                      Conteúdo
                    </label>
                    <textarea
                      value={formPost.conteudo}
                      onChange={(e) => setFormPost(prev => ({ ...prev, conteudo: e.target.value }))}
                      rows={8}
                      placeholder="Compartilhe sua mensagem com a comunidade..."
                      maxLength={2000}
                      className="w-full px-4 py-3 rounded-xl bg-command-surface-alt border border-command-border text-command-text placeholder-command-text-muted focus:outline-none focus:ring-2 focus:ring-command-accent resize-none"
                    />
                    <div className="text-xs text-command-text-muted mt-1 text-right">
                      {formPost.conteudo.length}/2000 caracteres
                    </div>
                  </div>

                  {/* Imagem (opcional) */}
                  <div>
                    <label className="block text-sm font-bold text-command-text mb-2">
                      Imagem (opcional)
                    </label>
                    <div
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => {
                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              setFormPost(prev => ({ ...prev, imagem: event.target.result }))
                            }
                            reader.readAsDataURL(file)
                          }
                        }
                        input.click()
                      }}
                      className="w-full h-48 rounded-xl border-2 border-dashed border-command-border bg-command-surface-alt flex flex-col items-center justify-center cursor-pointer hover:border-command-accent hover:bg-command-surface transition-all relative overflow-hidden"
                    >
                      {formPost.imagem ? (
                        <>
                          <img
                            src={formPost.imagem}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setFormPost(prev => ({ ...prev, imagem: null }))
                            }}
                            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <FiCamera className="w-12 h-12 text-command-accent mb-2" />
                          <span className="text-command-text font-semibold mb-1">Adicionar imagem</span>
                          <span className="text-sm text-command-text-muted">Clique para selecionar</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Diretrizes da Comunidade */}
                  <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formPost.aceitaDiretrizes}
                        onChange={(e) => setFormPost(prev => ({ ...prev, aceitaDiretrizes: e.target.checked }))}
                        className="mt-1 w-5 h-5 rounded border-command-border text-command-accent focus:ring-command-accent"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-command-text mb-2 flex items-center gap-2">
                          <FiCheckCircle className="w-4 h-4 text-teal-600" />
                          Diretrizes da Comunidade
                        </h4>
                        <ul className="text-sm text-command-text-muted space-y-1">
                          <li>• Seja respeitoso com outros membros</li>
                          <li>• Não compartilhe informações falsas</li>
                          <li>• Mantenha o foco no desenvolvimento do SCS</li>
                          <li>• Denuncie conteúdo inadequado</li>
                        </ul>
                      </div>
                    </label>
                  </div>

                  {/* Botão Publicar */}
                  <button
                    onClick={() => {
                      if (!formPost.categoria) {
                        toast.error('Selecione uma categoria')
                        return
                      }
                      if (!formPost.titulo.trim()) {
                        toast.error('Digite um título')
                        return
                      }
                      if (!formPost.conteudo.trim()) {
                        toast.error('Digite o conteúdo do post')
                        return
                      }
                      if (!formPost.aceitaDiretrizes) {
                        toast.error('Você precisa aceitar as diretrizes da comunidade')
                        return
                      }
                      toast.success('Post criado com sucesso!')
                      setMostrarCriarPost(false)
                      setFormPost({
                        categoria: '',
                        quadra: 'todas',
                        titulo: '',
                        conteudo: '',
                        imagem: null,
                        aceitaDiretrizes: false
                      })
                    }}
                    disabled={!formPost.aceitaDiretrizes}
                    className="w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FiSend className="w-5 h-5" />
                    Publicar Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComunidadeSCS


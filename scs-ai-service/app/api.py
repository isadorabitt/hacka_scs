from fastapi import APIRouter, HTTPException
from app.models import (
    EventoRequest,
    AnaliseEvento,
    AnaliseSeguranca,
    PredicaoRiscoRequest,
    PredicaoRisco,
    ProtecaoMulherRequest,
    AnaliseProtecaoMulher,
    NecessidadeAcessibilidadeRequest,
    PriorizacaoAcessibilidade,
    GestaoRequest,
    RecomendacaoGestao,
    GerarTextoRequest,
    TextoGerado,
    ComunicacaoRequest,
    ComunicacaoOtimizada,
    ModelInfo,
    AgoraNoSCSRequest,
    AgoraNoSCS,
    PreverMovimentoRequest,
    PrevisaoMovimento,
    OrquestrarAgentesRequest,
    OrquestracaoAgentes,
    PreverSucessoEventoRequest,
    PrevisaoSucessoEvento,
)
from app.services import (
    EventoService,
    SegurancaService,
    ProtecaoMulherService,
    AcessibilidadeService,
    GestaoService,
    ComunicacaoService,
    AgoraNoSCSService,
    MovimentoPredictorService,
    AgentesOrchestratorService,
    EventoPredictorService,
)
from app.llm import MVPEngine, OllamaClient
from app.config import settings

router = APIRouter()

evento_service = EventoService()
seguranca_service = SegurancaService()
protecao_mulher_service = ProtecaoMulherService()
acessibilidade_service = AcessibilidadeService()
gestao_service = GestaoService()
comunicacao_service = ComunicacaoService()
agora_scs_service = AgoraNoSCSService()
movimento_predictor_service = MovimentoPredictorService()
agentes_orchestrator_service = AgentesOrchestratorService()
evento_predictor_service = EventoPredictorService()


@router.get("/")
async def api_root():
    return {
        "message": "SCS AI Service API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/v1/health",
            "models": "/api/v1/models",
            "eventos": "/api/v1/eventos/analisar",
            "seguranca": "/api/v1/seguranca/analisar-padroes",
            "protecao_mulher": "/api/v1/protecao-mulher/analisar",
            "acessibilidade": "/api/v1/acessibilidade/priorizar",
            "gestao": "/api/v1/gestao/recomendacoes",
            "textos": "/api/v1/textos/gerar",
            "comunicacao": "/api/v1/comunicacao/otimizar",
            "agora_scs": "/api/v1/mapa/agora",
            "prever_movimento": "/api/v1/movimento/prever",
            "orquestrar_agentes": "/api/v1/agentes/orquestrar",
            "prever_sucesso_evento": "/api/v1/eventos/prever-sucesso",
        },
        "docs": "/docs",
    }


@router.get("/health")
async def health():
    return {
        "status": "ok",
        "version": "1.0.0",
        "models": ["mvp", "ollama"] if settings.USE_OLLAMA else ["mvp"],
    }


@router.get("/models", response_model=list[ModelInfo])
async def list_models():
    models = [
        ModelInfo(name="mvp", provider="mvp", available=True),
    ]

    if settings.USE_OLLAMA:
        ollama = OllamaClient()
        models.append(
            ModelInfo(
                name="ollama",
                provider="ollama",
                available=ollama.is_available(),
            )
        )

    return models


@router.post("/eventos/analisar", response_model=AnaliseEvento)
async def analisar_evento(
    evento: EventoRequest, model: str = "mvp"
) -> AnaliseEvento:
    try:
        return await evento_service.analisar(evento, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/seguranca/analisar-padroes", response_model=AnaliseSeguranca)
async def analisar_padroes_seguranca(
    alertas: list[dict], eventos: list[dict], model: str = "mvp"
) -> AnaliseSeguranca:
    try:
        return await seguranca_service.analisar_padroes(alertas, eventos, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/seguranca/prever-risco", response_model=PredicaoRisco)
async def prever_risco(
    request: PredicaoRiscoRequest, model: str = "mvp"
) -> PredicaoRisco:
    try:
        return await seguranca_service.prever_risco(request, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/protecao-mulher/analisar", response_model=AnaliseProtecaoMulher
)
async def analisar_protecao_mulher(
    request: ProtecaoMulherRequest, model: str = "mvp"
) -> AnaliseProtecaoMulher:
    try:
        return await protecao_mulher_service.analisar(request, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/acessibilidade/priorizar",
    response_model=list[PriorizacaoAcessibilidade],
)
async def priorizar_acessibilidade(
    necessidades: list[NecessidadeAcessibilidadeRequest],
) -> list[PriorizacaoAcessibilidade]:
    try:
        necessidades_dict = [n.model_dump() for n in necessidades]
        return await acessibilidade_service.priorizar(necessidades_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/gestao/recomendacoes", response_model=list[RecomendacaoGestao]
)
async def gerar_recomendacoes_gestao(
    request: GestaoRequest, model: str = "mvp"
) -> list[RecomendacaoGestao]:
    try:
        return await gestao_service.gerar_recomendacoes(request, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/textos/gerar", response_model=TextoGerado)
async def gerar_texto(
    request: GerarTextoRequest, model: str = "mvp"
) -> TextoGerado:
    try:
        return await comunicacao_service.gerar_texto(request, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/comunicacao/otimizar", response_model=ComunicacaoOtimizada)
async def otimizar_comunicacao(
    request: ComunicacaoRequest, model: str = "mvp"
) -> ComunicacaoOtimizada:
    try:
        return await comunicacao_service.otimizar(request, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ===== NOVOS ENDPOINTS INOVADORES =====

@router.post("/mapa/agora", response_model=AgoraNoSCS)
async def agora_no_scs(
    request: AgoraNoSCSRequest,
) -> AgoraNoSCS:
    """
    🗺️ MAPA VIVO: Mostra o que está acontecendo AGORA no SCS
    
    Retorna status em tempo real: eventos ativos, movimento, segurança, etc.
    """
    try:
        dados = {
            "eventosAtivos": [],
            "comerciosAbertos": [],
            "alertasRecentes": [],
            "checkIns": [],
        }
        return await agora_scs_service.obter_status(request, dados)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/movimento/prever", response_model=PrevisaoMovimento)
async def prever_movimento(
    request: PreverMovimentoRequest,
    historico: dict = None,
) -> PrevisaoMovimento:
    """
    📊 PREDIÇÃO: Prever movimento futuro baseado em padrões
    
    Usa histórico, eventos agendados e padrões sazonais para prever movimento.
    """
    try:
        return await movimento_predictor_service.prever(request, historico)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/agentes/orquestrar", response_model=OrquestracaoAgentes)
async def orquestrar_agentes(
    request: OrquestrarAgentesRequest,
    dados_contexto: dict = None,
) -> OrquestracaoAgentes:
    """
    🤖 IA MULTI-AGENTE: Orquestra múltiplos agentes para decisão inteligente
    
    Combina insights de agentes especializados (Eventos, Segurança, Comércio)
    para sugerir ações proativas.
    """
    try:
        dados = dados_contexto or {}
        return await agentes_orchestrator_service.orquestrar(request, dados)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/eventos/prever-sucesso", response_model=PrevisaoSucessoEvento)
async def prever_sucesso_evento(
    request: PreverSucessoEventoRequest,
    historico: dict = None,
) -> PrevisaoSucessoEvento:
    """
    🔮 PREDIÇÃO: Prever se evento vai ter sucesso antes de acontecer
    
    Analisa tipo, horário, quadra, descrição e histórico para prever probabilidade
    de sucesso e sugerir otimizações.
    """
    try:
        return await evento_predictor_service.prever_sucesso(request, historico)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


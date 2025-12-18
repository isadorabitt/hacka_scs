from typing import Optional, List, Dict, Any
from app.llm import LLMProvider, MVPEngine, OllamaClient
from app.models import (
    EventoRequest,
    AnaliseEvento,
    AlertaSegurancaRequest,
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
    AgoraNoSCSRequest,
    AgoraNoSCS,
    PreverMovimentoRequest,
    PrevisaoMovimento,
    OrquestrarAgentesRequest,
    OrquestracaoAgentes,
    PreverSucessoEventoRequest,
    PrevisaoSucessoEvento,
)
from app.config import settings


class EventoService:
    def __init__(self):
        self.mvp = MVPEngine()
        self.ollama = OllamaClient() if settings.USE_OLLAMA else None

    async def analisar(
        self, evento: EventoRequest, model: str = "mvp"
    ) -> AnaliseEvento:
        provider = self._get_provider(model)
        response = await provider.generate(
            "analisar_evento", {"evento": evento.model_dump()}
        )
        return AnaliseEvento(**response)

    def _get_provider(self, model: str) -> LLMProvider:
        if model == "ollama" and self.ollama and self.ollama.is_available():
            return self.ollama
        return self.mvp


class SegurancaService:
    def __init__(self):
        self.mvp = MVPEngine()
        self.ollama = OllamaClient() if settings.USE_OLLAMA else None

    async def analisar_padroes(
        self, alertas: list, eventos: list, model: str = "mvp"
    ) -> AnaliseSeguranca:
        provider = self._get_provider(model)
        response = await provider.generate(
            "analisar_seguranca", {"alertas": alertas, "eventos": eventos}
        )
        return AnaliseSeguranca(**response)

    async def prever_risco(
        self, request: PredicaoRiscoRequest, model: str = "mvp"
    ) -> PredicaoRisco:
        provider = self._get_provider(model)
        response = await provider.generate(
            "prever_risco",
            {
                "quadra": request.quadra,
                "dataHora": request.dataHora.isoformat(),
                "eventosAtivos": request.eventosAtivos or [],
            },
        )
        return PredicaoRisco(**response)

    def _get_provider(self, model: str) -> LLMProvider:
        if model == "ollama" and self.ollama and self.ollama.is_available():
            return self.ollama
        return self.mvp


class ProtecaoMulherService:
    def __init__(self):
        self.mvp = MVPEngine()
        self.ollama = OllamaClient() if settings.USE_OLLAMA else None

    async def analisar(
        self, request: ProtecaoMulherRequest, model: str = "mvp"
    ) -> AnaliseProtecaoMulher:
        provider = self._get_provider(model)
        response = await provider.generate(
            "analisar_protecao_mulher",
            {
                "alertas": request.alertas,
                "eventos": request.eventos,
                "bares": request.bares or [],
            },
        )
        return AnaliseProtecaoMulher(**response)

    def _get_provider(self, model: str) -> LLMProvider:
        if model == "ollama" and self.ollama and self.ollama.is_available():
            return self.ollama
        return self.mvp


class AcessibilidadeService:
    def __init__(self):
        self.mvp = MVPEngine()

    async def priorizar(
        self, necessidades: list
    ) -> list[PriorizacaoAcessibilidade]:
        necessidades_dict = [
            n.model_dump() if hasattr(n, "model_dump") else n
            for n in necessidades
        ]
        response = await self.mvp.generate(
            "priorizar_acessibilidade", {"necessidades": necessidades_dict}
        )
        priorizacao = response.get("priorizacao", [])
        return [PriorizacaoAcessibilidade(**p) for p in priorizacao]


class GestaoService:
    def __init__(self):
        self.mvp = MVPEngine()
        self.ollama = OllamaClient() if settings.USE_OLLAMA else None

    async def gerar_recomendacoes(
        self, request: GestaoRequest, model: str = "mvp"
    ) -> list[RecomendacaoGestao]:
        provider = self._get_provider(model)
        response = await provider.generate(
            "recomendacoes_gestao",
            {
                "eventos": request.eventos,
                "alertas": request.alertas,
                "ocupacao": request.ocupacao,
                "engajamentoQRCode": request.engajamentoQRCode or {},
            },
        )
        recomendacoes = response.get("recomendacoes", [])
        return [RecomendacaoGestao(**r) for r in recomendacoes]

    def _get_provider(self, model: str) -> LLMProvider:
        if model == "ollama" and self.ollama and self.ollama.is_available():
            return self.ollama
        return self.mvp


class ComunicacaoService:
    def __init__(self):
        self.mvp = MVPEngine()
        self.ollama = OllamaClient() if settings.USE_OLLAMA else None

    async def gerar_texto(
        self, request: GerarTextoRequest, model: str = "mvp"
    ) -> TextoGerado:
        provider = self._get_provider(model)
        response = await provider.generate(
            "gerar_texto", {"tipo": request.tipo, "contexto": request.contexto}
        )
        return TextoGerado(**response)

    async def otimizar(
        self, request: ComunicacaoRequest, model: str = "mvp"
    ) -> ComunicacaoOtimizada:
        provider = self._get_provider(model)
        response = await provider.generate(
            "otimizar_comunicacao", {"evento": request.evento}
        )
        return ComunicacaoOtimizada(**response)

    def _get_provider(self, model: str) -> LLMProvider:
        if model == "ollama" and self.ollama and self.ollama.is_available():
            return self.ollama
        return self.mvp


# ===== NOVOS SERVICES INOVADORES =====

class AgoraNoSCSService:
    """MAPA VIVO: Mostra o que está acontecendo AGORA no SCS"""

    def __init__(self):
        self.mvp = MVPEngine()

    async def obter_status(
        self, request: AgoraNoSCSRequest, dados_reais: Dict[str, Any]
    ) -> AgoraNoSCS:
        context = {
            "quadra": request.quadra,
            "timestamp": request.timestamp.isoformat() if request.timestamp else None,
            "eventosAtivos": dados_reais.get("eventosAtivos", []),
            "comerciosAbertos": dados_reais.get("comerciosAbertos", []),
            "alertasRecentes": dados_reais.get("alertasRecentes", []),
            "checkIns": dados_reais.get("checkIns", []),
        }
        response = await self.mvp.generate("agora_no_scs", context)
        return AgoraNoSCS(**response)


class MovimentoPredictorService:
    """PREDIÇÃO: Prever movimento futuro"""

    def __init__(self):
        self.mvp = MVPEngine()

    async def prever(
        self, request: PreverMovimentoRequest, historico: Optional[Dict] = None
    ) -> PrevisaoMovimento:
        context = {
            "quadra": request.quadra,
            "dataHora": request.dataHora.isoformat(),
            "eventosAgendados": request.eventosAgendados or [],
            "historico": historico or {},
        }
        response = await self.mvp.generate("prever_movimento", context)
        return PrevisaoMovimento(**response)


class AgentesOrchestratorService:
    """IA MULTI-AGENTE: Orquestra múltiplos agentes"""

    def __init__(self):
        self.mvp = MVPEngine()

    async def orquestrar(
        self, request: OrquestrarAgentesRequest, dados_contexto: Dict[str, Any]
    ) -> OrquestracaoAgentes:
        context = {
            "quadra": request.quadra,
            "contexto": {**request.contexto, **dados_contexto},
        }
        response = await self.mvp.generate("orquestrar_agentes", context)
        return OrquestracaoAgentes(**response)


class EventoPredictorService:
    """PREDIÇÃO: Prever sucesso de eventos"""

    def __init__(self):
        self.mvp = MVPEngine()

    async def prever_sucesso(
        self, request: PreverSucessoEventoRequest, historico: Optional[Dict] = None
    ) -> PrevisaoSucessoEvento:
        context = {
            "evento": request.evento,
            "historico": historico or {},
        }
        response = await self.mvp.generate("prever_sucesso_evento", context)
        return PrevisaoSucessoEvento(**response)


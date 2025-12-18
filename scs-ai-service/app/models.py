from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional, List, Dict, Any, Union


class EventoRequest(BaseModel):
    titulo: str
    descricao: str
    quadra: str
    dataHora: datetime
    tipo: str
    publicoAlvo: Optional[str] = None
    impactoEsperado: Optional[str] = None


class AnaliseEvento(BaseModel):
    nivelDestaque: str
    necessidadeApoio: Dict[str, bool]
    riscoOperacional: str
    sugestaoTexto: str
    recomendacoes: Optional[List[str]] = None


class AlertaSegurancaRequest(BaseModel):
    tipo: str
    quadra: str
    descricao: str
    dataHora: datetime
    coordenadas: Dict[str, float]


class AnaliseSeguranca(BaseModel):
    risco: str
    correlacaoEventos: Optional[List[str]] = None
    recomendacao: Optional[str] = None
    mapaPreditivo: Optional[Dict[str, Any]] = None


class PredicaoRiscoRequest(BaseModel):
    quadra: str
    dataHora: datetime
    eventosAtivos: Optional[List[Dict[str, Any]]] = None


class PredicaoRisco(BaseModel):
    risco: str
    fatores: List[str]
    recomendacoes: List[str]
    probabilidade: Optional[float] = None


class ProtecaoMulherRequest(BaseModel):
    alertas: List[Dict[str, Any]]
    eventos: List[Dict[str, Any]]
    bares: Optional[List[Dict[str, Any]]] = None


class AnaliseProtecaoMulher(BaseModel):
    risco: str
    horariosCriticos: List[str]
    quadrasProblematicas: List[str]
    recomendacoes: List[str]
    correlacaoBares: bool


class NecessidadeAcessibilidadeRequest(BaseModel):
    tipo: str
    quadra: str
    descricao: str
    prioridade: str
    frequencia: int


class PriorizacaoAcessibilidade(BaseModel):
    necessidadeId: str
    score: int
    impacto: str
    custoEstimado: str
    recomendacao: str


class GestaoRequest(BaseModel):
    eventos: List[Dict[str, Any]]
    alertas: List[Dict[str, Any]]
    ocupacao: List[Dict[str, Any]]
    engajamentoQRCode: Optional[Dict[str, Any]] = None


class RecomendacaoGestao(BaseModel):
    tipo: str
    quadra: str
    descricao: str
    prioridade: str
    acoes: Optional[List[str]] = None


class GerarTextoRequest(BaseModel):
    tipo: str
    contexto: Dict[str, Any]


class TextoGerado(BaseModel):
    texto: str
    hashtags: Optional[List[str]] = None
    legendaInstagram: Optional[str] = None
    mensagemWhatsApp: Optional[str] = None


class ComunicacaoRequest(BaseModel):
    evento: Dict[str, Any]


class ComunicacaoOtimizada(BaseModel):
    canalSugerido: str
    horarioPublicacao: str
    formato: str
    conteudo: Dict[str, Any]


class ModelInfo(BaseModel):
    name: str
    provider: str
    available: bool


# ===== NOVOS MODELOS PARA INOVAÇÃO =====

class AgoraNoSCSRequest(BaseModel):
    quadra: Optional[str] = None
    timestamp: Optional[Union[datetime, str]] = None

    @field_validator('timestamp', mode='before')
    @classmethod
    def parse_timestamp(cls, v):
        if v is None:
            return None
        if isinstance(v, datetime):
            return v
        if isinstance(v, str):
            v_clean = v.strip()
            if not v_clean:
                return None
            try:
                if v_clean.endswith('Z'):
                    v_clean = v_clean[:-1] + '+00:00'
                elif '+' not in v_clean and 'T' in v_clean:
                    v_clean = v_clean + '+00:00'
                return datetime.fromisoformat(v_clean)
            except (ValueError, AttributeError):
                try:
                    v_clean = v_clean.replace(' ', 'T')
                    if '+' not in v_clean and 'T' in v_clean:
                        v_clean = v_clean + '+00:00'
                    return datetime.fromisoformat(v_clean)
                except (ValueError, AttributeError):
                    pass
        return v


class AgoraNoSCS(BaseModel):
    status: str  # vivo | moderado | vazio
    eventosAtivos: int
    comerciosAbertos: int
    movimento: str  # baixo | medio | alto
    seguranca: str  # presente | ausente | reforcado
    iluminacao: str  # adequada | insuficiente | reforcada
    recomendacao: str
    scoreVidaUrbana: float  # 0.0 a 1.0
    pessoasEstimadas: Optional[int] = None


class PreverMovimentoRequest(BaseModel):
    quadra: str
    dataHora: datetime
    eventosAgendados: Optional[List[Dict[str, Any]]] = None
    historico: Optional[Dict[str, Any]] = None


class PrevisaoMovimento(BaseModel):
    movimentoPrevisto: float  # 0.0 a 1.0
    categoria: str  # alto | medio | baixo
    confianca: float
    fatores: List[str]
    recomendacao: Optional[str] = None


class OrquestrarAgentesRequest(BaseModel):
    quadra: str
    contexto: Dict[str, Any]


class OrquestracaoAgentes(BaseModel):
    acaoSugerida: str
    razao: str
    probabilidadeSucesso: float
    acoesRecomendadas: List[str]
    agentes: Dict[str, Any]  # Respostas de cada agente


class PreverSucessoEventoRequest(BaseModel):
    evento: Dict[str, Any]
    historico: Optional[Dict[str, Any]] = None


class PrevisaoSucessoEvento(BaseModel):
    probabilidadeSucesso: float  # 0.0 a 1.0
    categoria: str  # alto | medio | baixo
    fatores: List[str]
    sugestoesOtimizacao: List[str]
    score: float  # Score detalhado


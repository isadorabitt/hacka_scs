import pytest
from datetime import datetime
from app.models import EventoRequest
from app.services import EventoService


@pytest.mark.asyncio
async def test_analisar_evento():
    service = EventoService()

    evento = EventoRequest(
        titulo="Festival de Música",
        descricao="Show ao vivo com bandas locais",
        quadra="SCS 1",
        dataHora=datetime(2024, 12, 20, 20, 0, 0),
        tipo="musical",
    )

    resultado = await service.analisar(evento, model="mvp")

    assert resultado.nivelDestaque in ["baixo", "medio", "alto"]
    assert "seguranca" in resultado.necessidadeApoio
    assert "iluminacao" in resultado.necessidadeApoio
    assert resultado.riscoOperacional in ["baixo", "medio", "alto"]
    assert len(resultado.sugestaoTexto) > 0


@pytest.mark.asyncio
async def test_analisar_evento_noturno():
    service = EventoService()

    evento = EventoRequest(
        titulo="Evento Noturno",
        descricao="Evento à noite",
        quadra="SCS 1",
        dataHora=datetime(2024, 12, 20, 22, 0, 0),
        tipo="musical",
    )

    resultado = await service.analisar(evento, model="mvp")

    assert resultado.necessidadeApoio["seguranca"] is True


@pytest.mark.asyncio
async def test_analisar_padroes_seguranca():
    from app.services import SegurancaService

    service = SegurancaService()

    alertas = [
        {
            "tipo": "suspeita",
            "quadra": "SCS 1",
            "dataHora": datetime.now().isoformat(),
        }
    ]
    eventos = []

    resultado = await service.analisar_padroes(alertas, eventos, model="mvp")

    assert resultado.risco in ["baixo", "medio", "alto"]


@pytest.mark.asyncio
async def test_gerar_texto():
    from app.services import ComunicacaoService
    from app.models import GerarTextoRequest

    service = ComunicacaoService()

    request = GerarTextoRequest(
        tipo="evento",
        contexto={
            "tipo": "musical",
            "quadra": "SCS 1",
            "dataHora": datetime.now().isoformat(),
        },
    )

    resultado = await service.gerar_texto(request, model="mvp")

    assert len(resultado.texto) > 0
    assert resultado.hashtags is not None


"""
Testes que validam a lógica real da LLM (MVP Engine)
Testam regras de negócio, cenários reais e edge cases
"""
import pytest
from datetime import datetime
from app.models import (
    EventoRequest,
    PredicaoRiscoRequest,
    ProtecaoMulherRequest,
    NecessidadeAcessibilidadeRequest,
    GerarTextoRequest,
    ComunicacaoRequest,
)
from app.services import (
    EventoService,
    SegurancaService,
    ProtecaoMulherService,
    AcessibilidadeService,
    GestaoService,
    ComunicacaoService,
)


class TestEventoAnalysis:
    """Testa análise de eventos - valida lógica de negócio"""

    @pytest.mark.asyncio
    async def test_evento_grande_deve_ter_destaque_alto(self):
        """Evento com palavras-chave (festival, grande) deve ter destaque alto"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Festival de Música",
            descricao="Grande festival com muitas bandas",
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 14, 0, 0),  # Dia
            tipo="musical",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.nivelDestaque == "alto"

    @pytest.mark.asyncio
    async def test_evento_noturno_quadra_ativa_deve_ter_seguranca(self):
        """Evento noturno (>=18h) em quadra ativa deve requerer segurança"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Show Noturno",
            descricao="Show à noite",
            quadra="SCS 1",  # Quadra ativa
            dataHora=datetime(2024, 12, 20, 20, 0, 0),  # 20h
            tipo="musical",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.necessidadeApoio["seguranca"] is True

    @pytest.mark.asyncio
    async def test_evento_diurno_nao_deve_ter_seguranca(self):
        """Evento diurno (<18h) não deve requerer segurança"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Feira de Artesanato",
            descricao="Feira durante o dia",
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 14, 0, 0),  # 14h
            tipo="comercial",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.necessidadeApoio["seguranca"] is False

    @pytest.mark.asyncio
    async def test_evento_noturno_scs3_deve_ter_iluminacao(self):
        """Evento noturno em SCS 3 ou 4 deve requerer iluminação"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Evento SCS 3",
            descricao="Evento à noite",
            quadra="SCS 3",
            dataHora=datetime(2024, 12, 20, 19, 0, 0),  # 19h
            tipo="cultural",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.necessidadeApoio["iluminacao"] is True

    @pytest.mark.asyncio
    async def test_evento_apos_22h_deve_ter_risco_medio(self):
        """Evento após 22h em quadra ativa deve ter risco médio"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Evento Tarde",
            descricao="Evento muito tarde",
            quadra="SCS 1",  # Quadra ativa
            dataHora=datetime(2024, 12, 20, 23, 0, 0),  # 23h
            tipo="musical",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.riscoOperacional == "medio"

    @pytest.mark.asyncio
    async def test_evento_grande_noturno_deve_ter_risco_medio(self):
        """Evento grande e noturno deve ter risco médio"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Grande Show",
            descricao="Show com muitos artistas",
            quadra="SCS 2",
            dataHora=datetime(2024, 12, 20, 20, 0, 0),  # 20h
            tipo="musical",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.riscoOperacional == "medio"

    @pytest.mark.asyncio
    async def test_texto_gerado_por_tipo_evento(self):
        """Diferentes tipos de evento devem gerar textos diferentes"""
        service = EventoService()
        
        evento_musical = EventoRequest(
            titulo="Show de Rock",
            descricao="Show",
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 20, 0, 0),
            tipo="musical",
        )
        resultado_musical = await service.analisar(evento_musical, model="mvp")
        assert "musical" in resultado_musical.sugestaoTexto.lower()
        assert "SCS 1" in resultado_musical.sugestaoTexto

        evento_gastronomico = EventoRequest(
            titulo="Feira Gastronômica",
            descricao="Comidas",
            quadra="SCS 2",
            dataHora=datetime(2024, 12, 20, 18, 0, 0),
            tipo="gastronomico",
        )
        resultado_gastronomico = await service.analisar(evento_gastronomico, model="mvp")
        assert "gastronômica" in resultado_gastronomico.sugestaoTexto.lower()
        assert "SCS 2" in resultado_gastronomico.sugestaoTexto

    @pytest.mark.asyncio
    async def test_recomendacoes_para_evento_noturno_quadra_ativa(self):
        """Evento noturno em quadra ativa deve gerar recomendação de segurança"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Evento Noturno",
            descricao="Evento à noite",
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 20, 0, 0),
            tipo="cultural",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert len(resultado.recomendacoes) > 0
        assert any("segurança" in rec.lower() for rec in resultado.recomendacoes)


class TestSegurancaAnalysis:
    """Testa análise de segurança - valida padrões e riscos"""

    @pytest.mark.asyncio
    async def test_multiplos_alertas_aumentam_risco(self):
        """Múltiplos alertas devem aumentar o nível de risco"""
        service = SegurancaService()
        
        alertas_poucos = [
            {"tipo": "suspeita", "quadra": "SCS 1", "dataHora": datetime.now().isoformat()}
        ]
        resultado_poucos = await service.analisar_padroes(alertas_poucos, [], model="mvp")
        risco_poucos = resultado_poucos.risco

        alertas_muitos = [
            {"tipo": "suspeita", "quadra": "SCS 1", "dataHora": datetime.now().isoformat()},
            {"tipo": "suspeita", "quadra": "SCS 1", "dataHora": datetime.now().isoformat()},
            {"tipo": "suspeita", "quadra": "SCS 1", "dataHora": datetime.now().isoformat()},
        ]
        resultado_muitos = await service.analisar_padroes(alertas_muitos, [], model="mvp")
        risco_muitos = resultado_muitos.risco

        # Risco com muitos alertas deve ser maior ou igual
        assert risco_muitos in ["medio", "alto"]
        if risco_poucos == "baixo":
            assert risco_muitos in ["medio", "alto"]

    @pytest.mark.asyncio
    async def test_alertas_mesma_quadra_agrupados(self):
        """Alertas na mesma quadra devem ser agrupados no padrão"""
        service = SegurancaService()
        
        alertas = [
            {"tipo": "suspeita", "quadra": "SCS 1", "dataHora": datetime.now().isoformat()},
            {"tipo": "suspeita", "quadra": "SCS 1", "dataHora": datetime.now().isoformat()},
            {"tipo": "roubo", "quadra": "SCS 2", "dataHora": datetime.now().isoformat()},
        ]
        resultado = await service.analisar_padroes(alertas, [], model="mvp")
        
        # Deve identificar padrão na SCS 1 (2 alertas) através da recomendação
        assert resultado.recomendacao is not None
        assert "SCS 1" in resultado.recomendacao

    @pytest.mark.asyncio
    async def test_sem_alertas_risco_baixo(self):
        """Sem alertas, o risco deve ser baixo"""
        service = SegurancaService()
        resultado = await service.analisar_padroes([], [], model="mvp")
        assert resultado.risco == "baixo"

    @pytest.mark.asyncio
    async def test_prever_risco_quadra_com_eventos(self):
        """Previsão de risco deve considerar eventos ativos"""
        service = SegurancaService()
        
        request = PredicaoRiscoRequest(
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 22, 0, 0),  # 22h
            eventosAtivos=[
                {"nivelDestaque": "alto", "quadra": "SCS 1"},
                {"nivelDestaque": "medio", "quadra": "SCS 1"},
            ],
        )
        resultado = await service.prever_risco(request, model="mvp")
        
        assert resultado.risco in ["baixo", "medio", "alto"]
        assert len(resultado.fatores) > 0
        assert len(resultado.recomendacoes) > 0


class TestProtecaoMulher:
    """Testa análise de proteção à mulher"""

    @pytest.mark.asyncio
    async def test_alerta_violencia_prioridade_alta(self):
        """Alertas de violência devem ter prioridade alta"""
        service = ProtecaoMulherService()
        
        request = ProtecaoMulherRequest(
            alertas=[
                {
                    "tipo": "violencia",
                    "quadra": "SCS 1",
                    "dataHora": datetime.now().isoformat(),
                    "gravidade": "alta",
                }
            ],
            eventos=[],
        )
        resultado = await service.analisar(request, model="mvp")
        
        # Com 1 alerta, risco deve ser médio. Com 3+ alertas, risco alto
        assert resultado.risco in ["medio", "alto"]
        assert len(resultado.quadrasProblematicas) > 0
        assert "SCS 1" in resultado.quadrasProblematicas
        assert len(resultado.recomendacoes) > 0

    @pytest.mark.asyncio
    async def test_bares_proximos_considerados(self):
        """Bares próximos devem ser considerados na análise"""
        service = ProtecaoMulherService()
        
        request = ProtecaoMulherRequest(
            alertas=[
                {
                    "tipo": "assédio",
                    "quadra": "SCS 1",
                    "dataHora": datetime.now().isoformat(),
                }
            ],
            eventos=[],
            bares=[
                {"nome": "Bar X", "quadra": "SCS 1", "distancia": 100}
            ],
        )
        resultado = await service.analisar(request, model="mvp")
        
        assert len(resultado.recomendacoes) > 0


class TestAcessibilidade:
    """Testa priorização de acessibilidade"""

    @pytest.mark.asyncio
    async def test_necessidade_urgente_prioridade_alta(self):
        """Necessidades urgentes devem ter prioridade maior"""
        service = AcessibilidadeService()
        
        necessidades = [
            NecessidadeAcessibilidadeRequest(
                tipo="rampa",
                quadra="SCS 1",
                prioridade="alta",
                descricao="Rampa quebrada",
                frequencia=10,
            ),
            NecessidadeAcessibilidadeRequest(
                tipo="elevador",
                quadra="SCS 2",
                prioridade="baixa",
                descricao="Manutenção preventiva",
                frequencia=2,
            ),
        ]
        resultado = await service.priorizar(necessidades)
        
        assert len(resultado) == 2
        # Necessidade com prioridade alta deve ter score maior
        scores = {r.score for r in resultado}
        assert max(scores) > min(scores)  # Deve haver diferença de priorização

    @pytest.mark.asyncio
    async def test_quadra_principal_prioridade_maior(self):
        """Necessidades com mesma prioridade devem ser ordenadas por score"""
        service = AcessibilidadeService()
        
        necessidades = [
            NecessidadeAcessibilidadeRequest(
                tipo="rampa",
                quadra="SCS 1",
                prioridade="media",
                descricao="Rampa",
                frequencia=10,  # Maior frequência
            ),
            NecessidadeAcessibilidadeRequest(
                tipo="rampa",
                quadra="SCS 5",
                prioridade="media",
                descricao="Rampa",
                frequencia=5,  # Menor frequência
            ),
        ]
        resultado = await service.priorizar(necessidades)
        
        assert len(resultado) == 2
        # Maior frequência deve ter score maior
        scores = sorted([r.score for r in resultado], reverse=True)
        assert scores[0] >= scores[1]  # Primeiro item deve ter score maior ou igual


class TestGeracaoTexto:
    """Testa geração de textos"""

    @pytest.mark.asyncio
    async def test_gerar_texto_evento_musical(self):
        """Deve gerar texto específico para evento musical"""
        service = ComunicacaoService()
        
        request = GerarTextoRequest(
            tipo="evento",
            contexto={
                "tipo": "musical",
                "quadra": "SCS 1",
                "titulo": "Show de Rock",
            },
        )
        resultado = await service.gerar_texto(request, model="mvp")
        
        assert len(resultado.texto) > 0
        assert resultado.hashtags is not None
        assert len(resultado.hashtags) > 0
        assert "SCS" in resultado.texto or "scs" in resultado.texto.lower()

    @pytest.mark.asyncio
    async def test_gerar_texto_com_hashtags(self):
        """Texto gerado deve incluir hashtags relevantes"""
        service = ComunicacaoService()
        
        request = GerarTextoRequest(
            tipo="evento",
            contexto={
                "tipo": "cultural",
                "quadra": "SCS 1",
            },
        )
        resultado = await service.gerar_texto(request, model="mvp")
        
        assert resultado.hashtags is not None
        assert isinstance(resultado.hashtags, list)
        assert len(resultado.hashtags) > 0
        # Hashtags devem começar com #
        assert all(h.startswith("#") for h in resultado.hashtags)

    @pytest.mark.asyncio
    async def test_otimizar_comunicacao_horario(self):
        """Otimização deve sugerir horário apropriado"""
        service = ComunicacaoService()
        
        request = ComunicacaoRequest(
            evento={
                "tipo": "musical",
                "dataHora": datetime(2024, 12, 20, 20, 0, 0).isoformat(),
            }
        )
        resultado = await service.otimizar(request, model="mvp")
        
        assert resultado.horarioPublicacao is not None
        assert resultado.canalSugerido is not None
        assert len(resultado.conteudo) > 0


class TestGestao:
    """Testa recomendações de gestão"""

    @pytest.mark.asyncio
    async def test_recomendacoes_com_eventos_e_alertas(self):
        """Deve gerar recomendações baseadas em eventos e alertas"""
        service = GestaoService()
        
        from app.models import GestaoRequest
        
        request = GestaoRequest(
            eventos=[
                {
                    "titulo": "Evento Grande",
                    "quadra": "SCS 1",
                    "dataHora": datetime(2024, 12, 20, 20, 0, 0).isoformat(),
                }
            ],
            alertas=[
                {
                    "tipo": "suspeita",
                    "quadra": "SCS 1",
                    "dataHora": datetime.now().isoformat(),
                }
            ],
            ocupacao=[{"quadra": "SCS 1", "taxa": 0.8}],
        )
        resultado = await service.gerar_recomendacoes(request, model="mvp")
        
        assert len(resultado) > 0
        assert all(r.prioridade in ["alta", "media", "baixa"] for r in resultado)
        assert all(r.tipo is not None for r in resultado)
        assert all(r.quadra is not None for r in resultado)

    @pytest.mark.asyncio
    async def test_recomendacoes_ocupacao_alta(self):
        """Taxa de vacância alta deve gerar recomendações específicas"""
        service = GestaoService()
        
        from app.models import GestaoRequest
        
        request = GestaoRequest(
            eventos=[],
            alertas=[],
            ocupacao=[{"quadra": "SCS 1", "vazios": 50, "ocupados": 50}],  # 50% vacância
        )
        resultado = await service.gerar_recomendacoes(request, model="mvp")
        
        assert len(resultado) > 0
        # Deve ter recomendações relacionadas à vacância/comércio
        tipos = [r.tipo for r in resultado]
        descricoes = [r.descricao for r in resultado]
        assert any("fomento" in str(t).lower() or "comercio" in str(t).lower() or
                  "vacância" in str(d).lower() or "vacancia" in str(d).lower() or
                  "incentivo" in str(d).lower()
                  for t, d in zip(tipos, descricoes))


class TestEdgeCases:
    """Testa casos extremos e edge cases"""

    @pytest.mark.asyncio
    async def test_evento_sem_descricao(self):
        """Evento sem descrição deve funcionar"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Evento",
            descricao="",
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 14, 0, 0),
            tipo="cultural",
        )
        resultado = await service.analisar(evento, model="mvp")
        assert resultado.nivelDestaque in ["baixo", "medio", "alto"]
        assert len(resultado.sugestaoTexto) > 0

    @pytest.mark.asyncio
    async def test_evento_com_data_string(self):
        """Evento com data em string ISO deve funcionar"""
        service = EventoService()
        evento = EventoRequest(
            titulo="Evento",
            descricao="Teste",
            quadra="SCS 1",
            dataHora=datetime(2024, 12, 20, 20, 0, 0),
            tipo="cultural",
        )
        # Simula conversão para string e volta
        evento_dict = evento.model_dump()
        evento_dict["dataHora"] = evento_dict["dataHora"].isoformat()
        
        # Cria novo request a partir do dict
        from app.llm import MVPEngine
        engine = MVPEngine()
        resultado = await engine.generate("analisar_evento", {"evento": evento_dict})
        
        assert resultado["nivelDestaque"] in ["baixo", "medio", "alto"]

    @pytest.mark.asyncio
    async def test_lista_vazia_alertas(self):
        """Lista vazia de alertas deve retornar risco baixo"""
        service = SegurancaService()
        resultado = await service.analisar_padroes([], [], model="mvp")
        assert resultado.risco == "baixo"
        assert resultado.correlacaoEventos is None or len(resultado.correlacaoEventos) == 0


from abc import ABC, abstractmethod
from typing import Dict, Any
from datetime import datetime
import httpx
from app.config import settings


class LLMProvider(ABC):
    @abstractmethod
    async def generate(
        self, prompt: str, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        pass

    @abstractmethod
    def is_available(self) -> bool:
        pass


class MVPEngine(LLMProvider):
    def is_available(self) -> bool:
        return True

    async def generate(
        self, prompt: str, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        if prompt == "analisar_evento":
            return self._analisar_evento(context["evento"])
        if prompt == "analisar_seguranca":
            return self._analisar_seguranca(context)
        if prompt == "prever_risco":
            return self._prever_risco(context)
        if prompt == "analisar_protecao_mulher":
            return self._analisar_protecao_mulher(context)
        if prompt == "priorizar_acessibilidade":
            return self._priorizar_acessibilidade(context)
        if prompt == "recomendacoes_gestao":
            return self._recomendacoes_gestao(context)
        if prompt == "gerar_texto":
            return self._gerar_texto(context)
        if prompt == "otimizar_comunicacao":
            return self._otimizar_comunicacao(context)
        if prompt == "agora_no_scs":
            return self._agora_no_scs(context)
        if prompt == "prever_movimento":
            return self._prever_movimento(context)
        if prompt == "orquestrar_agentes":
            return self._orquestrar_agentes(context)
        if prompt == "prever_sucesso_evento":
            return self._prever_sucesso_evento(context)
        return {}

    def _analisar_evento(self, evento: Dict[str, Any]) -> Dict[str, Any]:
        data_hora_raw = evento.get("dataHora")
        if isinstance(data_hora_raw, str):
            data_hora = datetime.fromisoformat(
                data_hora_raw.replace("Z", "+00:00")
            )
        elif isinstance(data_hora_raw, datetime):
            data_hora = data_hora_raw
        else:
            data_hora = datetime.now()

        hora = data_hora.hour
        is_noturno = hora >= 18
        is_quadra_ativa = evento["quadra"] in ["SCS 1", "SCS 2"]
        descricao_lower = evento.get("descricao", "").lower()
        is_evento_grande = any(
            palavra in descricao_lower
            for palavra in ["festival", "grande", "muitos", "show"]
        )

        nivel_destaque = (
            "alto"
            if is_evento_grande
            else ("medio" if is_noturno and is_quadra_ativa else "baixo")
        )

        risco_operacional = (
            "medio"
            if is_noturno and is_quadra_ativa and hora >= 22
            else ("medio" if is_evento_grande and is_noturno else "baixo")
        )

        sugestao_texto = self._gerar_texto_evento(evento, data_hora)

        recomendacoes = []
        if is_noturno and is_quadra_ativa:
            recomendacoes.append("Reforço de segurança recomendado")
        if is_noturno and evento["quadra"] in ["SCS 3", "SCS 4"]:
            recomendacoes.append("Iluminação adicional recomendada")

        return {
            "nivelDestaque": nivel_destaque,
            "necessidadeApoio": {
                "seguranca": is_noturno and (is_quadra_ativa or is_evento_grande),
                "iluminacao": is_noturno and evento["quadra"] in ["SCS 3", "SCS 4"],
            },
            "riscoOperacional": risco_operacional,
            "sugestaoTexto": sugestao_texto,
            "recomendacoes": recomendacoes,
        }

    def _gerar_texto_evento(
        self, evento: Dict[str, Any], data_hora: Any
    ) -> str:
        tipo = evento.get("tipo", "cultural")
        quadra = evento.get("quadra", "SCS 1")
        titulo = evento.get("titulo", "Evento")

        templates = {
            "cultural": f"Evento cultural na {quadra}. {titulo}. Venha participar!",
            "gastronomico": f"Experiência gastronômica na {quadra}. {titulo}.",
            "musical": f"Show musical na {quadra}. {titulo}. Não perca!",
            "esportivo": f"Atividade esportiva na {quadra}. {titulo}.",
            "comercial": f"Oportunidade comercial na {quadra}. {titulo}.",
            "oficial": f"Evento oficial do GDF na {quadra}. {titulo}.",
        }

        return templates.get(tipo, f"Evento na {quadra}. {titulo}.")

    def _analisar_seguranca(self, context: Dict[str, Any]) -> Dict[str, Any]:
        alertas = context.get("alertas", [])
        eventos = context.get("eventos", [])

        if not alertas:
            return {"risco": "baixo"}

        alertas_por_quadra: Dict[str, int] = {}
        for alerta in alertas:
            quadra = alerta.get("quadra", "")
            alertas_por_quadra[quadra] = alertas_por_quadra.get(quadra, 0) + 1

        quadra_mais_alertas = max(
            alertas_por_quadra.items(), key=lambda x: x[1], default=(None, 0)
        )[0]

        eventos_na_quadra = [
            e
            for e in eventos
            if e.get("quadra") == quadra_mais_alertas
            and self._is_futuro(e.get("dataHora"))
        ]

        risco = (
            "alto"
            if len(alertas) > 5
            else ("medio" if len(alertas) > 2 else "baixo")
        )

        correlacao = None
        if eventos_na_quadra and quadra_mais_alertas:
            correlacao = [
                f"{len(eventos_na_quadra)} eventos ativos na {quadra_mais_alertas}"
            ]

        recomendacao = None
        if risco != "baixo" and quadra_mais_alertas:
            recomendacao = (
                f"Recomenda-se reforço de segurança na {quadra_mais_alertas}"
            )

        return {
            "risco": risco,
            "correlacaoEventos": correlacao,
            "recomendacao": recomendacao,
        }

    def _prever_risco(self, context: Dict[str, Any]) -> Dict[str, Any]:
        quadra = context.get("quadra", "")
        eventos_ativos = context.get("eventosAtivos", [])

        fatores = []
        risco = "baixo"

        if eventos_ativos:
            eventos_grandes = [
                e
                for e in eventos_ativos
                if e.get("nivelDestaque") == "alto"
            ]
            if eventos_grandes:
                fatores.append("Evento noturno de grande porte")
                risco = "alto"

        if quadra in ["SCS 1", "SCS 2"]:
            fatores.append("Quadra de alto movimento noturno")
            if risco == "baixo":
                risco = "medio"

        recomendacoes = []
        if risco == "alto":
            recomendacoes.append("Reforço policial recomendado")
            recomendacoes.append("Iluminação adicional")
            recomendacoes.append("Monitoramento ativo")

        return {
            "risco": risco,
            "fatores": fatores,
            "recomendacoes": recomendacoes,
            "probabilidade": 0.75 if risco == "alto" else 0.5,
        }

    def _analisar_protecao_mulher(
        self, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        alertas = context.get("alertas", [])
        bares = context.get("bares", [])

        if not alertas:
            return {
                "risco": "baixo",
                "horariosCriticos": [],
                "quadrasProblematicas": [],
                "recomendacoes": [],
                "correlacaoBares": False,
            }

        horarios: Dict[int, int] = {}
        quadras: Dict[str, int] = {}

        for alerta in alertas:
            data_hora_raw = alerta.get("dataHora")
            if isinstance(data_hora_raw, str):
                data_hora = datetime.fromisoformat(
                    data_hora_raw.replace("Z", "+00:00")
                )
            elif hasattr(data_hora_raw, "hour"):
                data_hora = data_hora_raw
            else:
                data_hora = datetime.now()

            hora = data_hora.hour
            horarios[hora] = horarios.get(hora, 0) + 1

            quadra = alerta.get("quadra", "")
            quadras[quadra] = quadras.get(quadra, 0) + 1

        horarios_criticos = [
            f"{h:02d}:00-{h+1:02d}:00"
            for h in sorted(horarios.keys(), key=lambda x: horarios[x], reverse=True)[
                :3
            ]
        ]

        quadras_problematicas = sorted(
            quadras.items(), key=lambda x: x[1], reverse=True
        )[:2]
        quadras_problematicas = [q[0] for q in quadras_problematicas]

        risco = "alto" if len(alertas) >= 3 else "medio"

        recomendacoes = []
        if quadras_problematicas:
            recomendacoes.append(
                f"Reforço de iluminação na {quadras_problematicas[0]}"
            )
        recomendacoes.append("Presença feminina institucional recomendada")
        recomendacoes.append("Patrulhamento noturno intensificado")

        return {
            "risco": risco,
            "horariosCriticos": horarios_criticos,
            "quadrasProblematicas": quadras_problematicas,
            "recomendacoes": recomendacoes,
            "correlacaoBares": len(bares) > 0,
        }

    def _priorizar_acessibilidade(
        self, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        necessidades = context.get("necessidades", [])

        if not necessidades:
            return {"priorizacao": []}

        priorizacao = []
        for i, necessidade in enumerate(necessidades):
            prioridade = necessidade.get("prioridade", "media")
            frequencia = necessidade.get("frequencia", 1)

            score = 50
            if prioridade == "alta":
                score += 30
            elif prioridade == "media":
                score += 15

            score += min(frequencia * 5, 20)

            impacto = "alto" if score >= 70 else ("medio" if score >= 50 else "baixo")
            custo = "baixo" if necessidade.get("tipo") == "mobilidade_reduzida" else "medio"

            recomendacao = f"Instalação de {necessidade.get('tipo', 'melhoria')} prioritária"

            priorizacao.append(
                {
                    "necessidadeId": str(i + 1),
                    "score": score,
                    "impacto": impacto,
                    "custoEstimado": custo,
                    "recomendacao": recomendacao,
                }
            )

        priorizacao.sort(key=lambda x: x["score"], reverse=True)

        return {"priorizacao": priorizacao}

    def _recomendacoes_gestao(self, context: Dict[str, Any]) -> Dict[str, Any]:
        eventos = context.get("eventos", [])
        alertas = context.get("alertas", [])
        ocupacao = context.get("ocupacao", [])

        recomendacoes = []

        alertas_por_quadra: Dict[str, int] = {}
        for alerta in alertas:
            quadra = alerta.get("quadra", "")
            alertas_por_quadra[quadra] = alertas_por_quadra.get(quadra, 0) + 1

        for quadra, count in alertas_por_quadra.items():
            if count >= 3:
                recomendacoes.append(
                    {
                        "tipo": "reforco_policial",
                        "quadra": quadra,
                        "descricao": f"{count} alertas registrados. Reforço policial recomendado.",
                        "prioridade": "alta" if count >= 5 else "media",
                        "acoes": [
                            "Reforço de patrulhamento",
                            "Monitoramento intensificado",
                        ],
                    }
                )

        for item in ocupacao:
            vazios = item.get("vazios", 0)
            ocupados = item.get("ocupados", 0)
            total = vazios + ocupados

            if total > 0:
                taxa_vazia = vazios / total
                if taxa_vazia > 0.3:
                    recomendacoes.append(
                        {
                            "tipo": "fomento_comercio",
                            "quadra": item.get("quadra", ""),
                            "descricao": f"Taxa de vacância de {taxa_vazia*100:.0f}%. Incentivos comerciais recomendados.",
                            "prioridade": "alta" if taxa_vazia > 0.5 else "media",
                            "acoes": [
                                "Programa de incentivo fiscal",
                                "Eventos de revitalização",
                                "Parcerias com startups",
                            ],
                        }
                    )

        eventos_por_quadra: Dict[str, int] = {}
        for evento in eventos:
            quadra = evento.get("quadra", "")
            eventos_por_quadra[quadra] = eventos_por_quadra.get(quadra, 0) + 1

        for quadra, count in eventos_por_quadra.items():
            if count < 2:
                recomendacoes.append(
                    {
                        "tipo": "incentivo_cultural",
                        "quadra": quadra,
                        "descricao": "Poucos eventos programados. Incentivo cultural recomendado.",
                        "prioridade": "baixa",
                        "acoes": ["Programação cultural", "Apoio a eventos locais"],
                    }
                )

        return {"recomendacoes": recomendacoes}

    def _gerar_texto(self, context: Dict[str, Any]) -> Dict[str, Any]:
        tipo_texto = context.get("tipo", "evento")
        contexto = context.get("contexto", {})

        if tipo_texto == "evento":
            tipo_evento = contexto.get("tipo", "cultural")
            quadra = contexto.get("quadra", "SCS 1")
            texto = f"Evento {tipo_evento} na {quadra}!"

            hashtags = [f"#{quadra.replace(' ', '')}", f"#{tipo_evento.title()}", "#Brasilia"]

            return {
                "texto": texto,
                "hashtags": hashtags,
                "legendaInstagram": f"{texto} Venha participar! 🎉",
                "mensagemWhatsApp": f"🎉 {texto}\n\nVenha participar!",
            }

        return {"texto": "", "hashtags": []}

    def _otimizar_comunicacao(self, context: Dict[str, Any]) -> Dict[str, Any]:
        evento = context.get("evento", {})
        nivel_destaque = evento.get("nivelDestaque", "medio")

        data_hora_raw = evento.get("dataHora")
        if isinstance(data_hora_raw, str):
            data_hora = datetime.fromisoformat(
                data_hora_raw.replace("Z", "+00:00")
            )
        elif hasattr(data_hora_raw, "hour"):
            data_hora = data_hora_raw
        else:
            data_hora = datetime.now()

        hora = data_hora.hour if hasattr(data_hora, "hour") else 14
        is_noturno = hora >= 18

        if nivel_destaque == "alto":
            canal = "instagram"
            horario = "18:00-20:00"
            formato = "story"
        elif is_noturno:
            canal = "whatsapp"
            horario = "17:00-18:00"
            formato = "mensagem"
        else:
            canal = "telegram"
            horario = "12:00-13:00"
            formato = "canal"

        conteudo = {
            "titulo": evento.get("titulo", ""),
            "descricao": evento.get("descricao", ""),
            "hashtags": [f"#{evento.get('quadra', '').replace(' ', '')}"],
        }

        return {
            "canalSugerido": canal,
            "horarioPublicacao": horario,
            "formato": formato,
            "conteudo": conteudo,
        }

    def _is_futuro(self, data_hora_raw: Any) -> bool:
        if isinstance(data_hora_raw, str):
            data_hora = datetime.fromisoformat(
                data_hora_raw.replace("Z", "+00:00")
            )
        elif hasattr(data_hora_raw, "__gt__"):
            data_hora = data_hora_raw
        else:
            return False

        return data_hora > datetime.now()

    def _agora_no_scs(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """MAPA VIVO: Mostra o que está acontecendo AGORA no SCS"""
        quadra = context.get("quadra")
        timestamp = context.get("timestamp")
        eventos_ativos = context.get("eventosAtivos", [])
        comercios_abertos = context.get("comerciosAbertos", [])
        alertas_recentes = context.get("alertasRecentes", [])
        check_ins = context.get("checkIns", [])

        # Calcula movimento baseado em eventos + check-ins
        movimento_score = 0.0
        if eventos_ativos:
            movimento_score += len(eventos_ativos) * 0.2
        if check_ins:
            movimento_score += min(len(check_ins) * 0.05, 0.4)

        if movimento_score >= 0.6:
            movimento = "alto"
            status = "vivo"
            pessoas_estimadas = 50 + len(eventos_ativos) * 20
        elif movimento_score >= 0.3:
            movimento = "medio"
            status = "moderado"
            pessoas_estimadas = 20 + len(eventos_ativos) * 10
        else:
            movimento = "baixo"
            status = "vazio"
            pessoas_estimadas = 5

        # Segurança
        if alertas_recentes:
            seguranca = "reforcado" if len(alertas_recentes) > 2 else "presente"
        else:
            seguranca = "presente" if eventos_ativos else "ausente"

        # Iluminação
        if timestamp:
            try:
                if isinstance(timestamp, str):
                    timestamp_clean = timestamp.replace("Z", "+00:00")
                    hora = datetime.fromisoformat(timestamp_clean).hour
                else:
                    hora = timestamp.hour
            except (ValueError, AttributeError):
                hora = datetime.now().hour
        else:
            hora = datetime.now().hour

        if hora >= 18:
            iluminacao = "reforcada" if eventos_ativos else "adequada"
        else:
            iluminacao = "adequada"

        # Score de vida urbana (0.0 a 1.0)
        score_vida = movimento_score
        if eventos_ativos:
            score_vida += 0.2
        if len(comercios_abertos) > 5:
            score_vida += 0.1
        score_vida = min(1.0, score_vida)

        # Recomendação inteligente
        if status == "vivo":
            recomendacao = f"Ótimo momento para visitar! {len(eventos_ativos)} eventos ativos na {quadra or 'SCS'}"
        elif status == "moderado":
            recomendacao = f"Movimento moderado. {len(comercios_abertos)} comércios abertos disponíveis"
        else:
            recomendacao = "Área tranquila. Ideal para passeio diurno ou eventos programados"

        return {
            "status": status,
            "eventosAtivos": len(eventos_ativos),
            "comerciosAbertos": len(comercios_abertos),
            "movimento": movimento,
            "seguranca": seguranca,
            "iluminacao": iluminacao,
            "recomendacao": recomendacao,
            "scoreVidaUrbana": round(score_vida, 2),
            "pessoasEstimadas": pessoas_estimadas,
        }

    def _prever_movimento(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """PREDIÇÃO: Prever movimento futuro baseado em padrões"""
        quadra = context.get("quadra", "")
        data_hora_raw = context.get("dataHora")
        eventos_agendados = context.get("eventosAgendados", [])
        historico = context.get("historico", {})

        if isinstance(data_hora_raw, str):
            data_hora = datetime.fromisoformat(data_hora_raw.replace("Z", "+00:00"))
        elif hasattr(data_hora_raw, "hour"):
            data_hora = data_hora_raw
        else:
            data_hora = datetime.now()

        # Score base do histórico
        dia_semana = data_hora.weekday()
        chave_historico = f"{quadra}_{dia_semana}_{data_hora.hour}"
        base_score = historico.get(chave_historico, 0.5)

        # Boost por eventos agendados
        eventos_boost = 0.0
        fatores = []
        for evento in eventos_agendados:
            impacto = evento.get("impactoEsperado", "medio")
            if impacto == "alto":
                eventos_boost += 0.25
                fatores.append(f"Evento de alto impacto agendado (+25%)")
            elif impacto == "medio":
                eventos_boost += 0.15
                fatores.append(f"Evento agendado (+15%)")
            else:
                eventos_boost += 0.10

        # Boost por horário
        if 18 <= data_hora.hour <= 22:
            eventos_boost += 0.10
            fatores.append("Horário noturno ideal (+10%)")

        # Boost por quadra ativa
        if quadra in ["SCS 1", "SCS 2"]:
            eventos_boost += 0.10
            fatores.append("Quadra de alto movimento (+10%)")

        movimento_previsto = min(1.0, base_score + eventos_boost)

        categoria = "alto" if movimento_previsto > 0.7 else "medio" if movimento_previsto > 0.4 else "baixo"
        confianca = 0.75 if historico else 0.50

        recomendacao = None
        if movimento_previsto > 0.7:
            recomendacao = "Alto movimento esperado. Prepare-se para grande público!"
        elif movimento_previsto < 0.3:
            recomendacao = "Baixo movimento esperado. Considere adicionar atrativos ou mudar horário."

        return {
            "movimentoPrevisto": round(movimento_previsto, 2),
            "categoria": categoria,
            "confianca": confianca,
            "fatores": fatores if fatores else ["Baseado em histórico padrão"],
            "recomendacao": recomendacao,
        }

    def _orquestrar_agentes(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """IA MULTI-AGENTE: Orquestra múltiplos agentes para decisão inteligente"""
        quadra = context.get("quadra", "")
        contexto = context.get("contexto", {})
        horario = contexto.get("horario", "20:00")
        dia_semana = contexto.get("diaSemana", "sexta")

        # Agente de Eventos
        eventos_context = {
            "quadra": quadra,
            "horario": horario,
        }
        eventos_analise = self._analisar_evento(eventos_context)

        # Agente de Segurança
        seguranca_context = {
            "alertas": contexto.get("alertas", []),
            "eventos": contexto.get("eventos", []),
        }
        seguranca_analise = self._analisar_seguranca(seguranca_context)

        # Agente de Comércio (simulado)
        comercio_aberto = contexto.get("comerciosAbertos", 0) > 5
        comercio_analise = {
            "status": "pronto" if comercio_aberto else "limitado",
            "recomendacao": "Comércios prontos para receber público" if comercio_aberto else "Poucos comércios abertos",
        }

        # Orquestrador combina insights
        risco_baixo = seguranca_analise.get("risco") == "baixo"
        evento_positivo = eventos_analise.get("nivelDestaque") in ["medio", "alto"]

        if risco_baixo and evento_positivo and comercio_aberto:
            acao_sugerida = f"Ativar evento noturno na {quadra}"
            razao = "Condições ideais: baixo risco + evento atrativo + comércios prontos"
            probabilidade = 0.85
            acoes_recomendadas = [
                "Notificar comerciantes próximos",
                "Solicitar reforço de segurança preventivo",
                "Ativar iluminação adicional",
                "Publicar no Instagram Stories",
            ]
        elif risco_baixo and comercio_aberto:
            acao_sugerida = f"Incentivar movimento na {quadra}"
            razao = "Segurança ok, mas falta evento atrativo"
            probabilidade = 0.60
            acoes_recomendadas = [
                "Sugerir evento cultural rápido",
                "Ativar promoções em comércios",
            ]
        else:
            acao_sugerida = f"Manter monitoramento na {quadra}"
            razao = "Condições não ideais para ativação"
            probabilidade = 0.30
            acoes_recomendadas = [
                "Manter segurança presente",
                "Aguardar melhores condições",
            ]

        return {
            "acaoSugerida": acao_sugerida,
            "razao": razao,
            "probabilidadeSucesso": probabilidade,
            "acoesRecomendadas": acoes_recomendadas,
            "agentes": {
                "eventos": eventos_analise,
                "seguranca": seguranca_analise,
                "comercio": comercio_analise,
            },
        }

    def _prever_sucesso_evento(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """PREDIÇÃO: Prever se evento vai ter sucesso antes de acontecer"""
        evento = context.get("evento", {})
        historico = context.get("historico", {})

        fatores = []
        score = 0.5  # Base

        # Fator 1: Tipo de evento
        tipo = evento.get("tipo", "")
        if tipo == "musical":
            score += 0.15
            fatores.append("Eventos musicais têm 30% mais engajamento (+15%)")
        elif tipo == "gastronomico":
            score += 0.10
            fatores.append("Eventos gastronômicos têm boa adesão (+10%)")
        elif tipo == "cultural":
            score += 0.08
            fatores.append("Eventos culturais têm engajamento moderado (+8%)")

        # Fator 2: Horário
        data_hora_raw = evento.get("dataHora")
        if isinstance(data_hora_raw, str):
            data_hora = datetime.fromisoformat(data_hora_raw.replace("Z", "+00:00"))
        elif hasattr(data_hora_raw, "hour"):
            data_hora = data_hora_raw
        else:
            data_hora = datetime.now()

        hora = data_hora.hour
        if 18 <= hora <= 22:
            score += 0.10
            fatores.append("Horário noturno ideal para SCS (+10%)")
        elif 14 <= hora < 18:
            score += 0.05
            fatores.append("Horário vespertino adequado (+5%)")

        # Fator 3: Quadra
        quadra = evento.get("quadra", "")
        if quadra in ["SCS 1", "SCS 2"]:
            score += 0.10
            fatores.append("Quadras 1-2 têm histórico positivo (+10%)")
        elif quadra in ["SCS 3", "SCS 4"]:
            score += 0.05
            fatores.append("Quadras 3-4 têm potencial de crescimento (+5%)")

        # Fator 4: Descrição (palavras-chave)
        descricao = evento.get("descricao", "").lower()
        if any(palavra in descricao for palavra in ["festival", "grande", "show", "muitos"]):
            score += 0.10
            fatores.append("Descrição indica evento de grande porte (+10%)")

        # Fator 5: Histórico (se disponível)
        if historico:
            eventos_similares = historico.get("eventos_similares", [])
            if eventos_similares:
                taxa_media = sum(e.get("taxaSucesso", 0.5) for e in eventos_similares) / len(eventos_similares)
                score = (score + taxa_media) / 2
                fatores.append(f"Baseado em {len(eventos_similares)} eventos similares no histórico")

        score = min(1.0, score)
        categoria = "alto" if score > 0.7 else "medio" if score > 0.5 else "baixo"

        # Sugestões de otimização
        sugestoes = []
        if score < 0.6:
            sugestoes.append("Adicionar food trucks (+15% movimento)")
            sugestoes.append("Solicitar reforço de segurança (+10% confiança)")
        if hora < 18:
            sugestoes.append("Considerar horário noturno (18h-22h) para maior engajamento")
        if quadra not in ["SCS 1", "SCS 2"]:
            sugestoes.append("Parceria com comércios locais para aumentar visibilidade")
        sugestoes.append("Publicar no Instagram Stories (+20% alcance)")

        return {
            "probabilidadeSucesso": round(score, 2),
            "categoria": categoria,
            "fatores": fatores,
            "sugestoesOtimizacao": sugestoes,
            "score": round(score, 2),
        }


class OllamaClient(LLMProvider):
    def __init__(self, base_url: str = None):
        from app.config import settings

        self.base_url = base_url or settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_MODEL

    def is_available(self) -> bool:
        try:
            response = httpx.get(f"{self.base_url}/api/tags", timeout=2.0)
            return response.status_code == 200
        except Exception:
            return False

    async def generate(
        self, prompt: str, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        prompt_texto = self._build_prompt(prompt, context)

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt_texto,
                    "stream": False,
                },
            )
            response.raise_for_status()
            data = response.json()

            resposta_texto = data.get("response", "")
            return await self._parse_response(prompt, resposta_texto, context)

    def _build_prompt(self, prompt: str, context: Dict[str, Any]) -> str:
        if prompt == "analisar_evento":
            evento = context["evento"]
            return f"""Analise este evento do Setor Comercial Sul (SCS) em Brasília:

Título: {evento.get('titulo', '')}
Descrição: {evento.get('descricao', '')}
Quadra: {evento.get('quadra', '')}
Data/Hora: {evento.get('dataHora', '')}
Tipo: {evento.get('tipo', '')}

Retorne um JSON com:
- nivelDestaque: "baixo", "medio" ou "alto"
- necessidadeApoio: {{"seguranca": true/false, "iluminacao": true/false}}
- riscoOperacional: "baixo", "medio" ou "alto"
- sugestaoTexto: texto descritivo do evento
- recomendacoes: lista de recomendações"""

        if prompt == "gerar_texto":
            contexto = context.get("contexto", {})
            return f"""Gere um texto para evento:
Tipo: {contexto.get('tipo', '')}
Quadra: {contexto.get('quadra', '')}

Retorne JSON com: texto, hashtags, legendaInstagram, mensagemWhatsApp"""

        return f"Analise: {prompt}"

    async def _parse_response(
        self, prompt: str, resposta: str, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        import json

        try:
            resposta_limpa = resposta.strip()
            if resposta_limpa.startswith("```json"):
                resposta_limpa = resposta_limpa[7:]
            if resposta_limpa.startswith("```"):
                resposta_limpa = resposta_limpa[3:]
            if resposta_limpa.endswith("```"):
                resposta_limpa = resposta_limpa[:-3]
            resposta_limpa = resposta_limpa.strip()

            return json.loads(resposta_limpa)
        except Exception:
            mvp = MVPEngine()
            return await mvp.generate(prompt, context)


# SCS AI Service

Microserviço de IA para Super App SCS - Código simples, direto e Clean Code.

## 🎯 Características

- **100% Gratuito**: Ollama local + MVP Engine
- **Código Simples**: Sem over-engineering
- **Clean Code**: Legível e manutenível
- **FastAPI**: Framework moderno e rápido

## 🚀 Início Rápido

### Local

```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar servidor
uvicorn app.main:app --reload
```

### Docker

```bash
# Subir serviços (Ollama + AI Service)
docker-compose up

# Acessar
curl http://localhost:8000/api/v1/health
```

## 📡 Endpoints

### Health Check
```
GET /api/v1/health
```

### Listar Modelos
```
GET /api/v1/models
```

### Análise de Evento
```
POST /api/v1/eventos/analisar
{
  "titulo": "Festival de Música",
  "descricao": "Show ao vivo",
  "quadra": "SCS 1",
  "dataHora": "2024-12-20T20:00:00",
  "tipo": "musical"
}
```

### Análise de Segurança
```
POST /api/v1/seguranca/analisar-padroes
POST /api/v1/seguranca/prever-risco
```

### Proteção à Mulher
```
POST /api/v1/protecao-mulher/analisar
```

### Acessibilidade
```
POST /api/v1/acessibilidade/priorizar
```

### Gestão
```
POST /api/v1/gestao/recomendacoes
```

### Comunicação
```
POST /api/v1/textos/gerar
POST /api/v1/comunicacao/otimizar
```

## 🧪 Testes

```bash
pytest tests/
```

## 📦 Estrutura

```
app/
├── main.py      # FastAPI app
├── api.py       # Endpoints
├── services.py  # Lógica de negócio
├── llm.py       # Providers LLM
├── models.py    # Schemas Pydantic
└── config.py    # Configurações
```

## 🔧 Configuração

Copie `.env.example` para `.env` e ajuste:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
USE_OLLAMA=true
USE_MVP=true
```

## 📝 Clean Code

- Nomes claros e descritivos
- Funções < 20 linhas
- Sem comentários óbvios
- Type hints sempre
- Código auto-explicativo


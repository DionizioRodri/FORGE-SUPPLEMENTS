# =========================================================
# FORGE SUPPLEMENTS - Backend Flask
# =========================================================
# Este arquivo é OPCIONAL e fornece funcionalidades extras:
#   - Recebe inscrições da newsletter
#   - Serve o catálogo de produtos como API
#   - Simula processamento de pedidos
#   - Gera cupons de desconto
#
# Como rodar:
#   1. pip install flask flask-cors
#   2. python backend.py
#   3. O servidor estará em http://localhost:5000
# =========================================================

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import random
import string
import re
from datetime import datetime

# ---------------------------------------------------------
# CONFIGURAÇÃO
# ---------------------------------------------------------
app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)  # Permite requisições do frontend

# Arquivo onde os inscritos são salvos
ARQUIVO_INSCRITOS = "inscritos.json"
ARQUIVO_PEDIDOS = "pedidos.json"

# ---------------------------------------------------------
# CATÁLOGO DE PRODUTOS (mesma estrutura do frontend)
# ---------------------------------------------------------
CATALOGO = [
    {
        "id": 1,
        "nome": "Whey Protein Isolado 900g",
        "categoria": "whey",
        "preco": 289.90,
        "avaliacao": 4.9,
        "descricao": "26g de proteína por dose, absorção rápida e sabor premium.",
        "imagem": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=70",
        "badge": "MAIS VENDIDO"
    },
    {
        "id": 2,
        "nome": "Whey Concentrado 1kg",
        "categoria": "whey",
        "preco": 179.90,
        "avaliacao": 4.5,
        "descricao": "Proteína concentrada de alta qualidade com ótimo custo-benefício.",
        "imagem": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=70",
        "badge": None
    },
    {
        "id": 3,
        "nome": "Creatina Monohidratada 300g",
        "categoria": "creatina",
        "preco": 149.90,
        "avaliacao": 4.9,
        "descricao": "Creatina pura micronizada para força e explosão muscular.",
        "imagem": "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=500&auto=format&fit=crop&q=70",
        "badge": "PURO"
    },
    {
        "id": 4,
        "nome": "Creatina HCL 150g",
        "categoria": "creatina",
        "preco": 199.90,
        "avaliacao": 4.6,
        "descricao": "Creatina HCL de alta absorção, sem retenção hídrica.",
        "imagem": "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&auto=format&fit=crop&q=70",
        "badge": None
    },
    {
        "id": 5,
        "nome": "Pré-Treino Insanity 300g",
        "categoria": "pre-treino",
        "preco": 189.90,
        "avaliacao": 4.8,
        "descricao": "Fórmula explosiva com cafeína, beta-alanina e arginina.",
        "imagem": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&auto=format&fit=crop&q=70",
        "badge": "TOP"
    },
    {
        "id": 6,
        "nome": "Pré-Treino Pump Extreme",
        "categoria": "pre-treino",
        "preco": 259.90,
        "avaliacao": 4.7,
        "descricao": "Vasodilatação intensa e foco mental prolongado.",
        "imagem": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=70",
        "badge": None
    },
    {
        "id": 7,
        "nome": "BCAA 2:1:1 - 200g",
        "categoria": "bcaa",
        "preco": 129.90,
        "avaliacao": 4.4,
        "descricao": "Recuperação muscular acelerada e redução do catabolismo.",
        "imagem": "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&auto=format&fit=crop&q=70",
        "badge": None
    },
    {
        "id": 8,
        "nome": "BCAA Ultra Recovery",
        "categoria": "bcaa",
        "preco": 159.90,
        "avaliacao": 4.3,
        "descricao": "Aminoácidos essenciais com eletrólitos para hidratação.",
        "imagem": "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=500&auto=format&fit=crop&q=70",
        "badge": None
    },
    {
        "id": 9,
        "nome": "Hipercalórico Mass 3kg",
        "categoria": "hipercalorico",
        "preco": 249.90,
        "avaliacao": 4.6,
        "descricao": "Alta densidade calórica para ganho de massa muscular.",
        "imagem": "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=500&auto=format&fit=crop&q=70",
        "badge": "GANHO"
    },
    {
        "id": 10,
        "nome": "Hipercalórico Weight Gainer",
        "categoria": "hipercalorico",
        "preco": 429.90,
        "avaliacao": 4.8,
        "descricao": "Fórmula avançada com carboidratos complexos e proteínas.",
        "imagem": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=70",
        "badge": None
    },
    {
        "id": 11,
        "nome": "Whey Hydrolyzed 900g",
        "categoria": "whey",
        "preco": 349.90,
        "avaliacao": 4.9,
        "descricao": "Proteína hidrolisada de altíssima absorção e pureza.",
        "imagem": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=70",
        "badge": "PREMIUM"
    },
    {
        "id": 12,
        "nome": "Creatina Creapure 250g",
        "categoria": "creatina",
        "preco": 219.90,
        "avaliacao": 5.0,
        "descricao": "Creatina Creapure® alemã, referência mundial em pureza.",
        "imagem": "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=500&auto=format&fit=crop&q=70",
        "badge": "PREMIUM"
    }
]

# ---------------------------------------------------------
# FUNÇÕES AUXILIARES
# ---------------------------------------------------------
def carregar_json(arquivo):
    """Carrega um arquivo JSON, retornando lista vazia se não existir."""
    if not os.path.exists(arquivo):
        return []
    try:
        with open(arquivo, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return []

def salvar_json(arquivo, dados):
    """Salva dados em um arquivo JSON."""
    with open(arquivo, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

def gerar_cupom(tamanho=8):
    """Gera um código de cupom aleatório (ex: FORGE-A3K9X2)."""
    caracteres = string.ascii_uppercase + string.digits
    codigo = "".join(random.choices(caracteres, k=tamanho))
    return f"FORGE-{codigo}"

def validar_email(email):
    """Valida formato básico de e-mail."""
    regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return re.match(regex, email) is not None

# ---------------------------------------------------------
# ROTAS
# ---------------------------------------------------------

@app.route("/")
def index():
    """Serve o index.html do frontend."""
    return send_from_directory(".", "index.html")

@app.route("/api/produtos", methods=["GET"])
def listar_produtos():
    """
    Retorna o catálogo de produtos.
    Aceita filtros via query string:
      ?categoria=whey
      ?preco_min=100&preco_max=300
      ?avaliacao_min=4.5
    """
    categoria = request.args.get("categoria", "todos")
    preco_min = request.args.get("preco_min", type=float)
    preco_max = request.args.get("preco_max", type=float)
    avaliacao_min = request.args.get("avaliacao_min", type=float)

    resultado = CATALOGO.copy()

    if categoria and categoria != "todos":
        resultado = [p for p in resultado if p["categoria"] == categoria]
    if preco_min is not None:
        resultado = [p for p in resultado if p["preco"] >= preco_min]
    if preco_max is not None:
        resultado = [p for p in resultado if p["preco"] <= preco_max]
    if avaliacao_min is not None:
        resultado = [p for p in resultado if p["avaliacao"] >= avaliacao_min]

    return jsonify({
        "sucesso": True,
        "total": len(resultado),
        "produtos": resultado
    })

@app.route("/api/produtos/<int:produto_id>", methods=["GET"])
def detalhe_produto(produto_id):
    """Retorna detalhes de um produto específico."""
    produto = next((p for p in CATALOGO if p["id"] == produto_id), None)
    if not produto:
        return jsonify({"sucesso": False, "erro": "Produto não encontrado"}), 404
    return jsonify({"sucesso": True, "produto": produto})

@app.route("/api/newsletter", methods=["POST"])
def newsletter():
    """
    Recebe inscrição na newsletter.
    Body JSON esperado: { "nome": "João", "email": "joao@email.com" }
    """
    dados = request.get_json(silent=True) or {}
    nome = (dados.get("nome") or "").strip()
    email = (dados.get("email") or "").strip().lower()

    # Validações
    if not nome or not email:
        return jsonify({
            "sucesso": False,
            "erro": "Nome e e-mail são obrigatórios."
        }), 400

    if not validar_email(email):
        return jsonify({
            "sucesso": False,
            "erro": "E-mail inválido."
        }), 400

    # Carrega inscritos existentes
    inscritos = carregar_json(ARQUIVO_INSCRITOS)

    # Verifica se já está inscrito
    if any(i["email"] == email for i in inscritos):
        return jsonify({
            "sucesso": True,
            "mensagem": "Você já está inscrito! Fique de olho no seu e-mail.",
            "cupom": None
        })

    # Gera cupom de desconto
    cupom = gerar_cupom()

    # Salva novo inscrito
    inscritos.append({
        "nome": nome,
        "email": email,
        "cupom": cupom,
        "data": datetime.now().isoformat()
    })
    salvar_json(ARQUIVO_INSCRITOS, inscritos)

    print(f"📧 Novo inscrito: {nome} <{email}> | Cupom: {cupom}")

    return jsonify({
        "sucesso": True,
        "mensagem": f"Obrigado, {nome}! Seu cupom de 10% foi enviado.",
        "cupom": cupom
    })

@app.route("/api/pedido", methods=["POST"])
def criar_pedido():
    """
    Simula a criação de um pedido.
    Body JSON esperado:
    {
        "cliente": { "nome": "...", "email": "..." },
        "itens": [ { "id": 1, "quantidade": 2 }, ... ]
    }
    """
    dados = request.get_json(silent=True) or {}
    cliente = dados.get("cliente", {})
    itens = dados.get("itens", [])

    if not cliente.get("email") or not itens:
        return jsonify({
            "sucesso": False,
            "erro": "Dados do pedido incompletos."
        }), 400

    # Calcula total
    total = 0.0
    itens_detalhados = []

    for item in itens:
        produto = next((p for p in CATALOGO if p["id"] == item.get("id")), None)
        if produto:
            quantidade = int(item.get("quantidade", 1))
            subtotal = produto["preco"] * quantidade
            total += subtotal
            itens_detalhados.append({
                "produto": produto["nome"],
                "quantidade": quantidade,
                "subtotal": round(subtotal, 2)
            })

    # Gera número do pedido
    numero_pedido = f"FS-{random.randint(10000, 99999)}"

    pedido = {
        "numero": numero_pedido,
        "cliente": cliente,
        "itens": itens_detalhados,
        "total": round(total, 2),
        "status": "confirmado",
        "data": datetime.now().isoformat()
    }

    # Salva no arquivo
    pedidos = carregar_json(ARQUIVO_PEDIDOS)
    pedidos.append(pedido)
    salvar_json(ARQUIVO_PEDIDOS, pedidos)

    print(f"🛒 Novo pedido {numero_pedido} | Total: R$ {total:.2f}")

    return jsonify({
        "sucesso": True,
        "mensagem": f"Pedido {numero_pedido} confirmado!",
        "pedido": pedido
    })

@app.route("/api/inscritos", methods=["GET"])
def listar_inscritos():
    """Retorna todos os inscritos (útil para admin)."""
    inscritos = carregar_json(ARQUIVO_INSCRITOS)
    return jsonify({
        "sucesso": True,
        "total": len(inscritos),
        "inscritos": inscritos
    })

@app.route("/api/pedidos", methods=["GET"])
def listar_pedidos():
    """Retorna todos os pedidos (útil para admin)."""
    pedidos = carregar_json(ARQUIVO_PEDIDOS)
    return jsonify({
        "sucesso": True,
        "total": len(pedidos),
        "pedidos": pedidos
    })

@app.route("/api/health", methods=["GET"])
def health():
    """Rota de verificação de status do servidor."""
    return jsonify({
        "status": "online",
        "servico": "FORGE SUPPLEMENTS API",
        "versao": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

# ---------------------------------------------------------
# HANDLERS DE ERRO
# ---------------------------------------------------------
@app.errorhandler(404)
def nao_encontrado(e):
    return jsonify({
        "sucesso": False,
        "erro": "Rota não encontrada."
    }), 404

@app.errorhandler(500)
def erro_interno(e):
    return jsonify({
        "sucesso": False,
        "erro": "Erro interno do servidor."
    }), 500

# ---------------------------------------------------------
# EXECUÇÃO
# ---------------------------------------------------------
if __name__ == "__main__":
    print("=" * 55)
    print("🔥 FORGE SUPPLEMENTS - API Backend")
    print("=" * 55)
    print("🌐 Servidor:  http://localhost:5000")
    print("📦 Produtos:  http://localhost:5000/api/produtos")
    print("📧 Newsletter: POST /api/newsletter")
    print("🛒 Pedidos:   POST /api/pedido")
    print("❤️  Health:    http://localhost:5000/api/health")
    print("=" * 55)

    app.run(debug=True, host="0.0.0.0", port=5000)
/* =========================================================
   FORGE SUPPLEMENTS - Script Principal
   ========================================================= */

/* ---------------------------------------------------------
   1. CATÁLOGO DE PRODUTOS
   --------------------------------------------------------- */
const produtos = [
    {
        id: 1,
        nome: "Whey Protein Isolado 900g",
        categoria: "whey",
        preco: 289.90,
        avaliacao: 4.9,
        descricao: "26g de proteína por dose, absorção rápida e sabor premium.",
        imagem: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=70",
        badge: "MAIS VENDIDO"
    },
    {
        id: 2,
        nome: "Whey Concentrado 1kg",
        categoria: "whey",
        preco: 179.90,
        avaliacao: 4.5,
        descricao: "Proteína concentrada de alta qualidade com ótimo custo-benefício.",
        imagem: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=70",
        badge: null
    },
    {
        id: 3,
        nome: "Creatina Monohidratada 300g",
        categoria: "creatina",
        preco: 149.90,
        avaliacao: 4.9,
        descricao: "Creatina pura micronizada para força e explosão muscular.",
        imagem: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=500&auto=format&fit=crop&q=70",
        badge: "PURO"
    },
    {
        id: 4,
        nome: "Creatina HCL 150g",
        categoria: "creatina",
        preco: 199.90,
        avaliacao: 4.6,
        descricao: "Creatina HCL de alta absorção, sem retenção hídrica.",
        imagem: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&auto=format&fit=crop&q=70",
        badge: null
    },
    {
        id: 5,
        nome: "Pré-Treino Insanity 300g",
        categoria: "pre-treino",
        preco: 189.90,
        avaliacao: 4.8,
        descricao: "Fórmula explosiva com cafeína, beta-alanina e arginina.",
        imagem: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&auto=format&fit=crop&q=70",
        badge: "TOP"
    },
    {
        id: 6,
        nome: "Pré-Treino Pump Extreme",
        categoria: "pre-treino",
        preco: 259.90,
        avaliacao: 4.7,
        descricao: "Vasodilatação intensa e foco mental prolongado.",
        imagem: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=70",
        badge: null
    },
    {
        id: 7,
        nome: "BCAA 2:1:1 - 200g",
        categoria: "bcaa",
        preco: 129.90,
        avaliacao: 4.4,
        descricao: "Recuperação muscular acelerada e redução do catabolismo.",
        imagem: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&auto=format&fit=crop&q=70",
        badge: null
    },
    {
        id: 8,
        nome: "BCAA Ultra Recovery",
        categoria: "bcaa",
        preco: 159.90,
        avaliacao: 4.3,
        descricao: "Aminoácidos essenciais com eletrólitos para hidratação.",
        imagem: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=500&auto=format&fit=crop&q=70",
        badge: null
    },
    {
        id: 9,
        nome: "Hipercalórico Mass 3kg",
        categoria: "hipercalorico",
        preco: 249.90,
        avaliacao: 4.6,
        descricao: "Alta densidade calórica para ganho de massa muscular.",
        imagem: "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=500&auto=format&fit=crop&q=70",
        badge: "GANHO"
    },
    {
        id: 10,
        nome: "Hipercalórico Weight Gainer",
        categoria: "hipercalorico",
        preco: 429.90,
        avaliacao: 4.8,
        descricao: "Fórmula avançada com carboidratos complexos e proteínas.",
        imagem: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=70",
        badge: null
    },
    {
        id: 11,
        nome: "Whey Hydrolyzed 900g",
        categoria: "whey",
        preco: 349.90,
        avaliacao: 4.9,
        descricao: "Proteína hidrolisada de altíssima absorção e pureza.",
        imagem: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=70",
        badge: "PREMIUM"
    },
    {
        id: 12,
        nome: "Creatina Creapure 250g",
        categoria: "creatina",
        preco: 219.90,
        avaliacao: 5.0,
        descricao: "Creatina Creapure® alemã, referência mundial em pureza.",
        imagem: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=500&auto=format&fit=crop&q=70",
        badge: "PREMIUM"
    }
];

/* ---------------------------------------------------------
   2. ESTADO GLOBAL
   --------------------------------------------------------- */
let carrinho = [];
let filtrosAtivos = {
    categoria: "todos",
    preco: "todos",
    avaliacao: 0
};

/* ---------------------------------------------------------
   3. REFERÊNCIAS DO DOM
   --------------------------------------------------------- */
const produtosGrid = document.getElementById("produtosGrid");
const semProdutos = document.getElementById("semProdutos");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroPreco = document.getElementById("filtroPreco");
const filtroAvaliacao = document.getElementById("filtroAvaliacao");
const limparFiltrosBtn = document.getElementById("limparFiltros");

const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const carrinhoLateral = document.getElementById("carrinhoLateral");
const carrinhoOverlay = document.getElementById("carrinhoOverlay");
const fecharCarrinhoBtn = document.getElementById("fecharCarrinho");
const carrinhoItens = document.getElementById("carrinhoItens");
const carrinhoTotal = document.getElementById("carrinhoTotal");
const finalizarCompraBtn = document.getElementById("finalizarCompra");

const newsletterForm = document.getElementById("newsletterForm");
const formMensagem = document.getElementById("formMensagem");
const toast = document.getElementById("toast");

/* ---------------------------------------------------------
   4. UTILITÁRIOS
   --------------------------------------------------------- */

// Formata preço para R$
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Gera estrelas com base na nota
function gerarEstrelas(nota) {
    const cheia = Math.floor(nota);
    const meia = nota % 1 >= 0.5;
    let html = "";

    for (let i = 0; i < cheia; i++) html += '<i class="fas fa-star"></i>';
    if (meia) html += '<i class="fas fa-star-half-alt"></i>';
    const vazias = 5 - cheia - (meia ? 1 : 0);
    for (let i = 0; i < vazias; i++) html += '<i class="far fa-star"></i>';

    return html;
}

// Mostra notificação toast
function mostrarToast(mensagem, icone = "fa-check-circle") {
    toast.innerHTML = `<i class="fas ${icone}"></i> ${mensagem}`;
    toast.classList.add("ativo");

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove("ativo");
    }, 2800);
}

/* ---------------------------------------------------------
   5. RENDERIZAÇÃO DE PRODUTOS
   --------------------------------------------------------- */
function renderizarProdutos(lista) {
    if (lista.length === 0) {
        produtosGrid.innerHTML = "";
        semProdutos.style.display = "block";
        return;
    }

    semProdutos.style.display = "none";
    produtosGrid.innerHTML = lista.map(produto => `
        <div class="produto-card" data-id="${produto.id}">
            <div class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                ${produto.badge ? `<span class="produto-badge">${produto.badge}</span>` : ""}
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria.replace("-", " ")}</span>
                <h3 class="produto-nome">${produto.nome}</h3>
                <div class="produto-avaliacao">
                    <span class="estrelas">${gerarEstrelas(produto.avaliacao)}</span>
                    <span>${produto.avaliacao.toFixed(1)}</span>
                </div>
                <p class="produto-descricao">${produto.descricao}</p>
                <div class="produto-footer">
                    <div class="produto-preco">
                        ${formatarPreco(produto.preco)}
                        <small>em até 12x</small>
                    </div>
                    <button
                        class="btn-add"
                        data-id="${produto.id}"
                        aria-label="Adicionar ${produto.nome} ao carrinho">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    // Eventos nos botões de adicionar
    document.querySelectorAll(".btn-add").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            adicionarAoCarrinho(id);
        });
    });
}

/* ---------------------------------------------------------
   6. FILTROS
   --------------------------------------------------------- */
function aplicarFiltros() {
    const { categoria, preco, avaliacao } = filtrosAtivos;

    const filtrados = produtos.filter(produto => {
        // Categoria
        if (categoria !== "todos" && produto.categoria !== categoria) return false;

        // Avaliação
        if (produto.avaliacao < avaliacao) return false;

        // Preço
        if (preco !== "todos") {
            const p = produto.preco;
            if (preco === "0-150" && p > 150) return false;
            if (preco === "150-250" && (p < 150 || p > 250)) return false;
            if (preco === "250-400" && (p < 250 || p > 400)) return false;
            if (preco === "400+" && p < 400) return false;
        }

        return true;
    });

    renderizarProdutos(filtrados);
}

filtroCategoria.addEventListener("change", (e) => {
    filtrosAtivos.categoria = e.target.value;
    aplicarFiltros();
});

filtroPreco.addEventListener("change", (e) => {
    filtrosAtivos.preco = e.target.value;
    aplicarFiltros();
});

filtroAvaliacao.addEventListener("change", (e) => {
    filtrosAtivos.avaliacao = parseFloat(e.target.value);
    aplicarFiltros();
});

limparFiltrosBtn.addEventListener("click", () => {
    filtroCategoria.value = "todos";
    filtroPreco.value = "todos";
    filtroAvaliacao.value = "0";
    filtrosAtivos = { categoria: "todos", preco: "todos", avaliacao: 0 };
    aplicarFiltros();
    mostrarToast("Filtros limpos!", "fa-rotate-left");
});

/* ---------------------------------------------------------
   7. CARRINHO
   --------------------------------------------------------- */
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
    mostrarToast(`${produto.nome} adicionado!`, "fa-cart-plus");
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(i => i.id === id);
    if (!item) return;

    item.quantidade += delta;

    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
        return;
    }

    atualizarCarrinho();
}

function calcularTotal() {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

function atualizarCarrinho() {
    // Contador no ícone
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCount.textContent = totalItens;

    // Renderizar itens
    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        carrinhoTotal.textContent = formatarPreco(0);
        return;
    }

    carrinhoItens.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="carrinho-item-info">
                <h4>${item.nome}</h4>
                <span>${formatarPreco(item.preco * item.quantidade)}</span>
                <div class="carrinho-item-controles">
                    <button data-action="menos" data-id="${item.id}">−</button>
                    <span>${item.quantidade}</span>
                    <button data-action="mais" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="btn-remover" data-id="${item.id}" aria-label="Remover item">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join("");

    carrinhoTotal.textContent = formatarPreco(calcularTotal());

    // Eventos dos botões do carrinho
    carrinhoItens.querySelectorAll("[data-action]").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const delta = btn.dataset.action === "mais" ? 1 : -1;
            alterarQuantidade(id, delta);
        });
    });

    carrinhoItens.querySelectorAll(".btn-remover").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            removerDoCarrinho(id);
            mostrarToast("Item removido do carrinho.", "fa-trash");
        });
    });
}

/* ---------------------------------------------------------
   8. ABRIR / FECHAR CARRINHO
   --------------------------------------------------------- */
function abrirCarrinho() {
    carrinhoLateral.classList.add("ativo");
    carrinhoOverlay.classList.add("ativo");
    document.body.style.overflow = "hidden";
}

function fecharCarrinho() {
    carrinhoLateral.classList.remove("ativo");
    carrinhoOverlay.classList.remove("ativo");
    document.body.style.overflow = "";
}

cartIcon.addEventListener("click", abrirCarrinho);
cartIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirCarrinho();
    }
});

fecharCarrinhoBtn.addEventListener("click", fecharCarrinho);
carrinhoOverlay.addEventListener("click", fecharCarrinho);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharCarrinho();
});

/* ---------------------------------------------------------
   9. FINALIZAR COMPRA
   --------------------------------------------------------- */
finalizarCompraBtn.addEventListener("click", () => {
    if (carrinho.length === 0) {
        mostrarToast("Seu carrinho está vazio!", "fa-exclamation-circle");
        return;
    }

    const total = calcularTotal();
    mostrarToast(`Pedido de ${formatarPreco(total)} finalizado! 🎉`, "fa-check-circle");

    carrinho = [];
    atualizarCarrinho();
    setTimeout(fecharCarrinho, 1200);
});

/* ---------------------------------------------------------
   10. NEWSLETTER
   --------------------------------------------------------- */
newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validações básicas
    if (!nome || !email) {
        formMensagem.textContent = "Preencha todos os campos.";
        formMensagem.className = "form-mensagem erro";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMensagem.textContent = "E-mail inválido.";
        formMensagem.className = "form-mensagem erro";
        return;
    }

    // Simula envio (aqui você integraria com backend Python)
    try {
        const resposta = await fetch("http://localhost:5000/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email })
        }).catch(() => null); // Se não houver backend, ignora

        formMensagem.textContent = `Obrigado, ${nome}! Seu cupom de 10% foi enviado para ${email}.`;
        formMensagem.className = "form-mensagem sucesso";
        newsletterForm.reset();
        mostrarToast("Inscrição realizada com sucesso!", "fa-envelope-circle-check");
    } catch (err) {
        formMensagem.textContent = "Erro ao enviar. Tente novamente.";
        formMensagem.className = "form-mensagem erro";
    }
});

/* ---------------------------------------------------------
   11. SCROLL SUAVE (fallback para navegadores antigos)
   --------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;
        const alvo = document.querySelector(href);
        if (alvo) {
            e.preventDefault();
            alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

/* ---------------------------------------------------------
   12. INICIALIZAÇÃO
   --------------------------------------------------------- */
function init() {
    renderizarProdutos(produtos);
    atualizarCarrinho();
    console.log("%c🔥 FORGE SUPPLEMENTS carregado!", "color: #c8ff00; font-weight: bold; font-size: 14px;");
}

init();
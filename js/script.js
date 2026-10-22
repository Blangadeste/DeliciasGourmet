/* ============================================
   PRODUTOS
   ============================================ */
const produtos = {
    salgados: [
        { id: 1, nome: "Shawarma de Frango", preco: 27.00, imagem: "img/shawarma-frango.webp" },
        { id: 2, nome: "Shawarma de Carne", preco: 29.00, imagem: "img/shawarma-carne.webp" },
        { id: 3, nome: "Shawarma Misto", preco: 28.00, imagem: "img/shawarma-misto.webp" },
        { id: 4, nome: "Shawarma Especial", preco: 32.00, imagem: "img/shawarma-especial.webp" },
        { id: 5, nome: "Crepe Francês", preco: 25.00, imagem: null, placeholder: true },
        { id: 6, nome: "Pastel", preco: 12.00, imagem: null, placeholder: true },
        { id: 7, nome: "Churros", preco: 15.00, imagem: null, placeholder: true },
        { id: 8, nome: "Porção de Batata", preco: 18.00, imagem: null, placeholder: true }
    ],
    doces: [
        { id: 9, nome: "Churros Especial", preco: 20.00, imagem: "img/churros.webp" },
        { id: 10, nome: "Crepe Doce", preco: 22.00, imagem: null, placeholder: true },
        { id: 11, nome: "Bolo de Pote", preco: 15.00, imagem: null, placeholder: true },
        { id: 12, nome: "Brownie", preco: 12.00, imagem: null, placeholder: true },
        { id: 13, nome: "Torta de Limão", preco: 18.00, imagem: null, placeholder: true },
        { id: 14, nome: "Pudim", preco: 10.00, imagem: null, placeholder: true },
        { id: 15, nome: "Café Gourmet", preco: 8.00, imagem: null, placeholder: true },
        { id: 16, nome: "Mousse", preco: 12.00, imagem: null, placeholder: true }
    ],
    bebidas: [
        { id: 17, nome: "Refrigerante Lata", preco: 6.00, imagem: null, placeholder: true },
        { id: 18, nome: "Suco Natural", preco: 10.00, imagem: null, placeholder: true },
        { id: 19, nome: "Água Mineral", preco: 4.00, imagem: null, placeholder: true },
        { id: 20, nome: "Café Expresso", preco: 7.00, imagem: null, placeholder: true },
        { id: 21, nome: "Chá Gelado", preco: 8.00, imagem: null, placeholder: true },
        { id: 22, nome: "Vitamina", preco: 12.00, imagem: null, placeholder: true },
        { id: 23, nome: "Milkshake", preco: 18.00, imagem: null, placeholder: true },
        { id: 24, nome: "Água com Gás", preco: 5.00, imagem: null, placeholder: true }
    ]
};

let carrinho = [];

/* ============================================
   ELEMENTOS DOM
   ============================================ */
const gridSalgados = document.getElementById('gridSalgados');
const gridDoces = document.getElementById('gridDoces');
const gridBebidas = document.getElementById('gridBebidas');
const carrinhoContainer = document.getElementById('carrinhoContainer');
const overlay = document.getElementById('overlay');
const abrirCarrinhoBtn = document.getElementById('abrirCarrinho');
const fecharCarrinhoBtn = document.getElementById('fecharCarrinho');
const carrinhoItens = document.getElementById('carrinhoItens');
const totalCarrinho = document.getElementById('totalCarrinho');
const contadorCarrinho = document.getElementById('contadorCarrinho');
const finalizarCompraBtn = document.getElementById('finalizarCompra');

/* ============================================
   RENDERIZAÇÃO DOS PRODUTOS
   ============================================ */
function criarCard(produto) {
    let imagemHTML = '';
    if (produto.imagem) {
        imagemHTML = `<img src="${produto.imagem}" alt="${produto.nome}" onerror="this.parentElement.classList.add('placeholder'); this.remove();">`;
    }
    const classeImagem = produto.placeholder ? 'placeholder' : '';

    return `
        <div class="card-produto">
            <div class="card-imagem ${classeImagem}">${imagemHTML}</div>
            <div class="card-info">
                <h4>${produto.nome}</h4>
                <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
            </div>
        </div>
    `;
}

function renderizarProdutos() {
    if (gridSalgados) gridSalgados.innerHTML = produtos.salgados.map(p => criarCard(p)).join('');
    if (gridDoces) gridDoces.innerHTML = produtos.doces.map(p => criarCard(p)).join('');
    if (gridBebidas) gridBebidas.innerHTML = produtos.bebidas.map(p => criarCard(p)).join('');
}

/* ============================================
   CARRINHO
   ============================================ */
function encontrarProduto(id) {
    return [...produtos.salgados, ...produtos.doces, ...produtos.bebidas].find(p => p.id === id);
}

function adicionarAoCarrinho(id) {
    const produto = encontrarProduto(id);
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) itemExistente.quantidade += 1;
    else carrinho.push({ ...produto, quantidade: 1 });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    if (contadorCarrinho) contadorCarrinho.textContent = totalItens;

    if (carrinhoItens) {
        if (carrinho.length === 0) {
            carrinhoItens.innerHTML = '<p style="text-align: center; color: #999; margin-top: 2rem;">Seu carrinho está vazio</p>';
        } else {
            carrinhoItens.innerHTML = carrinho.map(item => `
                <div class="item-carrinho">
                    <div>
                        <h4>${item.nome}</h4>
                        <span class="preco-item">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                        <span style="font-size: 0.85rem; color: #777;"> (x${item.quantidade})</span>
                    </div>
                    <button class="remover-item" onclick="removerDoCarrinho(${item.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    if (totalCarrinho) totalCarrinho.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerDoCarrinho(id) {
    const index = carrinho.findIndex(item => item.id === id);
    if (index !== -1) {
        if (carrinho[index].quantidade > 1) carrinho[index].quantidade -= 1;
        else carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}

/* ============================================
   ABRIR / FECHAR CARRINHO
   ============================================ */
function abrirCarrinho() {
    carrinhoContainer.classList.add('aberto');
    overlay.classList.add('ativo');
}

function fecharCarrinho() {
    carrinhoContainer.classList.remove('aberto');
    overlay.classList.remove('ativo');
}

/* ============================================
   FINALIZAR COMPRA → ENVIA PARA O KANBAN
   ============================================ */
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio. Adicione alguns produtos!');
        return;
    }

    // Pergunta o nome do cliente
    const cliente = prompt('Qual o seu nome?');
    if (!cliente || !cliente.trim()) {
        alert('É necessário informar o nome para finalizar o pedido.');
        return;
    }

    // Calcula o total
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    // Pega a hora atual
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, '0') + ':' +
                 String(agora.getMinutes()).padStart(2, '0');

    // Monta o pedido no formato do Kanban
    const novoPedido = {
        id: Date.now(),
        cliente: cliente.trim(),
        itens: carrinho.map(i => ({
            nome: i.nome,
            qtd: i.quantidade,
            preco: i.preco
        })),
        hora: hora
    };

    // Salva no localStorage
    const pedidosSalvos = JSON.parse(localStorage.getItem('pedidosKanban') || '[]');
    pedidosSalvos.push(novoPedido);
    localStorage.setItem('pedidosKanban', JSON.stringify(pedidosSalvos));

    // Feedback ao cliente
    alert(`Pedido enviado com sucesso!\n\nCliente: ${cliente.trim()}\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\nAguarde que já vamos preparar! 😋`);

    // Limpa o carrinho
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
if (abrirCarrinhoBtn) abrirCarrinhoBtn.addEventListener('click', abrirCarrinho);
if (fecharCarrinhoBtn) fecharCarrinhoBtn.addEventListener('click', fecharCarrinho);
if (overlay) overlay.addEventListener('click', fecharCarrinho);
if (finalizarCompraBtn) finalizarCompraBtn.addEventListener('click', finalizarCompra);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharCarrinho();
});

/* ============================================
   CARROSSEL DE BANNERS
   ============================================ */
const slides = document.querySelectorAll('.slide');
const indicadores = document.querySelectorAll('.indicador');
const TEMPO_SLIDE = 10000; // 10 segundos
let slideAtual = 0;
let intervalCarrossel;

function irParaSlide(index) {
    slides.forEach(s => s.classList.remove('ativo'));
    indicadores.forEach(i => i.classList.remove('ativo'));

    if (slides[index]) slides[index].classList.add('ativo');
    if (indicadores[index]) indicadores[index].classList.add('ativo');

    slideAtual = index;
}

function proximoSlide() {
    const proximo = (slideAtual + 1) % slides.length;
    irParaSlide(proximo);
}

function iniciarCarrossel() {
    if (slides.length === 0) return; // não faz nada se não houver slides
    clearInterval(intervalCarrossel);
    intervalCarrossel = setInterval(proximoSlide, TEMPO_SLIDE);
}

// Clique nas bolinhas
indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
        irParaSlide(index);
        iniciarCarrossel();
    });
});

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
renderizarProdutos();
atualizarCarrinho();
iniciarCarrossel();
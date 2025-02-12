function criarProduto(event) {
    event.preventDefault();
    const dados = {};
    const ids = ['id', 'nome', 'categoria' , 'descricao' , 'quantidade' , 'preco' , 'imagem'];

    for (const id of ids) {
        const elementoHTML = document.getElementById(id);
        const valor = elementoHTML.value;
        dados[id] = valor;
    }
    
    let produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos == null ) {
        produtosSalvos = '[]';
    }
    const lista = JSON.parse(produtosSalvos);
    const nomes = lista.map((item) => item.nome)
    if (nomes.includes(dados.nome)) {
        alert('Produto já cadastrado')
    } else {
        lista.push(dados);
        const listaJSON = JSON.stringify(lista);
        localStorage.setItem('produtos', listaJSON)
        alert(`O produto ${dados.nome} foi cadastrado com sucesso`)
    }

    const form = document.getElementById('form');
    form.reset();

    const inputId = document.getElementById('id');
    inputId.value = parseInt(inputId.value) + 1;

    renderizarProdutos();
}

function renderizarProdutos () {
    let produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos == null ) {
        produtosSalvos = '[]';
    }
    const lista = JSON.parse(produtosSalvos);

    const display = document.getElementById('display');
    display.innerHTML = ' ';
    for (const produto of lista) {
        
        let cardHTML = `<div class="col">
                    <div class="card">
                        ${produto.id}
                        <img style="max-height: 128px; object-fit: contain;" src="${produto.imagem}" class="card-img-top" alt="imagem do produto" />
                        <div class="card-body">
                            <h5 class="card-title">${produto.categoria}</h5>
                            <p class="card-text">${produto.nome}</p>
                            <p class="card-text">${produto.descricao}</p>
                            <footer class="d-flex justify-content-between align-items-center">
                                <div class="controls">
                                    <button data_id="${produto.id}" onclick="excluir(event)" class="btn rounded-full btn-danger">
                                        -
                                    </button>
                                    <button data_id="${produto.id}" class="btn rounded-full btn-secondary" onclick='carregarDadosProduto(event)'>
                                        <svg data_id="${produto.id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path data_id="${produto.id}" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                            </svg>
                                    </button>
                                </div>
                                <p class="card-text fs-4 fw-bold mb-0">R$ ${produto.preco}</p>
                                <p class="card-text border border-dark p-2 rounded-circle">${produto.quantidade}</p>
                            </footer>
                        </div>
                    </div>
                </div>`;
    display.innerHTML += cardHTML;
    }
}

renderizarProdutos();

function carregarDadosProduto(event) {
    const id = event.target.getAttribute('data_id');
    const alterarProduto = localStorage.getItem('produtos');
    const alterarDados = JSON.parse(alterarProduto);
    const produto = alterarDados.find(Dados => Dados.id == id);

    const campos = ['id', 'nome', 'categoria' , 'descricao' , 'quantidade' , 'preco' , 'imagem'];

    for (const campo of campos) {
        const elementoHTML = document.getElementById(campo);
        elementoHTML.value = produto[campo];
    }    
} 

function salvarAlteracoes(event) {
    event.preventDefault();
    const dados = {};
    const ids = ['id', 'nome', 'categoria' , 'descricao' , 'quantidade' , 'preco' , 'imagem'];

    for (const id of ids) {
        const elementoHTML = document.getElementById(id);
        const valor = elementoHTML.value;
        dados[id] = valor;
    }

    let produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos == null ) {
        produtosSalvos = '[]';
    }

    const lista = JSON.parse(produtosSalvos);
    const posicao = lista.findIndex((produto) => produto.id == dados.id);
    lista[posicao] = dados;
    localStorage.setItem('produtos', JSON.stringify(lista));
    renderizarProdutos();
}

function excluir(event) {
    const id = event.target.getAttribute('data_id');
    const produtosSalvosJSON =localStorage.getItem('produtos');
    const produtos = JSON.parse(produtosSalvosJSON);

    const produtosFiltrados = produtos.filter((produto) => produto.id != id);
    localStorage.setItem('produtos', JSON.stringify(produtosFiltrados));
    renderizarProdutos();
}
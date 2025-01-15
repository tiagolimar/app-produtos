function criar(event){
    event.preventDefault();

    const dados = {}
    const ids = ['nome','categoria','descricao','preco','quantidade','imagem']

    for (const id of ids){
        const elementoHTML = document.getElementById(id)
        const valor = elementoHTML.value
        dados [id] = valor;
    }

    let produtosSalvos = localStorage.getItem('produtos');
    
    if (produtosSalvos == null){
        produtosSalvos = '[]';
    }

    const produtos = JSON.parse(produtosSalvos);

    produtos.push(dados);

    produtosSalvos = JSON.stringify(produtos);

    localStorage.setItem('produtos', produtosSalvos);
    carregarProdutos();
}

function carregarProdutos(){
    const secaoProdutos = document.getElementById('secao-produtos');
    secaoProdutos.innerHTML = '';

    let produtosSalvos = localStorage.getItem('produtos');
    
    if (produtosSalvos == null){
        produtosSalvos = '[]';
    }

    const produtos = JSON.parse(produtosSalvos);

    for (const produto of produtos){
        secaoProdutos.innerHTML += `
        <div class="col">
            <div class="card h-100 ">
                <img style="max-height: 128px; object-fit: contain;" src="${produto.imagem}" class="card-img-top" alt="imagem do produto" />
                <div class="card-body d-flex justify-content-between ">
                    <h5 class="card-title">${produto.categoria}</h5>
                    <p class="card-text">${produto.nome}</p>
                    <p class="card-text">${produto.descricao}</p>
                    <footer class="d-flex justify-content-between align-items-center">
                        <div class="controls">
                            <button class="btn rounded-full btn-danger">
                                -
                            </button>
                            <button class="btn rounded-full btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                            </button>
                        </div>
                        <p class="card-text fs-4 fw-bold mb-0">R$ ${produto.preco}</p>
                        <p class="card-text border border-dark p-2 rounded-circle">${produto.quantidade}</p>
                    </footer>
                </div>
            </div>
        </div>  
        `;
    }
}

carregarProdutos();
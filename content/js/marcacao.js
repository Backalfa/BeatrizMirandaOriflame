
// Carregamento inicial com diferença na categoria Unhas
function loadServices(categoria) {
    fetch('Precos.txt')
        .then(response => response.text())
        .then(text => {
            let data = JSON.parse(text);
            let services;

            console.log("Categoria selecionada:", categoria);

            //Altera o "display" para o próximo
            let serviceList = document.getElementById('serviceList');
            let content = document.getElementById('content');

            serviceList.innerHTML = '';
            content.style.display = 'none';
            serviceList.style.display = 'block';

            // Adiciona o botão de voltar
            serviceList.innerHTML += `
                <button class='w3-button w3-block w3-light-grey' type='button' onclick='goBack()' style='margin-bottom: 20px; width: 50px; height: 50px;'>
                    <img src="./content/imgs/back-button.png" alt="back" width="100%">
                </button>
            `;

            // Se a categoria for "Unhas", exibe os botões de tamanho (Outros, S, M, L e XL)
            if (categoria.toLowerCase() === 'unhas') {
                serviceList.innerHTML += `
                    <div class="size-selection">
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" > Outros </button><br/>
                        </div>
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="loadServicesBySize('S')"> S </button><br/>
                        </div>
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="loadServicesBySize('M')"> M </button><br/>
                        </div>
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="loadServicesBySize('L')"> L </button><br/>
                        </div>
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="loadServicesBySize('XL')"> XL </button><br/>
                        </div>
                    </div>
                `;
            } else {

                // Se não for "Unhas", filtra e exibe os serviços da categoria normalmente
                services = Object.values(data).filter(service => service.classe === categoria);

                console.log("Serviços encontrados:", services); // Debugging: Mostra os serviços filtrados

                // Gera o HTML para exibir os serviços e preços
                services.forEach(service => {
                    let serviceItem = `
                        <div class="service-item">
                            <div class="center card shadow-3 rd-3" style="text-align: center;">
                                <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="loadcard('${service.nome}', '${categoria}')">
                                    <span style="float: left">${service.nome}</span>
                                    <span style="float: right">${service.preco}€</span>
                                </button><br/>
                            </div>
                        </div>
                    `;
                    serviceList.innerHTML += serviceItem;  // Adiciona o serviço à lista
                });

                // Se não houver serviços, mostre uma mensagem. Ou seja, tem ERRO!
                if (services.length === 0) {
                    serviceList.innerHTML += "<p>Nenhum serviço disponível para esta categoria.</p>";
                }
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
        });
}

//Carregamento para filtrar por Tamanho.
function loadServicesBySize(size) {
    fetch('Precos.txt')  // Carrega o arquivo TXT
        .then(response => response.text())  // Obtém o conteúdo como texto
        .then(text => {
            let data = JSON.parse(text);  // Converte o texto em JSON

            // Filtra apenas serviços das classes "Gel" e "Acrílico" e pelo tamanho selecionado
            let services = Object.values(data).filter(service => 
                (service.classe === 'Gel' || service.classe === 'Acrílico') &&
                (
                    (size === 'S' && service.preco && service.preco !== "00.00") || 
                    (size === 'M' && service.precom && service.precom !== "00.00") || 
                    (size === 'L' && service.precol && service.precol !== "00.00") || 
                    (size === 'XL' && service.precoxl && service.precoxl !== "00.00")
                )
            );

            let serviceList = document.getElementById('serviceList');

            // Limpa a lista de serviços anterior (mantendo o botão de voltar)
            serviceList.innerHTML = `
                <button class='w3-button w3-block w3-light-grey' type='button' onclick='goBack()' style='margin-bottom: 20px; width: 50px; height: 50px;'>
                    <img src="./content/imgs/back-button.png" alt="back" width="100%">
                </button>
            `;

            // Verifique se os serviços estão disponíveis
            console.log("Serviços encontrados para o tamanho", size, ":", services); // Debugging

            // Gera o HTML para exibir os serviços e preços
            services.forEach(service => {
                let price = (size === 'S') ? service.preco :
                            (size === 'M') ? service.precom :
                            (size === 'L') ? service.precol :
                            service.precoxl;

                let serviceItem = `
                    <div class="service-item">
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="loadcard('${service.nome}', '${service.classe}', '${size}')">
                                <span style="float: left">(${size})${service.nome}</span>
                                <span style="float: center">${service.classe}</span>
                                <span style="float: right">${price}€</span>
                            </button><br/>
                        </div>
                    </div>
                `;
                serviceList.innerHTML += serviceItem;  // Adiciona o serviço à lista
            });

            // Se não houver serviços, mostre uma mensagem
            if (services.length === 0) {
                serviceList.innerHTML += "<p>Nenhum serviço disponível para este tamanho.</p>";
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
        });
}

function loadcard(servicename, categoria, size) {
    fetch('Precos.txt')
        .then(response => response.text())
        .then(text => {
            let data = JSON.parse(text);

            // Busca o serviço correto baseado no nome e na categoria
            let selectedService = Object.values(data).find(service => 
                service.nome === servicename && service.classe === categoria
            );

            let price;
            // Seleciona o preço com base no tamanho escolhido
            if (size === 'S') {
                price = selectedService.preco;
            } else if (size === 'M') {
                price = selectedService.precom;
            } else if (size === 'L') {
                price = selectedService.precol;
            } else if (size === 'XL') {
                price = selectedService.precoxl;
            } else {
                price = selectedService.preco;
            }

            if (selectedService) {
                // Salva o serviço selecionado no localStorage
                localStorage.setItem('selectedService', JSON.stringify({
                    nome: selectedService.nome,
                    categoria: selectedService.classe,
                    preco: price,
                    referencia: selectedService.ref
                }));

                console.log("Serviço salvo no localStorage:", selectedService);

                if (categoria == 'Gel' || categoria == 'Acrílico' || categoria == 'Outros'){
                    loadNailArtServices(size);
                } 

            } else {
                console.error("Serviço não encontrado.");
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
        });
}

//Carregamento para adicionar componentes Nail Art
function loadNailArtServices(size) {
    fetch('Precos.txt')
        .then(response => response.text())
        .then(text => {
            let data = JSON.parse(text);

            let services = Object.values(data).filter(service => service.classe === 'Nail Art');

            let serviceList = document.getElementById('serviceList');

            // Limpa a lista de serviços anterior
            serviceList.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <button class='w3-button w3-block w3-light-grey' type='button' onclick='loadServicesBySize("${size}")' style='margin-bottom: 20px; width: 50px; height: 50px;'>
                        <img src="./content/imgs/back-button.png" alt="back" width="100%">
                    </button>
                    <button class="w3-button w3-block w3-light-grey" type="button" onclick='finalshoop()' style="margin-bottom: 20px; width: 50px; height: 50px; float: right;">
                        <img src="./content/imgs/back-button.png" alt="back" width="100%" style="transform: rotate(180deg);">
                    </button>
                </div>
            `;

            // Verifique se os serviços estão disponíveis
            console.log("Serviços Nail Art encontrados:", services);

            // Gera o HTML para exibir os serviços e preços
            services.forEach(service => {
                let serviceItem = `
                    <div class="service-item">
                        <div class="center card shadow-3 rd-3" style="text-align: center;">
                            <button type="submit" class="w3-button w3-block w3-light-grey" style="width:100%; cursor:pointer;" onclick="AddNailSave('${service.nome}', '${service.preco}', this)">
                                <span style="float: left">${service.nome}</span>
                                <span style="float: right">${service.preco}€</span>
                            </button><br/>
                        </div>
                    </div>
                `;
                serviceList.innerHTML += serviceItem;
            });

            // Se não houver serviços, mostre uma mensagem
            if (services.length === 0) {
                serviceList.innerHTML += "<p>Nenhum serviço disponível na categoria Nail Art.</p>";
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
        });
}

function saveProductToLocalStorage(nomeServico, preco) {
    // Recupera os produtos existentes no localStorage
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Adiciona o novo produto à lista
    selectedProducts.push({ nome: nomeServico, preco: preco });

    // Salva a lista atualizada no localStorage
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}

function finalshoop() {
    let total = 0;
    let tabelaConteudo = ''; // String que irá armazenar o conteúdo HTML da tabela

    // Seleciona todos os botões com a classe 'buythis'
    const buttons = document.querySelectorAll('button.buythis');

    let selectedProducts = []; // Lista de produtos selecionados para armazenar no localStorage

    if (buttons.length > 0) {
        // Itera sobre cada botão para somar os preços e adicionar à tabela
        buttons.forEach(button => {
            // Obtém o nome e o preço do serviço
            const nomeServico = button.querySelector('span[style="float: left"]').innerText;
            const priceText = button.querySelector('span[style="float: right"]').innerText;
            const priceValue = parseFloat(priceText.replace('€', '').trim()); // Remove o símbolo de euro e converte para número

            // Se o preço for válido, soma ao total e adiciona à tabela
            if (!isNaN(priceValue)) {
                total += priceValue;
                tabelaConteudo += `
                    <tr>
                        <td>${nomeServico}</td>
                        <td>${priceValue.toFixed(2)}€</td>
                    </tr>`;

                // Adiciona o produto à lista de produtos selecionados
                selectedProducts.push({ nome: nomeServico, preco: priceValue });
            }
        });
    }

    // Busca o serviço selecionado no localStorage
    const selectedService = JSON.parse(localStorage.getItem('selectedService'));

    // Se o serviço existir, adiciona o preço ao total e à tabela
    if (selectedService && selectedService.preco) {
        const localStoragePrice = parseFloat(selectedService.preco);
        if (!isNaN(localStoragePrice)) {
            total += localStoragePrice;
            tabelaConteudo += `
                <tr>
                    <td>${selectedService.nome}</td>
                    <td>${localStoragePrice.toFixed(2)}€</td>
                </tr>`;

            // Adiciona o serviço selecionado ao array
            selectedProducts.push({ nome: selectedService.nome, preco: localStoragePrice });
        }
    }

    // Salva a lista de produtos no localStorage
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

    // Adiciona o total à tabela
    tabelaConteudo += `
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>${total.toFixed(2)}€</strong></td>
        </tr>`;

    // Adiciona o botão de limpar o selectedService do LocalStorage e recarregar a página
    tabelaConteudo += `
        <tr>
            <td colspan="2" style="text-align: center;">
                <button onclick="clearSelectedServiceAndRefresh()" style="padding: 10px 20px; background-color: red; color: white; border: none; cursor: pointer;">
                    Limpar Serviço Selecionado e Recarregar
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center;">
                <button onclick="goBackToMenu()" style="padding: 10px 20px; background-color: green; color: white; border: none; cursor: pointer;">
                    Adicionar mais produtos
                </button>
            </td>
        </tr>`;

    // Atualiza o conteúdo da tabela no HTML
    const tabelaElement = document.getElementById('tabela-servicos');
    tabelaElement.innerHTML = `
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                ${tabelaConteudo}
            </tbody>
        </table>`;

    // Torna a tabela visível (remove o display: none)
    document.getElementById('tabela-container').style.display = 'block';

    // Oculta o elemento com id="serviceList"
    document.getElementById('serviceList').style.display = 'none';
}

// Função para limpar o LocalStorage e recarregar a página
function clearSelectedServiceAndRefresh() {
    localStorage.removeItem('selectedService');  // Remove o serviço selecionado
    localStorage.removeItem('selectedProducts'); // Limpa os produtos
    window.location.reload(); // Recarrega a página
}

// Função para voltar ao menu de produtos
function goBackToMenu() {
    // Recarrega a página
    location.reload();
}

function AddNailSave(nome, preco, buttonElement) {
    // Aplica estilo ao botão clicado
    if (buttonElement) {
        // Verifica se o botão já tem a classe 'buythis'
        if (buttonElement.classList.contains('buythis')) {
            // Se já tiver a classe, remove-a e restaura o estilo original
            buttonElement.classList.remove('buythis');
            buttonElement.classList.add('w3-light-grey'); // Restaura a classe original
            buttonElement.style.backgroundColor = ''; // Remove a cor de fundo
            buttonElement.style.color = ''; // Remove a cor do texto
        } else {
            // Se não tiver a classe, aplica o estilo para 'buythis'
            buttonElement.classList.remove('w3-light-grey');
            buttonElement.classList.add('buythis');

            // Define o estilo do botão clicado
            buttonElement.style.backgroundColor = 'green'; // Define a cor de fundo para verde
            buttonElement.style.color = 'white'; // Define a cor do texto para branco
        }
    }


    let produtosExistentes = JSON.parse(localStorage.getItem('produtos')) || [];
    
    // Adiciona o novo produto à lista de produtos existentes
    produtosExistentes.push(buttonElement);
    
    // Atualiza o localStorage com o novo array de produtos
    localStorage.setItem('produtos', JSON.stringify(produtosExistentes));
    
    // Atualiza a interface com o novo produto
    renderSavedProducts([buttonElement]);
}

function goBack() {
    document.getElementById('serviceList').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

// Função para carregar os produtos salvos do LocalStorage

function loadProductsFromLocalStorage() {
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    let tabelaConteudo = '';
    let total = 0;

    // Gera o conteúdo da tabela com base nos produtos armazenados
    selectedProducts.forEach(product => {
        tabelaConteudo += `
            <tr>
                <td>${product.nome}</td>
                <td>${product.preco.toFixed(2)}€</td>
            </tr>`;
        total += product.preco;
    });

    // Adiciona o total à tabela
    tabelaConteudo += `
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>${total.toFixed(2)}€</strong></td>
        </tr>`;

    // Exibe a tabela no HTML
    const tabelaElement = document.getElementById('tabela-servicos');
    tabelaElement.innerHTML = `
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                ${tabelaConteudo}
            </tbody>
        </table>`;

    // Exibe a tabela e oculta a lista de serviços
    document.getElementById('tabela-container').style.display = 'block';
    document.getElementById('serviceList').style.display = 'none';
}

function renderSavedProducts(produtos) {
    produtos.forEach(produto => {
        // Aqui você renderiza os produtos já salvos
        // Adicione cada produto na tabela ou onde você exibe os produtos
        console.log('Produto salvo:', produto);
        // Exemplo de como adicionar na interface
        // document.getElementById('listaProdutos').innerHTML += `<div>${produto.nome} - ${produto.preco}</div>`;
    });
}


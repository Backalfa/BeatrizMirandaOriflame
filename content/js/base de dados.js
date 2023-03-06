function createInterface(ref) {
    $.ajax({
        url: 'Base.txt',
        type: 'GET',
        success: function(data) {
            var produtos = JSON.parse(data);
            var html = '';
            var quantidade = '';
            var venda = '';
            var prom = '';
            
            if (produtos[ref]) {
                // Adicionar informações do produto
                html += '<p><span style="font-size: smaller;">Ref: ' + produtos[ref].ref + '</span><br />';
                html += produtos[ref].nome + '<br />';
                
                // Verificar quantidade do produto
                if (produtos[ref].quantidade === '0') {
                    // Produto esgotado
                    venda = '<span class="w3-tag" style="position: absolute; top: 0;left:0;">Vendido!</span>';
                } else {
                    // Adicionar quantidade do produto
                    quantidade = produtos[ref].quantidade;
                }

                // Verificar se o produto está em desconto
                if(produtos[ref].preco != produtos[ref].preconovo){
                    prom = '<span class="w3-tag w3-display-topleft" style="background-color: rgb(255, 0, 0);">Promoção</span>';
                    // falta meter o preco em promoção
                    html += '<s>' + produtos[ref].preco + '€</s><b><span style="color:rgb(255, 0, 0); margin-left: 5%;">' + produtos[ref].preconovo + '€</span></b>';
                }else{
                    html += '<b>' + produtos[ref].preco + '€</b></p>';
                }
            }

            // Adicionar HTML à página
            $('#produtos-'+ref).html(html);
            $('#quantidade-'+ref).html(quantidade);
            $('#venda-'+ref).html(venda);
            $('#prom-'+ref).html(prom);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}


// Quando aparecer vendido sai o preço
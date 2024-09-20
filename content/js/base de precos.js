function createInterfacePreco(ref) {
    $.ajax({
        url: 'Precos.txt',
        type: 'GET',
        success: function(data) {
            var produtos = JSON.parse(data);
            if (produtos[ref]) {
                
                $('#nome-' + ref).text(produtos[ref].nome);
                $('#preco-' + ref).text(produtos[ref].preco + '€');
                $('#preco-' + ref + '-m').text(produtos[ref].precom + '€');
                $('#preco-' + ref + '-l').text(produtos[ref].precol + '€');
                $('#preco-' + ref + '-xl').text(produtos[ref].precoxl + '€');
            } else {
                console.log('Referência ' + ref + ' não encontrada.');
            }
        },
        error: function(xhr, status, error) {
            console.log('Erro ao carregar dados: ' + error);
        }
    });
}
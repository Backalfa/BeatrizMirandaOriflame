function createInterface() {
    var idpai = document.getElementById("quantidade").parentNode.parentNode.parentNode.id;
        $.ajax({
            url: 'Base.txt',
            type: 'GET',
            success: function(data) {
                var produtos = JSON.parse(data);
                var html = '';

                // Adicionar informações de produto
                for (var produto in produtos) {
                    html += '<p> <span style="font-size: smaller;">Ref: ' + produtos[produto].ref + '</span><br />';
                    html += produtos[produto].nome + '<br />';
                    html += '<b>' + produtos[produto].preco + '</b></p>';
                }

                var quantidade = '';
                for (var produto in produtos) {
                    quantidade += produtos[produto].quantidade;
                }

                // Adicionar HTML à página
                $('#produtos').html(html);
                $('#quantidade').html(quantidade);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
}

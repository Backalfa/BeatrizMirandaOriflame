function filtro(){
    let Selectproduto = document.getElementById("produto").value;

    console.log(Selectproduto+" produto");

    if(Selectproduto == 0){
        window.open("Index.html", "_self");
    }else if (Selectproduto == 1){
        window.open("perfumes_value=0.html", "_self");
    }else if(Selectproduto == 2){
        window.open("cremes_value=0.html", "_self");
    }else if(Selectproduto == 3){
        window.open("conjuntos_value=0.html", "_self");
    }else if(Selectproduto == 4){
        window.open("acessorios_value=0.html", "_self");
    }else if(Selectproduto == 5){
        window.open("maquilhagem_value=0.html", "_self");
    }else if(Selectproduto == 6){
        window.open("cabelo_value=0.html", "_self");
    }else if(Selectproduto == 7){
        window.open("promocoes_value=0.html", "_self");
    }
}

function count(){
    let classname = document.getElementsByClassName("w3-container").length;
    let itens = classname - 4;

    console.log(itens);
    document.getElementById("countitens").innerHTML = itens + " itens";

}

function cremeswap(){
    let Selectproduto = document.getElementById("creme").value;

    console.log(Selectproduto+" creme");

    if(Selectproduto == 0){
        window.open("genero0produto2.html", "_self");
    }else if (Selectproduto == 1){
        window.open("cremes_value=1.html", "_self");
    }else if(Selectproduto == 2){
        window.open("cremes_value=2.html", "_self");
    }
}

function ref(){


}
let carrinho = [];

function adicionarCarrinho(nome){
 carrinho.push(nome);
 atualizarCarrinho();
}

function atualizarCarrinho(){
 document.getElementById("qtd").innerText = carrinho.length;
 
 let lista = document.getElementById("listaCarrinho");

 if (!lista) return;

 lista.innerHTML = "";

 carrinho.forEach((item,index) => {
  lista.innerHTML += `
   <li>
    ${item}
    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">✖</button>
   </li>
  `;
 });
}

function removerItem(index) {
 carrinho.splice(index,1);
 atualizarCarrinho();
}  

function abrirCarrinho() {
 let div = document.getElementById("carrinho");

 if (div.style.right === "0px") {
   div.style.right = "-300px";
 } else {
   div.style.right = "0px";
 }
}

function finalizarPedido(){
 let mensagem = "Olá, quero pedir: \n" + carrinho.join("\n");

 let url = "https://wa.me/5544999999999?text=" + encodeURIComponent(mensagem);
 window.open(url, "_blank");
}

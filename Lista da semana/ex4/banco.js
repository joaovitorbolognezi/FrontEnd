function calcular() {
  var bandeira  = document.getElementById("bandeira");
  var valor     = Number(document.getElementById("valor").value);
  var parcelas  = Number(document.getElementById("parcelas").value);
  var resultado = document.getElementById("resultado");

  if (valor <= 0 || isNaN(valor)) {
    resultado.style.display = "block";
    resultado.innerHTML = "Informe um valor válido.";
    return;
  }

  var taxaBandeira = 0;
  switch (bandeira.value) {
    case "visa":   taxaBandeira = 0.02;   break;
    case "master": taxaBandeira = 0.0185; break;
    case "elo":    taxaBandeira = 0.03;   break;
  }

  var valorTaxa    = valor * taxaBandeira;
  var valorJuros   = valor * (0.0035 * parcelas);
  var taxaMensal   = 12.50 * parcelas;
  var valorTotal   = valor + valorTaxa + valorJuros + taxaMensal;
  var valorParcela = valorTotal / parcelas;

  resultado.style.display = "block";
  resultado.innerHTML =
    "<strong>Resumo da Venda</strong><br>" +
    "Valor da Taxa (" + bandeira.options[bandeira.selectedIndex].text + "): R$ " + valorTaxa.toFixed(2) + "<br>" +
    "Valor dos Juros: R$ " + valorJuros.toFixed(2) + "<br>" +
    "Taxa Mensal (R$ 12,50 x " + parcelas + "): R$ " + taxaMensal.toFixed(2) + "<br>" +
    "Valor Total: R$ " + valorTotal.toFixed(2) + "<br>" +
    "Valor de cada Parcela (" + parcelas + "x): R$ " + valorParcela.toFixed(2);
}

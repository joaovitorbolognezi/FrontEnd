document.getElementById("btnCalcular").addEventListener("click", function() {
  var nome  = document.getElementById("nome").value;
  var nota1 = Number(document.getElementById("nota1").value);
  var nota2 = Number(document.getElementById("nota2").value);
  var nota3 = Number(document.getElementById("nota3").value);

  var resultado = document.getElementById("resultado");

  if (nome === "") {
    resultado.textContent = "Informe o nome do aluno.";
    resultado.style.color = "black";
    return;
  }

  var media = (nota1 + nota2 + nota3) / 3;
  var texto = "";
  var cor   = "";

  if (media >= 7.0) {
    texto = nome + " — Média: " + media.toFixed(2) + " — Aprovado";
    cor   = "blue";
  } else if (media >= 4.0) {
    var faltam = 10 - media;
    texto = nome + " — Média: " + media.toFixed(2) + " — Em Exame (faltam " + faltam.toFixed(2) + " para 10)";
    cor   = "green";
  } else {
    texto = nome + " — Média: " + media.toFixed(2) + " — Reprovado";
    cor   = "red";
  }

  resultado.textContent = texto;
  resultado.style.color = cor;
});

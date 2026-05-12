function validarCPF() {
  var cpf = document.getElementById("cpf").value;
  var resultado = document.getElementById("resultado");

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    resultado.textContent = "CPF inválido";
    resultado.style.color = "red";
    return;
  }

  var sequenciasIguais = true;
  for (var i = 1; i < 11; i++) {
    if (cpf[i] !== cpf[0]) {
      sequenciasIguais = false;
      break;
    }
  }
  if (sequenciasIguais) {
    resultado.textContent = "CPF inválido";
    resultado.style.color = "red";
    return;
  }

  var soma = 0;
  for (var i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }
  var resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== Number(cpf[9])) {
    resultado.textContent = "CPF inválido";
    resultado.style.color = "red";
    return;
  }

  soma = 0;
  for (var i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== Number(cpf[10])) {
    resultado.textContent = "CPF inválido";
    resultado.style.color = "red";
    return;
  }

  resultado.textContent = "CPF válido";
  resultado.style.color = "green";
}

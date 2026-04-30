function revelar() {
  document.querySelector("img").src = "img/_vinicius_junior.png";

  const nomeEl = document.getElementById("Nome");
  nomeEl.firstChild.textContent = "Vinícius José Paixão de Oliveira Júnior ";
  nomeEl.classList.remove("placeholder-glow");

  const rank = document.getElementById("Rank");
  rank.textContent = "9,5";
  rank.classList.remove("placeholder");
  rank.classList.add("card-text");

  const dados = {
    "Data_Nas": "12/07/2000 (25 anos)",
    "Altura": "1,76 m",
    "Posição": "Ponta-esquerda / Atacante"
  };

  for (const [id, valor] of Object.entries(dados)) {
    const el = document.getElementById(id);
    el.textContent = valor;
    el.classList.remove("placeholder");
    el.classList.add("card-text");
  }

  document.querySelector(".placeholder-glow")?.classList.remove("placeholder-glow");
}
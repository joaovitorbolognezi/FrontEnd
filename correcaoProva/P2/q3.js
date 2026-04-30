let alternado = false;

function trocarGrupos() {
  const divs = document.querySelectorAll("div");

  if (!alternado) {
    divs[0].innerHTML = `
      <h1>🅳 Grupo D</h1>
      <h2>Seleções</h2>
      <ul>
        <li>Estados Unidos</li>
        <li>Paraguai</li>
        <li>Austrália</li>
        <li>Turquia</li>
      </ul>
      <details>Fatos: Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios.</details>
    `;

    divs[1].innerHTML = `
      <h1>🅴 Grupo E</h1>
      <h2>Seleções</h2>
      <ul>
        <li>Alemanha</li>
        <li>Equador</li>
        <li>Costa do Marfim</li>
        <li>Curaçao</li>
      </ul>
      <details>Fatos: Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes.</details>
    `;

    divs[2].innerHTML = `
      <h1>🅵 Grupo F</h1>
      <h2>Seleções</h2>
      <ul>
        <li>Holanda</li>
        <li>Japão</li>
        <li>Tunísia</li>
        <li>Suécia</li>
      </ul>
      <details>Fatos: Holanda e Japão já fizeram confrontos interessantes em Copas. Suécia costuma ser forte fisicamente.</details>
    `;

    alternado = true;
  } else {
    location.reload();
  }
}
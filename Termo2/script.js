// CONFIGURAÇÕES DO JOGO
const PALAVRA_SECRETA = "DACIO"; // Altere para a palavra que quiser
const MAX_TENTATIVAS = 6;
const TAMANHO_PALAVRA = 5;

let linhaAtual = 0;
let colunaAtual = 0;
let palpiteAtual = "";
let jogoFinalizado = false;

// 1. CAPTURAR ENTRADAS DO TECLADO FÍSICO
window.addEventListener("keydown", (evento) => {
    if (jogoFinalizado) return;

    const tecla = evento.key.toUpperCase();

    if (tecla === "ENTER") {
        validarPalpite();
    } else if (tecla === "BACKSPACE") {
        apagarLetra();
    } else if (tecla.length === 1 && tecla >= "A" && tecla <= "Z") {
        inserirLetra(tecla);
    }
});

// 2. CAPTURAR ENTRADAS DO TECLADO VIRTUAL (<wc-kbd>)
// Espera os componentes carregarem na tela
window.addEventListener("DOMContentLoaded", () => {
    const tecladoComponent = document.querySelector("wc-kbd");
    if (tecladoComponent && tecladoComponent.shadowRoot) {
        // Seleciona todos os botões de dentro do Shadow DOM do teclado
        const botoes = tecladoComponent.shadowRoot.querySelectorAll("button");
        botoes.forEach(botao => {
            botao.addEventListener("click", () => {
                if (jogoFinalizado) return;
                
                // Extrai o nome da tecla pelo ID (ex: kbd_q -> Q)
                const idTecla = botao.id.replace("kbd_", "").toUpperCase();
                
                if (idTecla === "ENTER") {
                    validarPalpite();
                } else if (idTecla === "BACKSPACE") {
                    apagarLetra();
                } else {
                    inserirLetra(idTecla);
                }
            });
        });
    }
});

// 3. FUNÇÃO PARA INSERIR LETRA NO TABULEIRO
function inserirLetra(letra) {
    if (colunaAtual >= TAMANHO_PALAVRA) return;

    const quadrado = obterQuadrado(linhaAtual, colunaAtual);
    if (quadrado) {
        quadrado.textContent = letra;
        quadrado.classList.remove("empty");
        
        // Ativa a animação de digitação do CSS original
        quadrado.classList.add("ontype");
        setTimeout(() => quadrado.classList.remove("ontype"), 150);

        palpiteAtual += letra;
        colunaAtual++;
        
        atualizarCursor();
    }
}

// 4. FUNÇÃO PARA APAGAR LETRA
function apagarLetra() {
    if (colunaAtual <= 0) return;

    colunaAtual--;
    palpiteAtual = palpiteAtual.slice(0, -1);

    const quadrado = obterQuadrado(linhaAtual, colunaAtual);
    if (quadrado) {
        quadrado.textContent = "";
        quadrado.classList.add("empty");
    }
    
    atualizarCursor();
}

// 5. VALIDAÇÃO DAS CORES (VERDE, AMARELO, CINZA)
function validarPalpite() {
    if (palpiteAtual.length !== TAMANHO_PALAVRA) {
        exibirNotificacao("A palavra deve ter 5 letras!");
        balançarLinha();
        return;
    }

    let copiaSecreta = PALAVRA_SECRETA.split("");
    let statusLetras = Array(TAMANHO_PALAVRA).fill("wrong"); // 'wrong' é a classe cinza no seu CSS

    // Primeiro passo: Encontrar os Verdes (Posição Exata)
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        if (palpiteAtual[i] === PALAVRA_SECRETA[i]) {
            statusLetras[i] = "right"; // 'right' é a classe verde no seu CSS
            copiaSecreta[i] = null;
        }
    }

    // Segundo passo: Encontrar os Amarelos (Posição Incorreta)
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        if (statusLetras[i] !== "right") {
            const index = copiaSecreta.indexOf(palpiteAtual[i]);
            if (index !== -1) {
                statusLetras[i] = "place"; // 'place' é a classe amarela no seu CSS
                copiaSecreta[index] = null;
            }
        }
    }

    // Aplicar as cores nos quadradinhos e atualizar o teclado visual
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        const quadrado = obterQuadrado(linhaAtual, i);
        if (quadrado) {
            quadrado.classList.remove("empty", "edit");
            quadrado.classList.add(statusLetras[i]);
            pintarTecladoVirtual(palpiteAtual[i], statusLetras[i]);
        }
    }

    // Verificar condições de vitória ou derrota
    if (palpiteAtual === PALAVRA_SECRETA) {
        exibirNotificacao("Genial! 🎉");
        jogoFinalizado = true;
        removerTodosCursores();
    } else if (linhaAtual >= MAX_TENTATIVAS - 1) {
        exibirNotificacao(`Fim de jogo! Palavra: ${PALAVRA_SECRETA}`);
        jogoFinalizado = true;
        removerTodosCursores();
    } else {
        // Avançar o jogo para a próxima linha
        linhaAtual++;
        colunaAtual = 0;
        palpiteAtual = "";
        atualizarCursor();
    }
}

// =================================================================
// FUNÇÕES AUXILIARES PARA MAPEAR O SHADOW DOM
// =================================================================

// Navega com precisão pelos nós escondidos do Shadow DOM para achar a letra
function obterQuadrado(linha, coluna) {
    const board = document.querySelector("wc-board");
    if (!board || !board.shadowRoot) return null;

    const rows = board.shadowRoot.querySelectorAll("wc-row");
    const rowAlvo = rows[linha];
    if (!rowAlvo || !rowAlvo.shadowRoot) return null;

    return rowAlvo.shadowRoot.querySelector(`.letter[lid="${coluna}"]`);
}

// Atualiza a bordinha inferior (classe .edit) que indica onde o usuário está digitando
function atualizarCursor() {
    removerTodosCursores();
    if (jogoFinalizado || colunaAtual >= TAMANHO_PALAVRA) return;
    
    const quadradoAtual = obterQuadrado(linhaAtual, colunaAtual);
    if (quadradoAtual) {
        quadradoAtual.classList.add("edit");
    }
}

function removerTodosCursores() {
    const board = document.querySelector("wc-board");
    if (!board || !board.shadowRoot) return;

    board.shadowRoot.querySelectorAll("wc-row").forEach(row => {
        if (row.shadowRoot) {
            row.shadowRoot.querySelectorAll(".letter").forEach(letra => {
                letra.classList.remove("edit");
            });
        }
    });
}

// Pinta as teclas do painel de baixo para ajudar o jogador
function pintarTecladoVirtual(letra, status) {
    const teclado = document.querySelector("wc-kbd");
    if (!teclado || !teclado.shadowRoot) return;

    const botao = teclado.shadowRoot.getElementById(`kbd_${letra.toLowerCase()}`);
    if (!botao) return;

    // Se já for verde, não altera a cor por amarelo ou cinza subsequente
    if (botao.classList.contains("right")) return;
    if (botao.classList.contains("place") && status === "wrong") return;

    botao.classList.remove("place", "wrong");
    botao.classList.add(status);
}

// Faz a linha tremer se faltar letras (Usa a animação 'rownope' do seu CSS)
function balançarLinha() {
    const board = document.querySelector("wc-board");
    if (!board || !board.shadowRoot) return;

    const row = board.shadowRoot.querySelectorAll("wc-row")[linhaAtual];
    if (row && row.shadowRoot) {
        const holdDiv = row.shadowRoot.host; 
        holdDiv.style.animation = "0.75s ease-in-out rownope";
        setTimeout(() => holdDiv.style.animation = "", 750);
    }
}

// Utiliza o componente nativo <wc-notify> do seu HTML para criar os pop-ups azuis
function exibirNotificacao(texto) {
    const notify = document.querySelector("wc-notify");
    if (!notify || !notify.shadowRoot) {
        alert(texto); // Fallback caso o componente falhe
        return;
    }
    const msgDiv = notify.shadowRoot.getElementById("msg");
    if (msgDiv) {
        notify.textContent = texto;
        msgDiv.style.animation = "0.25s linear popup forwards";
        
        // Some após 3 segundos automaticamente
        setTimeout(() => {
            msgDiv.style.animation = "0.25s linear popup reverse forwards";
        }, 3000);
    }
}
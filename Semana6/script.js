const bicho = document.getElemen	tById("bicho");
const btn = document.getElementById("btn");

const estados = {
    normal: "criatura_fofa.png",
    clicando: "criatura_comendo.png",
    alimentando: "criatura_coracoes.png",
    fome30: "criatura_brava.png",
    fome60: "criatura_morta.png",
};

let contador = 0;
let intervalo = null;
let time_Click = null;
let time_Out = null;

function init_cont() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        contador++;
        console.log("Tempo: ", contador);

        if (contador == 30) bicho.src = estados.fome30;
        if (contador == 60) bicho.src = estados.fome60;
    }, 1000);
}

function alimentar() {
    console.log("comendo");
    contador = 0; // reseta o contador de fome

    if (time_Click) clearTimeout(time_Click);

    bicho.src = estados.clicando;

    time_Click = setTimeout(() => {
        bicho.src = estados.alimentando;

        time_Out = setTimeout(() => {
            bicho.src = estados.normal;
        }, 2000);
    }, 1000);
}

init_cont();
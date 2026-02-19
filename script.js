const celulas = document.querySelectorAll('.celula');
const modal = document.getElementById('modal-ganhador');
const mensagemVitoria = document.getElementById('mensagem-vitoria');
const botaoNovoJogo = document.getElementById('novo-jogo');
const botaoReiniciar = document.getElementById('reiniciar');

let vezDoX = true;
let jogoAtivo = true;

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function tocarJogada(e) {
    const celula = e.target;
    if (celula.innerText !== "" || !jogoAtivo) return;

    const jogadorAtual = vezDoX ? "X" : "O";
    celula.innerText = jogadorAtual;

    if (checarVitoria(jogadorAtual)) {
        finalizarJogo(jogadorAtual);
    } else if (checarEmpate()) {
        finalizarJogo("Empate");
    } else {
        vezDoX = !vezDoX;
    }
}

function checarVitoria(jogador) {
    return combinacoesVitoria.some(comb => {
        return comb.every(index => celulas[index].innerText === jogador);
    });
}

function checarEmpate() {
    return [...celulas].every(c => c.innerText !== "");
}

function finalizarJogo(resultado) {
    jogoAtivo = false;
    mensagemVitoria.innerText = resultado === "Empate" ? "Deu Velha! 👵" : `O Jogador ${resultado} Venceu! 🎉`;
    modal.classList.remove('escondido');
}

function reiniciar() {
    celulas.forEach(c => c.innerText = "");
    vezDoX = true;
    jogoAtivo = true;
    modal.classList.add('escondido');
}

celulas.forEach(c => c.addEventListener('click', tocarJogada));
botaoReiniciar.addEventListener('click', reiniciar);
botaoNovoJogo.addEventListener('click', reiniciar);


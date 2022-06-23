const deck = [
    {
        name:"facebook",
        img:'img/facebook.png',
    },
    {
        name:"android",
        img:'img/android.png',
    },
    {
        name:"chrome",
        img:'img/chrome.png',
    },
    {
        name:"firefox",
        img:'img/firefox.png',
    },
    {
        name:"html5",
        img:'img/html5.png',
    },
    {
        name:"googleplus",
        img:'img/googleplus.png',
    },
    {
        name:"twitter",
        img:'img/twitter.png',
    },
    {
        name:"windows",
        img:'img/windows.png',
    },
    {
        name:"facebook",
        img:'img/facebook.png',
    },
    {
        name:"android",
        img:'img/android.png'
    },
    {
        name:"chrome",
        img:'img/chrome.png',
    },
    {
        name:"firefox",
        img:'img/firefox.png',
    },
    {
        name:"html5",
        img:'img/html5.png',
    },
    {
        name:"googleplus",
        img:'img/googleplus.png',
    },
    {
        name:"twitter",
        img:'img/twitter.png',
    },
    {
        name:"windows",
        img:'img/windows.png',
    }
];

deck.sort(() => {
    return 0.5 - Math.random();
});

const tabuleiro = document.querySelector("#tabuleiro");
const pontuacao = document.querySelector("#pontuacao");
const btn = document.querySelector("#btnIniciar");
let inicio;
let escolhidas = [];
let tempoCronometrado;
let temposCronometrados = [];
let pontos;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//  ouvir btn, se clicado, libera os addEventListener
$(btn).click(function () {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.addEventListener("click", virarCarta));
});


function criarTabuleiro(){
    pontos = 0;
    pontuacao.innerHTML = pontos;
    for(let i=0; i<= deck.length; i++){
        let divCarta = document.createElement("div");
        divCarta.className = "card";
        divCarta.id = i;
        divCarta.setAttribute("data-framework", deck[i].name);

        let carta = document.createElement("img");
        carta.className = "cardFront";
        carta.nome = deck[i].name;
        carta.src = deck[i].img;

        let cartaVerso = document.createElement("img");
        cartaVerso.className = "cardBack";
        cartaVerso.src = "img/cross.png";
        
        divCarta.appendChild(carta);
        divCarta.appendChild(cartaVerso);
        tabuleiro.appendChild(divCarta);
    }
}
function virarCarta(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    validaCarta();
}

function validaCarta(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? countCards() : unflipCards();
}

function countCards(){
    firstCard.src = "img/white.png";
    secondCard.src = "img/white.png";
    pontos++;
    pontuacao.innerHTML = pontos;
    disableCards();
}

function disableCards() {
    firstCard.removeEventListener("click", virarCarta);
    secondCard.removeEventListener("click", virarCarta);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);  
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    setTimeout(() =>{
        if(pontos == deck.length/2){
            windows.alert("Fim de Jogo!\nVocê ganhou!")
        }
    }, 1000);
}

function tempoDecorrido() {
    var fim = Date.now();
    var tempo = fim - inicio;
    alert("fim de jogo, o tempo foi de: " + tempo);
    temposCronometrados.push(tempo);
    temposCronometrados.sort();
    melhorTempo();
  }
  
function melhorTempo() {
    let tempos = document.createElement("div");
    localStorage.setItem("itens", JSON.stringify(temposCronometrados));
    tempos.innerHTML = JSON.parse(localStorage.getItem("itens"));
    document.getElementsByClassName("tempos").appendChild(tempos);
}
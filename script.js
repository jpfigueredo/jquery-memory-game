const deck = [
    {
        nome:"facebook",
        img:'img/facebook.png',
    },
    {
        nome:"android",
        img:'img/android.png',
    },
    {
        nome:"chrome",
        img:'img/chrome.png',
    },
    {
        nome:"firefox",
        img:'img/firefox.png',
    },
    {
        nome:"html5",
        img:'img/html5.png',
    },
    {
        nome:"googleplus",
        img:'img/googleplus.png',
    },
    {
        nome:"twitter",
        img:'img/twitter.png',
    },
    {
        nome:"windows",
        img:'img/windows.png',
    },
    {
        nome:"facebook",
        img:'img/facebook.png',
    },
    {
        nome:"android",
        img:'img/android.png'
    },
    {
        nome:"chrome",
        img:'img/chrome.png',
    },
    {
        nome:"firefox",
        img:'img/firefox.png',
    },
    {
        nome:"html5",
        img:'img/html5.png',
    },
    {
        nome:"googleplus",
        img:'img/googleplus.png',
    },
    {
        nome:"twitter",
        img:'img/twitter.png',
    },
    {
        nome:"windows",
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
        // $(carta).click(function () {
        //     $(carta).fadeOut(2000, function(){
        //         $this.css('border', 'solid red 2px');
        //     });
        //     $(carta).fadeIn(2000, function(){
        //         $this.css('border', 'solid red 2px');
        //     });
        // });
    });


function criarTabuleiro(){
    pontos = 0;
    pontuacao.innerHTML = pontos;
    setTimeout(() => {
        for(let i=0; i<= deck.length; i++){
            let divCarta = document.createElement("div");
            divCarta.className = "card";

            let carta = document.createElement("img");
            carta.className = "cardFront";
            carta.nome = deck[i].nome;
            carta.src = deck[i].img;

            let cartaVerso = document.createElement("img");
            cartaVerso.className = "cardBack";
            cartaVerso.src = "img/cross.png";
            
            divCarta.appendChild(carta);
            divCarta.appendChild(cartaVerso);
            
            tabuleiro.appendChild(divCarta);

            divCarta.classList.toggle(`data-framework=${deck[i].nome}`);
        }

    }, 500);
}
function virarCarta(){
    this.classList.toggle('flip');

    if(!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else{
        hasFlippedCard = false;
        secondCard = this;
    }

    if(firstCard.dataset.framework === secondCard.dataset.framework){
        firstCard.removeEventListener("click", virarCarta);
        secondCard.removeEventListener("click", virarCarta);

    }else{
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1500);
    }
    escolherCarta();
}

function escolherCarta(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", virarCarta);
    secondCard.removeEventListener("click", virarCarta);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      lockBoard = false;
    }, 1500);  
}

function tempoDecorrido() {
    var fim = Date.now();
    var tempo = fim - inicio;
    alert("fim de jogo, o tempo foi de: " + tempo);
    temposCronometrados.push(tempo);
    temposCronometrados.sort();
    listaMelhorTempo();
  }
  
function listaMelhorTempo() {
    let tempos = document.createElement("div");
    localStorage.setItem("itens", JSON.stringify(temposCronometrados));
    tempos.innerHTML = JSON.parse(localStorage.getItem("itens"));
    document.getElementsByClassName("tempos").appendChild(tempos);
}
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

function criarTabuleiro(){
    pontos = 0;
    pontuacao.innerHTML = pontos;
    setTimeout(() => {
        for(let i=0; i < deck.length; i++){
            let carta = document.createElement("img");
            carta.id = i;
            carta.nome = deck[i].nome;
            carta.src = "img/cross.png";
            tabuleiro.appendChild(carta);
        }
    }, 500);
}

//  ouvir btn, se clicado, libera os addEventListener
$(btn).click(function () {
    for (let i = 0 ; i <= deck.length ; i++) {
        let carta = document.querySelector('img');
        carta.addEventListener("click", escolherCarta);
        // $(card).click(function () {
        //     $(carta).fadeOut(2000, function(){
        //         $this.css('border', 'solid red 2px');
        //     });
        //     $(carta).fadeIn(2000, function(){
        //         $this.css('border', 'solid red 2px');
        //     });
        // });
    }

});


function escolherCarta(){
    let carta = this;
    carta.src = deck[carta.id].img;
    escolhidas.push(carta);

    if(escolhidas.length == 2){
        setTimeout(() => {
            let carta1 = escolhidas[0];
            let carta2 = escolhidas[1];
            if(carta1.nome === carta2.nome){
                carta1.src = "img/white.png";
                carta2.src = "img/white.png";
                carta1.removeEventListener("click", escolherCarta);
                carta2.removeEventListener("click", escolherCarta);
                pontos++;
                pontuacao.innerHTML = pontos;
            }else{
                carta1.src = 'img/cross.png';
                carta2.src = 'img/cross.png';
            }

            if(pontos == deck.length/2){
                tempoDecorrido();
                window.alert("Você ganhou!");
                deck.innerHTML = "";
                criarTabuleiro();
            }
            escolhidas = [];
        }, 1000);
    }
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
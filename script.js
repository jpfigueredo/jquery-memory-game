var imagens = ['img/facebook.png','img/android.png','img/chrome.png','img/firefox.png','img/html5.png','img/googleplus.png','img/twitter.png','img/windows.png','img/cross.png'];

const deck = [
    {
        nome:"facebook",
        img:'img/facebook.png'
    },
    {
        nome:"android",
        img:'img/android.png'
    },
    {
        nome:"chrome",
        img:'img/chrome.png'
    },
    {
        nome:"firefox",
        img:'img/firefox.png'
    },
    {
        nome:"html5",
        img:'img/html5.png'
    },
    {
        nome:"googleplus",
        img:'img/googleplus.png'
    },
    {
        nome:"twitter",
        img:'img/twitter.png'
    },
    {
        nome:"windows",
        img:'img/windows.png'
    },
    {
        nome:"facebook",
        img:'img/facebook.png'
    },
    {
        nome:"android",
        img:'img/android.png'
    },
    {
        nome:"chrome",
        img:'img/chrome.png'
    },
    {
        nome:"firefox",
        img:'img/firefox.png'
    },
    {
        nome:"html5",
        img:'img/html5.png'
    },
    {
        nome:"googleplus",
        img:'img/googleplus.png'
    },
    {
        nome:"twitter",
        img:'img/twitter.png'
    },
    {
        nome:"windows",
        img:'img/windows.png'
    }
];

deck.sort(() => {
    return 0.5 - Math.random();
});

const tabuleiro = document.querySelector("#tabuleiro");
let escolhidas = [];

const pontuacao = document.querySelector("#pontuacao");
let pontos;

function criarTabuleiro(){
    pontos = 0;
    pontuacao.innerHTML = pontos;
    for(let i=0; i < deck.length; i++){
        let carta = document.createElement("img");
        carta.id = i;
        carta.nome = deck[i].nome;
        carta.src = "img/cross.png";
        
        carta.addEventListener("click", escolherCarta);

        tabuleiro.appendChild(carta);
    }
}

function escolherCarta(){
    let carta = this;
    carta.src = deck[carta.id].img;
    escolhidas.push(carta);

    if(escolhidas.length == 2){
        setTimeout(() => {
            let carta1 = escolhidas[0];
            let carta2 = escolhidas[1];
            if(carta1.name == carta2.name){
                carta1.src = "img/white.png";
                carta2.src = "img/white.png";
                carta1.removeEventListener("click", escolherCarta);
                carta2.removeEventListener("click", escolherCarta);
                pontos++;
                pontuacao.innerHTML = pontos;
            }else{
                carta1.src = "img/cross.png";
                carta2.src = "img/cross.png";
            }
        },1000);
        
        if(pontos == deck.length/2){
            window.alert("Você ganhou!");
            tabuleiro.innerHTML = "";
            criarTabuleiro();
        }

    }
}
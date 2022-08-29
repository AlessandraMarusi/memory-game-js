
const grid = document.getElementById("main-grid");
const wonAlert = document.querySelector(".won-alert")
const lostAlert = document.querySelector(".lost-alert")

const cardsNumber = 12; /* TO CHANGE NUMBER OF CARDS */
const countdownSeconds = 59 /* TO CHANGE COUNTDOWNS SECONDS */
const flipAllCardsTime = 1500 /* TO CHANGE HOW LONG THE CARDS COLORS ARE SHOWN AT THE BEGINNING. IN MS */

var colors = [];
var flippedCards = [];
var deck = []; /* made of colors */
var cards = []; /* array of card elements */
var correctMatches = 0;
var timer = 0;

document.onload = startGame()

/* Check if cards number is not even*/
if(cardsNumber % 2 != 0){
    console.log("Cards number must be even to play the game")
    /* To add if you want to let the user decide how many cards to play with */
}

function startGame(){
    grid.innerHTML = ""
    wonAlert.classList.remove('show-alert')
    lostAlert.classList.remove('show-alert')
    correctMatches = 0;

    countdown()

    generateColors()
    
    generateDeck()
    
    generateCards()

    flipAllCards()
}

function generateColors(){
    let i = 0;
    colors = [];
        while(i < cardsNumber/2){
        const color = randomColor();
        /* check colors copies */
        if(colors.includes(color)){
            console.log("colore già presente")
        }
        else{
            colors.push(color);
            i++
        }
    }
}
function generateDeck(){
    /* deck made by couples of colors */
    deck = [...colors, ...colors];
    /* deck shuffling */
    deck.sort(function() {
        return 0.5 - Math.random();
    });
}
function generateCards(){
    for(i = 0; i < cardsNumber; i++){
        const card = document.createElement('div');
        card.classList.add('card');
    
        const front = document.createElement('div');
        front.classList.add('card-front');
        
    
        const back = document.createElement('div');
        back.classList.add('card-back');
    
        const text = document.createElement('span')
        text.classList.add('card-text');
        text.innerHTML = `${i+1}`
    
        card.appendChild(front).appendChild(text)
        card.appendChild(back)
    
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
    const cardBacks = document.getElementsByClassName('card-back')
    cards = document.getElementsByClassName('card');
    for(let i = 0; i < cardBacks.length; i++){
        cardBacks[i].style.backgroundColor = `#${deck[i]}`;
        cards[i].setAttribute('data-color', deck[i]);
    }
}
/* Generate RANDOM COLOR */
function randomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

function flipAllCards(){
    var timeShow = flipAllCardsTime
    for(el of cards){
        console.log(el)
        el.classList.add('rotate')
    }
    setTimeout(function() {
        for(el of cards){
            console.log(el)
            el.classList.remove('rotate')
        }
        
    }, timeShow);

}

function flipCard() {
    this.classList.add('rotate');
    
    flippedCards.push(this);
    if (flippedCards.length > 1){
        checkForMatch();
    }
}

function checkForMatch(){
    removeCardFlipEvent(cards); /* To prevent card flipping during animation */
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    const card1Color = card1.getAttribute('data-color');
    const card2Color = card2.getAttribute('data-color');
    const matchImg = document.querySelector(".match-img");

    if(card1Color == card2Color){
        console.log("MATCH!")
        matchImg.classList.add('img-slide');
        setTimeout(function() {
            card1.classList.add('matched');
            card2.classList.add('matched');
            correctMatches++;
            checkForWin();
            
        }, 700);

        
        setTimeout(function() {
            matchImg.classList.remove('img-slide')
            
        }, 1000);
        
        
    }
    else {
        setTimeout(function() {
            card1.classList.remove("rotate");
            card2.classList.remove("rotate");
        }, 700);
    }

    setTimeout(function(){
        addCardFlipEvent(cards);
    }, 700);
    flippedCards = [];
}

function checkForWin(){
    if(correctMatches == cardsNumber/2){
        youWon();
        countdown(1);
    }
}

function removeCardFlipEvent(cards){
    for(const el of cards){
        el.removeEventListener('click', flipCard);
    }
}

function addCardFlipEvent(cards) {
    for(const el of cards){
        el.addEventListener('click', flipCard);

    }
}

function countdown(check){
    var sec = countdownSeconds;
    if(check == 1){
        clearInterval(timer)
        return
    }
    timer = setInterval(function(){
        document.getElementById('countdown-timer').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            youLost();
        }
    }, 1000);
    
    
}

function youLost(){
    console.log("HAI PERSO")
    grid.innerHTML = ""
    lostAlert.classList.add('show-alert')
    const lostBtn = document.querySelector(".lost-btn")
    lostBtn.addEventListener('click', startGame)

}

function youWon(){
    console.log("HAI VINTO")
    grid.innerHTML = ""
    wonAlert.classList.add('show-alert')
    wonBtn = document.querySelector(".won-btn")
    wonBtn.addEventListener('click', startGame)
}
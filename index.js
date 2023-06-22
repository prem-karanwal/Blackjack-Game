let player= {
    name : "Chips",
    chips: 200
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name+": $"+player.chips

function startGame() {
    isAlive = true
    playerEl.textContent = player.name+": $"+(player.chips-10)
    player.chips -= 10
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let dealerFirstCard = getRandomCard()
    let dealerSecondCard = getRandomCard()
    cards =[firstCard,  secondCard]
    dealer = [dealerFirstCard, dealerSecondCard]
    sum= firstCard+secondCard
    document.getElementById("myBtn").disabled = true;
    renderGame()
    
}

function getRandomCard(){
    let i = Math.floor(Math.random()*13)+1
    if(i >10)
       return 10
    else if(i==1)
        return 11
    else return i
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for(let i=0; i<cards.length; i++){
        cardsEl.textContent += cards[i] + " "
    }
    
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        document.getElementById("myBtn3").disabled = true;
        document.getElementById("myBtn2").disabled = true;
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
        document.getElementById("myBtn2").disabled = true;
        document.getElementById("myBtn3").disabled = true;
    }
    messageEl.textContent = message
}


function newCard() {
    if(sum<21){
    let card = getRandomCard()
    sum += card
    cards.push(card)
    console.log(cards)
    renderGame()
    }
}

function tryAgain(){
    document.getElementById("myBtn").disabled = false;
    document.getElementById("myBtn2").disabled = false;
    document.getElementById("myBtn3").disabled = false;
    cardsEl.textContent = "Cards: "
    sum = 0
    sumEl.textContent = "Sum: " 
    messageEl.textContent = "Want to play a round?"
}

function showCard(){
    sumEl.textContent= "Dealer's Cards: "+ dealer[0] + " " + dealer[1]
    document.getElementById("myBtn2").disabled = true;
    if(sum > (dealer[0] + dealer[1])  ){
        messageEl.textContent = "Congrats, You won"
        document.getElementById("myBtn3").disabled = true;
        playerEl.textContent = player.name+": $"+(player.chips+30)
        player.chips += 30
        
    }
    else if(sum === (dealer[0] + dealer[1])){
        messageEl.textContent = "It's a Tie"
    }
    else if(sum<21 && (dealer[0] + dealer[1])==21 ){
        playerEl.textContent = player.name+": $"+(player.chips+10)
        player.chips += 10
    }
    else {
        messageEl.textContent = "You Lose, Better Luck Next Time"
        playerEl.textContent = player.name+": $"+(player.chips-10)
        player.chips -= 10
        document.getElementById("myBtn3").disabled = true;
    }
}
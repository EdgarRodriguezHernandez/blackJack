
(() => {
    'use strict'

    /*
    +2C = Two of Clubs (Tréboles)
    *2D = Two of Diamonds 
    *2H = Two of hearts
    *2S = Two of SpadeS
    */

    let deck = [];//Array cards

    const letterType = ['C', 'D', 'H', 'S'];//Types of cards

    const specialCards = ['A', 'J', 'Q', 'K'];

    let playerPoints = 0;
    let pcPoints = 0;

    //Reference//

    //buttons
    const btnGive = document.querySelector('#btnGive');
    const btnStop = document.querySelector('#btnStop');
    const btnNew = document.querySelector('#btnNew');

    //cards
    const divPlayerCards = document.querySelector('#player-cards');
    const divPcCards = document.querySelector('#pc-cards');

    //Points on html
    const htmlPoints = document.querySelectorAll('small');


    const createDeck = () =>{//this arrow function create a new deck

        for(let i = 2; i <= 10; i++){//card 1 it's 2, max num 10 Clubs

            for(let tipes of letterType){//Deck letter cards

                deck.push(i + tipes);

            }

        }

        for(let tipes of letterType){//Deck special cards

            for(let spe of specialCards){

                deck.push (spe + tipes);

            }
        }

        deck = _.shuffle(deck);//mixin cards

        //console.log(deck);//control deck mixin

        return deck;
    }


    createDeck();


    //This function to give a card

    const giveCard = () =>{

        if(deck.length === 0){
            throw 'Non cards in deck'; //out cards
        }
        
        const deckCard = deck.pop();//Remove last element of card 

        //console.log(deck);
        //console.log(deckCard)

        return deckCard;

    }




    //Take card
    const cardValue = (deckCard) => {

        const valor = deckCard.substring(0, deckCard.length - 1);//take out letter, 0 position -1 end letter
            
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10 : valor * 1;

        /*let points = 0;
        if(isNaN(valor)){//Evaluation of number
                
            points = (valor === 'A') ? 11 : 10;//ternary operator, if it is an A it returns 11 points

        }else{

            points = valor * 1;

        }*/
        

    }

    /////PC turn

    const pcTurn = (minimumPoints) =>{//points player objective

        do{//minimum once

            
            const deckCard = giveCard();

            pcPoints = pcPoints + cardValue(deckCard);
        
            //console.log(playerPoints)//control
            
            htmlPoints[1].innerText = pcPoints;//position of pc 1
        
            //<img class="bj-card" src="cards/3C.png"></img>
            const imgCard = document.createElement('img');//img cards
            imgCard.src = `assets/cards/${deckCard}.png`;//Select random card of dll
            imgCard.classList.add('bj-card');//add class css
            divPcCards.append(imgCard);//agree IMG CARD

            if(playerPoints > 21){
                break;
            }

        }while((pcPoints < minimumPoints) && (minimumPoints <= 21));


        setTimeout(() => {//show the cards first and then the message

            //message of games
            if(pcPoints === minimumPoints && pcPoints === playerPoints){//
                alert('Nobody wins');
        
            }else if(minimumPoints > 21){
                alert('Win the house'); 
        
            }else if(pcPoints > 21){
                alert('You wins');
            }else{
                alert('Win the house');
            }
            
        }, 20);//20ms
    }


    //Events
    btnGive.addEventListener('click', () =>{//Give card on click
        
        const deckCard = giveCard();

        playerPoints = playerPoints + cardValue(deckCard);

        //console.log(playerPoints)//control
        
        htmlPoints[0].innerText = playerPoints;

        //<img class="bj-card" src="cards/3C.png"></img>
        const imgCard = document.createElement('img');//img cards
        imgCard.src = `assets/cards/${deckCard}.png`;//Select random card of dll
        imgCard.classList.add('bj-card');//add class css
        divPlayerCards.append(imgCard);//agree IMG CARD


        //points parts
        if(playerPoints > 21 ){

            //lock buttoms
            btnGive.disabled = true;
            btnStop.disabled = true;

            pcTurn(playerPoints);//Call turn pc
            

        }else if (playerPoints === 21){

            //lock buttoms
            btnGive.disabled = true;//Button out
            btnStop.disabled = true;

            pcTurn(playerPoints);
        }
    });

    btnStop.addEventListener('click', () =>{
        //lock buttoms
        btnGive.disabled = true; 
        btnStop.disabled = true;

        pcTurn(playerPoints);

    });

    btnNew.addEventListener('click', ()  => {


        deck = [];
        deck = createDeck();

        playerPoints = 0;
        pcPoints = 0;
        
        //Recording, it's array of ponints
        htmlPoints[0].innerText = 0; 
        htmlPoints[1].innerText = 0; 

        //delet cards
        divPcCards.innerHTML = '';
        divPlayerCards.innerHTML = '';

        //enable buttoms
        btnGive.disabled = false;
        btnStop.disabled = false;

        
    });

})();

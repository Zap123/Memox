(function MemoX(window) {
    'use strict';
    /*FIXME:  Segnapunti*/
    /*FIXME: Cronometro*/

//    var music = new Audio('Sounds/bgmusic.ogg'),
       var board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
                 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        uncovered = 0,
        ready = true,
        listener = null,
        lastCard = [];
    
    var cardTpl = function(TPL,cardName) {
        var template = TPL.format(cardName, cardName);
        return template;
    }
    
    var shuffleArray = function(array){
        for (var i = array.length -1; i >0; i--){
            var j= Math.floor(Math.random() * (i+1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp
        }
        return array;
    }

    var makeCards = function(context, TPL) {
        board = shuffleArray(board);
        for(var i=0; i<board.length; i++) {
           context.innerHTML+=cardTpl(TPL,board[i]);
        } 
    };

    
    function Game() {
        var match = document.getElementById("cardsSet"),
            TPL =   document.getElementById("cardTemplate").innerHTML;
  //      music.play();
        makeCards(match, TPL);
    }

    Game.NUM_OF_CARDS = 20;
   

    var setFixed = function(card){
        card.className="fixed";
        card.removeChild(card.childNodes[1]);
        card.onclick = null;
    };
    
    var checkRules = function(card){
                if(lastCard.id == card.id){
                    setFixed(card);
                    setFixed(lastCard);
                }
                else{
                    card.classList.toggle("flipped");
                    lastCard.classList.toggle("flipped");
                }
                card.removeEventListener("transitionend", listener,false);
                uncovered=0;
                ready=true;
    };

    Game.flipCard = function(card){
        if (lastCard!==card && uncovered <2 && ready){
            card.classList.toggle("flipped");
            uncovered++;
            if(uncovered==2){
                ready=false;
                listener = function() {checkRules(card)};
                card.addEventListener("transitionend", listener,false);
            }
            else{
                lastCard = card;
            }
        }
    };

    String.prototype.format = function(){ 
          var args = arguments;
          return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
                      ? args[number]
                      : match;
            });
    };
    
    window.Game=Game;

})(window)

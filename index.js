
 //declaring the ai image that will pop up, a variable:
 let aiPick = document.querySelector(".aipick-image > img");
 //FUNCTION that will output computer's pick
 function computerPlay(pick) {

     let array = ["rock", "paper", "scissors"];
     pick = array[Math.floor(Math.random() * array.length)];
     //adding picture:  
     if (pick === "rock") {
         aiPick.src = "images/ai-rock1.jpg";
         aiPick.classList.add("ai-img");
     } else if (pick === "paper") {
         aiPick.src = "images/ai-paper1.jpg";
         aiPick.classList.add("ai-img");
     } else {
         aiPick.src = "images/ai-scissors1.jpg";
         aiPick.classList.add("ai-img");
     }
     return pick;
 }


 //making roundResult global: 
 let roundResult = document.querySelector('.round-container > h2');
 //making the scores global: 
 let humanScore = +(document.querySelector('.humanscore').textContent);
 let aiScore = +(document.querySelector('.aiscore').textContent);

 //FUNCTION that plays a single round:
function oneRound(pcSelect, playerSelect) {

    pcSelect = computerPlay();
    playerSelect = playerPick;

    if (pcSelect === playerSelect) {
        roundResult.innerHTML = (`DRAW. <br> Human selected ${playerSelect}. <br> A.I selected ${pcSelect}.`);

    } else if ((playerSelect === "rock" && pcSelect === "scissors") || (playerSelect === "paper" &&
            pcSelect === "rock") || (playerSelect === "scissors" && pcSelect === "paper")) {
        roundResult.innerHTML = (`YOU WIN. <br> Human selected: ${playerSelect}. <br> A.I selected: ${pcSelect}`);
        //adding 1 in the scoreboard for humanscore if they win
        document.querySelector('.humanscore').textContent = ++humanScore;

    } else {
        roundResult.innerHTML = (`YOU LOSE. <br> Human selected ${playerSelect}. <br> A.I selected ${pcSelect}`);
        //adding 1 in the scoreboard for aiscore 
        document.querySelector('.aiscore').textContent = ++aiScore;

    }
}


 //transitions: 
 function addAiTransform(ai) {
     ai = aiPick;

     ai.classList.add('ai-img-pressed');

     setTimeout(function () {
         ai.classList.remove('ai-img-pressed');
     }, 300);
 }

 //Adding Click Event Listeners to each pic: 
 const images = document.querySelectorAll('.pic');

 //Making playerPick global:
 let playerPick;

//player input: 
  let input = prompt("What's the total score you want to play up to?");
  while (isNaN(input) || input === null) {
      input = prompt("Try again. What's the total score you want to play up to?");
  }
  
 //FUNCTION to run the full game0
 function fullGame(e) {

     playerPick = e.target.id; //or instead of e.target.id, image.id works too
     oneRound();
     addAiTransform();
     console.log(`HUMAN: ${humanScore} AI: ${aiScore}`);

     if (humanScore == input && aiScore == input) {
         document.querySelector('.outcome > h2').textContent = "GAME OVER! The result is a tie!";
         endGame();
          } else if (humanScore == input && humanScore > aiScore) {
              document.querySelector('.outcome > h2').textContent = "GAME OVER! You BEAT the Computer! 🤺🧠";
              endGame();
          } else if (aiScore == input && aiScore > humanScore) {
              document.querySelector('.outcome > h2').textContent = "GAME OVER! The Computer beat You! 🖱💻💾";
              endGame();
          }
     }

 //adding event listeners: 
 images.forEach((image) => {
     image.addEventListener("click", fullGame);

 });

 //function ending the game and stopping scoreboard, removing transitions etc... 
 function endGame() {
     //removing event listeners: 
     images.forEach((image) => {
         image.removeEventListener("click", fullGame);
     });

     //removing transitions: 
     images.forEach((image) => {
         image.classList.remove('pic');
     });

     //creating play again button:
     let playButton = document.createElement('BUTTON');
     playButton.textContent = "PLAY AGAIN?"; 
     document.querySelector('.play-again').appendChild(playButton); 
     playButton.classList.add('play-btn'); 
     //reload game/refresh page when button clicked
     playButton.addEventListener("click", () => {
         location.reload(); 
     });
 }



 //login? Alert user to enter name and edit it on title and scoreboard?

window.addEventListener('DOMContentLoaded', () => {
   const modal =  document.querySelector('#modal');
   const player1NameInput = document.querySelector('#player1-name-input');
   const player2NameInput = document.querySelector('#player2-name-input');
   const player1Name = document.querySelector('#player1-name');
   const player2Name = document.querySelector('#player2-name');
   const player1Points = document.querySelector('#player1-points');
   const player2Points = document.querySelector('#player2-points');
   const gameBoard = document.querySelector('#game-board');
   const boardCells = document.querySelectorAll('.board__cell');
   const startBtn = document.querySelector('#start-button');
   const resetBtn = document.querySelector('#reset-button');
   let resetBoard = false;

   function highlightPlayer() {
      let playersInfo = gameFlow.getPlayersInfo();

      if (playersInfo.playerTurn.name === playersInfo.player1.name) {
         player1Name.classList.add('player-name-highlighted');
         player2Name.classList.remove('player-name-highlighted');
      } else {
         player2Name.classList.add('player-name-highlighted');
         player1Name.classList.remove('player-name-highlighted');
      }
   }

   function setupGame() {
      let p1Name = player1NameInput.value;
      let p2Name = player2NameInput.value;

      gameFlow.setup(p1Name, p2Name);
      player1Name.innerHTML = p1Name + ' <img src="images/xmark.svg" alt="cross symbol" class="player__img">';
      player2Name.innerHTML = p2Name + ' <img src="images/circle.svg" alt="circle symbol" class="player__img">';
      modal.style.display = 'none';
      highlightPlayer();
   }

   function updatePlayersScore() {
      let {
         player1: { points: p1Points },
         player2: { points: p2Points },
      } = gameFlow.getPlayersInfo();
      
      player1Points.textContent = p1Points;
      player2Points.textContent = p2Points;
   }

   function cleanBoardCells() {
      resetBoard = false;
      tictactoe.cleanBoard();
      [...boardCells].forEach(cell => cell.style.backgroundImage = '');
   }

   function fillCell(e) {
      let target = e.target;

      if (target.nodeName === 'BUTTON' && target.dataset.cellPosition && resetBoard === false) {
         let [ row, column ] = target.dataset.cellPosition.split(' ');
         let currentPlayer = gameFlow.getPlayersInfo().playerTurn;
         let symbol = currentPlayer.symbol;
         let turnResult = gameFlow.takeTurn(row, column);

         if (turnResult === false) {
            return;
         } else if (turnResult === true) {
            target.style.backgroundImage = `url(images/${symbol === 0 ? 'xmark' : 'circle'}.svg)`;
            highlightPlayer();
         } else if (turnResult === currentPlayer.name) {
            resetBoard = true;
            target.style.backgroundImage = `url(images/${symbol === 0 ? 'xmark' : 'circle'}.svg)`;
            highlightPlayer();
            updatePlayersScore();
         }
      } else if (resetBoard) {
         cleanBoardCells();
      }
   }

   startBtn.addEventListener('click', setupGame);
   gameBoard.addEventListener('click', fillCell);
   resetBtn.addEventListener('click', cleanBoardCells);
});
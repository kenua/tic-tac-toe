'use strict';

const tictactoe = (function() {
   let _board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
   ];

   const getBoard = function() {
      return _board;
   };

   const getBoardStr = function() {
      let result = '';

      for (let i = 0; i < _board.length; i++) {
         for (let j = 0; j < _board[i].length; j++) {
            result += `[${_board[i][j]}]`;
         }
         result += '\n';
      }

      return result;
   };

   const fillCell = function(row = 0, column = 0, symbolType = 0) {
      let symbol = (symbolType === 0) ? 'x' : 
                   (symbolType === 1) ? 'o' : 
                   'x';

      if (_board[row] && _board[row][column] !== undefined && _board[row][column] === 0) {
         _board[row][column] = symbol;
      }

      return this;
   };

   const checkWinner = function() {
      let result = false;
      // check rows
      for (let i = 0; i < _board.length; i++) {
         let row = _board[i].join('');
         if (row === 'xxx' || row === 'ooo') result = true;
         if (result) break;
      }
      // check columns
      if (!result) {
         for (let i = 0; i < _board.length; i++) {
            let column = `${_board[0][i]}${_board[1][i]}${_board[2][i]}`;
            if (column === 'xxx' || column === 'ooo') result = true;
            if (result) break;
         }
      }
      // check x
      if (!result) {
         let slash = `${_board[0][0]}${_board[1][1]}${_board[2][2]}`;
         let backslash = `${_board[0][2]}${_board[1][1]}${_board[2][0]}`;

         if (slash === 'xxx' || slash === 'ooo') result = true;
         if (backslash === 'xxx' || backslash === 'ooo') result = true;
      }

      return result;
   };

   const cleanBoard = function() {
      _board = [
         [0,0,0],
         [0,0,0],
         [0,0,0]
      ];
      return this;
   };

   return { getBoard, getBoardStr, fillCell, checkWinner, cleanBoard, };
})();

//console.log(tictactoe);
//console.log(tictactoe.getBoard());
//tictactoe.fillCell(1, 1, 1); // fill the center with a 'o'
//tictactoe.fillCell(0, 0); // fill the first cell of the first row with a 'x'
//tictactoe.fillCell(2, 2, 0); // fill the last cell of the third row with a 'x'
//console.log(tictactoe.getBoard());
//console.log(tictactoe.getBoardStr());
//tictactoe.cleanBoard();
//console.log(tictactoe.getBoardStr());
/*
console.log(tictactoe.checkWinner()); // false

tictactoe.fillCell();
tictactoe.fillCell(0, 1);
tictactoe.fillCell(0, 2);
console.log(tictactoe.getBoardStr());
tictactoe.cleanBoard();

tictactoe.fillCell(0, 0, 1);
tictactoe.fillCell(1, 0, 1);
tictactoe.fillCell(2, 0, 1);
console.log(tictactoe.getBoardStr());
tictactoe.cleanBoard();

tictactoe.fillCell();
tictactoe.fillCell(1, 1);
tictactoe.fillCell(2, 2);
console.log(tictactoe.getBoardStr());
tictactoe.cleanBoard();

tictactoe.fillCell(0, 2, 1);
tictactoe.fillCell(1, 1, 1);
tictactoe.fillCell(2, 0, 1);
console.log(tictactoe.getBoardStr());
console.log(tictactoe.checkWinner()); // true
*/

const Player = function(name = 'player', symbolType = 0) {
   let _name = name;
   let _points = 0;
   let _symbol = symbolType;

   const getName = function() {
      return _name;
   };

   const getPoints = function() {
      return _points;
   }

   const getSymbol = function() {
      return _symbol;
   }

   const increasePoints = function() {
      _points++;
      return this;
   };

   return { getName, getPoints, getSymbol, increasePoints, };
};

const gameFlow = (function() {
   let _player1 = null;
   let _player2 = null;
   let _playerTurn = null;

   const setup = function(p1Name = 'player 1', p2Name = 'player 2') {
      _player1 = Player(p1Name, 0);
      _player2 = Player(p2Name, 1);
      _playerTurn = _player1;
      return this;
   };

   const playerWon = function() {
      let didPlayerWon = tictactoe.checkWinner();

      if (didPlayerWon) {
         _playerTurn.increasePoints();
         return true;
      }

      return false;
   };

   const takeTurn = function(row, column) {
      let winnerName = null;

      tictactoe.fillCell(row, column, _playerTurn.getSymbol());

      if (playerWon()) {
         winnerName = _playerTurn.getName();
         tictactoe.cleanBoard();
      }

      _playerTurn = (_playerTurn === _player1) ? _player2 : _player1;
      return (winnerName) ? winnerName : this;
   };

   const getPlayersInfo = function() {
      if (_player1 && _player2) {
         return {
            player1: {
               name: _player1.getName(),
               points: _player1.getPoints(),
            },
            player2: {
               name: _player2.getName(),
               points: _player2.getPoints(),
            },
         }
      }

      return null;
   };

   return { setup, playerWon, takeTurn, getPlayersInfo };
})();

/*
gameFlow.setup();

gameFlow.takeTurn(0,0);
gameFlow.takeTurn(1,0);

gameFlow.takeTurn(0,1);
gameFlow.takeTurn(1,1);

console.log(tictactoe.getBoardStr());

console.log(gameFlow.takeTurn(0,2));
gameFlow.takeTurn(1,2);

gameFlow.takeTurn(0,2);
gameFlow.takeTurn(1,1);
gameFlow.takeTurn(0,2);
gameFlow.takeTurn(1,0);

console.log(tictactoe.getBoardStr());
console.log(gameFlow.getPlayersInfo());
*/
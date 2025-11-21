import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw, Trophy, Users } from '../../utils/icons.js';

const TicTacToe = ({ onGameEnd, isMultiplayer = false, players = [] }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameActive, setGameActive] = useState(true);
  const [moves, setMoves] = useState(0);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !gameActive) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoves(moves + 1);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameActive(false);
      
      // Calcular XP baseado na performance
      const xpEarned = calculateXP(gameWinner, moves + 1);
      setTimeout(() => {
        onGameEnd({
          winner: gameWinner,
          xp: xpEarned,
          moves: moves + 1,
          gameType: 'tic-tac-toe'
        });
      }, 1500);
    } else if (moves + 1 === 9) {
      setWinner('draw');
      setGameActive(false);
      setTimeout(() => {
        onGameEnd({
          winner: 'draw',
          xp: 10, // XP consolação por empate
          moves: moves + 1,
          gameType: 'tic-tac-toe'
        });
      }, 1500);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const calculateXP = (winner, totalMoves) => {
    if (winner === 'draw') return 10;
    
    let baseXP = 25;
    
    // Bônus por vitória rápida
    if (totalMoves <= 5) baseXP += 15;
    else if (totalMoves <= 7) baseXP += 10;
    else if (totalMoves <= 9) baseXP += 5;
    
    // Bônus multiplayer
    if (isMultiplayer) baseXP += 10;
    
    return baseXP;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameActive(true);
    setMoves(0);
  };

  const renderSquare = (index) => {
    const value = board[index];
    return (
      <button
        key={index}
        onClick={() => handleClick(index)}
        className={`w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
          value 
            ? 'bg-gray-100 dark:bg-gray-700' 
            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
        } ${!gameActive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        disabled={!gameActive || board[index]}
      >
        {value === 'X' && <X className="w-8 h-8 text-blue-600" />}
        {value === 'O' && <Circle className="w-8 h-8 text-red-600" />}
      </button>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Jogo da Velha
        </h2>
        
        {isMultiplayer && players.length > 0 && (
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {players[0]?.nome || 'Jogador 1'} (X)
              </span>
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {players[1]?.nome || 'Jogador 2'} (O)
              </span>
            </div>
          </div>
        )}

        {!winner && gameActive && (
          <p className="text-gray-600 dark:text-gray-400">
            Vez do jogador: <span className="font-semibold">
              {currentPlayer === 'X' ? 'X (Azul)' : 'O (Vermelho)'}
            </span>
          </p>
        )}

        {winner && (
          <div className="space-y-2">
            {winner === 'draw' ? (
              <p className="text-yellow-600 dark:text-yellow-400 font-semibold flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2" />
                Empate! +10 XP
              </p>
            ) : (
              <p className="text-green-600 dark:text-green-400 font-semibold flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2" />
                Jogador {winner} venceu! +{calculateXP(winner, moves)} XP
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-6">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Novo Jogo</span>
        </button>
        
        <button
          onClick={() => onGameEnd({ cancelled: true })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Movimentos: {moves} | XP possível: {gameActive ? calculateXP('X', moves + 1) : 0}
      </div>
    </div>
  );
};

export default TicTacToe;
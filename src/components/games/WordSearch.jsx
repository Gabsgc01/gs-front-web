import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, Trophy, Eye, RotateCcw } from '../../utils/icons.js';

const WordSearch = ({ onGameEnd, difficulty = 'Médio' }) => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const gridRef = useRef(null);

  const wordLists = {
    'Fácil': ['FOCO', 'META', 'TIME', 'UNIÃO', 'FORÇA'],
    'Médio': ['SUCESSO', 'PROJETO', 'LÍDER', 'VISÃO', 'FUTURO', 'EQUIPE'],
    'Difícil': ['INOVAÇÃO', 'ESTRATÉGIA', 'COLABORAÇÃO', 'EXCELÊNCIA', 'CRESCIMENTO', 'PRODUTIVIDADE']
  };

  const gridSize = difficulty === 'Fácil' ? 8 : difficulty === 'Médio' ? 10 : 12;
  const gameWords = wordLists[difficulty] || wordLists['Médio'];

  useEffect(() => {
    initializeGame();
    setStartTime(Date.now());
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (gameActive && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameActive, startTime]);

  const initializeGame = () => {
    const newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    const placedWords = [];

    // Colocar palavras no grid
    gameWords.forEach(word => {
      if (placeWordInGrid(newGrid, word)) {
        placedWords.push(word);
      }
    });

    // Preencher células vazias com letras aleatórias
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWords(placedWords);
    setFoundWords([]);
  };

  const placeWordInGrid = (grid, word) => {
    const directions = [
      [0, 1],   // Horizontal
      [1, 0],   // Vertical
      [1, 1],   // Diagonal
      [-1, 1]   // Diagonal reversa
    ];

    for (let attempt = 0; attempt < 50; attempt++) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(grid, word, startRow, startCol, direction)) {
        placeWord(grid, word, startRow, startCol, direction);
        return true;
      }
    }
    return false;
  };

  const canPlaceWord = (grid, word, row, col, [dRow, dCol]) => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;

      if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
        return false;
      }

      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  const placeWord = (grid, word, row, col, [dRow, dCol]) => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      grid[newRow][newCol] = word[i];
    }
  };

  const handleCellClick = (row, col) => {
    if (!gameActive) return;

    if (!isSelecting) {
      setSelectedCells([{ row, col }]);
      setIsSelecting(true);
    } else {
      const newSelection = [...selectedCells, { row, col }];
      setSelectedCells(newSelection);
      checkForWord(newSelection);
    }
  };

  const checkForWord = (selection) => {
    const selectedLetters = selection.map(({ row, col }) => grid[row][col]).join('');
    const reversedLetters = selectedLetters.split('').reverse().join('');

    const foundWord = words.find(word => 
      word === selectedLetters || word === reversedLetters
    );

    if (foundWord && !foundWords.includes(foundWord)) {
      setFoundWords([...foundWords, foundWord]);
      setSelectedCells([]);
      setIsSelecting(false);

      // Verificar se todas as palavras foram encontradas
      if (foundWords.length + 1 === words.length) {
        endGame(true);
      }
    } else if (selection.length >= Math.max(...words.map(w => w.length))) {
      setSelectedCells([]);
      setIsSelecting(false);
    }
  };

  const endGame = (completed) => {
    setGameActive(false);
    const finalTime = Math.floor((Date.now() - startTime) / 1000);
    let xp = completed ? calculateXP(finalTime, foundWords.length) : Math.floor(foundWords.length * 5);
    
    setTimeout(() => {
      onGameEnd({
        completed,
        timeElapsed: finalTime,
        wordsFound: foundWords.length,
        totalWords: words.length,
        xp,
        gameType: 'word-search'
      });
    }, 1500);
  };

  const calculateXP = (time, wordsFound) => {
    let baseXP = wordsFound * 10;
    
    // Bônus por velocidade
    if (time < 60) baseXP += 25;
    else if (time < 120) baseXP += 15;
    else if (time < 180) baseXP += 10;
    
    // Bônus por dificuldade
    if (difficulty === 'Difícil') baseXP += 20;
    else if (difficulty === 'Médio') baseXP += 10;
    
    return baseXP;
  };

  const isCellSelected = (row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellInFoundWord = (row, col) => {
    // Implementação simplificada - em um jogo real, você salvaria as posições das palavras encontradas
    return false;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Caça-Palavras - {difficulty}
        </h2>
        
        <div className="flex items-center justify-center space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {formatTime(timeElapsed)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {foundWords.length}/{words.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Grid */}
        <div className="flex-1">
          <div 
            ref={gridRef}
            className="grid gap-1 mx-auto max-w-md"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-8 h-8 text-xs font-bold border border-gray-300 dark:border-gray-600 rounded transition-colors ${
                    isCellSelected(rowIndex, colIndex)
                      ? 'bg-blue-500 text-white'
                      : isCellInFoundWord(rowIndex, colIndex)
                      ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  disabled={!gameActive}
                >
                  {cell}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Lista de Palavras */}
        <div className="lg:w-48">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Palavras para encontrar:
          </h3>
          <div className="space-y-2">
            {words.map((word, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  foundWords.includes(word)
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 line-through'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => {
            initializeGame();
            setStartTime(Date.now());
            setTimeElapsed(0);
            setGameActive(true);
          }}
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

      {!gameActive && foundWords.length === words.length && (
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">
              Parabéns! +{calculateXP(timeElapsed, foundWords.length)} XP
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
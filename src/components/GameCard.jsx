import React, { useState } from 'react';
import { Gamepad2, Users, Trophy, Clock, Zap } from '../utils/icons.js';

const GameCard = ({ game, onPlaySolo, onInviteTeam, userXP }) => {
  const [showInvite, setShowInvite] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Difícil': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {game.nome}
              </h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.dificuldade)}`}>
                {game.dificuldade}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
              <Zap className="w-4 h-4" />
              <span className="font-bold">{game.xpReward}</span>
              <span className="text-xs">XP</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {game.descricao}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{game.tempoEstimado}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4" />
              <span>{game.jogosHoje || 0} hoje</span>
            </div>
          </div>
          <div className="text-xs">
            Máx: {game.maxXPDiario}/dia
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onPlaySolo(game)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Jogar Solo</span>
          </button>
          
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Desafiar</span>
          </button>
        </div>

        {showInvite && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              Convidar para jogar
            </h4>
            <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
              Jogue com colegas e ganhe XP bônus de colaboração!
            </p>
            <button
              onClick={() => onInviteTeam(game)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Selecionar Colegas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
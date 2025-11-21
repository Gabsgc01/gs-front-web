import React from 'react';
import { Trophy, Star, Users, X } from '../utils/icons.js';

const GameCompletionModal = ({ isOpen, onClose, gameResult }) => {
  if (!isOpen || !gameResult) return null;

  const { xpEarned, gameName, isMultiplayer, performance, newLevel } = gameResult;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md animate-bounce-in">
        <div className="relative p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Parabéns! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Você completou <span className="font-semibold text-blue-600 dark:text-blue-400">{gameName}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                +{xpEarned} XP
              </span>
            </div>
            {newLevel && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                🎊 Novo nível alcançado: {newLevel}!
              </p>
            )}
          </div>

          {/* Performance Details */}
          {performance && (
            <div className="grid grid-cols-2 gap-3">
              {performance.timeBonus && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Bônus Velocidade
                  </p>
                  <p className="text-lg font-bold text-green-700 dark:text-green-300">
                    +{performance.timeBonus}
                  </p>
                </div>
              )}
              
              {isMultiplayer && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                  <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    Bônus Equipe
                  </p>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                    +{performance.teamBonus || 10}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Achievement */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Esta conquista foi adicionada ao seu perfil
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>🏆</span>
              <span>Progresso atualizado</span>
              <span>📊</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Continuar Jogando
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCompletionModal;
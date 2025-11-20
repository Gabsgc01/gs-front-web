import React from 'react';
import { Target, Clock, Award, Users, CheckCircle } from '../utils/icons.js';

const MissionCard = ({ mission, onJoin, onComplete, userProgress }) => {
  const isCompleted = userProgress?.completed || false;
  const isJoined = userProgress?.joined || false;
  const progressPercent = userProgress?.progress || 0;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'Médio': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Difícil': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'individual': return <Target className="w-4 h-4" />;
      case 'equipe': return <Users className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
      isCompleted ? 'border-green-500' : isJoined ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
    }`}>
      <div className="relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-4 right-4 z-10">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                {getTypeIcon(mission.tipo)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {mission.titulo}
                </h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.dificuldade)}`}>
                  {mission.dificuldade}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {mission.descricao}
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {mission.prazo}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {mission.xp} XP
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">
                  {mission.participantes}/{mission.maxParticipantes} participantes
                </span>
              </div>
            </div>

            {isJoined && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {!isCompleted && !isJoined && (
              <button
                onClick={() => onJoin(mission.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Participar
              </button>
            )}
            
            {isJoined && !isCompleted && (
              <button
                onClick={() => onComplete(mission.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Marcar como Concluída
              </button>
            )}

            {isCompleted && (
              <div className="flex-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-medium py-2 px-4 rounded-lg text-center">
                Missão Concluída!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
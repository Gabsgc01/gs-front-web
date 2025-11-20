import React from 'react';
import { Trophy, Medal, Award, Crown } from '../utils/icons.js';

const TeamRanking = ({ rankings, currentUserId }) => {
  const getRankingIcon = (position) => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Award className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankingBg = (position, isCurrentUser) => {
    if (isCurrentUser) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
    
    switch (position) {
      case 1: return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700';
      case 2: return 'bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-600';
      case 3: return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700';
      default: return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1: return 'bg-gray-500';
      case 2: return 'bg-green-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-purple-500';
      case 5: return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
          Ranking da Equipe
        </h2>

        <div className="space-y-3">
          {rankings.map((user) => {
            const isCurrentUser = user.id === currentUserId;
            const isTopThree = user.position <= 3;
            
            return (
              <div
                key={user.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getRankingBg(user.position, isCurrentUser)}`}
              >
                <div className="flex items-center space-x-4">
                  {/* Posição e Ícone */}
                  <div className="flex items-center space-x-2 min-w-[60px]">
                    <span className={`text-lg font-bold ${
                      isTopThree ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      #{user.position}
                    </span>
                    {getRankingIcon(user.position)}
                  </div>

                  {/* Avatar e Info */}
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="relative">
                      <img
                        src={user.foto}
                        alt={user.nome}
                        className={`w-12 h-12 rounded-full border-2 ${
                          isCurrentUser ? 'border-blue-400' : 
                          isTopThree ? 'border-yellow-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&size=48&background=6366f1&color=ffffff`;
                        }}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getLevelColor(user.level)} flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">{user.level}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        isCurrentUser ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                      }`}>
                        {user.nome} {isCurrentUser && '(Você)'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.cargo}
                      </p>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      isTopThree ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {user.xp}
                    </div>
                    <div className="text-xs text-gray-500">XP</div>
                  </div>
                </div>

                {/* Barra de Progresso para Top 3 */}
                {isTopThree && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          user.position === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          user.position === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          'bg-gradient-to-r from-amber-400 to-amber-600'
                        }`}
                        style={{ width: `${(user.xp / rankings[0].xp) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Estatísticas do Ranking */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {rankings[0]?.xp || 0}
              </div>
              <div className="text-xs text-gray-500">XP Líder</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {rankings.reduce((sum, user) => sum + user.xp, 0)}
              </div>
              <div className="text-xs text-gray-500">XP Total Equipe</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {rankings.length}
              </div>
              <div className="text-xs text-gray-500">Participantes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRanking;
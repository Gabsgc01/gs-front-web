import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, TrendingUp, Users, Target, Gamepad2 } from '../utils/icons.js';

const UserDashboard = ({ user, stats, recentMissions }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [gameStats, setGameStats] = useState({ gamesPlayed: 0, totalXP: 0 });

  useEffect(() => {
    if (user) {
      loadRecentActivities();
      loadGameStats();
    }
  }, [user]);

  const loadRecentActivities = () => {
    try {
      const activities = JSON.parse(localStorage.getItem(`recent_activities_${user.id}`) || '[]');
      setRecentActivities(activities.slice(0, 5)); // Mostrar apenas os 5 mais recentes
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    }
  };

  const loadGameStats = () => {
    try {
      const stats = JSON.parse(localStorage.getItem(`game_stats_${user.id}`) || '{}');
      setGameStats({
        gamesPlayed: stats.gamesPlayed || 0,
        totalXP: stats.totalXP || 0
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas de jogos:', error);
    }
  };

  const getXPLevel = (xp) => {
    if (xp < 100) return { level: 1, nextLevel: 100, color: 'bg-gray-500' };
    if (xp < 250) return { level: 2, nextLevel: 250, color: 'bg-green-500' };
    if (xp < 500) return { level: 3, nextLevel: 500, color: 'bg-blue-500' };
    if (xp < 1000) return { level: 4, nextLevel: 1000, color: 'bg-purple-500' };
    return { level: 5, nextLevel: 1500, color: 'bg-yellow-500' };
  };

  const levelInfo = getXPLevel(stats.totalXP);
  const progressPercent = ((stats.totalXP % (levelInfo.nextLevel / levelInfo.level)) / (levelInfo.nextLevel / levelInfo.level)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Header do Usuário */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={user.foto}
              alt={user.nome}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&size=64&background=6366f1&color=ffffff`;
              }}
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${levelInfo.color} flex items-center justify-center`}>
              <span className="text-xs font-bold text-white">{levelInfo.level}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.nome}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user.cargo}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{user.equipe}</p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalXP}
            </div>
            <div className="text-xs text-gray-500">XP Total</div>
          </div>
        </div>

        {/* Barra de Progresso XP */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nível {levelInfo.level}
            </span>
            <span className="text-sm text-gray-500">
              {stats.totalXP}/{levelInfo.nextLevel} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${levelInfo.color}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {stats.completedMissions}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Missões Completas
            </div>
          </div>

          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {stats.currentStreak}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Sequência Atual
            </div>
          </div>

          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              #{stats.ranking}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Ranking Geral
            </div>
          </div>

          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Gamepad2 className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {gameStats.gamesPlayed}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Jogos Completos
            </div>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Atividades Recentes
          </h3>
          
          <div className="space-y-2">
            {/* Combinar missões e jogos */}
            {[...recentActivities, ...recentMissions.map(m => ({...m, type: 'mission'}))]
              .sort((a, b) => new Date(b.date || b.completedAt) - new Date(a.date || a.completedAt))
              .slice(0, 5)
              .map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                <div className="flex-shrink-0">
                  {activity.type === 'game_completed' ? (
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm">{activity.icon || '🎮'}</span>
                    </div>
                  ) : (
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' : 
                      activity.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {activity.description || `${activity.xp} XP`} • {activity.date}
                  </div>
                  {activity.category && (
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mt-1">
                      {activity.category}
                    </span>
                  )}
                </div>
                {activity.status === 'completed' && (
                  <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
              </div>
            ))}
            
            {recentActivities.length === 0 && recentMissions.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <Trophy className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma atividade recente</p>
                <p className="text-xs">Complete missões ou jogue para ver seu progresso aqui!</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Resumo de Jogos */}
        {gameStats.gamesPlayed > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center mb-2">
              <Gamepad2 className="w-5 h-5 text-purple-600 mr-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Progresso nos Jogos
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Jogos Completos:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 ml-2">
                  {gameStats.gamesPlayed}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">XP dos Jogos:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 ml-2">
                  {gameStats.totalXP}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
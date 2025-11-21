import React, { useState, useEffect } from 'react';
import { Users, Building, Trophy, Star, TrendingUp, Calendar } from '../utils/icons.js';
import { useAuth } from '../contexts/AuthContext';

const CompanyTeamStats = () => {
  const { currentCompany, currentUser } = useAuth();
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    totalXP: 0,
    averageXP: 0,
    topPerformer: null,
    recentJoiners: []
  });

  useEffect(() => {
    if (currentCompany) {
      loadTeamStats();
    }
  }, [currentCompany]);

  const loadTeamStats = () => {
    try {
      const allUsers = JSON.parse(localStorage.getItem('teamquest_users') || '[]');
      const companyUsers = allUsers.filter(user => user.companyId === currentCompany.id);
      
      const totalXP = companyUsers.reduce((sum, user) => sum + user.stats.totalXP, 0);
      const averageXP = companyUsers.length > 0 ? Math.round(totalXP / companyUsers.length) : 0;
      
      const topPerformer = companyUsers.reduce((top, user) => 
        user.stats.totalXP > (top?.stats.totalXP || 0) ? user : top
      , null);
      
      const recentJoiners = companyUsers
        .filter(user => {
          const joinDate = new Date(user.criadoEm);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return joinDate >= weekAgo;
        })
        .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
        .slice(0, 3);

      setTeamStats({
        totalMembers: companyUsers.length,
        totalXP,
        averageXP,
        topPerformer,
        recentJoiners
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas da equipe:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Building className="w-6 h-6 mr-3 text-blue-600" />
              {currentCompany.nome}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Estatísticas da Equipe
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {teamStats.totalMembers}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Membros
            </div>
          </div>

          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Trophy className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {teamStats.totalXP.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              XP Total
            </div>
          </div>

          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {teamStats.averageXP}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              XP Médio
            </div>
          </div>

          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Star className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {teamStats.topPerformer?.stats.totalXP || 0}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Melhor Score
            </div>
          </div>
        </div>

        {/* Top Performer */}
        {teamStats.topPerformer && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              Destaque da Equipe
            </h3>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <img
                src={teamStats.topPerformer.foto}
                alt={teamStats.topPerformer.nome}
                className="w-10 h-10 rounded-full border-2 border-yellow-400"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamStats.topPerformer.nome)}&size=40&background=eab308&color=ffffff`;
                }}
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {teamStats.topPerformer.nome}
                  {teamStats.topPerformer.id === currentUser.id && ' (Você)'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {teamStats.topPerformer.cargo} • {teamStats.topPerformer.stats.totalXP} XP
                </div>
              </div>
              <div className="text-yellow-600 dark:text-yellow-400">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Novos Membros */}
        {teamStats.recentJoiners.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              Novos Membros
            </h3>
            <div className="space-y-2">
              {teamStats.recentJoiners.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <img
                    src={member.foto}
                    alt={member.nome}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nome)}&size=32&background=6366f1&color=ffffff`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.nome}
                    </div>
                    <div className="text-xs text-gray-500">
                      {member.cargo} • Entrou em {new Date(member.criadoEm).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Novo
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Dados atualizados automaticamente • Empresa desde {new Date(currentCompany.criadoEm).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTeamStats;
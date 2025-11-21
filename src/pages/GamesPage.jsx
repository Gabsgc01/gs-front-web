import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Users, Clock, Star } from '../utils/icons.js';
import { useAuth } from '../contexts/AuthContext';
import GameCard from '../components/GameCard';
import TicTacToe from '../components/games/TicTacToe';
import WordSearch from '../components/games/WordSearch';
import InvitePlayersModal from '../components/InvitePlayersModal';
import GameCompletionModal from '../components/GameCompletionModal';

const GamesPage = () => {
  const { currentUser, updateUserXP } = useAuth();
  const [currentGame, setCurrentGame] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [inviteModal, setInviteModal] = useState({ isOpen: false, game: null });
  const [completionModal, setCompletionModal] = useState({ isOpen: false, result: null });
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    totalXP: 0,
    favoriteGame: null
  });

  const availableGames = [
    {
      id: 'tic-tac-toe',
      nome: 'Jogo da Velha',
      descricao: 'Clássico jogo de estratégia 3x3',
      icone: '⭕',
      dificuldade: 'Fácil',
      xpBase: 25,
      xpBonus: 10,
      tempoMedio: '2-5 min',
      maxPlayers: 2,
      categoria: 'Estratégia'
    },
    {
      id: 'word-search',
      nome: 'Caça-Palavras',
      descricao: 'Encontre palavras escondidas no grid',
      icone: '🔍',
      dificuldade: 'Médio',
      xpBase: 30,
      xpBonus: 20,
      tempoMedio: '5-10 min',
      maxPlayers: 4,
      categoria: 'Palavras'
    }
  ];

  useEffect(() => {
    loadGameStats();
  }, [currentUser]);

  const loadGameStats = () => {
    try {
      const userStats = JSON.parse(localStorage.getItem(`game_stats_${currentUser.id}`) || '{}');
      setGameStats({
        gamesPlayed: userStats.gamesPlayed || 0,
        totalXP: userStats.totalXP || 0,
        favoriteGame: userStats.favoriteGame || null
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const updateGameStats = (gameId, xpEarned) => {
    try {
      const userStats = JSON.parse(localStorage.getItem(`game_stats_${currentUser.id}`) || '{}');
      const gameHistory = userStats.gameHistory || {};
      
      if (!gameHistory[gameId]) {
        gameHistory[gameId] = { played: 0, xpEarned: 0 };
      }
      gameHistory[gameId].played += 1;
      gameHistory[gameId].xpEarned += xpEarned;

      let favoriteGame = null;
      let maxPlayed = 0;
      Object.entries(gameHistory).forEach(([id, stats]) => {
        if (stats.played > maxPlayed) {
          maxPlayed = stats.played;
          favoriteGame = availableGames.find(g => g.id === id)?.nome || id;
        }
      });

      const updatedStats = {
        ...userStats,
        gamesPlayed: (userStats.gamesPlayed || 0) + 1,
        totalXP: (userStats.totalXP || 0) + xpEarned,
        favoriteGame,
        gameHistory
      };

      localStorage.setItem(`game_stats_${currentUser.id}`, JSON.stringify(updatedStats));
      setGameStats({
        gamesPlayed: updatedStats.gamesPlayed,
        totalXP: updatedStats.totalXP,
        favoriteGame: updatedStats.favoriteGame
      });
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
    }
  };

  const addGameAchievement = (achievement) => {
    try {
      const recentActivities = JSON.parse(localStorage.getItem(`recent_activities_${currentUser.id}`) || '[]');
      
      const newActivity = {
        id: Date.now().toString(),
        type: 'game_completed',
        title: `${achievement.gameName} Concluído`,
        description: `Ganhou ${achievement.xpEarned} XP jogando ${achievement.mode === 'multiplayer' ? 'em equipe' : 'solo'}`,
        xp: achievement.xpEarned,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'completed',
        category: 'Jogos',
        icon: '🎮'
      };
      
      recentActivities.unshift(newActivity);
      const limitedActivities = recentActivities.slice(0, 10);
      
      localStorage.setItem(`recent_activities_${currentUser.id}`, JSON.stringify(limitedActivities));
      
      const gameAchievements = JSON.parse(localStorage.getItem(`game_achievements_${currentUser.id}`) || '[]');
      gameAchievements.unshift(achievement);
      localStorage.setItem(`game_achievements_${currentUser.id}`, JSON.stringify(gameAchievements.slice(0, 20)));
      
    } catch (error) {
      console.error('Erro ao adicionar conquista:', error);
    }
  };

  const handlePlaySolo = (game) => {
    setCurrentGame(game.id);
    setGameData({
      ...game,
      players: [currentUser],
      mode: 'solo'
    });
  };

  const handleInviteTeam = (game) => {
    setInviteModal({ isOpen: true, game });
  };

  const handleInviteConfirm = (inviteData) => {
    setCurrentGame(inviteData.game.id);
    setGameData({
      ...inviteData.game,
      players: inviteData.players,
      mode: 'multiplayer',
      invitedBy: inviteData.invitedBy
    });
    setInviteModal({ isOpen: false, game: null });
  };

  const handleGameEnd = (gameResult) => {
    const xpEarned = gameResult.xpEarned || 0;
    const gameName = availableGames.find(g => g.id === currentGame)?.nome || 'Jogo';
    
    const updateResult = updateUserXP(currentUser.id, xpEarned);
    
    updateGameStats(currentGame, xpEarned);
    
    addGameAchievement({
      gameId: currentGame,
      gameName,
      xpEarned,
      completedAt: new Date().toISOString(),
      mode: gameData?.mode || 'solo',
      players: gameData?.players || [currentUser]
    });
    
    setTimeout(() => {
      setCompletionModal({
        isOpen: true,
        result: {
          ...gameResult,
          gameName,
          newLevel: updateResult?.newLevel,
          isMultiplayer: gameData?.mode === 'multiplayer'
        }
      });
    }, 500);
    
    setCurrentGame(null);
    setGameData(null);
  };

  const handleBackToGames = () => {
    setCurrentGame(null);
    setGameData(null);
  };

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'tic-tac-toe':
        return (
          <TicTacToe
            gameData={gameData}
            onGameEnd={handleGameEnd}
            onBack={handleBackToGames}
          />
        );
      case 'word-search':
        return (
          <WordSearch
            gameData={gameData}
            onGameEnd={handleGameEnd}
            onBack={handleBackToGames}
          />
        );
      default:
        return null;
    }
  };

  if (currentGame) {
    return renderCurrentGame();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Gamepad2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Centro de Jogos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ganhe XP extra jogando sozinho ou com sua equipe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jogos Jogados
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {gameStats.gamesPlayed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  XP dos Jogos
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {gameStats.totalXP}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jogo Favorito
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {gameStats.favoriteGame || 'Nenhum ainda'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Jogos Disponíveis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlaySolo={() => handlePlaySolo(game)}
                onInviteTeam={() => handleInviteTeam(game)}
              />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            💡 Dicas para ganhar mais XP:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Jogue com colegas de equipe para bônus de XP</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Complete jogos rapidamente para bônus de velocidade</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Tente diferentes níveis de dificuldade</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Jogue todos os dias para manter a sequência</span>
            </div>
          </div>
        </div>
      </div>

      <InvitePlayersModal
        isOpen={inviteModal.isOpen}
        onClose={() => setInviteModal({ isOpen: false, game: null })}
        onInvite={handleInviteConfirm}
        game={inviteModal.game}
      />
      
      <GameCompletionModal
        isOpen={completionModal.isOpen}
        onClose={() => setCompletionModal({ isOpen: false, result: null })}
        gameResult={completionModal.result}
      />
    </div>
  );
};

export default GamesPage;
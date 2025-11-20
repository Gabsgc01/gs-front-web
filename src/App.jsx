import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import MissionCard from './components/MissionCard';
import UserDashboard from './components/UserDashboard';
import TeamRanking from './components/TeamRanking';
import { Target, Users, Award, Filter, Search } from 'lucide-react';
import missionsData from './data/missions.json';
import userData from './data/userData.json';

function App() {
  const [activeTab, setActiveTab] = useState('missions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [userProgress, setUserProgress] = useState(userData.userProgress);

  const categories = useMemo(() => {
    return [...new Set(missionsData.map(m => m.categoria))].sort();
  }, []);

  const difficulties = useMemo(() => {
    return [...new Set(missionsData.map(m => m.dificuldade))];
  }, []);

  const filteredMissions = useMemo(() => {
    return missionsData.filter(mission => {
      const matchesSearch = searchTerm === '' || 
        mission.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mission.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === '' || mission.categoria === selectedCategory;
      const matchesDifficulty = selectedDifficulty === '' || mission.dificuldade === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const handleJoinMission = (missionId) => {
    setUserProgress(prev => ({
      ...prev,
      [missionId]: {
        joined: true,
        completed: false,
        progress: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      }
    }));
  };

  const handleCompleteMission = (missionId) => {
    setUserProgress(prev => ({
      ...prev,
      [missionId]: {
        ...prev[missionId],
        completed: true,
        progress: 100,
        completedDate: new Date().toISOString().split('T')[0]
      }
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('missions')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'missions'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Missões</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Meu Perfil</span>
            </button>
            <button
              onClick={() => setActiveTab('ranking')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'ranking'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Ranking</span>
            </button>
          </div>

          {/* Missions Tab */}
          {activeTab === 'missions' && (
            <>
              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar missões..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todas as categorias</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todas as dificuldades</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Limpar</span>
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Exibindo <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {filteredMissions.length}
                  </span> de <span className="font-semibold">{missionsData.length}</span> missões disponíveis
                </p>
              </div>

              {/* Mission Cards */}
              {filteredMissions.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMissions.map(mission => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      onJoin={handleJoinMission}
                      onComplete={handleCompleteMission}
                      userProgress={userProgress[mission.id]}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Target className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhuma missão encontrada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tente ajustar os filtros ou busca
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="max-w-4xl mx-auto">
              <UserDashboard
                user={userData.currentUser}
                stats={userData.userStats}
                recentMissions={userData.recentMissions}
              />
            </div>
          )}

          {/* Ranking Tab */}
          {activeTab === 'ranking' && (
            <div className="max-w-4xl mx-auto">
              <TeamRanking
                rankings={userData.teamRanking}
                currentUserId={userData.currentUser.id}
              />
            </div>
          )}
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>© 2025 TeamQuest - Gamificação Corporativa</p>
              <p className="mt-2">Conectando equipes através da colaboração gamificada</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
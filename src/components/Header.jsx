import React, { useState } from 'react';
import { Moon, Sun, Users, LogOut, UserPlus } from '../utils/icons.js';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AddTeamMember from './AddTeamMember';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentUser, currentCompany, logout } = useAuth();
  const [showAddMember, setShowAddMember] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              TeamQuest
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {currentUser?.isAdmin && (
              <button
                onClick={() => setShowAddMember(true)}
                className="p-3 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                title="Adicionar Membro da Equipe"
              >
                <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <img
                src={currentUser?.foto}
                alt={currentUser?.nome}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.nome || 'User')}&size=24&background=6366f1&color=ffffff`;
                }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                {currentUser?.nome}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-3 rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
          </div>

          <AddTeamMember
            isOpen={showAddMember}
            onClose={() => setShowAddMember(false)}
            onMemberAdded={() => {
              // Callback para atualizar dados se necessário
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
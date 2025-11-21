import React, { useState, useEffect } from 'react';
import { X, Users, Search, Check } from '../utils/icons.js';
import { useAuth } from '../contexts/AuthContext';

const InvitePlayersModal = ({ isOpen, onClose, onInvite, game }) => {
  const { currentCompany, currentUser } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentCompany) {
      loadTeamMembers();
    }
  }, [isOpen, currentCompany]);

  const loadTeamMembers = () => {
    setLoading(true);
    try {
      // Carregar membros da equipe
      const allUsers = JSON.parse(localStorage.getItem('teamquest_users') || '[]');
      const companyMembers = allUsers.filter(user => 
        user.companyId === currentCompany.id && user.id !== currentUser.id
      );
      setTeamMembers(companyMembers);
    } catch (error) {
      console.error('Erro ao carregar membros da equipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePlayerSelection = (player) => {
    setSelectedPlayers(prev => {
      const isSelected = prev.find(p => p.id === player.id);
      if (isSelected) {
        return prev.filter(p => p.id !== player.id);
      } else {
        // Limite baseado no jogo
        const maxPlayers = game?.maxPlayers || 2;
        if (prev.length >= maxPlayers - 1) { // -1 porque o usuário atual já conta
          return prev;
        }
        return [...prev, player];
      }
    });
  };

  const handleInvite = () => {
    if (selectedPlayers.length === 0) return;
    
    const inviteData = {
      game,
      players: [currentUser, ...selectedPlayers],
      invitedBy: currentUser,
      createdAt: new Date().toISOString()
    };
    
    onInvite(inviteData);
    handleClose();
  };

  const handleClose = () => {
    setSelectedPlayers([]);
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Convidar para jogar
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {game?.nome} - Máx. {(game?.maxPlayers || 2) - 1} colegas
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar colegas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Team Members List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Carregando...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'Nenhum colega encontrado' : 'Nenhum membro da equipe encontrado'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMembers.map((member) => {
                const isSelected = selectedPlayers.find(p => p.id === member.id);
                const isDisabled = !isSelected && selectedPlayers.length >= (game?.maxPlayers || 2) - 1;
                
                return (
                  <div
                    key={member.id}
                    onClick={() => !isDisabled && togglePlayerSelection(member)}
                    className={`flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : isDisabled
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <img
                      src={member.foto}
                      alt={member.nome}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nome)}&size=40&background=6366f1&color=ffffff`;
                      }}
                    />
                    
                    <div className="flex-1 ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {member.nome}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.cargo}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Players Summary */}
        {selectedPlayers.length > 0 && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Selecionados:
              </span>
              <div className="flex -space-x-2">
                {selectedPlayers.slice(0, 3).map((player, index) => (
                  <img
                    key={player.id}
                    src={player.foto}
                    alt={player.nome}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    title={player.nome}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.nome)}&size=24&background=6366f1&color=ffffff`;
                    }}
                  />
                ))}
                {selectedPlayers.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      +{selectedPlayers.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleInvite}
            disabled={selectedPlayers.length === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Convidar ({selectedPlayers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitePlayersModal;
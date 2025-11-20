import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe sessão salva
    const savedUser = localStorage.getItem('teamquest_user');
    const savedCompany = localStorage.getItem('teamquest_company');
    
    if (savedUser && savedCompany) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentCompany(JSON.parse(savedCompany));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simular chamada API
      const users = JSON.parse(localStorage.getItem('teamquest_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Email ou senha incorretos');
      }

      const company = JSON.parse(localStorage.getItem(`teamquest_company_${user.companyId}`));
      
      setCurrentUser(user);
      setCurrentCompany(company);
      setIsAuthenticated(true);
      
      localStorage.setItem('teamquest_user', JSON.stringify(user));
      localStorage.setItem('teamquest_company', JSON.stringify(company));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const { nome, email, password, cargo, nomeEmpresa } = userData;
      
      // Verificar se usuário já existe
      const users = JSON.parse(localStorage.getItem('teamquest_users') || '[]');
      if (users.find(u => u.email === email)) {
        throw new Error('Email já cadastrado');
      }

      // Gerar IDs únicos
      const companyId = Date.now().toString();
      const userId = (Date.now() + 1).toString();

      // Criar empresa
      const company = {
        id: companyId,
        nome: nomeEmpresa,
        criadoEm: new Date().toISOString(),
        configuracoes: {
          allowSelfRegistration: true,
          maxUsersPerMission: 30,
          defaultXPRewards: {
            'Fácil': 50,
            'Médio': 100,
            'Difícil': 200
          }
        }
      };

      // Criar usuário
      const user = {
        id: userId,
        nome,
        email,
        password, // Em produção, usar hash
        cargo,
        companyId,
        isAdmin: true, // Primeiro usuário é admin
        foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&size=200&background=6366f1&color=ffffff`,
        criadoEm: new Date().toISOString(),
        stats: {
          totalXP: 0,
          completedMissions: 0,
          currentStreak: 0,
          level: 1
        }
      };

      // Salvar no localStorage
      users.push(user);
      localStorage.setItem('teamquest_users', JSON.stringify(users));
      localStorage.setItem(`teamquest_company_${companyId}`, JSON.stringify(company));

      // Criar dados iniciais da empresa
      const initialUserProgress = {};
      const initialTeamRanking = [user];
      
      localStorage.setItem(`teamquest_progress_${companyId}`, JSON.stringify(initialUserProgress));
      localStorage.setItem(`teamquest_ranking_${companyId}`, JSON.stringify(initialTeamRanking));

      setCurrentUser(user);
      setCurrentCompany(company);
      setIsAuthenticated(true);
      
      localStorage.setItem('teamquest_user', JSON.stringify(user));
      localStorage.setItem('teamquest_company', JSON.stringify(company));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentCompany(null);
    setIsAuthenticated(false);
    localStorage.removeItem('teamquest_user');
    localStorage.removeItem('teamquest_company');
  };

  const addTeamMember = async (memberData) => {
    try {
      const { nome, email, cargo } = memberData;
      
      const users = JSON.parse(localStorage.getItem('teamquest_users') || '[]');
      if (users.find(u => u.email === email)) {
        throw new Error('Email já cadastrado');
      }

      const userId = Date.now().toString();
      const newUser = {
        id: userId,
        nome,
        email,
        password: 'temp123', // Senha temporária
        cargo,
        companyId: currentCompany.id,
        isAdmin: false,
        foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&size=200&background=6366f1&color=ffffff`,
        criadoEm: new Date().toISOString(),
        stats: {
          totalXP: 0,
          completedMissions: 0,
          currentStreak: 0,
          level: 1
        }
      };

      users.push(newUser);
      localStorage.setItem('teamquest_users', JSON.stringify(users));

      // Atualizar ranking da empresa
      const ranking = JSON.parse(localStorage.getItem(`teamquest_ranking_${currentCompany.id}`) || '[]');
      ranking.push(newUser);
      localStorage.setItem(`teamquest_ranking_${currentCompany.id}`, JSON.stringify(ranking));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    currentCompany,
    loading,
    login,
    register,
    logout,
    addTeamMember
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
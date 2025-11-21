const demoUsers = [
  {
    id: "demo1",
    nome: "Admin Demo",
    email: "admin@empresa.com",
    password: "admin123",
    cargo: "Administrador",
    companyId: "demo_company",
    isAdmin: true,
    foto: "https://ui-avatars.com/api/?name=Admin+Demo&size=200&background=6366f1&color=ffffff",
    criadoEm: "2024-01-01T00:00:00.000Z",
    stats: {
      totalXP: 450,
      completedMissions: 6,
      currentStreak: 3,
      level: 3
    }
  }
];

const demoCompany = {
  id: "demo_company",
  nome: "Empresa Demo",
  criadoEm: "2024-01-01T00:00:00.000Z",
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

const initializeDemoData = () => {
  const existingUsers = localStorage.getItem('teamquest_users');
  if (!existingUsers) {
    localStorage.setItem('teamquest_users', JSON.stringify(demoUsers));
    localStorage.setItem('teamquest_company_demo_company', JSON.stringify(demoCompany));
    
    const demoProgress = {
      "1": { joined: true, completed: true, progress: 100, completedDate: "2024-11-15" },
      "2": { joined: true, completed: false, progress: 60, joinedDate: "2024-11-10" },
      "4": { joined: true, completed: true, progress: 100, completedDate: "2024-11-12" }
    };
    localStorage.setItem('teamquest_progress_demo_company', JSON.stringify(demoProgress));
    
    const demoRanking = [
      {
        id: "demo1",
        nome: "Admin Demo",
        foto: "https://ui-avatars.com/api/?name=Admin+Demo&size=64&background=6366f1&color=ffffff",
        cargo: "Administrador",
        xp: 450,
        level: 3,
        position: 1
      }
    ];
    localStorage.setItem('teamquest_ranking_demo_company', JSON.stringify(demoRanking));
  }
};

export { initializeDemoData };
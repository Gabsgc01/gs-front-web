import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import ProfessionalCard from './components/ProfessionalCard';
import ProfessionalModal from './components/ProfessionalModal';
import professionalsData from './data/professionals.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extrair opções únicas para os filtros
  const areas = useMemo(() => {
    return [...new Set(professionalsData.map(p => p.area))].sort();
  }, []);

  const cities = useMemo(() => {
    return [...new Set(professionalsData.map(p => p.localizacao))].sort();
  }, []);

  const technologies = useMemo(() => {
    const allTechs = professionalsData.flatMap(p => p.habilidadesTecnicas);
    return [...new Set(allTechs)].sort();
  }, []);

  // Filtrar profissionais
  const filteredProfessionals = useMemo(() => {
    return professionalsData.filter(professional => {
      const matchesSearch = searchTerm === '' || 
        professional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.resumo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArea = selectedArea === '' || professional.area === selectedArea;
      
      const matchesCity = selectedCity === '' || professional.localizacao === selectedCity;
      
      const matchesTech = selectedTech === '' || 
        professional.habilidadesTecnicas.some(tech => tech === selectedTech);

      return matchesSearch && matchesArea && matchesCity && matchesTech;
    });
  }, [searchTerm, selectedArea, selectedCity, selectedTech]);

  const handleCardClick = (professional) => {
    setSelectedProfessional(professional);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProfessional(null), 300);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedArea('');
    setSelectedCity('');
    setSelectedTech('');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Busca e Filtros */}
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedArea={selectedArea}
            onAreaChange={setSelectedArea}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedTech={selectedTech}
            onTechChange={setSelectedTech}
            areas={areas}
            cities={cities}
            technologies={technologies}
            onClearFilters={handleClearFilters}
          />

          {/* Contador de resultados */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Exibindo <span className="font-semibold text-primary-600 dark:text-primary-400">
                {filteredProfessionals.length}
              </span> de <span className="font-semibold">{professionalsData.length}</span> profissionais
            </p>
          </div>

          {/* Grid de Cards */}
          {filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProfessionals.map(professional => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum profissional encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente ajustar os filtros ou busca
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 btn-primary"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {/* Modal */}
          <ProfessionalModal
            professional={selectedProfessional}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>© 2025 GS Network - O Futuro do Trabalho</p>
              <p className="mt-2">Desenvolvido com React + Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
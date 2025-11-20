import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';

const ProfessionalCard = ({ professional, onClick }) => {
  return (
    <div 
      className="card p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
      onClick={() => onClick(professional)}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Foto do perfil */}
        <div className="relative">
          <img
            src={professional.foto}
            alt={professional.nome}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 dark:border-primary-800"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.nome)}&background=3b82f6&color=fff&size=200`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        {/* Informações básicas */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {professional.nome}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
            {professional.cargo}
          </p>
          
          <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {professional.localizacao}
          </div>

          <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <Briefcase className="w-4 h-4 mr-1" />
            {professional.area}
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 text-center line-clamp-2 mb-4">
            {professional.resumo}
          </p>
        </div>

        {/* Skills principais */}
        <div className="w-full">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Principais Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {professional.habilidadesTecnicas.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md"
              >
                {skill}
              </span>
            ))}
            {professional.habilidadesTecnicas.length > 4 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                +{professional.habilidadesTecnicas.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Botão de ação */}
        <button className="w-full btn-primary text-sm py-2">
          Ver Perfil Completo
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
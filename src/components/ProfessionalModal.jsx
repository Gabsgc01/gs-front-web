import React from 'react';
import { X, MapPin, Briefcase, Calendar, ExternalLink, Award, Languages, Heart, MessageCircle, ThumbsUp } from 'lucide-react';

const ProfessionalModal = ({ professional, isOpen, onClose }) => {
  if (!isOpen || !professional) return null;

  const handleRecommend = () => {
    alert(`Você recomendou ${professional.nome}! 👍`);
  };

  const handleSendMessage = () => {
    alert(`Mensagem enviada para ${professional.nome}! 💬`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Perfil Profissional
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna da esquerda - Informações básicas */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <img
                  src={professional.foto}
                  alt={professional.nome}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary-100 dark:border-primary-800 mb-4"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.nome)}&background=3b82f6&color=fff&size=200`;
                  }}
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {professional.nome}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                  {professional.cargo}
                </p>
                
                <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {professional.localizacao}
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {professional.area}
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 text-center mb-6">
                  {professional.resumo}
                </p>

                {/* Botões de ação */}
                <div className="space-y-3">
                  <button
                    onClick={handleRecommend}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Recomendar Profissional
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="w-full btn-secondary flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </button>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {professional.softSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Languages className="w-4 h-4 mr-2" />
                  Idiomas
                </h4>
                <div className="space-y-2">
                  {professional.idiomas.map((idioma, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{idioma.idioma}</span>
                      <span className="text-sm text-primary-600 dark:text-primary-400">{idioma.nivel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna da direita - Informações detalhadas */}
            <div className="lg:col-span-2 space-y-6">
              {/* Habilidades Técnicas */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Habilidades Técnicas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {professional.habilidadesTecnicas.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experiências */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Experiência Profissional
                </h4>
                <div className="space-y-4">
                  {professional.experiencias.map((exp, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-4">
                      <h5 className="font-medium text-gray-900 dark:text-white">{exp.cargo}</h5>
                      <p className="text-primary-600 dark:text-primary-400 text-sm">{exp.empresa}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mb-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.inicio} - {exp.fim}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{exp.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formação */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Formação Acadêmica
                </h4>
                <div className="space-y-3">
                  {professional.formacao.map((form, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 dark:text-white">{form.curso}</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {form.instituicao} • {form.ano}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projetos */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Projetos em Destaque
                </h4>
                <div className="space-y-3">
                  {professional.projetos.map((projeto, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">{projeto.titulo}</h5>
                        <a
                          href={projeto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{projeto.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificações */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Certificações
                </h4>
                <div className="flex flex-wrap gap-2">
                  {professional.certificacoes.map((cert, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full flex items-center"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Áreas de Interesse */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Áreas de Interesse
                </h4>
                <div className="flex flex-wrap gap-2">
                  {professional.areaInteresses.map((interesse, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
                    >
                      {interesse}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
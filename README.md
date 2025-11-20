# GS Network - Rede Profissional do Futuro

Uma aplicação web interativa que simula uma rede profissional voltada ao futuro do trabalho, permitindo explorar perfis de profissionais com informações completas.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces de usuário
- **Tailwind CSS** - Framework CSS para estilização
- **Vite** - Ferramenta de build rápida para desenvolvimento
- **Lucide React** - Biblioteca de ícones
- **JavaScript (ES6+)** - Linguagem de programação

## ✨ Funcionalidades

### ✅ Implementadas
- **Cards de Profissionais**: Exibição de informações básicas (nome, foto, cargo, skills)
- **Modal Detalhado**: Visualização completa do perfil profissional
- **Sistema de Busca**: Pesquisa por nome ou cargo
- **Filtros Avançados**: Por área, cidade e tecnologia
- **Dark Mode**: Alternância entre modo claro e escuro
- **Design Responsivo**: Adaptado para diferentes tamanhos de tela
- **Botões Funcionais**: "Recomendar profissional" e "Enviar mensagem"

### 📊 Base de Dados
- **15 perfis profissionais fictícios** com informações completas:
  - Informações pessoais e acadêmicas
  - Experiências profissionais
  - Habilidades técnicas e soft skills
  - Projetos e certificações
  - Idiomas e áreas de interesse

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Header.jsx       # Cabeçalho com toggle dark mode
│   ├── ProfessionalCard.jsx    # Card do profissional
│   ├── ProfessionalModal.jsx   # Modal com detalhes
│   └── SearchAndFilters.jsx    # Busca e filtros
├── contexts/            # Contextos React
│   └── ThemeContext.jsx # Contexto do dark mode
├── data/               # Dados da aplicação
│   └── professionals.json     # Base de dados dos profissionais
├── App.jsx             # Componente principal
├── main.jsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🎨 Design

- **Interface moderna** com Tailwind CSS
- **Modo escuro** com persistência no localStorage
- **Design responsivo** para mobile, tablet e desktop
- **Animações suaves** e transições
- **Cores personalizadas** com tema consistente

## 🔧 Como Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Gabsgc01/gs-front-web.git
   cd gs-front-web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 📱 Funcionalidades da Interface

### Cards de Profissionais
- Foto do perfil com fallback automático
- Nome e cargo em destaque
- Localização e área de atuação
- Principais skills técnicas
- Indicador de status online

### Modal Detalhado
- **Informações Pessoais**: Nome, cargo, localização, resumo
- **Botões de Ação**: Recomendar e enviar mensagem (funcionais)
- **Soft Skills**: Habilidades comportamentais
- **Idiomas**: Níveis de proficiência
- **Habilidades Técnicas**: Tecnologias e ferramentas
- **Experiência Profissional**: Histórico de trabalho
- **Formação Acadêmica**: Cursos e instituições
- **Projetos**: Portfolio com links
- **Certificações**: Certificados relevantes
- **Áreas de Interesse**: Tópicos de interesse

### Sistema de Busca e Filtros
- **Busca por texto**: Nome ou cargo
- **Filtro por área**: Desenvolvimento, Design, Data Science, etc.
- **Filtro por cidade**: Localização geográfica
- **Filtro por tecnologia**: Skills técnicas específicas
- **Indicadores visuais**: Filtros ativos
- **Botão limpar**: Reset de todos os filtros

## 🌟 Recursos Avançados

- **Persistência do Dark Mode**: Configuração salva no navegador
- **Fallback de Imagens**: Avatar automático quando imagem falha
- **Responsividade Completa**: Grid adaptativo
- **Contador de Resultados**: Feedback visual da busca
- **Estado Vazio**: Mensagem quando nenhum resultado é encontrado

## 🔄 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido por Gabriel Santos** - Rede Profissional do Futuro 🚀
# TeamQuest - Sistema de Gamificação Corporativa

Uma aplicação web inovadora que utiliza gamificação para reconectar funcionários em ambientes de trabalho híbrido e remoto, fortalecendo vínculos e promovendo bem-estar através de missões colaborativas e recompensas.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces de usuário
- **Tailwind CSS** - Framework CSS para estilização
- **Vite** - Ferramenta de build rápida para desenvolvimento
- **Lucide React** - Biblioteca de ícones
- **JavaScript (ES6+)** - Linguagem de programação

## 🎯 Problema e Solução

### 🔍 Oportunidade Identificada
Com o aumento dos modelos de trabalho remoto e híbrido, surgiram desafios relacionados à:
- **Perda de vínculo** com a empresa e colegas
- **Falta de motivação** e engajamento
- **Dificuldades na comunicação** entre funcionários
- **Problemas de bem-estar mental** devido ao isolamento

### 💡 Nossa Solução: TeamQuest
Sistema de **gamificação corporativa** que transforma metas empresariais em missões colaborativas, promovendo:
- **Reconexão humana** através de desafios em grupo
- **Engajamento** por meio de recompensas e XP
- **Bem-estar mental** com interações mais saudáveis
- **Produtividade** alinhada aos objetivos da empresa

## ✨ Funcionalidades

### 🎮 Sistema de Gamificação
- **Missões Colaborativas**: Desafios baseados nas metas da empresa
- **Sistema de XP**: Pontuação por completar missões
- **Recompensas**: Prêmios definidos pela gestão
- **Ranking de Equipes**: Competição saudável entre times
- **Perfis de Funcionários**: Visualização de conquistas e progresso

### 🔧 Funcionalidades Técnicas
- **Autenticação Corporativa**: Login integrado com email da empresa
- **Gestão de Missões**: Interface para administradores criarem desafios
- **Dashboard Analytics**: Métricas de engajamento e participação
- **Dark Mode**: Alternância entre modo claro e escuro
- **Design Responsivo**: Funciona em todos os dispositivos
- **Notificações**: Alertas sobre novas missões e conquistas

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
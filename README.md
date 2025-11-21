# TeamQuest - Sistema de Gamificação Corporativa

Uma aplicação web inovadora que utiliza gamificação para reconectar funcionários em ambientes de trabalho híbrido e remoto, fortalecendo vínculos e promovendo bem-estar através de missões colaborativas e recompensas.

# TeamQuest - Membros da equipe

- **Gabriel Ciriaco RM: 563827**
- **Bernardo Hanashiro RM: 565266**
- **Marco Aurelio RM: 563827**

## Link Repositório

**https://github.com/Gabsgc01/gs-front-web**

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

### 🔐 Sistema de Autenticação
- **Registro de Empresa**: Criação de conta empresarial completa
- **Login Corporativo**: Autenticação segura com email da empresa
- **Gestão de Usuários**: Administradores podem adicionar membros da equipe
- **Controle de Acesso**: Diferentes níveis de permissão (Admin/Usuário)
- **Dados Persistentes**: Informações salvas localmente para demonstração

### 🎮 Sistema de Gamificação
- **Missões Colaborativas**: 12 desafios pré-configurados baseados em bem-estar corporativo
- **Sistema de XP**: Pontuação dinâmica por completar missões (50-250 XP)
- **Níveis de Usuário**: Sistema progressivo de 1-5 níveis baseado em XP
- **Ranking de Equipes**: Competição saudável com posicionamento visual
- **Dashboard Pessoal**: Métricas individuais e progresso de missões

### 🔧 Funcionalidades Técnicas
- **Autenticação Completa**: Sistema de login/logout com validação
- **Gestão de Estado**: Context API para autenticação e temas
- **Armazenamento Local**: Dados persistidos no localStorage
- **Design System**: Componentes reutilizáveis com Tailwind CSS
- **Dark Mode**: Alternância entre modo claro e escuro
- **Design Responsivo**: Interface adaptável a todos os dispositivos
- **Validação de Formulários**: Feedback em tempo real para usuário

### 👥 Gestão de Equipe
- **Adicionar Membros**: Interface para administradores incluírem funcionários
- **Senhas Temporárias**: Sistema de acesso inicial para novos usuários
- **Perfis Dinâmicos**: Avatares automáticos baseados no nome
- **Ranking Atualizado**: Posicionamento automático baseado em XP

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
   http://localhost:3001
   ```

## 🎯 Como Usar

### Primeira Vez (Criar Empresa)
1. Acesse a aplicação
2. Clique em "Criar conta para empresa"
3. Preencha os dados da empresa e do administrador
4. Faça login e comece a usar o sistema

### Login Demonstração
- **Email**: admin@empresa.com
- **Senha**: admin123

### Funcionalidades do Admin
- **Adicionar Membros**: Use o botão verde no header
- **Visualizar Relatórios**: Acesso completo ao dashboard e ranking
- **Gerenciar Missões**: Acompanhar progresso da equipe

### Funcionalidades do Usuário
- **Participar de Missões**: Explorar e se juntar a desafios
- **Acompanhar Progresso**: Dashboard pessoal com XP e conquistas
- **Competir no Ranking**: Ver posição na equipe

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

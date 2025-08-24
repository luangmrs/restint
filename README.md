
## 📜 Sobre o Projeto
O **RestInt** é uma **Single Page Application (SPA)** que simula as funcionalidades essenciais de uma rede social baseada em comunidade.  
O projeto foi desenvolvido utilizando **React** para o frontend e os serviços *serverless* do **Firebase** para o backend (autenticação, banco de dados e armazenamento de arquivos).

---

## ✨ Funcionalidades Principais
- ✅ **Autenticação de Usuários**: Sistema completo de cadastro e login com e-mail e senha.  
- ✅ **Feed Dinâmico**: Feed principal com rolagem infinita para visualização de posts.  
- ✅ **Criação de Posts**: Usuários podem criar publicações contendo texto e imagens.  
- ✅ **Interatividade Social**: Funcionalidades de *Curtir*, *Comentar* e *Excluir* posts.  
- ✅ **Perfis de Usuário**: Páginas de perfil dinâmicas com banner, foto, bio e lista de posts do usuário.  
- ✅ **Edição de Perfil**: Modal para edição de informações do perfil, incluindo nome, bio e troca de imagens.  
- ✅ **Upload de Imagens**: Integração com o Firebase Storage para upload de fotos de perfil, banners e imagens em posts.  
- ✅ **Roteamento**: Navegação entre páginas (Home, Perfil) utilizando React Router.  

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- [React](https://react.dev/) (Hooks e Componentes Funcionais)  
- [Vite](https://vitejs.dev/) como ferramenta de build  
- [Tailwind CSS](https://tailwindcss.com/) para estilização  
- [React Router DOM](https://reactrouter.com/) para roteamento  
- [Lucide React](https://lucide.dev/) para ícones  
- [date-fns](https://date-fns.org/) para formatação de datas  

### Backend (BaaS)
- [Firebase](https://firebase.google.com/)  
  - Authentication (gerenciamento de usuários)  
  - Firestore Database (NoSQL em tempo real)  
  - Cloud Storage (armazenamento de imagens)  

### Ambiente e Ferramentas
- [Node.js](https://nodejs.org/)  
- [Git](https://git-scm.com/) & [GitHub](https://github.com/) para controle de versão  
- ESLint & Prettier para qualidade e padronização do código  

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão LTS recomendada)  
- Git  

### Passos
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/luangmrs/restint.git
   cd seu-repositorio
2. **Instale as dependências:**
    ```bash
    npm install
3. **Configure suas chaves do Firebase:**

    -Crie um projeto no Firebase Console

    -Ative os serviços de Authentication, Firestore e Storage.

    -Crie um arquivo chamado .env na raiz do projeto.

    -Adicione suas credenciais do Firebase (Configurações do Projeto > Seus apps > -Configuração do SDK):
    ```env
    VITE_FIREBASE_API_KEY="AIza..."
    VITE_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="seu-projeto"
    VITE_FIREBASE_STORAGE_BUCKET="seu-projeto.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="..."
    VITE_FIREBASE_APP_ID="1:..."
4. **Execute a aplicação:**
    ```bash
    npm run dev


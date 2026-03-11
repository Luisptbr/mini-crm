# Frontend - Mini CRM

Este é o frontend do projeto **Mini CRM**, desenvolvido em **React** com **Material UI** e integração com o backend em Spring Boot.  
O objetivo é fornecer uma interface web clara e funcional para gestão de clientes, pedidos, estoque, movimentações e relatórios.

---

## Tecnologias utilizadas

- React
- Material UI
- Axios
- React Query

---

## Estrutura do projeto

src/
├── components/ # Componentes reutilizáveis (Dashboard, Layout, PrivateRoute, etc.)
├── hooks/ # Hooks customizados para integração com API (useClientes, usePedidos, etc.)
├── pages/ # Páginas principais (Clientes, Pedidos, Estoque, Relatórios, etc.)
├── services/ # Configuração de API (api.js)
├── App.js # Componente raiz
├── index.js # Ponto de entrada da aplicação
├── App.css, index.css # Estilos globais
└── setupTests.js # Configuração de testes

Código

---

## Instalação

1. Acesse a pasta do frontend:
   ```bash
   cd frontend-crm
   Instale as dependências:
   ```

bash
npm install
Executando o projeto
Para rodar em ambiente de desenvolvimento:

bash
npm start
O projeto ficará disponível em:

Código
http://localhost:3000
Integração com Backend
O frontend consome a API do backend disponível em:

Código
http://localhost:8080
Certifique-se de que o backend esteja rodando antes de iniciar o frontend.

Scripts úteis
npm start → inicia o servidor de desenvolvimento

npm run build → gera a versão de produção

npm test → executa testes

Funcionalidades principais
Clientes: cadastro e gerenciamento de clientes

Pedidos: criação, edição e acompanhamento de status

Estoque: controle de itens e movimentações

Relatórios: geração de relatórios gerenciais

Usuários: autenticação e controle de acesso

Contribuição
Crie uma branch a partir de develop.

Faça commits padronizados (ex.: feat, fix, docs).

Abra uma Pull Request descrevendo claramente as alterações.

Licença
Este projeto está licenciado sob os termos da licença MIT.

Código

---

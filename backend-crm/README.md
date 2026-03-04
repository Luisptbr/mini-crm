📌 Mini CRM - Backend
🚀 Sobre o projeto
Este é o backend do sistema Mini CRM para Marcenaria, desenvolvido em Spring Boot.
O objetivo é gerenciar clientes, pedidos, estoque e movimentações financeiras, com segurança e organização.

🛠️ Tecnologias utilizadas
Java 17+

Spring Boot

Spring Data JPA

Spring Security

Hibernate

H2 / PostgreSQL (dependendo da configuração)

Maven

📂 Estrutura do projeto
backend-crm/
├── src/
│ ├── main/
│ │ ├── java/com/luis/crm/marcenaria/
│ │ │ ├── controller/ # Endpoints REST (CRUD)
│ │ │ ├── service/ # Regras de negócio
│ │ │ ├── repository/ # Persistência de dados (Spring Data JPA)
│ │ │ ├── model/ # Entidades JPA (Usuario, Cliente, Pedido, Estoque, Movimentacao, etc.)
│ │ │ ├── security/ # Configuração de autenticação/autorização
│ │ │ ├── exception/ # Tratamento de erros e exceções globais
│ │ │ └── MarceneiraCrmApplication.java # Classe principal do Spring Boot
│ │ └── resources/
│ │ ├── application.yml # Configurações da aplicação
│ │ ├── banner.txt # Banner customizado ao iniciar
│ │ └── static/ # Arquivos estáticos (se houver)
│ └── test/
│ └── java/com/luis/crm/marcenaria/
│ └── MarceneiraCrmApplicationTests.java # Testes iniciais
│
├── REQUISITOS.md # Documento de requisitos do sistema
├── TESTES.postman_collection.json # Coleção de testes da API (Postman)
├── pom.xml # Configuração do Maven
└── README.md # Documentação principal do projeto

⚙️ Configuração
Clone o repositório:

bash
git clone https://github.com/seuusuario/mini-crm.git
Acesse a pasta do backend:

bash
cd backend-crm
Instale as dependências:

bash
mvn clean install
Execute a aplicação:

bash
mvn spring-boot:run
🔑 Segurança
Autenticação via Spring Security

Suporte a JWT Tokens (se configurado)

Controle de acesso por roles (ADMIN, USER)

📖 Documentação da API
Endpoints REST disponíveis em /api/...

Coleção de testes Postman incluída:
TESTES.postman_collection.json

📝 Requisitos
Veja o arquivo REQUISITOS.md para detalhes sobre funcionalidades planejadas e implementadas.

✅ Testes
Testes unitários e de integração podem ser executados com:

bash
mvn test
📌 Próximos passos
Implementar relatórios e dashboards.

Criar documentação Swagger/OpenAPI.

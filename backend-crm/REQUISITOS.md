Documento de Requisitos — Sistema CRM com Autenticação e Segurança

1. Objetivo
   O sistema tem como finalidade gerenciar clientes, pedidos e usuários de uma marcenaria, garantindo segurança da informação por meio de autenticação baseada em JWT e controle deacesso por perfis de usuário (roles).

2. Módulo de Autenticação e Usuários

2.1 Cadastro de Usuário  
✅O campo email deve ser único e não permitir duplicidade.

✅O campo nome de usuário (se existir) também deve ser único.

✅O campo email deve estar em formato válido (regex sugerida: ^[A-Za-z0-9+_.-]+@(.+)$).

✅O campo senha deve atender aos seguintes critérios:

✅Mínimo de 8 caracteres.

✅Pelo menos 1 número.

✅Pelo menos 1 letra maiúscula.

✅Pelo menos 1 letra minúscula.

✅Pelo menos 1 caractere especial (!@#$%^&\*, etc).

✅A senha deve ser armazenada criptografada utilizando BCrypt.

✅Todo novo usuário deve receber automaticamente a role "USER".

✅Apenas usuários com role "ADMIN" podem listar todos os usuários.

2.2 Login
Endpoint: POST /auth/login.

✅Autenticação via email e senha.

✅Retorna um token JWT válido.

✅O token deve conter:

✅sub (usuário/email).

✅role.

✅iat (issued at).

✅exp (expiration).

✅O token deve expirar em tempo configurado (ex.: 1 hora).

3. Módulo de Clientes

3.1 Cadastro de Cliente
✅ Campos obrigatórios: nome, email, telefone.

✅O campo email deve ser único e válido.

✅Cada cliente deve possuir um identificador único do tipo UUID.

3.2 Listagem de Clientes
✅Endpoint: GET /clientes.

✅Apenas usuários autenticados podem acessar.

✅Retorna todos os clientes cadastrados.

4. Módulo de Pedidos

4.1 Cadastro de Pedido
✅ Campos obrigatórios: descricao, status, valor, cliente_id.

✅O campo cliente_id deve referenciar um cliente existente.

✅O campo valor deve ser positivo.

✅Cada pedido deve possuir um identificador único do tipo UUID.

4.2 Listagem de Pedidos
✅Endpoint: GET /pedidos.

✅Apenas usuários autenticados podem acessar.

✅Retorna todos os pedidos cadastrados.

5. Requisitos Não Funcionais
   5.1 Segurança
   Senhas nunca devem ser armazenadas em texto puro.

JWT deve ser assinado com chave secreta segura.

Endpoints sensíveis devem exigir autenticação.

Implementar validação de entrada (e‑mail, senha, valores numéricos).

Configurar CORS para evitar acessos indevidos.

5.2 Banco de Dados
PostgreSQL com tabelas usuario, cliente, pedido.

Chaves primárias em UUID.

Índices em campos de busca frequente (email).

5.3 Performance
Tempo médio de resposta dos endpoints inferior a 500ms.

Suporte a pelo menos 100 usuários simultâneos.

6. Regras de Negócio
   Usuário novo sempre recebe role = USER.

Apenas ADMIN pode listar usuários.

Não permitir cadastro de dois usuários com o mesmo e‑mail.

Senha deve seguir política de complexidade definida.

Clientes e pedidos só podem ser acessados por usuários autenticados.

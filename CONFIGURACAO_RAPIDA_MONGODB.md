# ⚡ Configuração Rápida - MongoDB Area52

## 📋 Suas Credenciais MongoDB

**Usuário:** `wagnermocelin_db_user`  
**Senha:** `iSCEoUtchmw5cI3A`  
**Cluster:** `cluster0.iujtjjc.mongodb.net`

---

## 🎯 Opção 1: Usar o Mesmo Cluster (Banco Diferente)

Você pode usar o mesmo cluster MongoDB que já tem, apenas criando um banco novo chamado `area52`.

### String de Conexão para Area52:

```
mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@cluster0.iujtjjc.mongodb.net/area52?retryWrites=true&w=majority&appName=Cluster0
```

### Configurar no backend/.env:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@cluster0.iujtjjc.mongodb.net/area52?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=area52_secret_key_2024_change_in_production
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

### Executar Migração:

```powershell
cd backend
npm install
node scripts/migrate-zen-to-area52.js
```

**Vantagens:**
- ✅ Não precisa criar novo cluster
- ✅ Usa as mesmas credenciais
- ✅ Bancos separados no mesmo cluster (zen-personal-trainer e area52)
- ✅ Migração automática entre bancos

---

## 🎯 Opção 2: Criar Novo Cluster Separado

Se preferir ter um cluster totalmente separado:

### 1. Criar Novo Cluster no MongoDB Atlas

1. Acesse: https://cloud.mongodb.com/
2. Login com suas credenciais
3. Clique em **"Create"** → **"Build a Database"**
4. Escolha **FREE (M0)**
5. Região: **São Paulo (sa-east-1)** ou **South America**
6. Nome: `area52-cluster`
7. Clique em **"Create Cluster"**

### 2. Criar Novo Usuário (Opcional)

Ou use o mesmo usuário existente:
- **Username**: `wagnermocelin_db_user`
- **Password**: `iSCEoUtchmw5cI3A`

### 3. Configurar IP Whitelist

- Menu **"Network Access"**
- **"Add IP Address"**
- **"Allow Access from Anywhere"** (0.0.0.0/0)

### 4. Obter Nova String de Conexão

- Menu **"Database"** → **"Connect"**
- **"Connect your application"**
- Copie a string e substitua `<password>` pela senha

---

## ✅ Recomendação: Opção 1 (Mesmo Cluster)

**Use a Opção 1** porque:
- Mais rápido e simples
- Não precisa configurar nada novo
- Bancos separados no mesmo cluster
- Gratuito (dentro do limite do plano M0)

---

## 🚀 Passo a Passo Completo (Opção 1)

### 1. Configurar .env

Crie ou edite o arquivo `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@cluster0.iujtjjc.mongodb.net/area52?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=area52_secret_key_2024_change_in_production
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

### 2. Instalar Dependências

```powershell
cd backend
npm install
```

### 3. Executar Migração

```powershell
node scripts/migrate-zen-to-area52.js
```

Você verá:
```
╔════════════════════════════════════════════════════════╗
║     MIGRAÇÃO: ZEN → AREA52                             ║
╚════════════════════════════════════════════════════════╝

🔌 Conectando ao banco ZEN (origem)...
✅ Conectado ao ZEN: zen-personal-trainer

🔌 Conectando ao banco AREA52 (destino)...
✅ Conectado ao AREA52: area52

────────────────────────────────────────────────────────

📦 Migrando: users          ... ✅ 2 documentos migrados
📦 Migrando: students       ... ✅ 15 documentos migrados
📦 Migrando: workouts       ... ✅ 45 documentos migrados
...

🎉 Migração concluída! Total: XXX documentos migrados
```

### 4. Testar Backend

```powershell
npm run dev
```

Você deve ver:
```
✅ MongoDB conectado: cluster0-shard-00-00.iujtjjc.mongodb.net
📦 Database: area52
🚀 Servidor rodando na porta 5000
```

### 5. Testar Frontend

Em outro terminal:

```powershell
cd ..
npm run dev
```

Acesse: http://localhost:3000

---

## 📊 Verificar Dados no MongoDB Atlas

1. Acesse: https://cloud.mongodb.com/
2. Menu **"Database"** → **"Browse Collections"**
3. Selecione o banco **"area52"**
4. Verifique as collections:
   - users
   - students
   - workouts
   - measurements
   - schedules
   - diets
   - payments
   - configs
   - foods
   - exercises

---

## 🔒 Segurança

⚠️ **IMPORTANTE:**

1. **Nunca commite** o arquivo `.env` no Git
2. O `.gitignore` já está configurado para ignorar `.env`
3. Para produção, use variáveis de ambiente do servidor
4. Troque o `JWT_SECRET` para algo único

---

## 🆘 Problemas?

**Erro: "MongoServerError: bad auth"**
- Verifique se a senha está correta no `.env`
- Certifique-se de não ter espaços extras

**Erro: "MongooseServerSelectionError"**
- Verifique se o IP está liberado no Network Access
- Tente "Allow Access from Anywhere" (0.0.0.0/0)

**Erro: "MONGODB_URI não encontrado"**
- Certifique-se de que o arquivo `.env` está na pasta `backend/`
- Verifique se não tem erros de digitação

---

## ✅ Checklist

- [ ] Arquivo `backend/.env` criado com a string de conexão
- [ ] Dependências instaladas (`npm install`)
- [ ] Migração executada com sucesso
- [ ] Backend testado e funcionando
- [ ] Frontend testado e funcionando
- [ ] Dados verificados no MongoDB Atlas

---

**Pronto! Seu projeto Area52 está com o banco MongoDB configurado! 🎉**

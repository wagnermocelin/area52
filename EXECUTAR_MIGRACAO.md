# 🚀 Executar Migração - Area52

## ✅ Novo Cluster Criado

**Cluster:** `area52.yreusoc.mongodb.net`  
**Usuário:** `wagnermocelin_db_user`  
**Senha:** `iSCEoUtchmw5cI3A`  
**Banco:** `area52`

---

## 📋 Passo a Passo

### 1️⃣ Criar arquivo .env

Na pasta `backend/`, crie o arquivo `.env` (copie de `.env.area52`):

```powershell
# Na pasta backend
cd backend
copy .env.area52 .env
```

Ou crie manualmente com o conteúdo:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52
JWT_SECRET=area52_secret_key_2024_change_in_production
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

### 2️⃣ Instalar Dependências

```powershell
cd backend
npm install
```

### 3️⃣ Executar Migração

```powershell
node scripts/migrate-zen-to-area52.js
```

O script vai:
- ✅ Conectar ao banco **ZEN** (cluster0.iujtjjc.mongodb.net)
- ✅ Conectar ao banco **AREA52** (area52.yreusoc.mongodb.net)
- ✅ Copiar todas as 10 collections
- ✅ Mostrar progresso em tempo real

**Saída esperada:**

```
╔════════════════════════════════════════════════════════╗
║     MIGRAÇÃO: ZEN → AREA52                             ║
╚════════════════════════════════════════════════════════╝

⚠️  ATENÇÃO: Este script irá:
   1. Conectar ao banco ZEN (origem)
   2. Conectar ao banco AREA52 (destino)
   3. APAGAR todos os dados existentes no AREA52
   4. Copiar todos os dados do ZEN para o AREA52

📋 Collections que serão migradas:
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

⏳ Iniciando em 3 segundos... (Ctrl+C para cancelar)

🔌 Conectando ao banco ZEN (origem)...
✅ Conectado ao ZEN: zen-personal-trainer

🔌 Conectando ao banco AREA52 (destino)...
✅ Conectado ao AREA52: area52

────────────────────────────────────────────────────────

📦 Migrando: users          ... ✅ 2 documentos migrados
📦 Migrando: students       ... ✅ 15 documentos migrados
📦 Migrando: workouts       ... ✅ 45 documentos migrados
📦 Migrando: measurements   ... ✅ 120 documentos migrados
📦 Migrando: schedules      ... ✅ 30 documentos migrados
📦 Migrando: diets          ... ✅ 25 documentos migrados
📦 Migrando: payments       ... ✅ 180 documentos migrados
📦 Migrando: configs        ... ✅ 1 documentos migrados
📦 Migrando: foods          ... ✅ 500 documentos migrados
📦 Migrando: exercises      ... ✅ 150 documentos migrados

────────────────────────────────────────────────────────

📊 RESUMO DA MIGRAÇÃO:

✅ users           → 2 docs
✅ students        → 15 docs
✅ workouts        → 45 docs
✅ measurements    → 120 docs
✅ schedules       → 30 docs
✅ diets           → 25 docs
✅ payments        → 180 docs
✅ configs         → 1 docs
✅ foods           → 500 docs
✅ exercises       → 150 docs

────────────────────────────────────────────────────────

🎉 Migração concluída! Total: 1068 documentos migrados
```

### 4️⃣ Testar Backend

```powershell
npm run dev
```

Você deve ver:

```
✅ MongoDB conectado: area52-shard-00-00.yreusoc.mongodb.net
📦 Database: area52
🚀 Servidor rodando na porta 5000
```

### 5️⃣ Testar Frontend

Em outro terminal:

```powershell
cd ..
npm run dev
```

Acesse: **http://localhost:5173** ou **http://localhost:3000**

---

## 🔍 Verificar no MongoDB Atlas

1. Acesse: https://cloud.mongodb.com/
2. Selecione o cluster **area52**
3. Clique em **"Browse Collections"**
4. Verifique o banco **area52** com as collections:
   - ✅ users
   - ✅ students
   - ✅ workouts
   - ✅ measurements
   - ✅ schedules
   - ✅ diets
   - ✅ payments
   - ✅ configs
   - ✅ foods
   - ✅ exercises

---

## 🆘 Problemas Comuns

### Erro: "MONGODB_URI não encontrado"
**Solução:** Certifique-se de que o arquivo `.env` está na pasta `backend/`

```powershell
# Verificar se o arquivo existe
ls backend/.env

# Se não existir, copiar do template
copy backend/.env.area52 backend/.env
```

### Erro: "MongoServerError: bad auth"
**Solução:** Verifique se a senha está correta no `.env`

### Erro: "MongooseServerSelectionError"
**Solução:** 
1. Verifique se o IP está liberado no MongoDB Atlas
2. Menu **"Network Access"** → **"Add IP Address"**
3. Escolha **"Allow Access from Anywhere"** (0.0.0.0/0)

### Erro: "Collection already exists"
**Solução:** O script já limpa as collections automaticamente. Se persistir, delete manualmente no Atlas.

---

## ✅ Checklist

- [ ] Arquivo `backend/.env` criado
- [ ] Dependências instaladas (`npm install`)
- [ ] Migração executada com sucesso
- [ ] Backend testado (`npm run dev`)
- [ ] Frontend testado
- [ ] Dados verificados no MongoDB Atlas
- [ ] Login funcionando
- [ ] Dados dos alunos aparecendo

---

## 🎯 Comandos Rápidos

```powershell
# Criar .env
cd backend
copy .env.area52 .env

# Instalar e migrar
npm install
node scripts/migrate-zen-to-area52.js

# Testar backend
npm run dev

# Testar frontend (outro terminal)
cd ..
npm run dev
```

---

**Pronto! Seu projeto Area52 está com o novo banco MongoDB configurado! 🎉**

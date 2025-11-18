# 🗄️ Guia: Criar Novo Banco MongoDB e Importar Dados

Este guia mostra como criar um novo banco de dados MongoDB Atlas para o projeto Area52 e importar os dados do projeto anterior (Zen).

## 📋 Opções Disponíveis

### Opção 1: Criar Novo Banco e Migrar Dados Manualmente
### Opção 2: Usar Scripts de Migração Automática
### Opção 3: Exportar/Importar com MongoDB Tools

---

## 🚀 OPÇÃO 1: Criar Novo Banco MongoDB Atlas

### Passo 1: Criar Cluster no MongoDB Atlas

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Faça login na sua conta
3. Clique em **"Create"** ou **"Build a Database"**
4. Escolha **FREE (M0)** - 512MB gratuito
5. Selecione região próxima ao Brasil:
   - AWS: `São Paulo (sa-east-1)`
   - Google Cloud: `South America (southamerica-east1)`
6. Nome do cluster: `area52-cluster` (ou outro nome)
7. Clique em **"Create Cluster"**

### Passo 2: Configurar Acesso

#### 2.1 - Criar Usuário do Banco

1. Menu lateral → **"Database Access"**
2. Clique em **"Add New Database User"**
3. Preencha:
   - **Username**: `area52_user`
   - **Password**: Clique em "Autogenerate" e **COPIE A SENHA**
   - **Privileges**: `Read and write to any database`
4. Clique em **"Add User"**

**⚠️ GUARDE A SENHA!**

#### 2.2 - Configurar IP Whitelist

1. Menu lateral → **"Network Access"**
2. Clique em **"Add IP Address"**
3. Escolha:
   - **Desenvolvimento**: "Allow Access from Anywhere" (0.0.0.0/0)
   - **Produção**: Adicione apenas IPs específicos

### Passo 3: Obter String de Conexão

1. Menu lateral → **"Database"**
2. No cluster, clique em **"Connect"**
3. Escolha **"Connect your application"**
4. Driver: **Node.js** versão **5.5 or later**
5. Copie a string de conexão:

```
mongodb+srv://area52_user:<password>@area52-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. Substitua `<password>` pela senha real
7. Adicione o nome do banco: `/area52` antes do `?`

**String final:**
```
mongodb+srv://area52_user:SuaSenha123@area52-cluster.xxxxx.mongodb.net/area52?retryWrites=true&w=majority
```

### Passo 4: Configurar no Backend

Edite o arquivo `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://area52_user:SuaSenha123@area52-cluster.xxxxx.mongodb.net/area52?retryWrites=true&w=majority
JWT_SECRET=area52_secret_key_2024_change_in_production
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

---

## 🔄 OPÇÃO 2: Migrar Dados do Projeto Anterior

### Método A: Usar Script de Migração Existente

O projeto já tem scripts de migração prontos:

```powershell
# Na pasta backend
cd backend

# Instalar dependências
npm install

# Executar migração
node scripts/migrateToProduction.js
```

**O que este script faz:**
- Conecta ao banco antigo (zen)
- Conecta ao banco novo (area52)
- Copia todas as collections:
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

### Método B: Script Personalizado de Migração

Vou criar um script específico para migrar do Zen para Area52:

**Arquivo: `backend/scripts/migrate-zen-to-area52.js`**

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// String de conexão do banco ANTIGO (Zen)
const DB_ZEN = 'mongodb+srv://wagnermocelin_db_user:4y9r8MGYUucNF9RW@cluster0.iujtjjc.mongodb.net/zen-personal-trainer?retryWrites=true&w=majority&appName=Cluster0';

// String de conexão do banco NOVO (Area52) - do seu .env
const DB_AREA52 = process.env.MONGODB_URI;

const collections = [
  'users',
  'students',
  'workouts',
  'measurements',
  'schedules',
  'diets',
  'payments',
  'configs',
  'foods',
  'exercises'
];

async function migrateData() {
  try {
    console.log('🚀 Iniciando migração Zen → Area52\n');

    // Conectar aos dois bancos
    console.log('🔌 Conectando ao banco ZEN (origem)...');
    const connZen = await mongoose.createConnection(DB_ZEN).asPromise();
    console.log('✅ Conectado ao ZEN');

    console.log('🔌 Conectando ao banco AREA52 (destino)...');
    const connArea52 = await mongoose.createConnection(DB_AREA52).asPromise();
    console.log('✅ Conectado ao AREA52\n');

    // Migrar cada collection
    for (const collectionName of collections) {
      try {
        console.log(`📦 Migrando: ${collectionName}...`);
        
        // Buscar dados do banco antigo
        const sourceCollection = connZen.collection(collectionName);
        const data = await sourceCollection.find({}).toArray();
        
        if (data.length === 0) {
          console.log(`   ⚠️  Nenhum documento encontrado em ${collectionName}`);
          continue;
        }

        // Inserir no banco novo
        const destCollection = connArea52.collection(collectionName);
        
        // Limpar collection de destino (opcional)
        await destCollection.deleteMany({});
        
        // Inserir dados
        await destCollection.insertMany(data);
        
        console.log(`   ✅ ${data.length} documentos migrados\n`);
      } catch (error) {
        console.error(`   ❌ Erro ao migrar ${collectionName}:`, error.message);
      }
    }

    console.log('🎉 Migração concluída!\n');

    // Fechar conexões
    await connZen.close();
    await connArea52.close();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  }
}

migrateData();
```

**Para executar:**
```powershell
cd backend
node scripts/migrate-zen-to-area52.js
```

---

## 🛠️ OPÇÃO 3: Exportar/Importar com MongoDB Tools

### Passo 1: Instalar MongoDB Database Tools

Download: https://www.mongodb.com/try/download/database-tools

### Passo 2: Exportar do Banco Antigo

```powershell
# Exportar todo o banco Zen
mongodump --uri="mongodb+srv://wagnermocelin_db_user:4y9r8MGYUucNF9RW@cluster0.iujtjjc.mongodb.net/zen-personal-trainer" --out=./backup-zen

# Ou exportar collections específicas
mongodump --uri="mongodb+srv://..." --db=zen-personal-trainer --collection=users --out=./backup-zen
```

### Passo 3: Importar para o Banco Novo

```powershell
# Importar todo o banco
mongorestore --uri="mongodb+srv://area52_user:SuaSenha@area52-cluster.xxxxx.mongodb.net/area52" ./backup-zen/zen-personal-trainer

# Ou importar collections específicas
mongorestore --uri="mongodb+srv://..." --db=area52 --collection=users ./backup-zen/zen-personal-trainer/users.bson
```

---

## ✅ Verificar Migração

### Testar Conexão

```powershell
cd backend
npm run dev
```

Você deve ver:
```
✅ MongoDB conectado: area52-cluster.xxxxx.mongodb.net
📦 Database: area52
🚀 Servidor rodando na porta 5000
```

### Verificar Dados no Atlas

1. Acesse MongoDB Atlas
2. Menu **"Database"** → **"Browse Collections"**
3. Verifique se as collections foram criadas:
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

### Script de Verificação

```powershell
cd backend
node scripts/verificar-migracao.js
```

---

## 📝 Checklist Final

- [ ] Novo cluster MongoDB Atlas criado
- [ ] Usuário do banco configurado
- [ ] IP whitelist configurado
- [ ] String de conexão copiada e configurada no `.env`
- [ ] Dados migrados do banco antigo
- [ ] Conexão testada com sucesso
- [ ] Collections verificadas no Atlas
- [ ] Backend funcionando corretamente

---

## 🔒 Segurança

1. **Nunca commite** o arquivo `.env` no Git
2. **Adicione ao .gitignore**:
   ```
   backend/.env
   .env
   *.env.production
   ```
3. **Use variáveis de ambiente** no servidor de produção
4. **Troque o JWT_SECRET** para algo único e seguro
5. **Configure IP whitelist** específico em produção

---

## 🆘 Problemas Comuns

**Erro: "MongoServerError: bad auth"**
- Verifique se a senha está correta no `.env`
- Certifique-se de que substituiu `<password>` pela senha real

**Erro: "MongooseServerSelectionError"**
- Verifique se adicionou seu IP no Network Access
- Tente "Allow Access from Anywhere" (0.0.0.0/0)

**Erro: "Database not found"**
- Adicione o nome do banco na URI: `/area52?retryWrites=true`

**Erro na migração: "Duplicate key error"**
- A collection já existe no destino
- Use `deleteMany({})` antes de inserir ou use `updateMany` com upsert

---

## 📞 Próximos Passos

Após a migração:

1. **Criar primeiro usuário** (se necessário):
   ```powershell
   node scripts/createUserProduction.js
   ```

2. **Popular alimentos** (se necessário):
   ```powershell
   node seeds/foodsSeed.js
   ```

3. **Popular exercícios** (se necessário):
   ```powershell
   node seeds/exercisesSeed.js
   ```

4. **Testar a aplicação**:
   ```powershell
   # Backend
   cd backend
   npm run dev

   # Frontend (em outro terminal)
   cd ..
   npm run dev
   ```

---

**Pronto! Seu novo banco MongoDB está configurado e com os dados migrados! 🎉**

# 🔐 Testar Login - Area52

## ✅ Backend Funcionando!

O erro `401 Unauthorized` é **normal e esperado**. Significa que:
- ✅ Backend está online
- ✅ MongoDB conectado
- ✅ API respondendo corretamente
- ⚠️ Você precisa fazer login primeiro

---

## 🔍 Usuários Migrados

Você migrou **3 usuários** do banco Zen para o Area52.

### Como descobrir quais são os usuários?

#### Opção 1: Via MongoDB Atlas (Recomendado)

1. Acesse: https://cloud.mongodb.com/
2. Login
3. Selecione o cluster **area52**
4. Clique em **Browse Collections**
5. Selecione database: **area52**
6. Selecione collection: **users**
7. Veja os 3 usuários com emails e roles

#### Opção 2: Via Script Node.js

Execute no backend:

```powershell
cd backend
node -e "
import('mongoose').then(async (mongoose) => {
  await mongoose.default.connect('mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52');
  const User = mongoose.default.model('User', new mongoose.default.Schema({}, { strict: false }));
  const users = await User.find({}, 'name email role');
  console.log('Usuários:', JSON.stringify(users, null, 2));
  process.exit(0);
});
"
```

---

## 🧪 Testar Login

### Método 1: Interface Web (Mais Fácil)

1. Acesse: `https://www.area52.wuaze.com/`
2. Use o formulário de login
3. Digite email e senha de um dos usuários migrados
4. Clique em "Entrar"

### Método 2: Console do Navegador

1. Acesse: `https://www.area52.wuaze.com/`
2. Abra DevTools (F12) → Console
3. Execute:

```javascript
// Substitua com email e senha reais
const loginData = {
  email: "seu-email@exemplo.com",
  password: "sua-senha"
};

fetch('https://area52.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(loginData)
})
.then(res => res.json())
.then(data => {
  console.log('Resposta:', data);
  if (data.token) {
    localStorage.setItem('token', data.token);
    console.log('✅ Token salvo! Recarregue a página.');
    location.reload();
  }
})
.catch(err => console.error('Erro:', err));
```

### Método 3: PowerShell (Testar API)

```powershell
$body = @{
    email = "seu-email@exemplo.com"
    password = "sua-senha"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://area52.onrender.com/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Resposta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "role": "trainer"
  }
}
```

---

## 🔑 Criar Novo Usuário (Se Necessário)

Se você não lembra as senhas dos usuários migrados, crie um novo:

### Via API (PowerShell)

```powershell
$body = @{
    name = "Wagner Admin"
    email = "wagner@area52.com"
    password = "senha123"
    role = "trainer"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://area52.onrender.com/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Via Script Node.js

Crie o arquivo `backend/scripts/criar-usuario-area52.js`:

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    const hashedPassword = await bcrypt.hash('senha123', 10);

    const user = await User.create({
      name: 'Wagner Admin',
      email: 'wagner@area52.com',
      password: hashedPassword,
      role: 'trainer'
    });

    console.log('✅ Usuário criado:', user);
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

createUser();
```

Execute:
```powershell
cd backend
node scripts/criar-usuario-area52.js
```

---

## ✅ Após o Login

Depois de fazer login com sucesso:

1. ✅ Token será salvo no `localStorage`
2. ✅ Página recarregará automaticamente
3. ✅ Dados serão carregados (students, workouts, etc.)
4. ✅ Dashboard aparecerá com todas as informações

---

## 🔍 Verificar Token

No console do navegador:

```javascript
// Ver token salvo
console.log('Token:', localStorage.getItem('token'));

// Ver dados do usuário
console.log('User:', localStorage.getItem('user'));

// Limpar token (logout)
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 🆘 Problemas Comuns

### 1. "Email ou senha inválidos"

**Causa:** Credenciais incorretas

**Solução:**
1. Verifique os usuários no MongoDB Atlas
2. Ou crie um novo usuário
3. Use email e senha corretos

### 2. "Network Error" ou CORS

**Causa:** CORS não configurado

**Solução:**
1. Verifique `CORS_ORIGIN` no Render
2. Deve ser: `https://www.area52.wuaze.com`
3. Redeploy do backend

### 3. Token não salva

**Causa:** LocalStorage bloqueado

**Solução:**
1. Verifique configurações do navegador
2. Desabilite extensões que bloqueiam cookies
3. Use modo anônimo para testar

---

## 📊 Fluxo de Autenticação

```
1. Usuário digita email/senha
        ↓
2. Frontend envia POST para /api/auth/login
        ↓
3. Backend valida credenciais
        ↓
4. Backend retorna token JWT
        ↓
5. Frontend salva token no localStorage
        ↓
6. Frontend inclui token em todas as requisições
        ↓
7. Backend valida token e retorna dados
```

---

## 🎯 Comandos Úteis

### Testar rota de login
```bash
curl -X POST https://area52.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu-email@exemplo.com","password":"sua-senha"}'
```

### Testar rota protegida (com token)
```bash
curl https://area52.onrender.com/api/students \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## ✅ Checklist

- [ ] Backend online: `https://area52.onrender.com`
- [ ] MongoDB conectado (675 documentos)
- [ ] Usuários verificados no MongoDB Atlas
- [ ] Login testado e funcionando
- [ ] Token salvo no localStorage
- [ ] Dados carregando após login
- [ ] Dashboard acessível

---

**O backend está funcionando perfeitamente! Agora é só fazer login! 🎉**

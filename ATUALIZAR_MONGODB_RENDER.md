# 🔄 Atualizar MongoDB no Render - Area52

## ⚡ Ação Necessária

O backend no Render precisa ser atualizado para usar o **novo banco MongoDB** (area52).

---

## 📋 Informações

**Backend URL:** `https://area52.onrender.com`  
**Novo Banco:** `area52.yreusoc.mongodb.net`  
**Banco Antigo:** `cluster0.iujtjjc.mongodb.net` (zen-personal-trainer)

---

## 🚀 Passo a Passo

### 1️⃣ Acessar o Render Dashboard

1. Acesse: https://dashboard.render.com/
2. Faça login com sua conta
3. Localize o serviço **area52** (ou o nome atual do backend)

### 2️⃣ Atualizar a Variável MONGODB_URI

1. Clique no serviço **area52**
2. No menu lateral, clique em **Environment**
3. Procure a variável **MONGODB_URI**
4. Clique no ícone de **editar** (lápis)
5. Cole a nova string de conexão:

```
mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52
```

6. Clique em **Save Changes**

### 3️⃣ Fazer Redeploy

Após salvar a variável:

1. Vá para a aba **Manual Deploy** (ou **Events**)
2. Clique em **Deploy latest commit** ou **Clear build cache & deploy**
3. Aguarde o deploy (2-5 minutos)

### 4️⃣ Verificar Logs

Durante o deploy, acompanhe os logs:

1. Clique em **Logs** no menu lateral
2. Procure por:
   ```
   ✅ MongoDB conectado: area52-shard-00-00.yreusoc.mongodb.net
   📦 Database: area52
   🚀 Servidor rodando na porta 5000
   ```

Se aparecer isso, está tudo certo! ✅

---

## ✅ Testar o Backend

### Teste 1: Rota Principal

Abra no navegador:
```
https://area52.onrender.com
```

Deve retornar:
```json
{
  "message": "API Area52",
  "version": "1.0.0",
  "status": "online"
}
```

### Teste 2: Testar Login

Use Postman, Insomnia ou PowerShell:

```powershell
$body = @{
    email = "seu-email@exemplo.com"
    password = "sua-senha"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://area52.onrender.com/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

Se retornar um token, está funcionando! ✅

---

## 📊 Comparação: Antes vs Depois

### ❌ Antes (Banco Antigo)
```
cluster0.iujtjjc.mongodb.net/zen-personal-trainer
```
- Banco: zen-personal-trainer
- Dados: do projeto Zen

### ✅ Depois (Banco Novo)
```
area52.yreusoc.mongodb.net/area52
```
- Banco: area52
- Dados: migrados do Zen (675 documentos)

---

## 🔒 Outras Variáveis Importantes

Aproveite e verifique se estas variáveis estão configuradas:

### JWT_SECRET
```
area52_secret_key_2024_change_in_production
```
*Ou gere um novo:*
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### CORS_ORIGIN
```
https://seu-frontend.netlify.app
```
*Substitua pela URL do seu frontend*

### NODE_ENV
```
production
```

### PORT
```
5000
```

### JWT_EXPIRE
```
30d
```

---

## 🆘 Problemas Comuns

### Erro: "MongoServerError: bad auth"

**Causa:** Senha incorreta ou string mal formatada

**Solução:**
1. Verifique se copiou a string completa
2. Certifique-se de que não há espaços extras
3. Senha correta: `iSCEoUtchmw5cI3A`

### Erro: "MongooseServerSelectionError"

**Causa:** IP não está na whitelist do MongoDB Atlas

**Solução:**
1. Acesse MongoDB Atlas: https://cloud.mongodb.com/
2. Vá em **Network Access**
3. Adicione o IP: **0.0.0.0/0** (Allow from anywhere)
4. Aguarde 2-3 minutos
5. Faça redeploy no Render

### Backend não inicia após deploy

**Solução:**
1. Vá em **Settings** no Render
2. Clique em **Clear build cache & deploy**
3. Aguarde o novo deploy

---

## 📝 Checklist

- [ ] Acessei o Render Dashboard
- [ ] Localizei o serviço area52
- [ ] Atualizei a variável MONGODB_URI
- [ ] Salvei as alterações
- [ ] Fiz o redeploy manual
- [ ] Verifiquei os logs (conexão com area52 OK)
- [ ] Testei a rota principal (retorna JSON)
- [ ] Testei o login (retorna token)
- [ ] Frontend atualizado com nova URL

---

## 🎯 Próximos Passos

Após atualizar o backend:

1. ✅ **Atualizar Frontend**
   - Arquivo `src/config/api.js` já está atualizado
   - Fazer build: `npm run build`
   - Deploy do frontend

2. ✅ **Testar Aplicação Completa**
   - Login
   - Cadastro de alunos
   - Visualização de dados

3. ✅ **Commit e Push**
   ```bash
   git add .
   git commit -m "Atualizar para novo banco MongoDB area52"
   git push origin main
   ```

---

**Backend pronto para usar o novo banco MongoDB! 🎉**

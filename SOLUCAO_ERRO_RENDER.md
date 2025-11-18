# 🔧 Solução: Erro no Deploy do Render

## ❌ Erro Atual

```
Exited with status 1 while running your code.
```

**Causa:** A variável `MONGODB_URI` não está configurada no Render, então o backend não consegue conectar ao MongoDB e encerra com erro.

---

## ✅ Solução Rápida

### 1️⃣ Acessar o Render Dashboard

1. Acesse: https://dashboard.render.com/
2. Faça login
3. Localize o serviço **area52** (ou o nome do seu backend)

### 2️⃣ Adicionar/Atualizar MONGODB_URI

1. Clique no serviço
2. Menu lateral → **Environment**
3. Procure por **MONGODB_URI**
   - Se **não existir**: Clique em **Add Environment Variable**
   - Se **existir**: Clique no ícone de editar (lápis)

4. Cole a string de conexão:
```
mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52
```

5. Clique em **Save Changes**

### 3️⃣ Fazer Redeploy

Após salvar:
1. Vá para **Manual Deploy**
2. Clique em **Deploy latest commit**
3. Aguarde 2-5 minutos

### 4️⃣ Verificar Logs

Durante o deploy, acompanhe os logs:
1. Menu lateral → **Logs**
2. Procure por:
   ```
   ✅ MongoDB conectado: area52-shard-00-00.yreusoc.mongodb.net
   📦 Database: area52
   🚀 Servidor rodando na porta 5000
   ```

Se aparecer isso, está funcionando! ✅

---

## 🔍 Verificar Outras Variáveis

Certifique-se de que estas variáveis também estão configuradas:

### Variáveis Obrigatórias

| Variável | Valor |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `area52_secret_key_2024_change_in_production` |
| `JWT_EXPIRE` | `30d` |

### Variáveis Opcionais

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `CORS_ORIGIN` | URL do frontend | Ex: `https://seu-frontend.netlify.app` |
| `FRONTEND_URL` | URL do frontend | Para links em emails |

---

## 🆘 Se o Erro Persistir

### Problema 1: MongoDB não conecta

**Erro nos logs:** `MongoServerError: bad auth`

**Solução:**
1. Verifique se a senha está correta: `iSCEoUtchmw5cI3A`
2. Certifique-se de que não há espaços extras na string
3. Verifique se copiou a string completa

### Problema 2: IP não autorizado

**Erro nos logs:** `MongooseServerSelectionError`

**Solução:**
1. Acesse MongoDB Atlas: https://cloud.mongodb.com/
2. Menu **Network Access**
3. Clique em **Add IP Address**
4. Escolha **Allow Access from Anywhere** (0.0.0.0/0)
5. Aguarde 2-3 minutos
6. Faça redeploy no Render

### Problema 3: Build falha

**Erro:** `npm install` falha

**Solução:**
1. Verifique se `package.json` está correto
2. No Render, vá em **Settings**
3. Clique em **Clear build cache & deploy**

---

## 📋 Checklist de Deploy

- [ ] Variável `MONGODB_URI` configurada
- [ ] Variável `JWT_SECRET` configurada
- [ ] Variável `NODE_ENV` = `production`
- [ ] IP liberado no MongoDB Atlas (0.0.0.0/0)
- [ ] Redeploy executado
- [ ] Logs verificados (conexão OK)
- [ ] Rota principal testada (`https://area52.onrender.com`)

---

## 🧪 Testar Após Deploy

### Teste 1: Rota Principal
```
https://area52.onrender.com
```
Deve retornar:
```json
{
  "message": "API Power Training",
  "version": "1.0.0",
  "status": "online"
}
```

### Teste 2: API Health
```
https://area52.onrender.com/api/config
```

### Teste 3: Login (PowerShell)
```powershell
$body = @{
    email = "seu-email@exemplo.com"
    password = "sua-senha"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://area52.onrender.com/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

---

## 📸 Screenshots do Processo

### 1. Localizar Serviço
```
Dashboard → Selecionar "area52"
```

### 2. Adicionar Variável
```
Environment → Add Environment Variable
Key: MONGODB_URI
Value: mongodb+srv://...
```

### 3. Verificar Logs
```
Logs → Procurar por "✅ MongoDB conectado"
```

---

## 🔄 Comandos Úteis

### Forçar Novo Deploy (Git)
```bash
git commit --allow-empty -m "Trigger Render deploy"
git push origin main
```

### Ver Logs Localmente
```powershell
cd backend
npm start
```

---

## 📞 Links Importantes

- **Render Dashboard:** https://dashboard.render.com/
- **MongoDB Atlas:** https://cloud.mongodb.com/
- **Backend URL:** https://area52.onrender.com
- **Documentação Render:** https://render.com/docs

---

## ✅ Próximos Passos Após Correção

1. ✅ Verificar que o backend está online
2. ✅ Testar todas as rotas da API
3. ✅ Atualizar frontend se necessário
4. ✅ Fazer build e deploy do frontend
5. ✅ Testar aplicação completa

---

**Após configurar o MONGODB_URI, o deploy deve funcionar! 🚀**

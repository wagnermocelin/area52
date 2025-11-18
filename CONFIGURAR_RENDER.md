# 🚀 Configurar Backend no Render - Area52

## 📋 Informações do Deploy

**URL do Backend:** `https://area52.onrender.com`  
**Repositório:** `https://github.com/wagnermocelin/area52`  
**Branch:** `main`

---

## ⚙️ Variáveis de Ambiente no Render

Acesse o painel do Render e configure as seguintes variáveis de ambiente:

### 1. Acessar Configurações

1. Acesse: https://dashboard.render.com/
2. Selecione o serviço **area52**
3. Vá em **Environment** → **Environment Variables**

### 2. Configurar Variáveis

Adicione/atualize as seguintes variáveis:

#### **MONGODB_URI** (IMPORTANTE - ATUALIZAR!)
```
mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52
```

#### **NODE_ENV**
```
production
```

#### **PORT**
```
5000
```

#### **JWT_SECRET**
```
area52_secret_key_2024_change_in_production
```
*Ou gere um novo com: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`*

#### **JWT_EXPIRE**
```
30d
```

#### **CORS_ORIGIN**
```
https://seu-frontend.netlify.app
```
*Ou o domínio onde seu frontend está hospedado*

#### **FRONTEND_URL** (opcional)
```
https://seu-frontend.netlify.app
```

---

## 🔄 Atualizar MongoDB URI

### Passo 1: Copiar a String de Conexão

A nova string de conexão do banco Area52:
```
mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52
```

### Passo 2: Atualizar no Render

1. Acesse: https://dashboard.render.com/
2. Selecione o serviço **area52**
3. Vá em **Environment**
4. Encontre a variável **MONGODB_URI**
5. Clique em **Edit**
6. Cole a nova string de conexão
7. Clique em **Save Changes**

### Passo 3: Fazer Redeploy

Após atualizar a variável:
1. Vá em **Manual Deploy**
2. Clique em **Deploy latest commit**
3. Aguarde o deploy (2-5 minutos)

---

## ✅ Verificar se Está Funcionando

### 1. Testar Rota Principal

Acesse no navegador:
```
https://area52.onrender.com
```

Deve retornar algo como:
```json
{
  "message": "API Area52",
  "version": "1.0.0",
  "status": "online"
}
```

### 2. Testar Conexão com MongoDB

Acesse:
```
https://area52.onrender.com/api/health
```

Ou verifique os logs no Render:
```
✅ MongoDB conectado: area52-shard-00-00.yreusoc.mongodb.net
📦 Database: area52
🚀 Servidor rodando na porta 5000
```

### 3. Testar Rota de Autenticação

```bash
curl -X POST https://area52.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu-email@exemplo.com","password":"sua-senha"}'
```

---

## 📝 Checklist de Deploy

- [ ] Repositório GitHub atualizado com novo código
- [ ] Variável `MONGODB_URI` atualizada no Render
- [ ] Outras variáveis de ambiente configuradas
- [ ] Deploy manual executado
- [ ] Rota principal testada (`https://area52.onrender.com`)
- [ ] Conexão com MongoDB verificada
- [ ] Login testado
- [ ] Frontend atualizado com nova URL

---

## 🔧 Atualizar Frontend

Após configurar o backend, atualize o frontend:

### Arquivo: `src/config/api.js`

```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://area52.onrender.com/api'  // ✅ Atualizado
  : 'http://localhost:5000/api';
```

### Fazer Build e Deploy

```powershell
npm run build
# Depois faça upload do dist/ para seu servidor
```

---

## 🆘 Problemas Comuns

### Backend não conecta ao MongoDB

**Erro nos logs:** `MongoServerError: bad auth`

**Solução:**
1. Verifique se a string `MONGODB_URI` está correta
2. Certifique-se de que não há espaços extras
3. Verifique se a senha está correta: `iSCEoUtchmw5cI3A`

### Backend não inicia

**Erro nos logs:** `Error: Cannot find module`

**Solução:**
1. Verifique se `package.json` está correto
2. Force um rebuild: **Settings** → **Clear build cache & deploy**

### CORS Error no Frontend

**Erro:** `Access to fetch blocked by CORS policy`

**Solução:**
1. Atualize `CORS_ORIGIN` no Render com a URL do frontend
2. Exemplo: `https://seu-frontend.netlify.app`
3. Faça redeploy

---

## 📊 Monitoramento

### Ver Logs em Tempo Real

1. Acesse: https://dashboard.render.com/
2. Selecione o serviço **area52**
3. Vá em **Logs**
4. Acompanhe os logs em tempo real

### Métricas

- **CPU Usage**: Deve ficar abaixo de 50%
- **Memory**: Deve ficar abaixo de 512MB (limite do plano free)
- **Response Time**: Deve ser < 2s

---

## 🔄 Comandos Úteis

### Forçar Redeploy
```bash
git commit --allow-empty -m "Trigger Render deploy"
git push origin main
```

### Ver Variáveis de Ambiente (local)
```powershell
cd backend
type .env
```

---

## 📞 URLs Importantes

- **Dashboard Render:** https://dashboard.render.com/
- **Backend:** https://area52.onrender.com
- **API:** https://area52.onrender.com/api
- **MongoDB Atlas:** https://cloud.mongodb.com/
- **GitHub Repo:** https://github.com/wagnermocelin/area52

---

**Backend Area52 configurado e pronto para uso! 🎉**

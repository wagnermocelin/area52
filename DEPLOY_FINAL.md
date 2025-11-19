# 🚀 Deploy Final - Area52

## ✅ Problema Resolvido

O frontend agora está configurado para usar o backend do Render diretamente:
- **Frontend:** `https://www.area52.wuaze.com/`
- **API:** `https://area52.onrender.com/api`

---

## 📦 Build Concluído

✅ Build executado com sucesso!
- Pasta `dist/` criada
- API configurada para: `https://area52.onrender.com/api`

---

## 🔧 Configuração do Backend (Render)

### 1. Acessar Render Dashboard

https://dashboard.render.com/

### 2. Configurar Variáveis de Ambiente

Serviço: **area52**

#### Variáveis Obrigatórias:

```env
# MongoDB - CRÍTICO!
MONGODB_URI=mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52

# Node
NODE_ENV=production
PORT=5000

# JWT
JWT_SECRET=area52_secret_key_2024_change_in_production
JWT_EXPIRE=30d

# CORS - IMPORTANTE!
CORS_ORIGIN=https://www.area52.wuaze.com

# Frontend URL
FRONTEND_URL=https://www.area52.wuaze.com
```

### 3. Salvar e Redeploy

1. Clique em **Save Changes**
2. Vá em **Manual Deploy**
3. Clique em **Deploy latest commit**
4. Aguarde 2-5 minutos

### 4. Verificar Logs

Menu **Logs** → Procure por:
```
✅ MongoDB conectado: area52-shard-00-00.yreusoc.mongodb.net
📦 Database: area52
🚀 Servidor rodando na porta 5000
```

---

## 📤 Upload do Frontend

### Arquivos para Upload

Faça upload de **TODOS** os arquivos da pasta `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-BTnm5i3Z.css
│   └── index-BMYhCJYa.js
└── (outros arquivos)
```

### Onde fazer upload?

Para o servidor onde está hospedado `www.area52.wuaze.com`

#### Se estiver usando InfinityFree:

1. Acesse o File Manager
2. Vá para a pasta `htdocs/` ou `public_html/`
3. **Delete** todos os arquivos antigos
4. Faça upload de todos os arquivos da pasta `dist/`
5. Certifique-se de que `index.html` está na raiz

#### Se estiver usando FTP:

```powershell
# Use FileZilla ou WinSCP
# Conecte ao servidor
# Navegue até a pasta pública (htdocs/public_html)
# Upload da pasta dist/*
```

---

## 🧪 Testar Aplicação

### 1. Testar Backend (Render)

```bash
curl https://area52.onrender.com
```

**Esperado:**
```json
{
  "message": "API Power Training",
  "version": "1.0.0",
  "status": "online"
}
```

### 2. Testar Frontend

1. Acesse: `https://www.area52.wuaze.com/`
2. Abra DevTools (F12) → Console
3. Verifique se não há erros
4. Tente fazer login

### 3. Testar Login

Use as credenciais dos usuários migrados do banco Zen.

---

## 🔍 Verificar Requisições

No DevTools (F12) → Network:

1. Recarregue a página
2. Faça login
3. Verifique as requisições para:
   - `https://area52.onrender.com/api/auth/login`
   - `https://area52.onrender.com/api/students`
   - etc.

**Todas devem retornar JSON, não HTML!**

---

## ✅ Checklist de Deploy

### Backend (Render)
- [ ] `MONGODB_URI` configurado
- [ ] `CORS_ORIGIN` configurado para `www.area52.wuaze.com`
- [ ] `JWT_SECRET` configurado
- [ ] `NODE_ENV=production`
- [ ] Deploy concluído
- [ ] Logs mostram conexão com MongoDB
- [ ] Rota principal testada e retorna JSON

### Frontend (www.area52.wuaze.com)
- [ ] Build executado (`npm run build`)
- [ ] Pasta `dist/` criada
- [ ] Arquivos enviados para servidor
- [ ] `index.html` na raiz
- [ ] Site acessível
- [ ] Console sem erros CORS
- [ ] Login funcionando
- [ ] Dados carregando

---

## 🆘 Problemas Comuns

### 1. CORS Error

**Erro:** `Access to fetch blocked by CORS policy`

**Solução:**
1. Verifique `CORS_ORIGIN` no Render
2. Deve ser exatamente: `https://www.area52.wuaze.com`
3. Sem barra no final!
4. Redeploy do backend

### 2. Backend não conecta ao MongoDB

**Erro:** `MongoServerError: bad auth`

**Solução:**
1. Verifique `MONGODB_URI` no Render
2. Copie a string completa do arquivo `backend/.env.render`
3. Certifique-se de que não há espaços extras

### 3. API retorna HTML

**Erro:** `Unexpected token '<'`

**Solução:**
1. Verifique se o backend está online: `https://area52.onrender.com`
2. Teste a rota: `https://area52.onrender.com/api`
3. Verifique logs do Render

### 4. Login não funciona

**Solução:**
1. Verifique se o MongoDB tem dados (675 documentos)
2. Teste login direto na API via Postman/curl
3. Verifique se o `JWT_SECRET` está configurado

---

## 📊 Arquitetura Final

```
┌─────────────────────────────────────────────────┐
│  Frontend                                       │
│  https://www.area52.wuaze.com/                  │
│  (Hospedado no seu servidor)                    │
└─────────────────────────────────────────────────┘
                    │
                    │ API Calls (CORS habilitado)
                    ↓
┌─────────────────────────────────────────────────┐
│  Backend (Render)                               │
│  https://area52.onrender.com/api                │
│  CORS_ORIGIN=www.area52.wuaze.com               │
└─────────────────────────────────────────────────┘
                    │
                    │ MongoDB Connection
                    ↓
┌─────────────────────────────────────────────────┐
│  MongoDB Atlas                                  │
│  area52.yreusoc.mongodb.net/area52              │
│  675 documentos migrados                        │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Comandos Úteis

### Rebuild Frontend
```powershell
npm run build
```

### Testar Backend
```bash
curl https://area52.onrender.com
curl https://area52.onrender.com/api
```

### Testar Login (PowerShell)
```powershell
$body = @{
    email = "seu-email@exemplo.com"
    password = "sua-senha"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://area52.onrender.com/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

---

## 📞 Links Importantes

- **Frontend:** https://www.area52.wuaze.com/
- **Backend:** https://area52.onrender.com
- **API:** https://area52.onrender.com/api
- **Render Dashboard:** https://dashboard.render.com/
- **MongoDB Atlas:** https://cloud.mongodb.com/
- **GitHub:** https://github.com/wagnermocelin/area52

---

## 📝 Resumo

1. ✅ Frontend configurado para usar `area52.onrender.com/api`
2. ✅ Build executado com sucesso
3. ⚠️ **PRÓXIMO PASSO:** Configurar variáveis no Render
4. ⚠️ **PRÓXIMO PASSO:** Upload da pasta `dist/` para servidor
5. ⚠️ **PRÓXIMO PASSO:** Testar aplicação completa

---

**Após configurar o Render e fazer upload, a aplicação estará 100% funcional! 🎉**

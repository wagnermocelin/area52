# 🎨 Configuração do Frontend - Area52

## ✅ Status Atual

O frontend já está configurado corretamente para usar o backend Area52!

### Arquivo Principal: `src/config/api.js`

```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://area52.onrender.com/api'  // ✅ Produção - Render
  : 'http://localhost:5000/api';        // ✅ Desenvolvimento - Local
```

**Configuração automática:**
- `npm run dev` → usa `http://localhost:5000/api`
- `npm run build` → usa `https://area52.onrender.com/api`

---

## 🧪 Testar Localmente

### 1. Iniciar Backend Local

```powershell
cd backend
npm run dev
```

Deve aparecer:
```
✅ MongoDB conectado: area52-shard-00-00.yreusoc.mongodb.net
📦 Database: area52
🚀 Servidor rodando na porta 5000
```

### 2. Iniciar Frontend

Em outro terminal:

```powershell
cd ..
npm run dev
```

Acesse: http://localhost:5173 (ou http://localhost:3000)

### 3. Testar Login

Use as credenciais dos usuários migrados do banco Zen.

---

## 🚀 Build para Produção

### 1. Fazer Build

```powershell
npm run build
```

Isso vai:
- Criar a pasta `dist/`
- Usar automaticamente `https://area52.onrender.com/api`
- Otimizar o código

### 2. Testar Build Localmente

```powershell
npm run preview
```

---

## 📦 Deploy do Frontend

### Opção 1: Netlify

#### Via Interface Web

1. Acesse: https://app.netlify.com/
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte ao GitHub: `wagnermocelin/area52`
4. Configure:
   - **Branch:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clique em **"Deploy site"**

#### Via CLI

```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Opção 2: Vercel

#### Via Interface Web

1. Acesse: https://vercel.com/
2. Clique em **"Add New"** → **"Project"**
3. Importe: `wagnermocelin/area52`
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**

#### Via CLI

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🔧 Configuração Avançada

### Variáveis de Ambiente (Opcional)

Se quiser usar variáveis de ambiente personalizadas:

#### Criar `.env.production`

```env
VITE_API_URL=https://area52.onrender.com/api
```

#### Usar no Código

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

---

## 🌐 CORS no Backend

Após fazer deploy do frontend, atualize o CORS no backend:

### 1. Acessar Render Dashboard

1. Acesse: https://dashboard.render.com/
2. Selecione o serviço **area52**
3. Vá em **Environment**

### 2. Atualizar CORS_ORIGIN

Adicione/edite a variável:

```
CORS_ORIGIN=https://seu-frontend.netlify.app
```

Ou para múltiplos domínios:

```
CORS_ORIGIN=https://seu-frontend.netlify.app,https://seu-frontend.vercel.app
```

### 3. Redeploy

Faça redeploy do backend após alterar.

---

## ✅ Checklist de Deploy

### Backend
- [ ] MONGODB_URI configurado no Render
- [ ] Backend deployado e funcionando
- [ ] Rota principal testada (`https://area52.onrender.com`)
- [ ] CORS_ORIGIN configurado com URL do frontend

### Frontend
- [ ] `src/config/api.js` apontando para `area52.onrender.com`
- [ ] Build executado (`npm run build`)
- [ ] Deploy realizado (Netlify/Vercel)
- [ ] Site acessível
- [ ] Login funcionando
- [ ] Dados carregando corretamente

---

## 🧪 Testar Aplicação Completa

### 1. Testar Backend

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

### 2. Testar Frontend

Acesse seu site e teste:
- [ ] Login
- [ ] Dashboard carrega
- [ ] Lista de alunos aparece
- [ ] Cadastro de novo aluno
- [ ] Visualização de treinos
- [ ] Todas as funcionalidades

---

## 🆘 Problemas Comuns

### Frontend não conecta ao backend

**Erro no console:** `Failed to fetch` ou `Network Error`

**Soluções:**
1. Verifique se o backend está online: `https://area52.onrender.com`
2. Verifique CORS no backend (variável `CORS_ORIGIN`)
3. Limpe o cache do navegador: `Ctrl + Shift + R`
4. Verifique `src/config/api.js` - URL correta?

### Build falha

**Erro:** `Module not found` ou similar

**Soluções:**
1. Delete `node_modules` e `package-lock.json`
2. Execute `npm install`
3. Execute `npm run build` novamente

### Deploy no Netlify/Vercel falha

**Soluções:**
1. Verifique se `package.json` tem o script `build`
2. Verifique se todas as dependências estão no `package.json`
3. Veja os logs de build no painel

---

## 📊 Estrutura Final

```
┌─────────────────────────────────────────────────┐
│  Frontend (Netlify/Vercel)                      │
│  https://seu-frontend.netlify.app               │
└─────────────────────────────────────────────────┘
                    │
                    │ API Calls
                    ↓
┌─────────────────────────────────────────────────┐
│  Backend (Render)                               │
│  https://area52.onrender.com/api                │
└─────────────────────────────────────────────────┘
                    │
                    │ MongoDB Connection
                    ↓
┌─────────────────────────────────────────────────┐
│  MongoDB Atlas                                  │
│  area52.yreusoc.mongodb.net/area52              │
│  675 documentos                                 │
└─────────────────────────────────────────────────┘
```

---

## 📞 URLs Importantes

- **GitHub:** https://github.com/wagnermocelin/area52
- **Backend:** https://area52.onrender.com
- **API:** https://area52.onrender.com/api
- **Render Dashboard:** https://dashboard.render.com/
- **Netlify:** https://app.netlify.com/
- **Vercel:** https://vercel.com/

---

## 🎯 Comandos Rápidos

```powershell
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Deploy Netlify
netlify deploy --prod

# Deploy Vercel
vercel --prod
```

---

**Frontend configurado e pronto para deploy! 🎨**

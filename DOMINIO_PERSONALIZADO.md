# 🌐 Domínio Personalizado - Area52

## ✅ Configuração Atualizada

**Domínio:** `https://www.area52.wuaze.com/`

---

## 📋 Alterações Realizadas

### 1. Frontend Atualizado

**`src/config/api.js`**
```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://www.area52.wuaze.com/api'  // Produção
  : 'http://localhost:5000/api';         // Desenvolvimento
```

**`.env.production`**
```env
VITE_API_URL=https://www.area52.wuaze.com/api
```

---

## 🔧 Configurações Necessárias

### 1. Backend (Render) - Atualizar CORS

O backend precisa aceitar requisições do domínio personalizado:

1. Acesse: https://dashboard.render.com/
2. Selecione o serviço **area52**
3. Vá em **Environment**
4. Adicione/Atualize:

```
CORS_ORIGIN=https://www.area52.wuaze.com
```

5. **Save Changes** e **Redeploy**

### 2. DNS/Proxy (InfinityFree ou similar)

Se você está usando InfinityFree ou outro serviço:

#### Configurar Proxy Reverso

O domínio `www.area52.wuaze.com` precisa fazer proxy para o backend no Render.

**Opção A: Configurar no .htaccess (InfinityFree)**

Crie/edite `.htaccess` na raiz:

```apache
# Habilitar Rewrite
RewriteEngine On

# Proxy para API
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ https://area52.onrender.com/api/$1 [P,L]

# Redirecionar outras requisições para o frontend
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```

**Opção B: Usar Subdomínio para API**

- Frontend: `https://www.area52.wuaze.com/`
- API: `https://api.area52.wuaze.com/` → Proxy para Render

---

## 🚀 Deploy Atualizado

### 1. Build do Frontend

```powershell
npm run build
```

Isso vai gerar a pasta `dist/` com a configuração para `www.area52.wuaze.com/api`

### 2. Upload para Servidor

Faça upload da pasta `dist/` para o servidor onde está hospedado `www.area52.wuaze.com`

### 3. Testar

Acesse: `https://www.area52.wuaze.com/`

---

## 🧪 Testar Configuração

### 1. Testar API Diretamente

```bash
curl https://www.area52.wuaze.com/api
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

1. Acesse: `https://www.area52.wuaze.com/`
2. Abra DevTools (F12) → Console
3. Verifique se as requisições estão indo para `/api`
4. Faça login e teste

---

## 🔍 Estrutura de URLs

### Desenvolvimento
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`
- **API:** `http://localhost:5000/api`

### Produção
- **Frontend:** `https://www.area52.wuaze.com/`
- **Backend (Render):** `https://area52.onrender.com`
- **API (via proxy):** `https://www.area52.wuaze.com/api`

---

## ⚙️ Configuração Completa do Backend

No Render, configure estas variáveis:

```env
# MongoDB
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

---

## 🆘 Problemas Comuns

### CORS Error

**Erro:** `Access to fetch blocked by CORS policy`

**Solução:**
1. Verifique `CORS_ORIGIN` no Render
2. Deve ser: `https://www.area52.wuaze.com`
3. Faça redeploy do backend

### API não responde

**Erro:** `Failed to fetch` ou `404`

**Solução:**
1. Verifique se o proxy está configurado corretamente
2. Teste diretamente: `https://area52.onrender.com/api`
3. Verifique logs do servidor

### Certificado SSL

**Erro:** `NET::ERR_CERT_AUTHORITY_INVALID`

**Solução:**
1. Certifique-se de que o domínio tem certificado SSL válido
2. Use HTTPS em todas as URLs
3. Verifique configuração do DNS

---

## 📊 Arquitetura Final

```
┌─────────────────────────────────────────────────┐
│  Domínio Personalizado                          │
│  https://www.area52.wuaze.com/                  │
│  (Frontend hospedado)                           │
└─────────────────────────────────────────────────┘
                    │
                    │ /api/* → Proxy
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

## ✅ Checklist

- [ ] `src/config/api.js` atualizado para `www.area52.wuaze.com`
- [ ] `.env.production` atualizado
- [ ] `CORS_ORIGIN` configurado no Render
- [ ] `MONGODB_URI` configurado no Render
- [ ] Proxy configurado (se necessário)
- [ ] Build executado (`npm run build`)
- [ ] Upload para servidor
- [ ] Site acessível em `www.area52.wuaze.com`
- [ ] API funcionando via proxy
- [ ] Login testado
- [ ] Todas funcionalidades testadas

---

## 🎯 Comandos Rápidos

```powershell
# Build
npm run build

# Testar API
curl https://www.area52.wuaze.com/api

# Testar backend direto
curl https://area52.onrender.com/api
```

---

**Domínio personalizado configurado! 🌐**

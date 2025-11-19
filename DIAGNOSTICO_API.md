# 🔍 Diagnóstico: API Retornando HTML

## ❌ Problema Identificado

**Erro:** `Unexpected token '<', "<!doctype "... is not valid JSON`

**Causa:** A API está retornando HTML ao invés de JSON. Isso acontece quando:
1. A URL da API não existe ou está incorreta
2. O servidor está retornando uma página de erro 404
3. O proxy reverso não está configurado

---

## 🎯 Situação Atual

### URLs Configuradas no Frontend
- **Produção:** `https://www.area52.wuaze.com/api`
- **Desenvolvimento:** `http://localhost:5000/api`

### Backend Real
- **Render:** `https://area52.onrender.com/api`

---

## ✅ Soluções Possíveis

### Opção 1: Usar Backend do Render Diretamente (RECOMENDADO)

Esta é a solução mais simples e rápida:

#### 1. Atualizar `src/config/api.js`

```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://area52.onrender.com/api'  // Backend direto no Render
  : 'http://localhost:5000/api';        // Desenvolvimento - Local
```

#### 2. Configurar CORS no Render

```
CORS_ORIGIN=https://www.area52.wuaze.com
```

#### 3. Rebuild e Deploy

```powershell
npm run build
# Upload dist/ para www.area52.wuaze.com
```

---

### Opção 2: Configurar Proxy no Servidor

Se você quer que as requisições passem por `www.area52.wuaze.com/api`:

#### A. Se estiver usando Apache (.htaccess)

Crie/edite `.htaccess` na raiz do site:

```apache
# Habilitar Rewrite
RewriteEngine On

# Proxy para API do Render
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ https://area52.onrender.com/api/$1 [P,L]

# Frontend - redirecionar para index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```

#### B. Se estiver usando Nginx

```nginx
location /api/ {
    proxy_pass https://area52.onrender.com/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

### Opção 3: Usar Subdomínio para API

Criar um subdomínio separado:

- **Frontend:** `https://www.area52.wuaze.com/`
- **API:** `https://api.area52.wuaze.com/` → Proxy para Render

---

## 🚀 Solução Rápida (RECOMENDADA)

Vou atualizar o código para usar o backend do Render diretamente:

### 1. Atualizar configuração

```javascript
// src/config/api.js
const API_URL = import.meta.env.PROD 
  ? 'https://area52.onrender.com/api'
  : 'http://localhost:5000/api';
```

### 2. Configurar CORS no Render

No painel do Render:
```
CORS_ORIGIN=https://www.area52.wuaze.com
```

### 3. Rebuild

```powershell
npm run build
```

---

## 🧪 Testar API

### Teste 1: Backend Render (Direto)

```bash
curl https://area52.onrender.com/api
```

**Esperado:** JSON com erro de rota ou lista de rotas

### Teste 2: Rota Principal

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

### Teste 3: Via Domínio (Se proxy configurado)

```bash
curl https://www.area52.wuaze.com/api
```

---

## 📊 Comparação das Opções

| Opção | Prós | Contras | Complexidade |
|-------|------|---------|--------------|
| **Backend Direto** | Simples, funciona imediatamente | URL do Render exposta | ⭐ Fácil |
| **Proxy no Servidor** | URL limpa, controle total | Requer configuração do servidor | ⭐⭐ Médio |
| **Subdomínio** | Profissional, escalável | Requer DNS e certificado | ⭐⭐⭐ Difícil |

---

## ⚠️ Importante

### Se o Backend Render não estiver funcionando:

1. **Verifique se está online:**
   ```
   https://area52.onrender.com
   ```

2. **Configure MONGODB_URI no Render:**
   ```
   MONGODB_URI=mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52
   ```

3. **Verifique os logs no Render:**
   - Dashboard → area52 → Logs
   - Procure por erros de conexão

---

## 🎯 Próximos Passos

1. Escolher uma das opções acima
2. Implementar a solução
3. Rebuild do frontend
4. Upload para servidor
5. Testar login e funcionalidades

---

**Recomendo usar a Opção 1 (Backend Direto) por ser mais simples e confiável! 🚀**

// Configuração da URL da API
// Em produção: usa backend do Render (direto)
// Em desenvolvimento: usa localhost

const API_URL = import.meta.env.PROD 
  ? 'https://area52.onrender.com/api'  // Produção - Render (Backend)
  : 'http://localhost:5000/api';        // Desenvolvimento - Local

export default API_URL;

// ✅ Configuração automática:
// - npm run dev → localhost:5000
// - npm run build → area52.onrender.com
// 
// Frontend hospedado em: www.area52.wuaze.com
// Backend/API no Render: area52.onrender.com

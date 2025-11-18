// Configuração da URL da API
// Em produção: usa domínio personalizado
// Em desenvolvimento: usa localhost

const API_URL = import.meta.env.PROD 
  ? 'https://www.area52.wuaze.com/api'  // Produção - Domínio Personalizado
  : 'http://localhost:5000/api';         // Desenvolvimento - Local

export default API_URL;

// ✅ Configuração automática:
// - npm run dev → localhost:5000
// - npm run build → www.area52.wuaze.com

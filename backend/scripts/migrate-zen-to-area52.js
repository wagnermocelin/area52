import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

// String de conexão do banco ANTIGO (Zen)
const DB_ZEN = 'mongodb+srv://wagnermocelin_db_user:4y9r8MGYUucNF9RW@cluster0.iujtjjc.mongodb.net/zen-personal-trainer?retryWrites=true&w=majority&appName=Cluster0';

// String de conexão do banco NOVO (Area52) - do seu .env
const DB_AREA52 = process.env.MONGODB_URI || 'mongodb+srv://wagnermocelin_db_user:iSCEoUtchmw5cI3A@area52.yreusoc.mongodb.net/area52?retryWrites=true&w=majority&appName=area52';

const collections = [
  'users',
  'students',
  'workouts',
  'measurements',
  'schedules',
  'diets',
  'payments',
  'configs',
  'foods',
  'exercises'
];

async function migrateData() {
  let connZen, connArea52;
  
  try {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║     MIGRAÇÃO: ZEN → AREA52                             ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    if (!DB_AREA52) {
      throw new Error('❌ MONGODB_URI não encontrado no arquivo .env');
    }

    // Conectar aos dois bancos
    console.log('🔌 Conectando ao banco ZEN (origem)...');
    connZen = await mongoose.createConnection(DB_ZEN).asPromise();
    console.log('✅ Conectado ao ZEN:', connZen.name);

    console.log('\n🔌 Conectando ao banco AREA52 (destino)...');
    connArea52 = await mongoose.createConnection(DB_AREA52).asPromise();
    console.log('✅ Conectado ao AREA52:', connArea52.name);
    console.log('\n' + '─'.repeat(60) + '\n');

    let totalMigrated = 0;
    const results = [];

    // Migrar cada collection
    for (const collectionName of collections) {
      try {
        process.stdout.write(`📦 Migrando: ${collectionName.padEnd(15)}... `);
        
        // Verificar se a collection existe no banco de origem
        const sourceCollections = await connZen.db.listCollections({ name: collectionName }).toArray();
        
        if (sourceCollections.length === 0) {
          console.log('⚠️  Collection não existe no banco origem');
          results.push({ collection: collectionName, status: 'não existe', count: 0 });
          continue;
        }

        // Buscar dados do banco antigo
        const sourceCollection = connZen.collection(collectionName);
        const data = await sourceCollection.find({}).toArray();
        
        if (data.length === 0) {
          console.log('⚠️  Nenhum documento encontrado');
          results.push({ collection: collectionName, status: 'vazia', count: 0 });
          continue;
        }

        // Inserir no banco novo
        const destCollection = connArea52.collection(collectionName);
        
        // Limpar collection de destino (CUIDADO: isso apaga dados existentes!)
        await destCollection.deleteMany({});
        
        // Inserir dados
        await destCollection.insertMany(data);
        
        console.log(`✅ ${data.length} documentos migrados`);
        results.push({ collection: collectionName, status: 'sucesso', count: data.length });
        totalMigrated += data.length;
        
      } catch (error) {
        console.log(`❌ Erro: ${error.message}`);
        results.push({ collection: collectionName, status: 'erro', count: 0, error: error.message });
      }
    }

    // Resumo da migração
    console.log('\n' + '─'.repeat(60));
    console.log('\n📊 RESUMO DA MIGRAÇÃO:\n');
    
    results.forEach(result => {
      const icon = result.status === 'sucesso' ? '✅' : 
                   result.status === 'vazia' ? '⚠️ ' : 
                   result.status === 'não existe' ? '⚠️ ' : '❌';
      const status = result.status === 'sucesso' ? `${result.count} docs` :
                     result.status === 'vazia' ? 'vazia' :
                     result.status === 'não existe' ? 'não existe' : 'erro';
      console.log(`${icon} ${result.collection.padEnd(15)} → ${status}`);
    });

    console.log('\n' + '─'.repeat(60));
    console.log(`\n🎉 Migração concluída! Total: ${totalMigrated} documentos migrados\n`);

    // Fechar conexões
    if (connZen) await connZen.close();
    if (connArea52) await connArea52.close();
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro na migração:', error.message);
    console.error('\nDetalhes:', error);
    
    // Fechar conexões em caso de erro
    if (connZen) await connZen.close();
    if (connArea52) await connArea52.close();
    
    process.exit(1);
  }
}

// Confirmação antes de executar
console.log('\n⚠️  ATENÇÃO: Este script irá:');
console.log('   1. Conectar ao banco ZEN (origem)');
console.log('   2. Conectar ao banco AREA52 (destino)');
console.log('   3. APAGAR todos os dados existentes no AREA52');
console.log('   4. Copiar todos os dados do ZEN para o AREA52\n');

console.log('📋 Collections que serão migradas:');
collections.forEach(col => console.log(`   - ${col}`));
console.log('');

// Executar após 3 segundos
console.log('⏳ Iniciando em 3 segundos... (Ctrl+C para cancelar)\n');
setTimeout(() => {
  migrateData();
}, 3000);

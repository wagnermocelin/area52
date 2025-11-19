import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const studentSchema = new mongoose.Schema({}, { strict: false });
const Student = mongoose.model('Student', studentSchema);

async function corrigirSenha() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB\n');

    const email = 'wagnermocelin@gmail.com';
    const novaSenha = '123456';

    console.log(`🔧 Corrigindo senha do aluno: ${email}`);
    console.log(`   Nova senha: ${novaSenha}\n`);

    // Gerar hash bcrypt
    const hashedPassword = await bcrypt.hash(novaSenha, 10);
    console.log(`🔒 Hash gerado: ${hashedPassword.substring(0, 30)}...\n`);

    // Atualizar no banco
    const result = await Student.updateOne(
      { email },
      { 
        $set: {
          password: hashedPassword,
          status: 'active',
          blocked: false,
          emailVerified: true
        }
      }
    );

    if (result.modifiedCount === 0) {
      console.log('⚠️  Nenhum documento foi modificado');
      console.log('   Verifique se o email está correto');
    } else {
      console.log('✅ Senha atualizada com sucesso!');
      console.log(`   Documentos modificados: ${result.modifiedCount}`);
    }

    // Verificar
    console.log('\n🔍 Verificando...');
    const student = await Student.findOne({ email });
    console.log(`   Nome: ${student.name}`);
    console.log(`   Email: ${student.email}`);
    console.log(`   Status: ${student.status}`);
    console.log(`   Password hash: ${student.password.substring(0, 30)}...`);

    // Testar senha
    console.log('\n🔑 Testando senha...');
    const isMatch = await bcrypt.compare(novaSenha, student.password);
    console.log(`   Senha correta? ${isMatch ? '✅ SIM' : '❌ NÃO'}`);

    if (isMatch) {
      console.log('\n🎉 SUCESSO! Agora você pode fazer login com:');
      console.log(`   Email: ${email}`);
      console.log(`   Senha: ${novaSenha}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

corrigirSenha();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const studentSchema = new mongoose.Schema({}, { strict: false });
studentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Student = mongoose.model('Student', studentSchema);

async function testarLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB\n');

    const email = 'wagnermocelin@gmail.com';
    const senha = '123456';

    console.log(`🔐 Testando login:`);
    console.log(`   Email: ${email}`);
    console.log(`   Senha: ${senha}\n`);

    const student = await Student.findOne({ email }).select('+password');
    
    if (!student) {
      console.log('❌ Aluno não encontrado');
      process.exit(1);
    }

    console.log('✅ Aluno encontrado!');
    console.log(`   Nome: ${student.name}`);
    console.log(`   Status: ${student.status}`);
    console.log(`   Blocked: ${student.blocked}`);
    console.log(`   Tem senha: ${student.password ? 'SIM' : 'NÃO'}\n`);

    if (!student.password) {
      console.log('❌ Aluno não tem senha!');
      process.exit(1);
    }

    // Testar senha
    console.log('🔑 Comparando senha...');
    const isMatch = await student.matchPassword(senha);
    
    if (!isMatch) {
      console.log('❌ Senha incorreta!');
      console.log('   Hash no banco:', student.password.substring(0, 30) + '...');
      process.exit(1);
    }

    console.log('✅ Senha correta!\n');

    // Gerar token
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpire = process.env.JWT_EXPIRE || '30d';

    if (!jwtSecret) {
      console.log('❌ JWT_SECRET não configurado!');
      process.exit(1);
    }

    console.log('🎫 Gerando token...');
    const token = jwt.sign(
      { id: student._id, role: 'student' },
      jwtSecret,
      { expiresIn: jwtExpire }
    );

    console.log('✅ Token gerado com sucesso!\n');
    console.log('📝 Resposta que o backend deveria retornar:');
    console.log(JSON.stringify({
      success: true,
      token: token.substring(0, 50) + '...',
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: 'student'
      }
    }, null, 2));

    console.log('\n✅ LOGIN FUNCIONARIA PERFEITAMENTE!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testarLogin();

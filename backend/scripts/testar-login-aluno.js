import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: String,
  blocked: Boolean
});

studentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);

async function testarLoginAluno() {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado!');

    // Buscar o aluno teste1@teste.com
    const email = 'teste1@teste.com';
    console.log(`\n🔍 Buscando aluno: ${email}`);
    
    const student = await Student.findOne({ email }).select('+password');
    
    if (!student) {
      console.log('❌ Aluno não encontrado');
      process.exit(1);
    }

    console.log('✅ Aluno encontrado!');
    console.log('📧 Email:', student.email);
    console.log('👤 Nome:', student.name);
    console.log('📊 Status:', student.status);
    console.log('🚫 Blocked:', student.blocked);
    console.log('🔒 Password hash:', student.password ? student.password.substring(0, 20) + '...' : 'SEM SENHA');

    // Verificar JWT_SECRET
    console.log('\n🔑 Verificando JWT_SECRET...');
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpire = process.env.JWT_EXPIRE;
    
    if (!jwtSecret) {
      console.log('❌ JWT_SECRET não está definido!');
      process.exit(1);
    }
    
    console.log('✅ JWT_SECRET:', jwtSecret.substring(0, 10) + '...');
    console.log('✅ JWT_EXPIRE:', jwtExpire);

    // Testar senha
    console.log('\n🔐 Testando senha "123456"...');
    const isMatch = await student.matchPassword('123456');
    console.log('Senha correta?', isMatch ? '✅ SIM' : '❌ NÃO');

    if (isMatch) {
      // Tentar gerar token
      console.log('\n🎫 Gerando token JWT...');
      try {
        const token = jwt.sign(
          { id: student._id, role: 'student' },
          jwtSecret,
          { expiresIn: jwtExpire }
        );
        console.log('✅ Token gerado com sucesso!');
        console.log('Token:', token.substring(0, 50) + '...');
        
        console.log('\n✅ LOGIN FUNCIONARIA!');
        console.log('📝 Use estas credenciais:');
        console.log('Email:', email);
        console.log('Senha: 123456');
      } catch (error) {
        console.log('❌ Erro ao gerar token:', error.message);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testarLoginAluno();

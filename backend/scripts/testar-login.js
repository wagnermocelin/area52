import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

async function testarLogin() {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado!');

    // Listar todos os usuários
    console.log('\n📋 Usuários no banco:');
    const users = await User.find({}, 'name email role');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} - ${user.email} (${user.role})`);
    });

    // Testar login com o primeiro usuário
    if (users.length > 0) {
      const testEmail = users[0].email;
      console.log(`\n🔐 Testando login com: ${testEmail}`);
      
      const user = await User.findOne({ email: testEmail });
      
      if (!user) {
        console.log('❌ Usuário não encontrado');
        process.exit(1);
      }

      console.log('✅ Usuário encontrado:', user.name);
      console.log('📧 Email:', user.email);
      console.log('🔑 Role:', user.role);
      console.log('🔒 Password hash:', user.password.substring(0, 20) + '...');

      // Verificar JWT_SECRET
      console.log('\n🔑 Verificando JWT_SECRET...');
      const jwtSecret = process.env.JWT_SECRET;
      
      if (!jwtSecret) {
        console.log('❌ JWT_SECRET não está definido!');
        console.log('⚠️  Configure JWT_SECRET no .env ou no Render');
        process.exit(1);
      }
      
      console.log('✅ JWT_SECRET está definido:', jwtSecret.substring(0, 10) + '...');

      // Tentar gerar token
      console.log('\n🎫 Gerando token JWT...');
      try {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          jwtSecret,
          { expiresIn: '30d' }
        );
        console.log('✅ Token gerado com sucesso!');
        console.log('Token:', token.substring(0, 50) + '...');
      } catch (error) {
        console.log('❌ Erro ao gerar token:', error.message);
      }

      // Informações para teste
      console.log('\n📝 Para testar login, use:');
      console.log('Email:', testEmail);
      console.log('Senha: [use a senha que você definiu para este usuário]');
      
    } else {
      console.log('⚠️  Nenhum usuário encontrado no banco');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

testarLogin();

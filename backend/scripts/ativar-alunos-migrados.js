import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const studentSchema = new mongoose.Schema({}, { strict: false });
const Student = mongoose.model('Student', studentSchema);

async function ativarAlunos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB\n');

    // Buscar alunos sem senha
    const students = await Student.find({ 
      $or: [
        { password: { $exists: false } },
        { password: null },
        { password: '' }
      ]
    });
    
    console.log(`📋 Alunos sem senha: ${students.length}\n`);
    
    if (students.length === 0) {
      console.log('✅ Todos os alunos já têm senha!');
      process.exit(0);
    }

    // Senha padrão para alunos migrados
    const defaultPassword = '123456';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    for (const student of students) {
      console.log(`🔧 Ativando: ${student.name} (${student.email})`);
      
      // Atualizar diretamente no banco para garantir que o hash seja salvo
      await Student.updateOne(
        { _id: student._id },
        { 
          $set: {
            password: hashedPassword,
            status: 'active',
            blocked: false,
            emailVerified: true
          }
        }
      );
      
      console.log(`✅ Senha definida: ${defaultPassword}`);
      console.log('');
    }

    console.log('🎉 Todos os alunos foram ativados!');
    console.log(`📝 Senha padrão: ${defaultPassword}`);
    console.log('\n⚠️  IMPORTANTE: Peça aos alunos para alterarem a senha após o primeiro login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

ativarAlunos();

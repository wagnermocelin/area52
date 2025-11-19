import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const studentSchema = new mongoose.Schema({}, { strict: false });
const Student = mongoose.model('Student', studentSchema);

async function listarAlunos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB\n');

    const students = await Student.find({});
    
    console.log(`📋 Total de alunos: ${students.length}\n`);
    
    students.forEach((student, index) => {
      console.log(`${index + 1}. ${student.name}`);
      console.log(`   📧 Email: ${student.email}`);
      console.log(`   📊 Status: ${student.status}`);
      console.log(`   🚫 Blocked: ${student.blocked || false}`);
      console.log(`   🔒 Tem senha: ${student.password ? 'SIM' : 'NÃO'}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

listarAlunos();

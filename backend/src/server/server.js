import Fastify from 'fastify';
import { clienteRoutes } from './clientes.js'; // Ajuste o caminho se necessário

const app = Fastify();

// Rota de teste para verificar se o servidor está funcionando
app.get('/', async (request, reply) => {
  return { message: "API funcionando!" };
});

app.register(clienteRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});

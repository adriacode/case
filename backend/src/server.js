const Fastify = require('fastify');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const app = Fastify();

// Rota para a raiz (opcional)
app.get('/', async (request, reply) => {
  return { message: "Servidor está funcionando!" };
});

// Validação com Zod para os dados dos clientes
const clienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.boolean(),
});

// Rota para criar um cliente
app.post('/clientes', async (request, reply) => {
  try {
    const { nome, email, status } = clienteSchema.parse(request.body); // Validação com Zod

    const cliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        status
      }
    });

    return reply.send(cliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return reply.status(400).send({ error: error.errors || 'Erro ao criar cliente' });
  }
});

// Rota para listar os clientes
app.get('/clientes', async (request, reply) => {
  try {
    const clientes = await prisma.cliente.findMany();
    return reply.send(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return reply.status(500).send({ error: 'Erro ao listar clientes' });
  }
});

// Rota para listar os ativos com dados estáticos
app.get('/ativos', async (request, reply) => {
  try {
    const ativos = [
      { id: 1, nome: 'Ação XYZ', valor: 100 },
      { id: 2, nome: 'Fundo ABC', valor: 150 },
      { id: 3, nome: 'Bitcoin', valor: 30000 },
    ];

    return reply.send(ativos); // Retorna os dados estáticos para o frontend
  } catch (error) {
    console.error('Erro ao listar ativos:', error);
    return reply.status(500).send({ error: 'Erro ao listar ativos' });
  }
});

// Rota para atualizar um cliente
app.put('/clientes/:id', async (request, reply) => {
  const { id } = request.params;
  const { nome, email, status } = request.body;

  try {
    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: { nome, email, status },
    });

    return reply.send(cliente);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    if (error.code === 'P2025') {
      return reply.status(404).send({ error: 'Cliente não encontrado' });
    }
    return reply.status(500).send({ error: 'Erro ao atualizar cliente' });
  }
});

// Rota para deletar um cliente
app.delete('/clientes/:id', async (request, reply) => {
  const { id } = request.params;

  try {
    const cliente = await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });

    return reply.send({ message: 'Cliente deletado com sucesso!', cliente });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    if (error.code === 'P2025') {
      return reply.status(404).send({ error: 'Cliente não encontrado' });
    }
    return reply.status(500).send({ error: 'Erro ao deletar cliente' });
  }
});

// Iniciar o servidor
app.listen({ port: 3000 })
  .then(() => console.log("🚀 Servidor rodando em http://localhost:3000"))
  .catch(err => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  });
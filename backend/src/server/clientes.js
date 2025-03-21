import { criarCliente, buscarClientes, buscarClientePorId, criarRelacionamento, buscarAtivosPorCliente, criarAtivo, listarAtivos } from './repositories/clienteRepository.js';  // Ajuste o caminho
import { z } from 'zod';

// Definindo o esquema de validação com Zod
const clienteSchema = z.object({
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' })
});

export async function clienteRoutes(fastify) {
  
  // Rota para criar um novo cliente
  fastify.post('/clientes', async (request, reply) => {
    try {
      const parsed = clienteSchema.safeParse(request.body);
      
      if (!parsed.success) {
        return reply.status(400).send(parsed.error.errors);
      }
      
      const { nome, email } = parsed.data;
      const novoCliente = await criarCliente(nome, email);
      return reply.code(201).send(novoCliente);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar cliente' });
    }
  });

  // Rota para buscar todos os clientes
  fastify.get('/clientes', async (request, reply) => {
    try {
      const clientes = await buscarClientes();
      return reply.send(clientes);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar clientes' });
    }
  });

  // Rota para buscar um cliente específico
  fastify.get('/clientes/:clienteId', async (request, reply) => {
    try {
      const { clienteId } = request.params;
      const cliente = await buscarClientePorId(parseInt(clienteId));
      return reply.send(cliente);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar cliente' });
    }
  });

  // Rota para associar um ativo a um cliente
  fastify.post('/clientes/:clienteId/ativos/:ativoId', async (request, reply) => {
    try {
      const { clienteId, ativoId } = request.params;
      const relacionamento = await criarRelacionamento(parseInt(clienteId), parseInt(ativoId));
      return reply.code(201).send(relacionamento);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao associar ativo ao cliente' });
    }
  });

  // Rota para buscar os ativos de um cliente
  fastify.get('/clientes/:clienteId/ativos', async (request, reply) => {
    try {
      const { clienteId } = request.params;
      const ativos = await buscarAtivosPorCliente(parseInt(clienteId));
      return reply.send(ativos);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar ativos do cliente' });
    }
  });

  // Rota para criar um novo ativo
  fastify.post('/ativos', async (request, reply) => {
    try {
      const { nome, valor } = request.body;
      const novoAtivo = await criarAtivo(nome, valor);
      return reply.code(201).send(novoAtivo);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar ativo' });
    }
  });

  // Rota para listar todos os ativos
  fastify.get('/ativos', async (request, reply) => {
    try {
      const ativos = await listarAtivos();
      return reply.send(ativos);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao listar ativos' });
    }
  });
}

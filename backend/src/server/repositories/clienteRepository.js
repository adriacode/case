import { prisma } from '../../lib/prisma.js';

// Função para criar um novo cliente
export async function criarCliente(nome, email) {
  return await prisma.cliente.create({
    data: {
      nome,
      email,
    },
  });
}

// Função para buscar todos os clientes
export async function buscarClientes() {
  return await prisma.cliente.findMany();
}

// Função para buscar um cliente por ID
export async function buscarClientePorId(clienteId) {
  return await prisma.cliente.findUnique({
    where: { id: clienteId },
  });
}

// Função para criar um relacionamento entre cliente e ativo
export async function criarRelacionamento(clienteId, ativoId) {
  return await prisma.clienteAtivo.create({
    data: {
      clienteId,
      ativoId,
    },
  });
}

// Função para buscar ativos de um cliente
export async function buscarAtivosPorCliente(clienteId) {
  return await prisma.clienteAtivo.findMany({
    where: { clienteId },
    include: {
      ativo: true, // Inclui informações do ativo
    },
  });
}

// Função para criar um novo ativo
export async function criarAtivo(nome, valor) {
  return await prisma.ativo.create({
    data: {
      nome,
      valor,
    },
  });
}

// Função para listar todos os ativos
export async function listarAtivos() {
  return await prisma.ativo.findMany();
}

import { prisma } from "../prismaClient.js";

export default async function ativosRoutes(fastify) {
  fastify.get("/ativos", async (request, reply) => {
    const ativos = await prisma.ativo.findMany();
    return ativos;
  });

  fastify.post("/ativos", async (request, reply) => {
    const { nome, valor } = request.body;
    const novoAtivo = await prisma.ativo.create({
      data: { nome, valor },
    });
    return novoAtivo;
  });
}
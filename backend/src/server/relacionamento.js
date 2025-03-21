import { prisma } from "../prismaClient.js";

export default async function relacionamentoRoutes(fastify) {
  fastify.post("/relacionamento", async (request, reply) => {
    const { clienteId, ativoId } = request.body;
    const relacionamento = await prisma.relacionamento.create({
      data: { clienteId, ativoId },
    });
    return relacionamento;
  });

  fastify.get("/clientes/:id/ativos", async (request, reply) => {
    const { id } = request.params;
    const ativosDoCliente = await prisma.relacionamento.findMany({
      where: { clienteId: Number(id) },
      include: { ativo: true },
    });
    return ativosDoCliente.map((rel) => rel.ativo);
  });
}
import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
import { makeCreatePets } from "@/use-case/factory/make-create-pets";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Pets(request: FastifyRequest, reply: FastifyReply) {
  const dataPets = z.object({
    id: z.string().default(randomUUID()),
    name: z.string(),
    idade: z.string(),
    nivel_energia: z.coerce.number(),
    porte_animal: z.enum(["Pequenino", "Médio", "Grande"]).default("Médio"),
    nivel_indep: z.enum(["Baixo", "Médio", "Alto"]).default("Médio"),
    cidade: z.string(),
    org_Id: z.string(),
  });

  const {
    id,
    name,
    idade,
    nivel_energia,
    porte_animal,
    nivel_indep,
    cidade,
    org_Id,
  } = dataPets.parse(request.body);

  // Verificar a existencia da org ****
  const prismaOrg = new PrismaOrgRepository();
  const org = await prismaOrg.findById(org_Id);

  if (!org) {
    console.log("Org não encontrada !");
  }

  try {
    const pestUseCase = makeCreatePets();

    await pestUseCase.execute({
      id,
      name,
      idade,
      nivel_energia,
      porte_animal,
      nivel_indep,
      cidade,
      org_Id,
    });
  } catch (error) {
    return reply.status(409).send({ message: "Deu ruim !" });
  }

  return reply.status(201).send();
}

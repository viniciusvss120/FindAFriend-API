/* eslint-disable prettier/prettier */
import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
import { makeCreateOrg } from "@/use-case/factory/make-create-org";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateOrg(request: FastifyRequest, reply: FastifyReply) {
  const dataOrg = z.object({
    id: z.string().default(randomUUID()),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    whatsapp: z.coerce.number(),
    rua: z.string(),
    numero: z.coerce.number(),
    bairro: z.string(),
    cidade: z.string(),
  });

  const {
    id,
    name,
    email,
    whatsapp,
    rua,
    numero,
    bairro,
    cidade,
  } = dataOrg.parse(request.body);

  // Verificar a existencia da org ****
  const prismaOrg = new PrismaOrgRepository();
  const org = await prismaOrg.findByEmail(email);

  if (org) {
    console.log("Já existe uma ORG com esse email !");
    throw new Error("Já existe uma ORG com esse email")
  }

  try {
    const pestUseCase = makeCreateOrg();

    await pestUseCase.execute({
      id,
      name,
      email,
      password: await hash("123456", 6),
      whatsapp,
      rua,
      numero,
      bairro,
      cidade,
    });
  } catch (error) {
    return reply.status(409).send({ message: "Deu ruim !" });
  }

  return reply.status(201).send();
}

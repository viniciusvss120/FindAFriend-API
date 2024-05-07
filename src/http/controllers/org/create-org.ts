/* eslint-disable prettier/prettier */
import { makeCreateOrg } from "@/use-case/factory/make-create-org";
// import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateOrg(request: FastifyRequest, reply: FastifyReply) {
  const dataOrg = z.object({
    id: z.string().default(randomUUID()),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    whatsapp: z.string(),
    rua: z.string(),
    numero: z.coerce.number(),
    bairro: z.string(),
    cidade: z.string(),
  });

  const {
    id,
    name,
    email,
    password,
    whatsapp,
    rua,
    numero,
    bairro,
    cidade,
  } = dataOrg.parse(request.body);

  try {
    const pestUseCase = makeCreateOrg();

    await pestUseCase.execute({
      id,
      name,
      email,
      password,
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

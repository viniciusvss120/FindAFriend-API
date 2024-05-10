/* eslint-disable prettier/prettier */
import { makeGetPetsById } from "@/use-case/factory/make-get-pets-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetsById(request: FastifyRequest, reply: FastifyReply) {
  const caracterPets = z.object({
    id: z.string()
  });

  const {
    id
  } = caracterPets.parse(request.params);
  try {
    const getPetsbyIdUseCase = makeGetPetsById();
    const pets = await getPetsbyIdUseCase.execute({ id })

    return reply.status(200).send(pets)
  } catch (error) {
    return reply.status(401).send({ message: "Pets não encontrado!" });
  }
}

/* eslint-disable prettier/prettier */
import { makeGetPetsByCaracter } from "@/use-case/factory/make-get-pets-by-caracter";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetsByCaracter(request: FastifyRequest, reply: FastifyReply) {
  const caracterPets = z.object({
    idade: z.string().optional(),
    nivel_energia: z.coerce.number().optional(),
    porte_animal: z.string().optional(),
    nivel_indep: z.string().optional(),
    cidade: z.string(),
  });

  const {
    idade,
    nivel_energia,
    porte_animal,
    nivel_indep,
    cidade
  } = caracterPets.parse(request.query);
  try {
    const getPetsbyCaracterUseCase = makeGetPetsByCaracter();
    const pets = await getPetsbyCaracterUseCase.execute({
      idade,
      nivel_energia,
      porte_animal,
      nivel_indep,
      cidade,
    })

    return reply.status(200).send(pets)
  } catch (error) {
    return reply.status(401).send({ message: "Pets não encontrado!" });
  }
}

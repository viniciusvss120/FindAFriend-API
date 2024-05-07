import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
// import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// const prisma = new PrismaClient();
const prismaRepository = new PrismaOrgRepository();
export async function FindOrgByEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const orgParams = z.object({
    email: z.string().email(),
  });

  const { email } = orgParams.parse(request.query);

  console.log(email);
  const findEmail = await prismaRepository.findByEmail(email);
  // const findEmail = await prisma.oRG.findUnique({ where: { email } });

  if (!findEmail) {
    console.log("Deu ruim");
    throw new Error(" Deu ruim !!");
  }

  return reply.status(200).send({ findEmail });
}

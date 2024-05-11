import { makeAuthenticateOrg } from "@/use-case/factory/make-authenticar-org";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const dataOrg = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = dataOrg.parse(request.body);
  try {
    const orgUseCase = makeAuthenticateOrg();
    const { org } = await orgUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    );
    return reply.status(200).send({ token });
  } catch (error) {
    return reply.status(409).send({
      message: "Deu ruim, algum erro na autenticação !",
    });
  }
}

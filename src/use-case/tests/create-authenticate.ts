import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAuthenticate(app: FastifyInstance) {
  await prisma.oRG.create({
    data: {
      id: randomUUID(),
      name: "Vida",
      email: "vida@gmail.com",
      password: await hash("123456", 6),
      whatsapp: "69999999999",
      rua: "Ali Perto",
      numero: 1458,
      bairro: "Jardim Esperança",
      cidade: "Jaru",
    },
  });

  const authenticate = await request(app.server).post("/session").send({
    email: "vida@gmail.com",
    password: "123456",
  });

  const { token } = authenticate.body;

  return token;
}

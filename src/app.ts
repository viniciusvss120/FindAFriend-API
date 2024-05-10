import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "@/env";
import { PetsRoutes } from "./http/controllers/routes";
import { orgRoutes } from "./http/controllers/org/routes";
import { ZodError } from "zod";
// import { ZodError } from "zod";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRETY,
});

app.register(PetsRoutes);
app.register(orgRoutes);

// Aqui estamos tratanto os erro de forma global,
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Erro interno no servidor" });
});

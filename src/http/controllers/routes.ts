import { FastifyInstance } from "fastify";
import { Pets } from "./pets/pets";

export async function PetsRoutes(app: FastifyInstance) {
  app.post("/pets", Pets);
}

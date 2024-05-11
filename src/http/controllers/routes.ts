import { FastifyInstance } from "fastify";
import { Pets } from "./pets/pets";
import { getPetsByCaracter } from "./pets/get-pets-by-caracter";
import { getPetsById } from "./pets/get-pets-by-id";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function PetsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, Pets);
  app.get("/pets", getPetsByCaracter);
  app.get("/search/:id", getPetsById);
}

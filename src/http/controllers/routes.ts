import { FastifyInstance } from "fastify";
import { Pets } from "./pets/pets";
// import { verifyJWT } from "../middlewares/verify-jwt";
import { getPetsByCaracter } from "./pets/get-pets-by-caracter";
import { getPetsById } from "./pets/get-pets-by-id";

export async function PetsRoutes(app: FastifyInstance) {
  app.post("/pets", Pets);
  app.get("/pets", getPetsByCaracter);
  app.get("/search/:id", getPetsById);
}

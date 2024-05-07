import { FastifyInstance } from "fastify";
import { CreateOrg } from "./create-org";
import { Authenticate } from "./authenticate";
import { FindOrgByEmail } from "./find-org-by-email";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/org", CreateOrg);
  app.post("/session", Authenticate);
  app.get("/org", FindOrgByEmail);
}

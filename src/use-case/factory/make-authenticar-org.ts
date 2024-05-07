import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
import { AuthenticateUseCase } from "../org-use-case/authenticate";

export function makeAuthenticateOrg() {
  const useRepository = new PrismaOrgRepository();

  const useCase = new AuthenticateUseCase(useRepository);

  return useCase;
}

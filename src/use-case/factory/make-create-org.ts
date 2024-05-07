import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
import { CreateOrgUseCase } from "../org-use-case/create-org";

export function makeCreateOrg() {
  const useRepository = new PrismaOrgRepository();

  const useCase = new CreateOrgUseCase(useRepository);

  return useCase;
}

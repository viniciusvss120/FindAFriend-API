import { PrismaPetsReposytory } from "@/repository/prisma/prisma-pets-repository";
import { GetPatsByIdUseCase } from "../pets-use-case/get-pets-by-id";

export function makeGetPetsById() {
  const petsRepository = new PrismaPetsReposytory();

  const useCase = new GetPatsByIdUseCase(petsRepository);

  return useCase;
}

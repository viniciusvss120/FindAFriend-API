import { PrismaPetsReposytory } from "@/repository/prisma/prisma-pets-repository";
import { GetPatsByCaracterUseCase } from "../pets-use-case/get-pets-by-caracter";

export function makeGetPetsByCaracter() {
  const petsRepository = new PrismaPetsReposytory();

  const useCase = new GetPatsByCaracterUseCase(petsRepository);

  return useCase;
}

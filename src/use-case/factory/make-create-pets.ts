import { PrismaPetsReposytory } from "@/repository/prisma/prisma-pets-repository";
import { CreatePatsUseCase } from "../pets-use-case/create-pets";

export function makeCreatePets() {
  const petsRepository = new PrismaPetsReposytory();

  const useCase = new CreatePatsUseCase(petsRepository);

  return useCase;
}

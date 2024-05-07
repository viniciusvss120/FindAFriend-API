/* eslint-disable @typescript-eslint/no-unused-vars */
import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";
import { FindPetsError } from "../errors/find-pet";

interface PetsRequest {
  idade: string | null;
  nivel_energia: number | null;
  porte_animal: string | null;
  nivel_indep: string | null;
  cidade: string;
}

type PetsResponse = Pet[];

export class GetPatsByCaracterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    idade,
    nivel_energia,
    porte_animal,
    nivel_indep,
    cidade,
  }: PetsRequest): Promise<PetsResponse> {
    const pets = await this.petsRepository.findByCaracteristica({
      idade,
      nivel_energia,
      porte_animal,
      nivel_indep,
      cidade,
    });

    if (!pets) {
      throw new FindPetsError();
    }

    return pets;
  }
}

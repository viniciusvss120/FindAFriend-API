/* eslint-disable @typescript-eslint/no-unused-vars */
import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";
import { FindPetsError } from "../errors/find-pet";

interface PetsRequest {
  idade?: string;
  nivel_energia?: number;
  porte_animal?: string;
  nivel_indep?: string;
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

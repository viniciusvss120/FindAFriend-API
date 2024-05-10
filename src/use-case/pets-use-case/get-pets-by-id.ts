/* eslint-disable @typescript-eslint/no-unused-vars */
import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";

interface PetsRequest {
  id: string;
}

type PetsResponse = Pet[];

export class GetPatsByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: PetsRequest) {
    const pets = await this.petsRepository.findById(id);

    if (!pets) {
      throw new Error("Pet não encontrado!");
    }

    return pets;
  }
}

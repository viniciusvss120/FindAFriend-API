/* eslint-disable @typescript-eslint/no-unused-vars */
import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";
import { InvalidCredentialsError } from "../errors/authenticar-error";

interface PetsRequest {
  cidade: string;
}

type PetsResponse = Pet[];

export class GetPatsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ cidade }: PetsRequest): Promise<PetsResponse> {
    const pets = await this.petsRepository.findByCity(cidade);
    if (!pets) {
      throw new InvalidCredentialsError();
    }
    return pets;
  }
}

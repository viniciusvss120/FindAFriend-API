import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";
import { z } from "zod";

// enum Porte_animal {
//   Pequenino = "Pequenino",
//   Medio = "Medio",
//   Grande = "Grande",
// }

// enum Nivel_indep {
//   Baixo = "Baixo",
//   Medio = "Medio",
//   Alto = "Alto",
// }

interface PetsRequest {
  id: string;
  name: string;
  idade: string;
  nivel_energia: number;
  porte_animal: string;
  nivel_indep: string;
  cidade: string;
  org_Id: string;
}

type PetsResponse = {
  pets: Pet;
};

export class CreatePatsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    name,
    idade,
    nivel_energia,
    porte_animal,
    nivel_indep,
    cidade,
    org_Id,
  }: PetsRequest): Promise<PetsResponse> {
    const porteAnimal_indep = {
      porte_animal,
      nivel_indep,
    };
    const validateEnums = z.object({
      porte_animal: z.enum(["Pequenino", "Medio", "Grande"]).default("Medio"),
      nivel_indep: z.enum(["Baixo", "Medio", "Alto"]).default("Medio"),
    });

    const enums = validateEnums.parse(porteAnimal_indep);

    const pets = await this.petsRepository.create({
      id,
      name,
      idade,
      nivel_energia,
      porte_animal: enums.porte_animal,
      nivel_indep: enums.nivel_indep,
      cidade,
      org_Id,
    });

    return { pets };
  }
}

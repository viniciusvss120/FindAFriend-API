import { prisma } from "@/lib/prisma";
import { PetsRepository } from "../pets-repository";
import { Pet, Prisma } from "@prisma/client";

type Caracteristica = {
  idade?: string;
  nivel_energia?: number;
  porte_animal?: string;
  nivel_indep?: string;
  cidade: string;
  [key: string]: string | number | undefined;
};
type NewObj = {
  [key: string]: string | number | undefined;
};

export class PrismaPetsReposytory implements PetsRepository {
  async findById(id: string) {
    const pets = await prisma.pet.findFirstOrThrow({
      where: {
        id,
      },
    });

    return pets;
  }

  async findByCity(cidade: string) {
    const pets = await prisma.pet.findMany({
      where: {
        cidade,
      },
    });

    return pets;
  }

  async findByCaracteristica(data: Caracteristica): Promise<Pet[]> {
    const newData: NewObj = {};
    for (const key in data) {
      if (data[key] !== undefined) {
        newData[key] = data[key];
      }
    }
    console.log(newData);
    const pets = await prisma.pet.findMany({
      where: newData,
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const createPet = await prisma.pet.create({ data });

    return createPet;
  }
}

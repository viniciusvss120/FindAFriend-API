import { prisma } from "@/lib/prisma";
import { PetsRepository } from "../pets-repository";
import { Prisma } from "@prisma/client";

type Caracteristica = {
  idade: string | null;
  nivel_energia: number | null;
  porte_animal: string | null;
  nivel_indep: string | null;
  cidade: string;
  [key: string]: string | number | null;
};
type NewObj = {
  [key: string]: string | number | null;
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

  async findByCaracteristica(data: Caracteristica) {
    const newData: NewObj = {};
    for (const key in data) {
      if (data[key] !== null) {
        newData[key] = data[key];
      }
    }

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

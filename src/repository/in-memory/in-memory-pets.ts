/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { $Enums, Nivel_Indep, Porte_animal, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";
import { z } from "zod";

type Pet = {
  id: string;
  name: string;
  idade: string;
  nivel_energia: number;
  porte_animal: Porte_animal;
  nivel_indep: Nivel_Indep;
  cidade: string;
  org_Id: string;
  [key: string]: string | number; // Index signature
};

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

export class InMemoryPets implements PetsRepository {
  public items: Pet[] = [];

  async findById(id: string) {
    const pets = this.items.find((item) => item.id === id);

    if (!pets) {
      throw new Error("Pet não encontrado!");
    }

    return pets;
  }

  async findByCity(cidade: string) {
    const pest = this.items.filter((item) => item.cidade === cidade);

    return pest;
  }

  async findByCaracteristica(data: Caracteristica) {
    const newData: NewObj = {};
    for (const key in data) {
      if (data[key] !== undefined) {
        newData[key] = data[key];
      }
    }
    const pets = this.items.filter((item) => {
      for (const key in newData) {
        if (item[key] !== newData[key]) {
          return false;
        }
      }
      return true;
    });
    console.log(newData);
    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const validateEnums = z.object({
      porte_animal: z.enum(["Pequenino", "Medio", "Grande"]).default("Medio"),
      nivel_indep: z.enum(["Baixo", "Medio", "Alto"]).default("Medio"),
    });

    const enums = validateEnums.parse(data);
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      idade: data.idade,
      nivel_energia: data.nivel_energia,
      porte_animal: enums.porte_animal,
      nivel_indep: enums.nivel_indep,
      cidade: data.cidade,
      org_Id: data.org_Id,
    };

    this.items.push(pet);

    return pet;
  }
}

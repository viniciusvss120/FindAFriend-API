import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findByCity(cidadeId: string): Promise<Pet[] | []>;
  findByCaracteristica(data: object): Promise<Pet[] | []>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}

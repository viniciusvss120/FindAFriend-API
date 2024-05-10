import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryPets } from "@/repository/in-memory/in-memory-pets";
// import { CreatePatsUseCase } from "./create-pets"

import { GetPatsByCaracterUseCase } from "./get-pets-by-caracter";

describe("Listar Pets por caracteristicas use case", () => {
  let useRepository: InMemoryPets;
  let sut: GetPatsByCaracterUseCase;
  beforeEach(() => {
    useRepository = new InMemoryPets();
    sut = new GetPatsByCaracterUseCase(useRepository);
  });

  it("deve listar pets pelas caracteristicas", async () => {
    await useRepository.create({
      id: "pet-1",
      name: "Jamal",
      idade: "Filhote",
      nivel_energia: 3,
      porte_animal: "Medio",
      nivel_indep: "Medio",
      cidade: "Jaru",
      org_Id: "org-1",
    });
    await useRepository.create({
      id: "pet-2",
      name: "Pit",
      idade: "Adulto",
      nivel_energia: 3,
      porte_animal: "Grande",
      nivel_indep: "Medio",
      cidade: "Buritis",
      org_Id: "org-1",
    });

    const pets = await sut.execute({
      idade: "Filhote",
      cidade: "Jaru",
    });

    expect(pets).toHaveLength(1);
  });
});

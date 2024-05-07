import { it, describe, expect, beforeEach } from "vitest";
import { CreatePatsUseCase } from "./create-pets";
import { InMemoryPets } from "@/repository/in-memory/in-memory-pets";

describe("Create Pets use case", () => {
  let useRepository: InMemoryPets;
  let sut: CreatePatsUseCase;
  beforeEach(() => {
    useRepository = new InMemoryPets();
    sut = new CreatePatsUseCase(useRepository);
  });

  it("deve ser possível cadastrar um pet", async () => {
    const { pets } = await sut.execute({
      id: "pet-1",
      name: "Jamal",
      idade: "5",
      nivel_energia: 3,
      porte_animal: "Medio",
      nivel_indep: "Medio",
      cidade: "Jaru",
      org_Id: "org-1",
    });
    expect(pets.id).toEqual(expect.any(String));
  });
});

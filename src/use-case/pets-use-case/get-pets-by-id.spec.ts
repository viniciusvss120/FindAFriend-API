import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryPets } from "@/repository/in-memory/in-memory-pets";
// import { CreatePatsUseCase } from "./create-pets"
import { GetPatsByIdUseCase } from "./get-pets-by-id";

describe("List Pets use case", () => {
  let useRepository: InMemoryPets;
  let sut: GetPatsByIdUseCase;
  beforeEach(() => {
    useRepository = new InMemoryPets();
    sut = new GetPatsByIdUseCase(useRepository);
  });

  it("deve encontrar um pet", async () => {
    await useRepository.create({
      id: "pet-1",
      name: "Jamal",
      idade: "5",
      nivel_energia: 3,
      porte_animal: "Medio",
      nivel_indep: "Medio",
      cidade: "Buritis",
      org_Id: "org-1",
    });
    await useRepository.create({
      id: "pet-2",
      name: "Pit",
      idade: "5",
      nivel_energia: 3,
      porte_animal: "Medio",
      nivel_indep: "Medio",
      cidade: "Jaru",
      org_Id: "org-1",
    });

    const pets = await sut.execute({
      id: "pet-2",
    });
    expect(pets).toEqual(
      expect.objectContaining({
        id: "pet-2",
      }),
    );
  });
});

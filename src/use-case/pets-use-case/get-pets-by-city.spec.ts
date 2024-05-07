import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryPets } from "@/repository/in-memory/in-memory-pets";
// import { CreatePatsUseCase } from "./create-pets"
import { GetPatsByCityUseCase } from "./get-pets-by-city";

describe("List Pets use case", () => {
  let useRepository: InMemoryPets;
  let sut: GetPatsByCityUseCase;
  beforeEach(() => {
    useRepository = new InMemoryPets();
    sut = new GetPatsByCityUseCase(useRepository);
  });

  it("deve listar pets por cidade", async () => {
    await useRepository.create({
      id: "pet-1",
      name: "Jamal",
      idade: "5",
      nivel_energia: 3,
      porte_animal: "Medio",
      nivel_indep: "Medio",
      cidade: "Jaru",
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
      cidade: "Jaru",
    });
    expect(pets).toHaveLength(2);
  });
});

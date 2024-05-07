import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrg } from "@/repository/in-memory/in-memory-org";
import { randomUUID } from "crypto";

describe("Criar uma ORG", () => {
  let useRepository: InMemoryOrg;
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    useRepository = new InMemoryOrg();
    sut = new CreateOrgUseCase(useRepository);
  });

  it("deve ser possível criar uma ORG", async () => {
    const { org } = await sut.execute({
      id: randomUUID(),
      name: "Vida",
      email: "vida@gmail.com",
      password: "123456",
      whatsapp: 69999999999,
      rua: "Ali Perto",
      numero: 1458,
      bairro: "Jardim Esperança",
      cidade: "Jaru",
    });
    expect(org.id).toEqual(expect.any(String));
  });
});

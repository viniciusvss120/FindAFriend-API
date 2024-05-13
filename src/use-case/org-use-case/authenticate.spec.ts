import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrg } from "@/repository/in-memory/in-memory-org";
import { AuthenticateUseCase } from "./authenticate";
import { randomUUID } from "crypto";
// import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/authenticar-error";

describe("Criar uma ORG", () => {
  let useRepository: InMemoryOrg;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    useRepository = new InMemoryOrg();
    sut = new AuthenticateUseCase(useRepository);
  });

  it("deve ser possível autenticar uma ORG", async () => {
    await useRepository.create({
      id: randomUUID(),
      name: "Vida",
      email: "vida@gmail.com",
      password: "123456",
      whatsapp: "69999999999",
      rua: "Ali Perto",
      numero: 1458,
      bairro: "Jardim Esperança",
      cidade: "Jaru",
    });

    const { org } = await sut.execute({
      email: "vida@gmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("não deve ser possível autenticar uma ORG com senha incorreta", async () => {
    await useRepository.create({
      id: randomUUID(),
      name: "Vida",
      email: "vida@gmail.com",
      password: "123456",
      whatsapp: "69999999999",
      rua: "Ali Perto",
      numero: 1458,
      bairro: "Jardim Esperança",
      cidade: "Jaru",
    });

    await sut.execute({
      email: "vida@gmail.com",
      password: "123456",
    });

    // console.log(org);
    expect(() =>
      sut.execute({
        email: "vida@gmail.com",
        password: "1234586",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAuthenticate } from "@/use-case/tests/create-authenticate";
// import { PrismaPetsReposytory } from "@/repository/prisma/prisma-pets-repository";
import { hash } from "bcryptjs";
import request from "supertest";
import { it, describe, afterAll, beforeAll, expect } from "vitest";
// import { object } from "zod";

// const prismaRepository = new PrismaPetsReposytory()
describe("Get Pets by id e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("deve ser possível busca pet pelo id", async () => {
    const token = await createAuthenticate(app);
    const org = await prisma.oRG.create({
      data: {
        name: "Viva",
        email: "viva@gmail.com",
        password: await hash("1234560", 6),
        whatsapp: "993062435",
        rua: "Ali Perto",
        numero: 2545,
        bairro: "União",
        cidade: "Jaru",
      },
    });

    const pet = await prisma.pet.create({
      data: {
        name: "Maci",
        idade: "Filhote",
        nivel_energia: 3,
        porte_animal: "Pequenino",
        nivel_indep: "Baixo",
        cidade: "Jaru",
        org_Id: org.id,
      },
    });

    const response = await request(app.server)
      .get(`/search/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    );
  });
});

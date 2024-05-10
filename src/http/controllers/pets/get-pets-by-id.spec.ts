import { app } from "@/app";
import { prisma } from "@/lib/prisma";
// import { PrismaPetsReposytory } from "@/repository/prisma/prisma-pets-repository";
import { hash } from "bcryptjs";
import request from "supertest";
import { it, describe, afterAll, beforeAll, expect } from "vitest";
// import { object } from "zod";

// const prismaRepository = new PrismaPetsReposytory()
describe("Get Pets by caracter e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("deve ser possível busca pet pelas caracteristicas", async () => {
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

    console.log(pet.id);
    const response = await request(app.server).get(`/search/${pet.id}`).send();
    console.log(response.body);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    );
  });
});

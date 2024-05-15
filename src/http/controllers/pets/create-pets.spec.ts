import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAuthenticate } from "@/use-case/tests/create-authenticate";
// import { createAuthenticate } from "@/use-case/tests/create-authenticate";
import { hash } from "bcryptjs";
import request from "supertest";
import { it, describe, afterAll, beforeAll, expect } from "vitest";

describe("Create Pets e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("deve ser possível criar um pet", async () => {
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
    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Jamal",
        idade: "Filhote",
        nivel_energia: 3,
        porte_animal: "Pequenino",
        nivel_indep: "Baixo",
        cidade: "Jaru",
        org_Id: org.id,
      });
    expect(response.statusCode).toEqual(201);
  });
});

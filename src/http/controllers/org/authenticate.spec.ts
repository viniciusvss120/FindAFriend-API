import { app } from "@/app";
// import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
// import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// const orgRepository = new PrismaOrgRepository();
describe("Authenticate e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve ser possível se autenticar", async () => {
    // await orgRepository.create({
    //   name: "Viva",
    //   email: "viva@gmail.com",
    //   password: "123456",
    //   whatsapp: "69993062435",
    //   rua: "Ali Perto",
    //   numero: 2545,
    //   bairro: "União",
    //   cidade: "Jaru",
    // });
    await request(app.server).post("/org").send({
      name: "Viva",
      email: "viva@gmail.com",
      password: "123456",
      whatsapp: "69993062435",
      rua: "Ali Perto",
      numero: 2545,
      bairro: "União",
      cidade: "Jaru",
    });

    const response = await request(app.server).post("/session").send({
      email: "viva@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});

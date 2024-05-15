import { app } from "@/app";
// import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
// import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// const orgRepository = new PrismaOrgRepository();
describe("Refresh e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip("deve ser possível gerar um novo token", async () => {
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

    const authToken = await request(app.server).post("/session").send({
      email: "viva@gmail.com",
      password: "123456",
    });

    const cookies = authToken.get("Set-Cookie") ?? [];

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});

import { app } from "@/app";
// import { hash } from "bcryptjs";
import request from "supertest";
import { it, describe, afterAll, beforeAll, expect } from "vitest";

describe("Create ORG e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("deve ser possível criar uma org", async () => {
    const response = await request(app.server).post("/org").send({
      name: "Viva",
      email: "viva@gmail.com",
      password: "123456",
      whatsapp: "993062435",
      rua: "Ali Perto",
      numero: 2545,
      bairro: "União",
      cidade: "Jaru",
    });
    expect(response.statusCode).toEqual(201);
  });
});

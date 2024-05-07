/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { ORG, Prisma } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { randomUUID } from "crypto";

export class InMemoryOrg implements OrgRepository {
  public items: ORG[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.ORGUncheckedCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp,
      rua: data.rua,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }
}

import { Prisma } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgRepository implements OrgRepository {
  async findById(id: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        id,
      },
    });

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async create(data: Prisma.ORGUncheckedCreateInput) {
    const createOrg = await prisma.oRG.create({ data });

    return createOrg;
  }
}

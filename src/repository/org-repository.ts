import { ORG, Prisma } from "@prisma/client";

export interface OrgRepository {
  findById(id: string): Promise<ORG | null>;
  findByEmail(email: string): Promise<ORG | null>;
  create(data: Prisma.ORGUncheckedCreateInput): Promise<ORG>;
}

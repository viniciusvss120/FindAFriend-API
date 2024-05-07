import { OrgRepository } from "@/repository/org-repository";
import { ORG } from "@prisma/client";
import { hash } from "bcryptjs";

interface OrgRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
}

type OrgResponse = {
  org: ORG;
};

export class CreateOrgUseCase {
  constructor(private prismaOrgRepository: OrgRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    whatsapp,
    rua,
    numero,
    bairro,
    cidade,
  }: OrgRequest): Promise<OrgResponse> {
    const passwor_hash = await hash(password, 6);

    const org = await this.prismaOrgRepository.create({
      id,
      name,
      email,
      password: passwor_hash,
      whatsapp,
      rua,
      numero,
      bairro,
      cidade,
    });

    return { org };
  }
}

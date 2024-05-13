import { OrgRepository } from "@/repository/org-repository";
import { ORG } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/authenticar-error";

interface AuthRequest {
  email: string;
  password: string;
}

type AuthResponse = {
  org: ORG;
};

export class AuthenticateUseCase {
  constructor(private prismaOrgRepository: OrgRepository) {}

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    const org = await this.prismaOrgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const verifyPassword = await compare(password, org.password);

    if (!verifyPassword) {
      console.log(password);
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  JWT_SECRETY: z.string(),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Deu ruim, variavel de ambiente invalida", _env.error.format());
  throw new Error("Deu ruim, variavel de ambiente invalida");
}

export const env = _env.data;

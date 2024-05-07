export class FindPetsError extends Error {
  constructor() {
    super("Pet não encontrado!");
  }
}

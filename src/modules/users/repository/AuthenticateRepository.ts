/**
 * Interface that every repository of authenticable entities must implement
 */
interface AuthenticableEntityRepository<E> {
  /**
   * Searches an entity by its email and returns it if the email exists
   *
   * @param email the email to be searched for
   * @returns an entity if the email exists, `undefined` otherwise
   */
  findByEmail(email: string): Promise<E | undefined>;
  findByCpf(cpf: number): Promise<E | undefined>;
}

export default AuthenticableEntityRepository;

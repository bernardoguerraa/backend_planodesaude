import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import AuthenticableEntityRepository from "../../repository/AuthenticateRepository";
import Service from "../../../../database/repositories/Services";
import AuthenticationError from "../../../../shared/aplication/error/AuthenticationError";

interface AuthenticationPayload<A> {
  agent: A;
  token: string;
}

interface ServiceParams {
  email: string;
  password: string;
}

interface Agent {
  id: string;
  profile: { password: string };
}

@injectable()
class AuthenticateService<T extends Agent>
  implements Service<ServiceParams, AuthenticationPayload<T>>
{
  private repository: AuthenticableEntityRepository<T>;

  constructor(
    @inject("AuthenticationRepository")
    repository: AuthenticableEntityRepository<T>
  ) {
    this.repository = repository;
  }

  async execute({
    email,
    password,
  }: ServiceParams): Promise<AuthenticationPayload<T>> {
    const existingAgent = await this.repository.findByEmail(email);

    if (!existingAgent) {
      throw new AuthenticationError("Incorrect email/password combination");
    }

    const doesPasswordMatch = await compare(
      password,
      existingAgent.profile.password
    );

    if (!doesPasswordMatch) {
      throw new AuthenticationError("Incorrect email/password combination");
    }

    const SECRET = process.env.APP_SECRET || "";
    const EXPIRATION = process.env.EXPIRATION_TIME || "1d";
    const token = sign({}, SECRET, {
      subject: existingAgent.id,
      expiresIn: EXPIRATION,
    });

    return { agent: existingAgent, token };
  }
}
export default AuthenticateService;

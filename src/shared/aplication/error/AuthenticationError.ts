import AppGeneralError, { AppError } from './AppError';

export default class AuthenticationError extends AppGeneralError {
  public readonly httpCode: number;

  public readonly internalCode: string;

  public readonly content: Record<string, unknown> | undefined;

  constructor(message: string, options?: AppError) {
    super(message);
    this.httpCode = 400;
    this.internalCode = 'auth-error';
    this.content = options?.content;
  }
}

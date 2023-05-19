import AppGeneralError, { AppError } from "./AppError";

export default class EntityPersistanceError extends AppGeneralError {
  public readonly httpCode: number;

  public readonly internalCode: string;

  public readonly content: Record<string, unknown> | undefined;

  constructor(message: string, options?: AppError) {
    super(message);
    this.httpCode = 400;
    this.internalCode = "persistance-error";
    this.content = options?.content;
  }
}

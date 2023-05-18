export interface AppError {
    /**
     * HTTP code suitable to be sent on the response
     */
    httpCode?: number;
  
    /**
     * Code used to solve production problems.
     *
     * If the error is yet to be documented, use a code preceeded by `nodoc-`.
     */
    internalCode?: string;
  
    /**
     * Information to be used on debugging. This can be used to store a callstack, a developer message or anything that may help finding and solving the problem
     */
    content?: Record<string, unknown>;
  }
  
  export default class AppGeneralError extends Error implements AppError {
    public readonly httpCode: number;
  
    public readonly internalCode: string;
  
    public readonly content: Record<string, unknown> | undefined;
  
    constructor(message: string, options?: AppError) {
      super(message);
      this.httpCode = options?.httpCode || 500;
      this.internalCode = options?.internalCode || 'nodoc-x';
      this.content = options?.content;
    }
  }
  
/**
 * An interface for executable services
 *
 * @interface
 *
 * @template P the type of the parameters passed to the service
 * @template R the type of the return value of the service
 */
interface Service<P, R> {
    /**
     * Executes the service logic. May be asynchronous.
     *
     * @param {P} params parameters needed by the service
     *
     * @returns {Promise<R> | R} the result of the service
     */
    execute(params?: P): Promise<R> | R;
  }
  
  export default Service;
  
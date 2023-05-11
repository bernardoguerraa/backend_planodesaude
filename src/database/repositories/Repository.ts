import Filters from './Filter';
import Model from './Model';

interface Repository<M> {
  /**
   * Lists all models that match a given condition (filter). If none is provided, all models are returned
   *
   * @template M a domain model
   * @return {Promise<M[]>} a promise that resolves to an array of domain models
   */
  find(filters: Filters<M>): Promise<M[]>;

  /**
   * Creates a new model
   *
   * @template M a domain model
   * @param {Model<M>} model an object containing all the non-optional properties of a domain model
   * @returns {Promise<M>} the created model
   */
  create(model: Model<M>): Promise<M>;

  /**
   * Updates an existing model on the database
   *
   * @template M a domain model
   * @param id the identifier of the object on the database
   * @param partialModel an object containing any number of modifiable properties on `M`
   * @returns {Promise<void>}
   */
  updateById(id: string, partialModel:M): Promise<void>;

  /**
   * Deletes an existing model on the database
   *
   * @param id the identifier of the object on the database
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>;

}

export default Repository;

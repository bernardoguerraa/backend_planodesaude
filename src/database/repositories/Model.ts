type Model<E> = Omit<E, 'createdAt' | 'updatedAt' | 'id'>;

export default Model;
/**
 * @typeParam T for generic base model service interface
 */
interface ModelService<T> {
  bindService(obj: T): void;
  delete<E>(id: unknown): void | Promise<E>;
  save<E>(): void | Promise<E>;
  toObject(): object;
}

export default ModelService;

/** For deep removal of Key `K` from Type `T` recursive function for {@link OmitRecursively} */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends object
    ? Id<OmitRecursively<T, K>>
    : T
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
type Id<T> = {} & { [P in keyof T]: T[P] };

/** For deep removal for deep removal of Key `K` from Type `T */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
export type OmitRecursively<T extends any, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;
/** Identity type */
export type Identity<T> = T;

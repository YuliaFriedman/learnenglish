export type PartialWithRequiredProp<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

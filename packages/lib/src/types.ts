export type SearchParams = Record<string, string[] | string | undefined>;

export interface FlattenedError<T, U = string> {
  formErrors: U[];
  fieldErrors: {
    [P in keyof T]?: U[];
  };
}

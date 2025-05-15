export type InputRef = {
  validation: () => { error: string; isError: boolean };
  value: string;
};

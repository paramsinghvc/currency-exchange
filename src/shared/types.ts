export interface IRootState {
  home: any;
}

export interface IObject<T = any> {
  [k: string]: T;
}

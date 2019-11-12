import { HomeState } from "scenes/Home/home.redux";

export interface IRootState {
  home: HomeState;
}

export interface IObject<T = any> {
  [k: string]: T;
}

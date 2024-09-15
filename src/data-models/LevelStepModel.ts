import { FunctionComponent } from "react";

export interface ActivityModel {}

export class LevelStep<T extends ActivityModel> {
  constructor(public readonly component: FunctionComponent<T>, public readonly model: T) {
  }
}

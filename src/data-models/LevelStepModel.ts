import { FunctionComponent } from "react";
import { Page } from "../routing/AppNavigatorService";

export interface ActivityProps<T> {
   model: T;
}

export class ActivityModel {
  id: string;
};

export class LevelStep<T extends ActivityModel> {
  constructor(public readonly component: FunctionComponent<ActivityProps<T>>, public readonly model: T, public readonly activityKey: Page) {
  }
}


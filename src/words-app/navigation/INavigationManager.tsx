import { RoutesListValues } from "../app-data/models/routeValues.ts";

export type ParamsType = null | undefined | object;

export interface INavigationManager {
  navigateHome(): void;
  goToNextStep(): boolean;
  navigateToStep(id: number): void;
  navigateTo(routeName: RoutesListValues, params?: ParamsType): void;
}

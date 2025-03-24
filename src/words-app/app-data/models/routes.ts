import { ParamListBase } from "@react-navigation/native";
import { RoutesListValues } from "./routeValues.ts";



export interface RoutesList extends ParamListBase {
  [RoutesListValues.categories]: undefined;
  [RoutesListValues.steps]:  undefined;
  [RoutesListValues.step]:  undefined;
  [RoutesListValues.game]: undefined;
  [RoutesListValues.stepsGroupCompleted]: undefined;
}

import { useNavigation } from "@react-navigation/native";
import { ReactElement, useEffect, useRef } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoutesList } from "../app-data/models/routes.ts";
import { useSelector } from "react-redux";
import { currentRouteSelector } from "../app-data/store/AppSelectors.ts";
import { NestedParamsType } from "../app-data/store/reducers/AppNavigation.state.ts";
import { Logger } from "../../logger/Logger.ts";

interface AppNavigationProps{
  children: ReactElement | ReactElement[];
}

export function AppNavigation({children}: AppNavigationProps){

  const logSource = "AppNavigation";
  const navigation = useNavigation<StackNavigationProp<RoutesList>>();
  const currentRoute = useSelector(currentRouteSelector);

  useEffect(() => {
    Logger.log(logSource, "currentRoute changed: " + JSON.stringify(currentRoute));
    if (currentRoute.params !== undefined) {
      if(isNestedParamsType(currentRoute.params)) {
        navigation.navigate(currentRoute.routeName as string, currentRoute.params as NestedParamsType);
      }
      else{
        navigation.navigate(currentRoute.routeName as string, currentRoute.params as object);
      }
    } else {
      navigation.navigate(currentRoute.routeName as string);
    }
  }, [currentRoute, navigation]);

  function isNestedParamsType(params: any): params is NestedParamsType {
    return params && typeof params === 'object' && 'screen' in params && 'params' in params;
  }

  return (
    <>
      {children}
    </>
  )

}

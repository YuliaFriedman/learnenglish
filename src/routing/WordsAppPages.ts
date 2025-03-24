import { navigatorService } from "./AppNavigatorService.ts";
import { ParamListBase } from "@react-navigation/native";

// export enum WordsAppPagesValues {
//   categories = "categories",
//   steps = "steps",
//   game = "game"
// }

// export interface WordsAppPages extends ParamListBase {
//   // categories: "categories";
//   // steps:  "steps";
//   // game: "game";
//
//   [WordsAppPagesValues.categories]: undefined;
//   [WordsAppPagesValues.steps]:  undefined;
//   [WordsAppPagesValues.game]: undefined;
// }
//
// export function WordsAppPagesToString<T extends keyof WordsAppPages>(key: T): string {
//   return key as string;
// }

export class NavigationInitializer  {

  init(){
    //navigatorService.registerPage(WordsAppPages.categories);
    //navigatorService.registerPage(WordsAppPages.steps);
    //navigatorService.registerPage(WordsAppPages.game);
  }

}

export const navigationInitializer = new NavigationInitializer();

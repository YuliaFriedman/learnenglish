import { navigatorService } from "../../routing/AppNavigatorService";

export enum WordsAppPages{
  categories = "categories",
  steps = "steps",
  game = "game"
}

export class NavigationInitializer {

  init(){
    navigatorService.registerPage(WordsAppPages.categories);
    navigatorService.registerPage(WordsAppPages.steps);
    navigatorService.registerPage(WordsAppPages.game);
  }

}

export const navigationInitializer = new NavigationInitializer();

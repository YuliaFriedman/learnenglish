import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Logger } from "../logger/Logger";

export enum Page{
  LevelsList = "LevelsList",
  StoryActivity = "StoryActivity",
  StoryLineActivity = "StoryLineActivity",
  SelectTranslationPicActivity = "SelectTranslationPicActivity"
}

export interface PageInfo{
  key: Page;
  visible: boolean;
  args: any;
}

class NavigatorService extends EventEmitter{

  pages: PageInfo[] = [];

  init(){
    navigatorService.registerPage(Page.LevelsList);
    navigatorService.registerPage(Page.StoryActivity);
    navigatorService.registerPage(Page.StoryLineActivity);
    navigatorService.registerPage(Page.SelectTranslationPicActivity);
  }

  registerPage(page:Page){
    this.pages.push({key: page, visible: false, args: null});
  }

  navigate(page:Page, args?:any){
    Logger.log("NavigatorService", "navigating to " + page);
    this.pages = this.pages.map(item => { return {...item, visible: item.key === page, args: args}});
    this.emit('navigation-changed', this.getVisible());
  }

  getVisible(): PageInfo | undefined {
    return this.pages ? this.pages.find(item => item.visible) : undefined;
  }

}

export const navigatorService = new NavigatorService();
navigatorService.init();

import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

export enum Page{
  LevelsList = "LevelsList",
  StoryActivity = "StoryActivity"
}

export interface PageInfo{
  key: Page;
  visible: boolean;
  args: any;
}

class NavigatorService extends EventEmitter{

  pages: PageInfo[] = [];

  registerPage(page:Page){
    this.pages.push({key: page, visible: false, args: null});
  }

  navigate(page:Page, args?:any){
    this.pages = this.pages.map(item => { return {...item, visible: item.key === page, args: args}});
    console.log("NavigatorService: navigating to " + page);
    this.emit('navigation-changed', this.getVisible());
  }

  getVisible(): PageInfo | undefined {
    return this.pages ? this.pages.find(item => item.visible) : undefined;
  }
}  export const navigatorService = new NavigatorService();

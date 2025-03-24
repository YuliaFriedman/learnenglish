import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Logger } from "../logger/Logger";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface PageInfo{
  key: string;
  visible: boolean;
  args: any;
}

class NavigatorService extends EventEmitter{

  //navigation = useNavigation<StackNavigationProp<WordsAppPages>>();
  pages: PageInfo[] = [];

  registerPage(page:string){
    this.pages.push({key: page, visible: false, args: null});
  }

  navigate(page: string, args?:any){
    //this.navigation.navigate(page as string, args);
    //Logger.log("NavigatorService", "navigating to " + page);
    //this.pages = this.pages.map(item => { return {...item, visible: item.key === page, args: args}});
    //this.emit('navigation-changed', this.getVisible());
  }

  getVisible(): PageInfo | undefined {
    return this.pages ? this.pages.find(item => item.visible) : undefined;
  }

}

export const navigatorService = new NavigatorService();

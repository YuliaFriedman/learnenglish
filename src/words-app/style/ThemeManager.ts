import { KidsTheme } from "./KidsTheme";

class AppThemeManager{

  #theme: any;

  constructor() {
    this.theme = KidsTheme
  }

  public set theme(theme:any){
    this.#theme = theme;
  }

  public get theme(){
    return this.#theme;
  }
}

export const ThemeManager = new AppThemeManager();

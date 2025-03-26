import { Container } from "inversify";

class InjectionManager{
  _container = new Container();

  public get container(){
    return this._container;
    //return container;
  }

  addInjection<T>(token: string, injectable: new (...args: any[]) => T){
    if(!this._container.isBound(token)) {
      this._container.bind<T>(token).to(injectable).inSingletonScope();
    }
  }

  useInjection<T>(token: string){
    return this._container.get<T>(token);
  }

}

export default new InjectionManager();

export const Logger = {
  log: (source: string, msg: string, title: boolean = false, args?: any) => {
    if(title){
      console.log("==================================================");
    }
    if(args) {
      console.log("[" + source + "]" + " " + msg, args);
    }
    else{
      console.log("[" + source + "]" + " " + msg);
    }
    if(title){
      console.log("==================================================");
    }
  },
}

export const Logger = {
  log: (source: string, msg: string, title: boolean = false, args?: any) => {
    const now = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    if(title){
      console.log("==================================================");
    }
    if(args) {
      console.log(`[${now}][${source}] ${msg}`, args);
    }
    else{
      console.log(`[${now}][${source}] ${msg}`);
    }
    if(title){
      console.log("==================================================");
    }
  },
}

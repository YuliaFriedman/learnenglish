import { Logger } from "../logger/Logger";

export const arrayUtil = {
  shuffleArray: (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      let tmp = array[randomIndex];
      array[randomIndex] = array[currentIndex];
      array[currentIndex] = tmp;
    }
  }
}

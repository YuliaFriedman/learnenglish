import { Chunk, Relation, StoryActivityModel } from "../../activities/story/StoryActivityModel";

export class StoryLine {
  sentence: string; //"[i~am][a~boy]<.>"
  translation: string;
  sound: string;
  relations: string; //"0-0|1-1"
}

export type Story = StoryLine[];

export const StoryParser =
{
  parseStory(story: Story): StoryActivityModel{
    return {
      sentences: story.map(line => {
        return {
          sentence: this.parseLine(line.sentence),
          translation: this.parseLine(line.translation),
          sound: line.sound,
          relations : this.parseRelations(line.relations)
        }
      })
    }
  },

  parseLine(text: string):Chunk[]{
    console.log("PARSER: parsing line " + text);
    const chunkStrings = text.match(/(\[.*?\]|\<.*?\>)/g);
    if(chunkStrings) {
      return chunkStrings.map(str => {
        if (str.startsWith("[")) {
          console.log("PARSER: handling chunk: " + str);
          return {
            words: str.substring(1,str.length - 1).split("~"),
            isSelected: false
          }
        }
        // sign
        else {
          console.log("PARSER: chunk is sign: " + str);
          return {
            words: [str.substring(1,str.length - 1)],
            isSign: true,
            isSelected: false
          }
        }
      });
    }
    return [];
  },

  parseRelations(relations: string):Record<number, Relation>{
    console.log("PARSER: parsing relations " + relations);
    let results:Record<number, Relation> = {};
    const relationsParts = relations.split("|");
    relationsParts.forEach(relationsStr => {
      console.log("PARSER: parsing relation " + relationsStr);
      const fromTo = relationsStr.split("-");
      const fromList = fromTo[0].split(",").map(f => Number(f)).filter(f => !isNaN(f));
      const toList = fromTo[1].split(",").map(f => Number(f)).filter(f => !isNaN(f));
      fromList.forEach(from => {
          results[from] = {
            translation: toList,
            additionalChunks: fromList.length == 1 ? undefined :  fromList.filter(num => num != from)
          };
        console.log("PARSER: adding relati0n from =" + from + ", to = " + toList + ", additional = " + results[from].additionalChunks);
      })
    });
    return results;
  }
};

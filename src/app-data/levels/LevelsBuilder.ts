import { StoryLineActivityModel } from "../../activities/story-line/StoryLineActivityModel";
import { StoryLine, StoryParser } from "../story-parser/StoryParser";
import { SaySentenceActivityModel } from "../../activities/saySentance/SaySentenceActivityModel";

export const LevelsBuilder = {
  buildStoryLineActivityModel(storyLine: StoryLine, id:string):StoryLineActivityModel{
    return {
      line:StoryParser.parseStoryLine(storyLine),
      id: id
    }
  },

  buildSaySentenceActivityModel(storyLine: StoryLine, id:string):SaySentenceActivityModel{
    return {
      sentence: StoryParser.parseStoryLine(storyLine),
      id: id
    }
  }
}

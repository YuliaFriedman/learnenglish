import { StoryActivityModel } from "../../../activities/story/StoryActivityModel";
import { LevelStep } from "../../../data-models/LevelStepModel";
import { StoryActivity } from "../../../activities/story/StoryActivity";
import { Level } from "../../../data-models/LevelModel";
import { StoryParser } from "../../story-parser/StoryParser";

// step 1
const level1story = [
  {
    sentence: "[hello]<.>",
    translation: "[hello]<.>",
    sound: "111",
    relations: "0-0"
  },
  {
    sentence: "[i~am][a~boy]<.>",
    translation: "[i][boy]<.>",
    sound: "112",
    relations: "0-0|1-1"
  }
];

const level1_step1 = StoryParser.parseStory(level1story);

export const level1 = new Level("1",[new LevelStep<StoryActivityModel>(StoryActivity, level1_step1)]);


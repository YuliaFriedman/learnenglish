import { ActivityModel, LevelStep } from "../../../data-models/LevelStepModel";
import { Level } from "../../../data-models/LevelModel";
import { StoryParser } from "../../story-parser/StoryParser";
import { StoryLineActivityModel } from "../../../activities/story-line/StoryLineActivityModel";
import { StoryLineActivity } from "../../../activities/story-line/StoryLineActivityComponent";
import { SelectTranslationPicActivity } from "../../../activities/SelectTranslationPic/SelectTranslationPicActivityComponent";
import { SelectTranslationPicActivityModel } from "../../../activities/SelectTranslationPic/SelectTranslationPicActivityModel";
import { Languages } from "../../language";
import { SaySentenceActivityComponent } from "../../../activities/saySentance/SaySentenceActivityComponent";
import { SaySentenceActivityModel } from "../../../activities/saySentance/SaySentenceActivityModel";
import { LevelsBuilder } from "../LevelsBuilder";
import { Page } from "../../../learn-language-app/navigation/Pages";

// step 1
/*const storyLine1 = {
  sentence: "[hello]<.>",
  translation: "[hello]<.>",
  sound: "111",
  relations: "0-0"
};

const storyLine2 = {
  sentence: "[i~am][tom]<.>",
  translation: "[i][tom]<.>",
  sound: "112",
  relations: "0-0|1-1"
}

const storyLine3 = {
  sentence: "[this~is][ben]<.>",
  translation: "[this][ben]<.>",
  sound: "112",
  relations: "0-0|1-1"
}

const storyLine4 = {
  sentence: "[hello]<.>[i~am][ben]<.>",
  translation: "[hello]<.>[i][ben]<.>",
  sound: "111",
  relations: "0-0|2-2|3-3"
}*/

const storyLine1 = {
  sentence: "[a~ball]<.>",
  translation: "[ball]<.>",
  sound: "112",
  relations: "0-0"
}

const storyLine2 = {
  sentence: "[this~is][a~ball]<.>",
  translation: "[this][ball]<.>",
  sound: "112",
  relations: "0-0|1-1"
}

const storyLine3 = {
  sentence: "[this~is][a~red][ball]<.>",
  translation: "[this][ball][red]<.>",
  sound: "112",
  relations: "0-0|1-2|2-1"
}

const storyLine4 = {
  sentence: "[this~is][a~green][ball]<.>",
  translation: "[this][ball][green]<.>",
  sound: "112",
  relations: "0-0|1-2|2-1"
}


const question1 = {
  word: "ball",
  language: Languages.EN,
  answers: [
    {word: "ball", language: Languages.HE},
    {word: "red", language: Languages.HE},
    {word: "green", language: Languages.HE},
    {word: "this", language: Languages.HE}
  ],
  correctAnswer: 0,

}

const question2 = {
  sentence: "[a~ball]<.>",
  translation: "[ball]<.>",
  sound: "112",
  relations: "0-0"
};

export const level1 = new Level(
  0,
  [
    new LevelStep<SaySentenceActivityModel>(SaySentenceActivityComponent, LevelsBuilder.buildSaySentenceActivityModel(question2, "en-he-1-6"), Page.SaySentence),
    new LevelStep<StoryLineActivityModel>(StoryLineActivity, LevelsBuilder.buildStoryLineActivityModel(storyLine1, "en-he-1-1"), Page.StoryLineActivity),
    new LevelStep<StoryLineActivityModel>(StoryLineActivity, LevelsBuilder.buildStoryLineActivityModel(storyLine2, "en-he-1-2"), Page.StoryLineActivity),
    new LevelStep<StoryLineActivityModel>(StoryLineActivity, LevelsBuilder.buildStoryLineActivityModel(storyLine3, "en-he-1-3"), Page.StoryLineActivity),
    new LevelStep<StoryLineActivityModel>(StoryLineActivity, LevelsBuilder.buildStoryLineActivityModel(storyLine4, "en-he-1-4"), Page.StoryLineActivity),
    new LevelStep<SelectTranslationPicActivityModel>(SelectTranslationPicActivity, {...question1, id: "en-he-1-5"}, Page.SelectTranslationPicActivity),

  ]);


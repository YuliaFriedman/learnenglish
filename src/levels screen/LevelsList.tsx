import { Level } from "../data-models/LevelModel";
import { Button, View } from "react-native";
import { levelsListStyles } from "./LevelsList.styles";
import { Page } from "../routing/AppNavigatorService";
import { navigatorService } from "../routing/AppNavigatorService";

export interface LevelsListModel {
  levels: Level[];
  lastCompleted: number;
}

export function LevelsList(model:LevelsListModel) {

  function levelClicked(level: Level){
    console.log("Level clicked " + level.id, level.steps[0]);
    navigatorService.navigate(Page.StoryActivity, level.steps[0].model);
  }

  return (
    <View style={levelsListStyles.levelsList}>
      {
        model.levels.map((level,index) => <Button key={"level_" + level.id} style={levelsListStyles.levelTile} title={"level " +index} onPress={() => levelClicked(level)}> </Button>)
      }
    </View>
  );

}

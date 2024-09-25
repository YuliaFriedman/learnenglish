import { Level } from "../data-models/LevelModel";
import { Button, View } from "react-native";
import { levelsListStyles } from "./LevelsList.styles";
import { Page } from "../routing/AppNavigatorService";
import { navigatorService } from "../routing/AppNavigatorService";
import { LevelManager } from "../services/LevelManager";
import { Logger } from "../logger/Logger";

export interface LevelsListModel {
  levels: Level[];
  lastCompleted: number;
}

export function LevelsList(model:LevelsListModel) {

  function levelClicked(level: Level){
    Logger.log("LevelsList", "Level clicked " + level.id, false, level.steps[0]);
    LevelManager.startLevel(level);
  }

  return (
    <View style={levelsListStyles.levelsList}>
      {
        model.levels.map((level,index) => <Button key={"level_" + level.id} style={levelsListStyles.levelTile} title={"level " +index} onPress={() => levelClicked(level)}> </Button>)
      }
    </View>
  );

}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { StepGamesManagerStyling } from "./StepGamesManager.styling.tsx";
import { RoutesListValues } from "../../../app-data/models/routeValues.ts";
import React from "react";
import GameContainerComponent from "../game-container/GameContainer.component.tsx";
import { GroupCompleted } from "../../completed-pages/group-completed/GroupCompleted.component.tsx";
import { ExamContainerComponent } from "../exam-container/ExamContainer.component.tsx";

export function StepGamesManager(){
  const GameStack = createNativeStackNavigator();

  return (
    <View style={StepGamesManagerStyling.host}>
      <GameStack.Navigator screenOptions={{ headerShown: false }}>
        <GameStack.Screen
          name={RoutesListValues.game}
          // @ts-ignore
          component={GameContainerComponent}
        />
        <GameStack.Screen
          name={RoutesListValues.stepsGroupCompleted}
          // @ts-ignore
          component={GroupCompleted}
        />
        <GameStack.Screen
          name={RoutesListValues.exam}
          // @ts-ignore
          component={ExamContainerComponent}
        />
      </GameStack.Navigator>
    </View>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { GameManagerStyling } from "./GameManager.styling.tsx";
import { RoutesListValues } from "../../../app-data/models/routeValues.ts";
import React from "react";
import GameContainerComponent from "../game-container/GameContainer.component.tsx";
import { StepsCompleted } from "../steps-completed/StepsCompleted.component.tsx";

export function GameManager(){
  const GameStack = createNativeStackNavigator();

  return (
    <View style={GameManagerStyling.host}>
      <GameStack.Navigator screenOptions={{ headerShown: false }}>
        <GameStack.Screen
          name={RoutesListValues.game}
          // @ts-ignore
          component={GameContainerComponent}
        />
        <GameStack.Screen
          name={RoutesListValues.stepsGroupCompleted}
          // @ts-ignore
          component={StepsCompleted}
        />
      </GameStack.Navigator>
    </View>
  );
}

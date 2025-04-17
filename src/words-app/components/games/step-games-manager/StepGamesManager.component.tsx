import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { StepGamesManagerStyling } from "./StepGamesManager.styling.tsx";
import { RoutesListValues } from "../../../app-data/models/routeValues.ts";
import React from "react";
import GameContainerComponent from "../game-container/GameContainer.component.tsx";

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
      </GameStack.Navigator>
    </View>
  );
}

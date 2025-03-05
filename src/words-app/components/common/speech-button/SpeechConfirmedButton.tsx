import { StyleSheet, View, ViewStyle } from "react-native";
import { IconButton } from "../../../../core/components/icon-button/IconButton.tsx";
import React from "react";
import { ThemeManager } from "../../../style/ThemeManager.ts";

interface SpeechConfirmedButtonProps {
  style?: ViewStyle;
}

export function SpeechConfirmedButton({style}:SpeechConfirmedButtonProps){
  return (
    <View style={[styling.micContainer, style,]}>
      <IconButton icon="check" size={40} iconColor="white"></IconButton>
    </View>
  );
}

const styling = StyleSheet.create({
  micContainer: {
    alignSelf: "center",
    backgroundColor: ThemeManager.theme.buttons.speechConfirmButton.backgroundColor,
    borderRadius: 200,
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

});

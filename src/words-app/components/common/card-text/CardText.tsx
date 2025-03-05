import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

interface CardTextProps {
  children?: ReactNode;
  style: TextStyle;
}

export function CardText({children, style}: CardTextProps){
  return (
    <Text numberOfLines={1} style={[styling.host, style]}>{children}</Text>
  )
}

const styling = StyleSheet.create({
  host: {
    fontSize:20,
    color: ThemeManager.theme.games.card.textColor,
    fontWeight: "bold"
  }
});

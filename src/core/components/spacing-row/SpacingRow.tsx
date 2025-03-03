import { View } from "react-native";

interface SpacingRowProps {
  flex: number;
}

export function SpacingRow({flex}: SpacingRowProps) {
  return (
    <View style={{flex: flex}}></View>
  )
}

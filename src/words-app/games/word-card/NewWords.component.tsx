/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NewWordsModel } from "./NewWordsModel";
import { Logger } from "../../../logger/Logger";

function NewWordsComponent(args: {model: NewWordsModel}): React.JSX.Element {

  const logSource = "NewWords";

  Logger.log(logSource, "In NewWordsComponent", false, args);

  return (
    <View>
      {args.model.words.map(word => <Text key={word}>{word}</Text>)} 
    </View>

  );
}

export default NewWordsComponent;

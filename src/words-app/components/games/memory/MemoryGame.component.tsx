import { Pressable, Text, View } from "react-native";
import { GameComponentProps } from "../models/GameModel.ts";
import { MemoryGameModel } from "./MemoryGame.model.tsx";
import { useEffect, useRef } from "react";
import { useMemoryGame } from "./UseMemoryGame.tsx";
import WordCardComponent, { CardStyle } from "../word-card/WordCard.component.tsx";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary.ts";
import { WordCardModel } from "../word-card/WordCardModel.ts";
import { useSelector } from "react-redux";
import { selectedLanguageSelector } from "../../../app-data/store/AppSelectors.ts";
import { arrayUtil } from "../../../../utils/ArrayUtil.ts";
import { MemoryGameStyling } from "./MemoryGame.styling.tsx";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { FlipCard } from "../../../../core/components/animations/flip-animation.tsx";

export function MemoryGame({model, onCompleted}: GameComponentProps<MemoryGameModel>){

  const { gameCards, doFlipCard, setGameCards } = useMemoryGame([]);
  const cardStyling = useRef<Record<string, Partial<CardStyle>>>({});
  const selectedLanguage = useSelector(selectedLanguageSelector);

  useEffect(() => {
    initGame();
  }, [model]);

  function initGame(){
    cardStyling.current = {};
    if (model) {
      const imgCards = model.words.map((word, index) => {
        const wordCard = createWordCard(word, true, false);
        cardStyling.current[wordCard.id] = ThemeManager.theme.games.memoryGame.cardStyling[index];
        return {
          id: wordCard.id + "_image",
          isFlipped: false,
          isMatched: false,
          word: wordCard
        }
      });
      const wordsCards = model.words.map(word => {
        const wordCard = createWordCard(word, false, true);
        return {
          id: wordCard.id + "_text",
          isFlipped: false,
          isMatched: false,
          word: wordCard
        }
      });
      const allCards = [...imgCards, ...wordsCards];
      arrayUtil.shuffleArray(allCards)
      setGameCards(allCards);
    }
  }

  function createWordCard(word: string, imgVisible:boolean, showText: boolean){
    let dicWord = dictionary.getWord(selectedLanguage, word);
    return new WordCardModel( {
      id: word,
      ...dicWord || { word: word},
      pressable: true,
      language: selectedLanguage,
      imgVisible: imgVisible,
      showText: showText
    })
  }

  return (
    <View style={MemoryGameStyling.host}>
      <View style={MemoryGameStyling.cardsContainer}>


        {gameCards.map((card, index) => (
          <View style={MemoryGameStyling.card} key={"card_" + index}>
            <FlipCard
              isFlipped={card.isFlipped}
              direction={"x"}
              RegularContent={
                <WordCardComponent
                  style={{width: "100%"}}
                  key={card.word.id}
                  model={card.word}
                  onPressed={() => doFlipCard(card)}
                  cardStyle={cardStyling.current[card.word.id]}
                />
              }
              FlippedContent={
                <Pressable onPress={() => doFlipCard(card)} style={{height: "100%", width: "100%", backgroundColor: "white"}}>
                  <Text>{card.word.word}</Text>
                </Pressable>
              }/>
          </View>
        ))}
      </View>
      <View style={MemoryGameStyling.buttonContainer}>
        <PrimaryButtonComponent wrapperStyle={MemoryGameStyling.nextButton}>Next</PrimaryButtonComponent>
      </View>
    </View>
  )
}

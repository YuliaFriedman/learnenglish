import { useEffect, useState } from "react";
import { MemoryCard } from "./MemoryCard.model.tsx";
import { Logger } from "../../../../logger/Logger.ts";

export function useMemoryGame(cards: MemoryCard[]) {

  const logSource = "useMemoryGame";
  const [gameCards, setGameCards] = useState(cards);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);

  useEffect(() => {
    Logger.log(logSource, "current cards: " + gameCards.map(c => `\n[id: ${c.id}, isFlipped: ${c.isFlipped}, text: ${c.word.word}]`));
  }, [gameCards]);

  const flipCard = (card: MemoryCard) => {
    if (flippedCards.length === 2 || card.isFlipped || card.isMatched) {
      Logger.log(logSource, `two cards already flipped: ${flippedCards.map(card => card.id)}`)
      return;
    }
    Logger.log(logSource, `flipping card ${card.id}`);
    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    setGameCards(prevGameCards => {
      const newGameCards = prevGameCards.map(c =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );

      if (newFlippedCards.length === 2) {
        setTimeout(() => checkMatch(newFlippedCards, newGameCards), 1000);
      }

      return newGameCards;
    });
  };

  const checkMatch = (flippedCards: MemoryCard[], gameCards:MemoryCard[] ) => {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.word.id === secondCard.word.id) {
      Logger.log(logSource, `cards match: ${firstCard.id}, ${secondCard.id}`);
      const newGameCards = gameCards.map(c => {
          Logger.log(logSource, `setting isMatched true: id = ${c.id}, isFlippled = ${c.isFlipped}`);
        return c.id === firstCard.id || c.id === secondCard.id
          ? { ...c, isMatched: true }
          : c
      }

      );
      setGameCards(newGameCards);
    } else {
      Logger.log(logSource, `cards do not match: ${firstCard.id}, ${secondCard.id}`);
      const newGameCards = gameCards.map(c =>
        c.id === firstCard.id || c.id === secondCard.id
          ? { ...c, isFlipped: false }
          : c
      );
      setGameCards(newGameCards);
    }

    setFlippedCards([]);
    //Logger.log(logSource, "current cards: " + gameCards.map(c => `\n[id: ${c.id}, isFlipped: ${c.isFlipped}, text: ${c.word.word}]`));
  };

  return { gameCards, doFlipCard: flipCard, setGameCards };
}

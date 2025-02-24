import { Image, Pressable, Text, View } from "react-native";
import { images } from "../../../app-data/ImagesManager.ts";
import React from "react";
import { Category } from "../../../app-data/models/CategoryModel.ts";
import { CategoryCardStyling } from "./CategoryCard.styling.tsx";
import { TileOutfitComponent } from "../../common/tile-outfit/TileOutfit.component.tsx";

export interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}


export function CategoryCard({category, onPress}: CategoryCardProps) {
  return (

      <Pressable key={category.type} style={[CategoryCardStyling.CategoryCell, {shadowColor: category.style?.colors[0]}]} onPress={() => onPress && onPress()}>
        <TileOutfitComponent colors={category.style?.colors} locations={category.style?.locations} borderColor={category.style?.borderColor}
          overlay={{ color: category.style?.overlayColor, pos: { bottom: 60, right: 60 }}} ></TileOutfitComponent>
        <View>
          <View style={CategoryCardStyling.imageWrapper}>
            <Image
              style={CategoryCardStyling.image}
              source={images[category.icon]}
              resizeMode={"contain"} />
          </View>
          <Text style={CategoryCardStyling.cardText}>{category.title}</Text>
        </View>
      </Pressable>



  );
}

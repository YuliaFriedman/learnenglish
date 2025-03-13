import { Colors } from "../../style/Colors";


export const KidsTheme = {
  header: {
    bg: {
      colors: [Colors.$bluePurple_400, Colors.$purple_400],
      locations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y:  0.5}
    },
    bottomBorder: Colors.$transparent,
    textColor: Colors.$gray_0,
    shadowColor: Colors.$violet_gray_light_300,
    innerBorder: Colors.$bluePurple_400
  },
  content: {
    bg1: {
      colors: [ Colors.$violet_gray_50, Colors.$transparent, Colors.$violet_gray_50],
      locations: [0, 0.8, 0.81],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1}
    },
    bg2: {
      colors: [Colors.$violet_gray_50, Colors.$transparent, Colors.$violet_gray_50],
      locations: [0, 0.7, 0.71],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1}
    },
    borderColor: Colors.$lime_900,
    overlayColor: Colors.$transparent,


  },
  categoryCard:{
    outerBg: Colors.$orange_400,
    textColor: Colors.$gray_0,
    defaultCardStyle: {
      colors: [Colors.$gray_250, Colors.$gray_550],
      locations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5},
      overlayColor: Colors.$gray_0,
      borderColor: Colors.$gray_800
    },
    card1: {
      colors: [Colors.$lime_400, Colors.$lime_600],
      locations: [0, 1],
      borderColor: Colors.$lime_900,
      overlayColor: Colors.$green_50
    },
    card2: {
      colors: [Colors.$navy_200, Colors.$navy_500],
      locations: [0, 1],
      borderColor: Colors.$navy_600,
      overlayColor: Colors.$navy_200
    },
    card3: {
      colors: [Colors.$purple_300, Colors.$purple_500],
      locations: [0, 1],
      borderColor: Colors.$purple_600,
      overlayColor: Colors.$purple_200
    },
    card4: {
      colors: [Colors.$teal_300, Colors.$teal_400],
      locations: [0, 1],
      borderColor: Colors.$teal_500,
      overlayColor: Colors.$teal_200
    },

    defaultTileStyle: {
      colors: [Colors.$gray_250, Colors.$gray_550],
      locations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5},
      overlayColor: Colors.$gray_0,
      borderColor: Colors.$gray_800
    },
  },
  examTileStyling: {
    colors: [Colors.$purple_200, Colors.$lime_600, Colors.$navy_500],
    locations: [0, 0.5, 1],
    borderColor: Colors.$lime_900,
    overlayColor: Colors.$transparent
  },
  games: {
    card: {
      borderColors: [Colors.$violet_gray_150, Colors.$violet_gray_150],
      borderColorCorrect: [Colors.$lime_600, Colors.$lime_600],
      borderColorWrong: [Colors.$red_400, Colors.$red_400],
      borderStart:{ x: 0, y: 0 },
      borderEnd:{ x: 1, y: 0 },

      backgroundColor: Colors.$gray_0,
      backgroundColorCorrect: Colors.$lime_50,
      backgroundColorWrong: Colors.$red_light_100,

      overlayColor: Colors.$gray_0,
      shadow: Colors.$gray_1000,

      textColor: Colors.$orange_650
    },

    selectableCard: {
      borderColors: [Colors.$purple_400, Colors.$navy_600],
      borderColorSelected: [Colors.$orange_650, Colors.$orange_650],

      backgroundColor: Colors.$gray_0,
      backgroundColorSelected: Colors.$beige_50,
    },

    textCard: {
      borderColors: [Colors.$purple_400, Colors.$navy_600],
      borderColorSelected: [Colors.$orange_650, Colors.$orange_650],
      borderColorCorrect: [Colors.$lime_900, Colors.$lime_900],
      borderColorWrong: [Colors.$red_700, Colors.$red_700],

      backgroundColor: Colors.$gray_0,
      backgroundColorSelected: Colors.$beige_50,
      backgroundColorCorrect: Colors.$green_500,
      backgroundColorWrong: Colors.$red_light_100,
    },

    selectTranslation: {
      header:{
        shadowColor: Colors.$gray_1000,
        borderBottomColor: Colors.$purple_200,
        backgroundColor: Colors.$violet_gray_250
      }

    },

    sayTheWord: {
      cardWrapper: {
        shadowColor: Colors.$gray_1000,
        borderColor: Colors.$purple_200,
        backgroundColor: Colors.$violet_gray_250
      }
    },

    matchTranslation: {
      card: {
        borderColors: [Colors.$transparent, Colors.$transparent],
        backgroundColor: Colors.$transparent,
        shadow: Colors.$transparent,
      },
      highlight: {
        borderColor: Colors.$gray_250,
        backgroundColor: Colors.$gray_250,
        shadow: Colors.$gray_1000,
      },
      highlightOnDrag: {
        borderColor: Colors.$gray_250,
        backgroundColor: Colors.$gray_200
      },
      cardWithAnswer: {
        borderColors: [Colors.$purple_400, Colors.$navy_600],
        backgroundColor: Colors.$gray_0,
        shadow: Colors.$transparent
      },
      answer: {
        borderColors: [Colors.$transparent, Colors.$transparent],
        backgroundColor: Colors.$violet_gray_250,
        shadow: Colors.$transparent,
        placeholderBg: Colors.$violet_gray_500
      }
    }
  },
  buttons: {
      defaultButton: {
      bg: {
        colors: [Colors.$green_500, Colors.$green_300],
        locations: [0, 1],
        start: {x: 0, y: 0.5},
        end: {x: 1, y:  0.5}
      },
    },
    primary: {
      bg: {
        colors: [Colors.$green_500, Colors.$green_300],
        locations: [0, 1],
        start: {x: 0, y: 0.5},
        end: {x: 1, y:  0.5}
      },
      pressed: {
        colors: [Colors.$green_600, Colors.$green_400],
        locations: [0, 1],
        start: {x: 0, y: 0.5},
        end: {x: 1, y:  0.5}
      },
      color: Colors.$gray_0
    },
    secondary: {
      bg: {
        colors: [Colors.$gray_450, Colors.$gray_350],
        locations: [0, 1],
        start: {x: 0, y: 0.5},
        end: {x: 1, y:  0.5}
      },
      pressed: {
        colors: [Colors.$gray_550, Colors.$gray_450],
        locations: [0, 1],
        start: {x: 0, y: 0.5},
        end: {x: 1, y:  0.5}
      },
      color: Colors.$gray_0
    },
    speechButton: {
      backgroundColor: Colors.$orange_650
    },
    speechConfirmButton: {
      backgroundColor: Colors.$lime_900
    }
  },
  shadow: (color: string, innerShadow: boolean = false) => {
    if(!color || color === Colors.$transparent){
      return {};
    }
    return {
      // iOS shadow
      shadowColor: color,
     shadowOffset: {
       width: 0,
       height: 2,
       },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // Android shadow
      elevation: innerShadow ? -5 : 5,
    }
  }
}



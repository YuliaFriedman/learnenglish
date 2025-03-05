import { Colors } from "../../style/Colors";


export const KidsTheme = {
  header: {
    bg: {
      colors: [Colors.bluePurple1, Colors.purple11],
      locations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y:  0.5}
    },
    bottomBorder: Colors.transparent,
    textColor: Colors.white,
    shadowColor: Colors.purple3,
    innerBorder: Colors.bluePurple1
  },
  content: {
    bg1: {
      colors: [ Colors.lightPurple1, Colors.transparent, Colors.lightPurple1],
      locations: [0, 0.8, 0.81],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1}
    },
    bg2: {
      colors: [Colors.lightPurple1, Colors.transparent, Colors.lightPurple1],
      locations: [0, 0.7, 0.71],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1}
    },
    borderColor: Colors.green3,
    overlayColor: Colors.transparent,


  },
  categoryCard:{
    outerBg: Colors.orange2,
    textColor: Colors.white,
    defaultCardStyle: {
      colors: [Colors.gray1, Colors.gray2],
      locations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5},
      overlayColor: Colors.white,
      borderColor: Colors.gray3
    },
    card1: {
      colors: [Colors.green1, Colors.green2],
      locations: [0, 1],
      borderColor: Colors.green3,
      overlayColor: Colors.green0
    },
    card2: {
      colors: [Colors.blue2, Colors.blue3],
      locations: [0, 1],
      borderColor: Colors.blue4,
      overlayColor: Colors.blue1
    },
    card3: {
      colors: [Colors.purple1, Colors.purple2],
      locations: [0, 1],
      borderColor: Colors.purple3,
      overlayColor: Colors.purple0
    },
    card4: {
      colors: [Colors.turquoise1, Colors.turquoise2],
      locations: [0, 1],
      borderColor: Colors.turquoise3,
      overlayColor: Colors.turquoise0
    },

    defaultTileStyle: {
      colors: [Colors.gray1, Colors.gray2],
      locations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5},
      overlayColor: Colors.white,
      borderColor: Colors.gray3
    },
  },
  examTileStyling: {
    colors: [Colors.purple0, Colors.green2, Colors.blue3],
    locations: [0, 0.5, 1],
    borderColor: Colors.green3,
    overlayColor: Colors.transparent
  },
  games: {
    card: {
      borderColors: [Colors.white, Colors.white],
      borderStart:{ x: 0, y: 0 },
      borderEnd:{ x: 1, y: 0 },
      backgroundColor: Colors.white,

      overlayColor: Colors.white,
      shadow: Colors.black,

      textColor: Colors.orange3
    },

    selectableCard: {
      borderColors: [Colors.purple11, Colors.blue4],
      borderColorSelected: [Colors.orange3, Colors.orange3],
      borderColorCorrect: [Colors.green3, Colors.green3],
      borderColorWrong: [Colors.red2, Colors.red2],

      backgroundColor: Colors.white,
      backgroundColorSelected: Colors.beige0,
      backgroundColorCorrect: Colors.green00,
      backgroundColorWrong: Colors.red0,
    },

    textCard: {
      borderColors: [Colors.purple11, Colors.blue4],
      borderColorSelected: [Colors.orange3, Colors.orange3],
      borderColorCorrect: [Colors.green3, Colors.green3],
      borderColorWrong: [Colors.red2, Colors.red2],

      backgroundColor: Colors.white,
      backgroundColorSelected: Colors.beige0,
      backgroundColorCorrect: Colors.green00,
      backgroundColorWrong: Colors.red0,
    },

    selectTranslation: {
      header:{
        shadowColor: Colors.black,
        borderBottomColor: Colors.purple0,
        backgroundColor: Colors.lightPurple3
      }

    },

    sayTheWord: {
      cardWrapper: {
        shadowColor: Colors.black,
        borderColor: Colors.purple0,
        backgroundColor: Colors.lightPurple3
      }
    }
  },
  buttons: {
    primary: {
      bg: {
        colors: [Colors.bluePurple1, Colors.purple11],
        locations: [0, 1],
        start: {x: 0, y: 0.5},
        end: {x: 1, y:  0.5}
      },
      color: Colors.white
    },
    speechButton: {
      backgroundColor: Colors.orange3
    },
    speechConfirmButton: {
      backgroundColor: Colors.green3
    }
  },
  shadow: (color: string) => {
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
      elevation: 5,
    }
  }
}



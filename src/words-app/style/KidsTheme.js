import { Colors } from "../../style/Colors";


export const KidsTheme = {
  header: {
    bg: {
      colors: [Colors.orange2, Colors.orange3],
      locations: [0.5, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5}
    },
    bottomBorder: Colors.orange3,
    textColor: Colors.white,
    shadowColor: Colors.orange3,
  },
  content: {
    bg: Colors.white
  },
  categoryCard:{
    outerBg: Colors.orange2,
    textColor: Colors.white,
    defaultCardStyle: {
      bgColors: [Colors.gray1, Colors.gray2],
      bgLocations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5},
      overlayColor: Colors.white,
      borderColor: Colors.gray3
    },
    card1: {
      bgColors: [Colors.green1, Colors.green2],
      bgLocations: [0, 1],
      borderColor: Colors.green3,
      overlayColor: Colors.green0
    },
    card2: {
      bgColors: [Colors.blue2, Colors.blue3],
      bgLocations: [0, 1],
      borderColor: Colors.blue4,
      overlayColor: Colors.blue1
    },
    card3: {
      bgColors: [Colors.purple1, Colors.purple2],
      bgLocations: [0, 1],
      borderColor: Colors.purple3,
      overlayColor: Colors.purple0
    },
    card4: {
      bgColors: [Colors.turquoise1, Colors.turquoise2],
      bgLocations: [0, 1],
      borderColor: Colors.turquoise3,
      overlayColor: Colors.turquoise0
    },

    defaultTileStyle: {
      bgColors: [Colors.gray1, Colors.gray2],
      bgLocations: [0, 1],
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 0.5},
      overlayColor: Colors.white,
      borderColor: Colors.gray3
    },
  },
  examTileStyling: {
    bgColors: [Colors.purple0, Colors.green2, Colors.blue3],
    bgLocations: [0, 0.5, 1],
    borderColor: Colors.green3,
    overlayColor: Colors.transparent
  }
}



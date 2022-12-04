var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }

  getColoredMap() {
    // TODO: That's where you work
    let coloredMap = this.getRawMap().slice();
    for (let i = 0; i < coloredMap.length; i++) {
      for (let j = 0; j < coloredMap[i].length; j++) {
        if(coloredMap[i][j] === DEFAULT_EARTH_COLOR)
        { 
          let tempColor=this.generateRandomColor()
          if( i< coloredMap.length-1 && coloredMap[i+1][j] !== DEFAULT_EARTH_COLOR && coloredMap[i+1][j] !== DEFAULT_WATER_COLOR ){
            tempColor=coloredMap[i+1][j]
          }
          else if(i>0 && coloredMap[i-1][j] !== DEFAULT_EARTH_COLOR && coloredMap[i-1][j] !== DEFAULT_WATER_COLOR ){
            tempColor=coloredMap[i-1][j]
          }
          else if( j>0 && coloredMap[i][j-1] !== DEFAULT_EARTH_COLOR && coloredMap[i][j-1] !== DEFAULT_WATER_COLOR){
            tempColor=coloredMap[i][j-1]
          }
          else if( j<coloredMap[i].length-1 && coloredMap[i][j+1] !== DEFAULT_EARTH_COLOR && coloredMap[i][j+1] !== DEFAULT_WATER_COLOR){
            tempColor=coloredMap[i][j+1]
          }
          else{
            tempColor=this.generateRandomColor()
          }
          coloredMap[i][j]=tempColor;

        }
      }
    }

    return coloredMap;
  }
}



// if (coloredMap[i][j] === DEFAULT_EARTH_COLOR ) {
//   for (let k = j; k < coloredMap.length; k--) {
//     if (coloredMap[i][k] === DEFAULT_EARTH_COLOR ) {
//       coloredMap[i][k]=tempColor
//     }
//     else{
//       break;
//     }

//   }
//   for (let k = j; k > coloredMap.length; k++) {
//     if (coloredMap[i][k] === DEFAULT_EARTH_COLOR ) {
//       coloredMap[i][k]=tempColor
//     }
//     else{
//       break;
//     }
//   }
//   for (let k = i; k < coloredMap.length; k--) {
//     if (coloredMap[i][k] === DEFAULT_EARTH_COLOR ) {
//       coloredMap[i][k]=tempColor
//     }
//     else{
//       break;
//     }
//   }
//   for (let k = i; k > coloredMap.length; k++) {
//     if (coloredMap[i][k] === DEFAULT_EARTH_COLOR ) {
//       coloredMap[i][k]=tempColor
//     }
//     else{
//       break;
//     }
//   }
//   tempColor = this.generateRandomColor();
// }
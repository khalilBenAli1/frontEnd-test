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
    let color =this.generateRandomColor()
    const helper=(island, i, j, ROW, COL)=>{
      if (i < 0 || j < 0 || i > (ROW - 1) || j > (COL - 1) || island[i][j] === DEFAULT_WATER_COLOR )
      {
          return;
      }
     
      if (island[i][j] === DEFAULT_EARTH_COLOR)
      {
        island[i][j] =color
      helper(island, i + 1, j, ROW, COL)   
      helper(island, i - 1, j, ROW, COL)    
      helper(island, i, j + 1, ROW, COL)    
      helper(island, i, j - 1, ROW, COL)
      }
    }

    let ROW = coloredMap.length;
    let COL = coloredMap[0].length;

    
    for (let i = 0; i < ROW; i++) 
    {
      for (let j = 0; j < COL; j++) 
      {
        if (coloredMap[i][j] === DEFAULT_EARTH_COLOR)
        {
          
          helper(coloredMap, i, j, ROW, COL)
          color=this.generateRandomColor()
        }
      }
    }

    return coloredMap;
  }
}


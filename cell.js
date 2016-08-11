function Cell(j, i) {
  this.i = i;
  this.j = j;
  this.x = i * SIZE;
  this.y = j * SIZE;
  
  this.visited = false;
  
  this.walls = {
    top   : true,
    right : true,
    bottom: true,
    left  : true
  };
  
  this.getRndNeighbor = function(noFenced) {
    // default value
    if(typeof noFenced === 'undefined') {
      noFenced = false;
    }
    var cells = [];

    var neighbors = [
      getCell(this.j - 1, this.i),
      getCell(this.j    , this.i + 1),
      getCell(this.j + 1, this.i),
      getCell(this.j    , this.i - 1)
    ];
    
    for (var i = 0; i < neighbors.length; ++i) {
      if(neighbors[i] && !neighbors[i].visited && (!noFenced || !isFenced(this, neighbors[i]))) {
        cells.push(neighbors[i]);
      }
    }
    
    if (cells.length) {
      return cells[floor(random(0, cells.length))];
    }
    
    return undefined;
  };
  
  this.highlight = function(color) {
    noStroke();
    fill(color);
    rect(this.x + 1, this.y + 1, SIZE - 1, SIZE - 1);
  };

  this.stroke = function(color) {
    stroke(color);
    noFill();
    rect(this.x + 1, this.y + 1, SIZE - 2, SIZE - 2);
  };
  
  this.show = function() {
    noStroke();
    fill('white');
    rect(this.x, this.y, SIZE, SIZE);

    stroke('black');
    if (this.walls.top)    line(this.x       , this.y       , this.x + SIZE, this.y);
    if (this.walls.right)  line(this.x + SIZE, this.y       , this.x + SIZE, this.y + SIZE);
    if (this.walls.bottom) line(this.x + SIZE, this.y + SIZE, this.x       , this.y + SIZE);
    if (this.walls.left)   line(this.x       , this.y + SIZE, this.x       , this.y);
  }
}
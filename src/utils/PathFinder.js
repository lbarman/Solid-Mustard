//var grid = [[false, false, false], [true, true, true], [true, false, false]];
//var finder = new PathFinder(grid, {x:0, y:0}, {x:2, y:1});
//console.log(finder.doesAnyPathExists());
export default class PathFinder {

  //grid : anything that resolve to true (object, boolean true, number) means there is a building at this position
  constructor(grid, start, end) {

    function isValid(position){
      return position.x >= 0 && position.y >= 0 && position.x < grid.length && position.y < grid[0].length;
    }

    var directions = [{dx:1, dy:0}, {dx:0, dy:1}, {dx:-1, dy:0}, {dx:0, dy:-1}];
    var alreadyVisited = [];
    var nextHop = [];
    for(var x=0; x<grid.length; x++){
      alreadyVisited[x] = [];
      nextHop[x] = [];
    }
    alreadyVisited[end.x][end.y] = true;

    var stack = [end];
    while (stack.length > 0) {
      var current = stack.shift();
      for(var direction of directions){
        let newPosition = {x:current.x+direction.dx, y:current.y+direction.dy};
        if(isValid(newPosition)){
          if(!alreadyVisited[newPosition.x][newPosition.y] && !grid[newPosition.x][newPosition.y]){
            stack.push(newPosition);
            nextHop[newPosition.x][newPosition.y] = current;
          }
          alreadyVisited[newPosition.x][newPosition.y] = true;
        }
      }
    }
    this.nextHop = nextHop;
    console.log(nextHop);
    this.start = start;
    this.end = end;
  }

  nextFrom(x, y) {
    return this.nextHop[x][y];
  }

  doesAnyPathExists() {
    var current = this.start;
    while(!(current.x === this.end.x && current.y === this.end.y)){
      var next = this.nextFrom(current.x, current.y);
      if(next === undefined){
        return false;
      }
      current = next;
    }
    return true;
  }
}

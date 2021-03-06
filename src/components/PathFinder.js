import Component  from '../core/Component.js';
import Types  from '../core/Types.js';

export default class PathFinder extends Component {

  onCreate() {
    this.createAttribute('nextHop', null, Types.Array);
    this.createAttribute('start', null, Types.Object);
    this.createAttribute('end', null, Types.Object);
  }

  //grid : anything that resolve to true (object, boolean true, number) means there is a building at this position
  update(grid, start, end) {
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
    nextHop[end.x][end.y] = {x: end.x, y: end.y};

    var stack = [end];
    while (stack.length > 0) {
      const current = stack.shift();
      for(let direction of directions){
        let newPosition = {x:current.x+direction.dx, y:current.y+direction.dy};
        if(isValid(newPosition)){
          if(!alreadyVisited[newPosition.x][newPosition.y]){
            nextHop[newPosition.x][newPosition.y] = current;
            if(!grid[newPosition.x][newPosition.y]){
              stack.push(newPosition);
            }
          }
          alreadyVisited[newPosition.x][newPosition.y] = true;
        }
      }
    }
    this.nextHop = nextHop;
    this.start = start;
    this.end = end;
  }

  nextFrom(x, y) {
    if (x >= this.nextHop.length || y >= this.nextHop[x].length) {
      throw new Error('Out of bounds access !');
    }
    const hop = this.nextHop[x][y];
    return {x: hop.x, y: hop.y};
  }

  doesAnyPathExists() {
    return this.nextHop[this.start.x][this.start.y] !== undefined;
    // var current = this.start;
    // while(!(current.x === this.end.x && current.y === this.end.y)){
    //   var next = this.nextFrom(current.x, current.y);
    //   if(next === undefined){
    //     return false;
    //   }
    //   current = next;
    // }
    // return true;
  }
}

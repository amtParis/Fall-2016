var Line = function(ctx,pos){
    this.ctx = ctx;
    this.pos = {"x1":pos[0],"y1":pos[1],"x2":pos[2],"y2":pos[3]}
    this.ctx.strokeStyle = "rgba(255,255,255,0.5)";
}

Line.prototype = {
    
    draw:function(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.pos.x1,this.pos.y1);
        this.ctx.lineTo(this.pos.x2,this.pos.y2);
        this.ctx.stroke();
        this.ctx.closePath();
    },
    getRandomPoint:function(){
        var points = this.getPointsOnLine();
        return points[Math.floor(Math.random()*points.length)];
    },
    
    // Bresenham algorithm in Javascript
    // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
    getPointsOnLine:function(){
        var x0 =this.pos.x1;
        var y0 =this.pos.y1;
        var x1 =this.pos.x2;
        var y1 =this.pos.y2;
        var dx = Math.abs(x1-x0);
        var dy = Math.abs(y1-y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx-dy;
        
        var coordinates = [];
        while(true){
            coordinates.push([x0,y0]);
            
            //if (Math.abs(x0-x1)<0.0001 && Math.abs(y0-y1)<0.0001) break;
            if ((x0==x1) && (y0==y1)) break;
            var e2 = 2*err;
            if (e2 >-dy){ err -= dy; x0  += sx; }
            if (e2 < dx){ err += dx; y0  += sy; }
        }
        return coordinates;
    }

    
}

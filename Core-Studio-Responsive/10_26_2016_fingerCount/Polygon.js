var Polygon = function(points){
    this.points = points;
    this.length = points.length;
}

Polygon.prototype = {
    
    setNewPoints:function(points){
        this.points = points;
        this.length = points.length;
    },
    
    area:function(){
        var area = 0,
        i,
        j,
        point1,
        point2;
        
        for (i = 0, j = this.length - 1; i < this.length; j=i,i++) {
            point1 = this.points[i];
            point2 = this.points[j];
            area += point1.x * point2.y;
            area -= point1.y * point2.x;
        }
        area /= 2;
        
        return area;
    },

    centroid:function(){
        var x = 0,
        y = 0,
        i,
        j,
        f,
        point1,
        point2;
        
        if(this.length==1){
            return {"x":this.points[0].x,"y": this.points[0].y};
        }
        if(this.length==2){
            var angle = Math.atan2(this.points[1].y - this.points[0].y,this.points[1].x - this.points[0].x);
            var distance = Math.sqrt(Math.pow(this.points[1].x - this.points[0].x,2)+Math.pow(this.points[1].y - this.points[0].y,2));
            var x = this.points[0].x + Math.cos(angle)*distance/2;
			var y = this.points[0].y + Math.sin(angle)*distance/2;
            return {"x":x,"y": y};
        }
        
        
        
        for (i = 0, j = this.length - 1; i < this.length; j=i,i++) {
            point1 = this.points[i];
            point2 = this.points[j];
            f = point1.x * point2.y - point2.x * point1.y;
            x += (point1.x + point2.x) * f;
            y += (point1.y + point2.y) * f;
        }
        
        f = this.area() * 6;
        
        return {"x":x / f,"y": y / f};
    }
    
}
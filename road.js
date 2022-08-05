class Road{
    constructor(x, width, laneCount){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000;
        this.top = - infinity;
        this.bottom = infinity;

        const topLeft = {x : this.left, y : this.top};
        const topRight = {x : this.right, y : this.top};
        const bottomLeft = {x : this.left, y : this.bottom};
        const bottomRight = {x : this.right, y : this.bottom};

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";

        for(let i = 1; i <= this.laneCount - 1; i++){
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            
            ctx.setLineDash([30,10]);

            ctx.beginPath();

            ctx.moveTo(x, this.top);
            ctx.bezierCurveTo(0, 10, 2000, 1000, x, this.bottom);
            //ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        ctx.lineWidth = 10;
        this.borders.forEach(border =>{
            ctx.beginPath(); 
            ctx.moveTo(border[0].x, border[0].y);
            ctx.bezierCurveTo(0, 10, 2000, 1000, border[1].x, border[1].y);
            //ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}
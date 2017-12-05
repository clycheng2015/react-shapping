/**
 * Created by bear on 2017/12/5.
 */
function Starry(cx,ctx){
    this.cx = cx;
    this.ctx = ctx;
    this.len = 70;
    this.mousePos = [0, 0];
    this.easingFactor = 10;
    this.backgroundColor = 'rgba(0,0,0,0)';
    this.dotColor = '#fff';
    this.lineColor = '#fff';
    this.dots = [];//点
    this.lines = [];//线
}
Starry.prototype = {
    construct:function(){
        var _this = this;
        for( var i = 0; i < this.len; i++ ){
            var dot = {
                isMouse : i===0,
                x : Math.random()*this.cx.width,
                y : Math.random()*this.cx.height,
                r : i===0?0:Math.random()*4,
                v : 2,
                ra : (Math.random()-.5)*2*Math.PI,
                c : Math.random()*10,
                cv : Math.random()+1,
            }
            dot.v = dot.r===0?0:dot.v/(dot.r+1);
            this.dots.push(dot);
        }

        this.dots.forEach(function(dot,m){
            _this.dots.forEach(function(_dot,n){
                if( n < m ){
                    var line = {
                        from : dot,
                        to : _dot
                    }
                    _this.lines.push(line);
                }
            })
        })
    },
    step:function(){
        var _this = this;
        this.dots.forEach(function(dot){
            if(dot.isMouse){
                dot.x += (_this.mousePos[0] - dot.x);
                dot.y += (_this.mousePos[1] - dot.y) / _this.easingFactor;
            };

            if(dot.x<0){
                dot.x = 0;
                dot.ra = -dot.ra;
            }
            if(dot.x>_this.cx.width){
                dot.x = _this.cx.width;
                dot.ra *=-1;
            }
            if(dot.y<0){
                dot.y = 0;
                dot.ra = Math.PI - dot.ra;
            }
            if(dot.y>_this.cx.height){
                dot.y = _this.cx.height;
                dot.ra = Math.PI - dot.ra;
            }
            //随机运动
            dot.c += dot.cv;
            if(dot.c > 50+Math.random()*10 ){
                dot.cv = 1+Math.random();
                dot.c = Math.random()*10;
                dot.ra += (Math.random()-.5)*Math.PI/3;
            }

            dot.x += dot.v*Math.sin(dot.ra);
            dot.y += dot.v*Math.cos(dot.ra);

        });
        this.render();
        window.requestAnimationFrame(this.step.bind(this));
    },
    render:function(){
        var _this = this;
        this.ctx.clearRect(0,0,this.cx.width,this.cx.height);//清除
        this.ctx.globalAlpha = .5;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0,0,this.cx.width,this.cx.height);
        this.ctx.fillStyle = this.dotColor;
        this.dots.forEach(function(dot){
            _this.ctx.beginPath();
            _this.ctx.arc(dot.x,dot.y,dot.r,0,2*Math.PI);
            _this.ctx.fill();
        });
        this.ctx.save();
        this.lines.forEach(function(line){
            var l = Math.sqrt(Math.pow((line.from.x - line.to.x), 2) + Math.pow((line.from.y - line.to.y), 2));
            var maxl = _this.cx.width / 8;
            if( l > maxl) return;
            _this.ctx.strokeStyle = _this.lineColor;
            _this.ctx.lineWidth = (1.0 - l / maxl) * 2;
            _this.ctx.globalAlpha = (1.0 - l / maxl)*.5;
            _this.ctx.beginPath();
            _this.ctx.moveTo(line.from.x,line.from.y);
            _this.ctx.lineTo(line.to.x,line.to.y);
            _this.ctx.stroke();
        });
        this.ctx.restore();
    }
}

export default  Starry
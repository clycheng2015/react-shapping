/**
 * Created by bear on 2017/10/18.
 */
import React  from 'react';

class Bubble extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 80,
            height: 128,
            distance:0
        };

        this.ratio = window.devicePixelRatio
        this.width *= this.ratio
        this.height *= this.ratio
        this.initRadius = 14 * this.ratio
        this.minHeadRadius = 9 * this.ratio
        this.minTailRadius = 4 * this.ratio
        this.initArrowRadius = 8 * this.ratio
        this.minArrowRadius = 5 * this.ratio
        this.arrowWidth = 3 * this.ratio
        this.maxDistance = 30 * this.ratio
        this.initCenterX = 20 * this.ratio
        this.initCenterY = 20 * this.ratio
        this.headCenter = {
            x: this.initCenterX,
            y: this.initCenterY
        }




    }
    static defaultProps = {
        y: 0
    }

    componentWillMount(){
        this.setState({

            distance: Math.max(0, Math.min(this.props.y * this.ratio, this.maxDistance))

        })


    }
    componentDidMount(){



        this._draw()
    }



    componentDidUpdate(){


    }

    // distance=()=> {
    //
    //     let dis= Math.max(0, Math.min(this.props.y * this.ratio, this.maxDistance))
    //
    //     return dis
    // }


    _draw=()=> {
        const bubble = this.bubble


        let ctx = bubble.getContext('2d')

        ctx.clearRect(0, 0, bubble.width, bubble.height)

        this._drawBubble(ctx)
        this._drawArrow(ctx)


    }
    _drawBubble=(ctx)=> {
        ctx.save()
        ctx.beginPath()
        const rate = this.state.distance / this.maxDistance
        // console.log(this.state.distance, this.maxDistance)


        console.log(this.state.distance)
        const headRadius = this.initRadius - (this.initRadius - this.minHeadRadius) * rate
        this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * rate
        // 画上半弧线
        ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true)
        // 画左侧贝塞尔
        const tailRadius = this.initRadius - (this.initRadius - this.minTailRadius) * rate
        const tailCenter = {
            x: this.headCenter.x,
            y: this.headCenter.y + this.state.distance
        }
        const tailPointL = {
            x: tailCenter.x - tailRadius,
            y: tailCenter.y
        }
        const controlPointL = {
            x: tailPointL.x,
            y: tailPointL.y - this.state.distance / 2
        }
        ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)
        // 画下半弧线
        ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)
        // 画右侧贝塞尔
        const headPointR = {
            x: this.headCenter.x + headRadius,
            y: this.headCenter.y
        }
        const controlPointR = {
            x: tailCenter.x + tailRadius,
            y: headPointR.y + this.state.distance / 2
        }
        ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)
        ctx.fillStyle = 'rgb(170,170,170)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(153,153,153)'
        ctx.stroke()
        ctx.restore()
    }



    _drawArrow=(ctx)=> {

        ctx.save()
        ctx.beginPath()
        const rate = this.state.distance / this.maxDistance
        const arrowRadius = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * rate
        // 画内圆
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - (this.arrowWidth - rate), -Math.PI / 2, 0, true)
        // 画外圆
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false)
        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate)
        ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2)
        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate)
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(170,170,170)'
        ctx.stroke()
        ctx.restore()
    }



    render() {


        return (
            <div>
                <canvas id="bubble" ref={el=>this.bubble=el} width={this.state.width} height={this.state.height} style={{width:this.state.width / this.ratio,height:this.state.height / this.ratio}}></canvas>
            </div>
        );
    }

}
export default Bubble
/**
 * Created by bear on 2017/10/18.
 */
import React, {
    Component,
    PropTypes,
} from 'react';


class Timer extends Component {
    static displayName = 'Simple countDown';
    static propTypes = {
        date: PropTypes.string,
        days: PropTypes.objectOf(PropTypes.string),
        hours: PropTypes.string,
        mins: PropTypes.string,
        segs: PropTypes.string,
        onEnd: PropTypes.func,

    };
    static defaultProps = {
        date: new Date(),
        days: {
            plural: '天',
            singular: '天',
        },
        hours: ':',
        mins: ':',
        segs: ':',
        onEnd: () => {
        },

    };
    state = {
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
    };

    componentDidMount() {
        //console.log(this.props.date);//"2017-03-29T00:00:00+00:00"
        this.interval = setInterval(() => {
            const date = this.getDateData(this.props.date);
            if (date) {
                this.setState(date);
            } else {
                this.stop();
                this.props.onEnd();
            }
        }, 1000);
    }

    componentWillMount() {
        const date = this.getDateData(this.props.date);
        if (date) {
            this.setState(date);
        }

    }

    componentWillUnmount() {
        this.stop();
    }

    getDateData(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date)) / 1000;

        if (diff <= 0) {
            return false;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };

        if (diff >= (365.25 * 86400)) {
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
        return timeLeft;
    }

    render() {
        const countDown = this.state;
        let days;
        if (countDown.days === 1) {
            days = this.props.days.singular;
        } else {
            days = this.props.days.plural;
        }
        return (

            <div >

                    { (countDown.days > 0) ? <label >剩{ this.leadingZeros(countDown.days)}天</label> : null}
                    <span >{ this.leadingZeros(countDown.hours)}</span>
                    {this.props.hours}
                    <span >{this.leadingZeros(countDown.min)}</span>
                    {this.props.mins}
                    <span >{this.leadingZeros(countDown.sec)}</span>
                    {this.props.segs}

            </div>


        );
    }

    stop() {
        clearInterval(this.interval);
    }

    leadingZeros(num, length = null) {

        let length_ = length;
        let num_ = num;
        if (length_ === null) {
            length_ = 2;
        }
        num_ = String(num_);
        while (num_.length < length_) {
            num_ = '0' + num_;
        }
        return num_;
    }
}
;

export default Timer
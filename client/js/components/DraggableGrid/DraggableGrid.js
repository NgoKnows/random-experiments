import React, { Component } from 'react';
import Radium from 'radium';
import { Motion, spring } from 'react-motion';
import { range } from 'lodash';

const springSetting1 = { stiffness: 580, damping: 10 };
const springSetting2 = { stiffness: 200, damping: 16 };

import Ball from './Ball';

function reinsert(arr, from, to) {
    const newArray = arr.slice(0);
    const val = newArray[from];

    newArray.splice(from, 1);
    newArray.splice(to, 0, val);
    return newArray;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

const allColors = [
    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

const [count, width, height] = [11, 70, 90];

const layout = range(count).map(n => {
    const row = Math.floor(n / 3);
    const col = n % 3;

    return [width * col, height * row];
});

@Radium
export default class DraggableGrid extends Component {
    static defaultProps = {};
    props: {};
    state = {
        mouse: [0, 0],
        delta: [0, 0], // difference between mouse and circle pos, for dragging
        lastPress: null, // key of the last pressed component
        isPressed: false,
        order: range(count), // index: visual position. value: component key/id
    };
    state: void;

    constructor(props) {
        super(props);

        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
    }

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleTouchStart(key, pressLocation, e) {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    }

    handleTouchMove(e) {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    }

    handleMouseMove({ pageX, pageY }) {
        const { order, lastPress, isPressed, delta: [dx, dy] } = this.state;

        if (isPressed) {
            const mouse = [pageX - dx, pageY - dy];

            const col = clamp(Math.floor(mouse[0] / width), 0, 2);
            const row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));

            const index = row * 3 + col;
            const newOrder = reinsert(order, order.indexOf(lastPress), index);

            this.setState({ mouse, order: newOrder });
        }
    }

    handleMouseDown(key, [pressX, pressY], { pageX, pageY }) {
        this.setState({
            lastPress: key,
            isPressed: true,
            delta: [pageX - pressX, pageY - pressY],
            mouse: [pressX, pressY]
        });
    }

    handleMouseUp() {
        this.setState({
            isPressed: false,
            delta: [0, 0]
        });
    }

    render() {
        const { order, lastPress, isPressed, mouse } = this.state;

        return (
            <div style={STYLES.container}>
                {order.map((key) => {
                    let style;
                    let x;
                    let y;

                    const visualPosition = order.indexOf(key);

                    if (key === lastPress && isPressed) {
                        [x, y] = mouse;
                        style = {
                            translateX: x,
                            translateY: y,
                            scale: spring(1.2, springSetting1)
                        };
                    } else {
                        [x, y] = layout[visualPosition];
                        style = {
                            translateX: spring(x, springSetting2),
                            translateY: spring(y, springSetting2),
                            scale: spring(1, springSetting1)
                        };
                    }

                    return (
                        <Motion key={key} style={style}>
                            {({ translateX, translateY, scale }) =>
                                <Ball
                                    handleMouseDown={this.handleMouseDown}
                                    handleTouchStart={this.handleTouchStart}
                                    style={[STYLES.ball, {
                                        backgroundColor: allColors[key],
                                        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
                                    }]}
                                    blah={key}
                                    x={x}
                                    y={y}
                                />
                            }
                        </Motion>
                    )
                })}
            </div>
        );
    }
}

const STYLES = {
    container: {
        width: 190,
        height: 320
    },

    ball: {
        position: 'absolute',
        border: '1px solid black',
        borderRadius: 50,
        width: 50,
        height: 50
    }
};

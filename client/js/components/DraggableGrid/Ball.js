import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Ball extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    constructor(props) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
    }

    handleMouseDown(e) {
        const { handleMouseDown, blah, x, y } = this.props;

        handleMouseDown(blah, [x, y], e);
    }

    handleTouchStart(e) {
        const { handleTouchStart, blah, x, y } = this.props;

        handleTouchStart(blah, [x, y], e)
    }

    render() {
        return (
            <div
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}
                draggable={false}
                style={this.props.style}
            />
        );
    }
}

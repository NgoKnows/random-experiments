import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class ListItem extends Component {
    static defaultProps = {};
    props: {
        index : number,
        activeIndex  : number,
        handleClick : () => void
    };

    state = { offsetX: 0, touchStart: null }
    state: void;

    constructor(props) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.onMove = this.onMove.bind(this);
    }

    render() {
        const { index, activeIndex, handleClick } = this.props;
        const { offsetX, touchStart } = this.state;

        // handle click only if off set is not zero
        // onClick={() => this.handleClick()}
        return (
            <div
                style={[STYLES.listItem(offsetX, touchStart), this.getListItemStyle()]}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                draggable={false}
            >
            </div>
        );
    }

    handleClick() {
        console.log(this.state.offsetX)
        if (!this.state.offsetX) {
            this.props.handleClick();
        }
    }

    handleMouseDown(e) {
        document.addEventListener('mousemove', this.onMove);
        this.setState({ touchStart: e.clientX });
    }

    handleMouseUp(e) {
        document.removeEventListener('mousemove', this.onMove);
        this.setState({ offsetX: 0, touchStart: null });
    }

    onMove(e) {
        window.requestAnimationFrame(() => this.setState({ offsetX: e.clientX - this.state.touchStart }));
    }

    getListItemStyle() {
        const { index, activeIndex } = this.props;
        const { offsetX } = this.state;

        // no active list item
        if (activeIndex === null) {
            return {};
        }

        // is the active item
        if (index === activeIndex) {
            return STYLES.activeListItem(offsetX);
        }

        return STYLES.nonActiveListItem(activeIndex, index);
    }
}

const STYLES = {
    listItem: (offsetX, touchStart) => ({
        width: 350,
        height: 100,
        margin: 15,
        backgroundColor: '#00796B',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        // transition: 'transform .5s cubic-bezier(.25,.8,.25,1)',
        transform: `translateX(${offsetX}px)`,
        willChange: touchStart ? 'transform' : ''
    }),

    activeListItem: (offsetX) => ({
        transform: `scale(1, 3) translateX(${offsetX}px)`,
    }),

    nonActiveListItem: (activeIndex, index) => ({
        transform: index > activeIndex ? 'translateY(100px)' : 'translateY(-100px)'
    }),

    title: {
        paddingTop: 10,
        paddingLeft: 10
    }
};

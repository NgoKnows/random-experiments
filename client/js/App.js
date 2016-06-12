import React, { Component } from 'react';
import CircularExpandingButton from 'components/ExpandingButton/CircularExpandingButton';
import VerticalExpandingButton from 'components/ExpandingButton/VerticalExpandingButton';
import DraggableGrid from 'components/DraggableGrid/DraggableGrid';

export default class App extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;
        // <CircularExpandingButton />
        // <VerticalExpandingButton direction="up" />
        // <VerticalExpandingButton direction="down" />
        // <VerticalExpandingButton direction="left" />
        // <VerticalExpandingButton direction="right" />

        return (
            <div style={STYLES}>
                <DraggableGrid />
            </div>
        );
    }
}

const STYLES = {
    height: 1000,
    width: 1500,
    fontFamily: 'Lato',
    margin: 100
};
